import Resume, { IResume, IResumeData } from '../models/resume.model.js';
import fs from 'fs';
import path from 'path';
import logger from '../utils/logger.js';
import https from 'https';
import { uploadPdfToCloudinary, deletePdfFromCloudinary } from '../config/cloudinary.js';

/** Max characters to use from resume name for the Cloudinary public ID hash */
const DETERMINISTIC_HASH_LENGTH = 16;

/** Default pagination page size */
const DEFAULT_PAGE_LIMIT = 20;

interface CreateResumeData {
  name: string;
  title?: string;
  format: string;
  resumeData: IResumeData;
  pdfData: string;
}

/**
 * Helper to check if a file exists asynchronously without blocking the event loop
 */
const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

/**
 * Helper to fetch a file from a URL and encode it to base64
 * @param {string} url
 * @returns {Promise<string>}
 */
const getBase64FromUrl = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch file from URL: ${res.statusCode}`));
        return;
      }
      const chunks: Buffer[] = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve(`data:application/pdf;base64,${buffer.toString('base64')}`);
      });
      res.on('error', (err) => reject(err));
    });
  });
};

/**
 * Create or upsert a resume for a user.
 */
export const createResume = async (userId: string, userEmail: string, data: CreateResumeData): Promise<IResume> => {
  // Generate a deterministic and clean public ID for Cloudinary
  const nameHash = Buffer.from(data.name).toString('hex').slice(0, DETERMINISTIC_HASH_LENGTH);
  const publicId = `resume_${userId}_${nameHash}`;

  let pdfDataValue = '';
  try {
    pdfDataValue = await uploadPdfToCloudinary(data.pdfData, publicId);
  } catch (err) {
    logger.error('Failed to save PDF file to Cloudinary:', err);
    throw new Error('Failed to save PDF file on server');
  }

  return await Resume.findOneAndUpdate(
    { name: data.name, userId },
    {
      title: data.title,
      format: data.format,
      resumeData: data.resumeData,
      pdfData: pdfDataValue,
      userEmail: userEmail.toLowerCase(),
      downloadedAt: new Date()
    },
    { new: true, upsert: true }
  ) as IResume;
};

/**
 * Get all resumes for a user with pagination.
 * @param {string} userId
 * @param {number} page - 1-based page number
 * @param {number} limit - items per page (max 100)
 */
export const getAllResumesByUser = async (
  userId: string,
  page = 1,
  limit = DEFAULT_PAGE_LIMIT
): Promise<{ resumes: IResume[]; total: number; page: number; totalPages: number }> => {
  const safeLimit = Math.min(limit, 100);
  const skip = (page - 1) * safeLimit;

  const [resumes, total] = await Promise.all([
    Resume.find({ userId })
      .select('-pdfData')
      .sort({ downloadedAt: -1 })
      .skip(skip)
      .limit(safeLimit),
    Resume.countDocuments({ userId }),
  ]);

  return {
    resumes,
    total,
    page,
    totalPages: Math.ceil(total / safeLimit),
  };
};

/**
 * Delete a resume by its ID and owner.
 */
export const deleteResume = async (resumeId: string, userId: string): Promise<IResume | null> => {
  const resume = await Resume.findOne({ _id: resumeId, userId });
  if (resume && resume.pdfData) {
    if (resume.pdfData.startsWith('http://') || resume.pdfData.startsWith('https://')) {
      await deletePdfFromCloudinary(resume.pdfData);
    } else {
      // Legacy local file deletion
      const filePath = path.join(process.cwd(), 'uploads', resume.pdfData);
      try {
        if (await fileExists(filePath)) {
          await fs.promises.unlink(filePath);
        }
      } catch (err) {
        logger.error('Failed to delete PDF from disk on resume deletion:', err);
      }
    }
  }
  return await Resume.findOneAndDelete({ _id: resumeId, userId });
};

/**
 * Get the PDF data for a resume by ID (owner-scoped).
 */
export const getResumePdfById = async (resumeId: string, userId: string): Promise<Record<string, unknown> | null> => {
  const resume = await Resume.findOne({ _id: resumeId, userId }).select('pdfData name');
  if (!resume) return null;

  const pdfPathOrUrl = resume.pdfData;
  try {
    if (pdfPathOrUrl.startsWith('http://') || pdfPathOrUrl.startsWith('https://')) {
      const base64Data = await getBase64FromUrl(pdfPathOrUrl);
      return {
        _id: resume._id,
        name: resume.name,
        pdfData: base64Data
      };
    } else {
      // Legacy local file reading
      const filePath = path.join(process.cwd(), 'uploads', pdfPathOrUrl);
      if (await fileExists(filePath)) {
        const buffer = await fs.promises.readFile(filePath);
        const base64Data = `data:application/pdf;base64,${buffer.toString('base64')}`;
        return {
          _id: resume._id,
          name: resume.name,
          pdfData: base64Data
        };
      }
    }
  } catch (err) {
    logger.error('Failed to read PDF file:', err);
  }
  return null;
};
