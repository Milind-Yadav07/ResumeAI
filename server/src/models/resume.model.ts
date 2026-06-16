import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IPersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  links: string;
  summary: string;
  photo: string;
}

export interface IExperience {
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface IEducation {
  degree: string;
  school: string;
  year: string;
}

export interface IProject {
  title: string;
  link: string;
  description: string;
}

export interface IAchievement {
  title: string;
  description: string;
}

export interface IResumeData {
  personalInfo: IPersonalInfo;
  skills: string[];
  experience: IExperience[];
  education: IEducation[];
  projects: IProject[];
  achievements: IAchievement[];
  certifications: string[];
}

export interface IResume extends Document {
  userId: mongoose.Types.ObjectId;
  userEmail: string;
  name: string;
  title: string;
  format: string;
  resumeData: IResumeData;
  pdfData: string;
  downloadedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const personalInfoSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  links: { type: String, default: '' },
  summary: { type: String, default: '' },
  photo: { type: String, default: '' }
}, { _id: false });

const experienceSchema = new Schema({
  role: { type: String, default: '' },
  company: { type: String, default: '' },
  duration: { type: String, default: '' },
  description: { type: String, default: '' }
}, { _id: false });

const educationSchema = new Schema({
  degree: { type: String, default: '' },
  school: { type: String, default: '' },
  year: { type: String, default: '' }
}, { _id: false });

const projectSchema = new Schema({
  title: { type: String, default: '' },
  link: { type: String, default: '' },
  description: { type: String, default: '' }
}, { _id: false });

const achievementSchema = new Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' }
}, { _id: false });

const resumeDataSchema = new Schema({
  personalInfo: { type: personalInfoSchema, required: true },
  skills: { type: [String], default: [] },
  experience: { type: [experienceSchema], default: [] },
  education: { type: [educationSchema], default: [] },
  projects: { type: [projectSchema], default: [] },
  achievements: { type: [achievementSchema], default: [] },
  certifications: { type: [String], default: [] }
}, { _id: false });

const resumeSchema = new Schema<IResume>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
  },
  format: {
    type: String,
    required: true,
  },
  resumeData: {
    type: resumeDataSchema,
    required: true,
  },
  pdfData: {
    type: String,
    required: true,
  },
  downloadedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

resumeSchema.index({ userId: 1, downloadedAt: -1 }); // for sorted listing queries
resumeSchema.index({ userId: 1, name: 1 });          // for upsert lookup

const Resume: Model<IResume> = mongoose.model<IResume>('Resume', resumeSchema);
export default Resume;
