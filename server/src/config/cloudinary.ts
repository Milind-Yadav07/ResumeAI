import { v2 as cloudinary } from 'cloudinary';
import logger from '../utils/logger.js';
import { env } from './env.js';

// Configure Cloudinary with validated environment variables
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

/**
 * Extract public ID from Cloudinary URL
 * @param {string} url - The Cloudinary secure URL
 * @returns {string|null} - The public ID (with folder if applicable)
 */
export const getPublicIdFromUrl = (url: string): string | null => {
  if (!url) return null;
  const parts = url.split('/upload/');
  if (parts.length < 2) return null;
  
  const remaining = parts[1];
  const remainingParts = remaining.split('/');
  
  // If the first part starts with 'v' and is followed by digits (version string), strip it
  if (remainingParts[0].match(/^v\d+$/)) {
    remainingParts.shift();
  }
  
  return remainingParts.join('/');
};

/**
 * Extract resource type (raw, image, video, etc.) from Cloudinary URL
 * @param {string} url - The Cloudinary secure URL
 * @returns {string} - The resource type (default: 'raw')
 */
export const getResourceTypeFromUrl = (url: string): string => {
  if (!url) return 'raw';
  const parts = url.split('/upload/');
  if (parts.length < 2) return 'raw';
  
  const urlBeforeUpload = parts[0];
  const urlParts = urlBeforeUpload.split('/');
  return urlParts[urlParts.length - 1] || 'raw';
};

/**
 * Upload base64 PDF to Cloudinary
 * @param {string} base64Data - Base64 encoded PDF string
 * @param {string} publicId - Unique ID for the file
 * @returns {Promise<string>} - Returns the secure URL of the uploaded file
 */
export const uploadPdfToCloudinary = async (base64Data: string, publicId: string): Promise<string> => {
  try {
    // Ensure base64Data is in Data URI format
    let dataUri = base64Data;
    if (!dataUri.startsWith('data:application/pdf;base64,')) {
      dataUri = `data:application/pdf;base64,${base64Data}`;
    }

    // Upload to Cloudinary using raw resource type for PDFs
    const result = await cloudinary.uploader.upload(dataUri, {
      resource_type: 'raw',
      public_id: publicId,
      folder: 'resumes',
    });

    return result.secure_url;
  } catch (error) {
    logger.error('Cloudinary PDF upload failed:', error);
    throw new Error('Failed to upload PDF to cloud storage');
  }
};

/**
 * Delete a PDF from Cloudinary by its URL
 * @param {string} url - The Cloudinary secure URL
 */
export const deletePdfFromCloudinary = async (url: string): Promise<void> => {
  try {
    if (!url || !url.startsWith('http')) return;
    
    const publicId = getPublicIdFromUrl(url);
    const resourceType = getResourceTypeFromUrl(url);
    
    if (publicId) {
      await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    }
  } catch (error) {
    logger.error('Cloudinary file deletion failed:', error);
  }
};
