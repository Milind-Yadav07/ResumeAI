export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  links: string;
  summary: string;
  photo: string;
}

export interface Experience {
  id?: string;
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface Education {
  id?: string;
  degree: string;
  school: string;
  year: string;
}

export interface Project {
  id?: string;
  title: string;
  link: string;
  description: string;
}

export interface Achievement {
  id?: string;
  title: string;
  description: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  skills: string[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  achievements: Achievement[];
  certifications: string[];
}

export type SectionType = 'personalInfo' | 'skills' | 'experience' | 'education' | 'projects' | 'achievements' | 'certifications';

export type SectionData = 
  | PersonalInfo 
  | string[] 
  | Experience[] 
  | Education[] 
  | Project[] 
  | Achievement[];

export interface ResumeContextType {
  resumeData: ResumeData;
  updateSection: (section: SectionType, data: SectionData) => void;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
}

export interface SavedResume {
  _id: string;
  name: string;
  title: string;
  format: string;
  resumeData: ResumeData;
  pdfFilename?: string;
  downloadedAt: string;
  createdAt: string;
}

export interface PaginatedResumes {
  resumes: SavedResume[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ATSTip {
  type: 'success' | 'warning' | 'tip';
  text: string;
}

export interface ATSAnalysisResult {
  matchPercentage: number;
  matchLevel: 'Weak Match' | 'Average Match' | 'Good Match' | 'Strong Match' | 'Error';
  matchDescription: string;
  foundKeywords: string[];
  missingKeywords: string[];
  quickTips: ATSTip[];
}

export interface UseResumeBuilderReturn {
  format: string;
  resumeData: ResumeData;
  updateSection: (section: SectionType, data: SectionData) => void;
  activeTab: string | null;
  setActiveTab: React.Dispatch<React.SetStateAction<string | null>>;
  isAiLoading: string | boolean;
  contentRef: (node: HTMLDivElement | null) => void;
  numPages: number;
  instance: {
    loading: boolean;
    blob: Blob | null;
    url: string | null;
    error: string | null;
  };
  handleDownload: () => Promise<void>;
  handleAISummary: () => Promise<void>;
  handleAIExperience: (index: number) => Promise<void>;
  handleAIProject: (index: number) => Promise<void>;
  handleAIAchievement: (index: number) => Promise<void>;
  handleInputChange: (section: SectionType, field: string, value: string) => void;
  handleAddItem: (section: SectionType, emptyItem: unknown) => void;
  handleRemoveItem: (section: SectionType, index: number) => void;
  handleUpdateItem: (section: SectionType, index: number, field: string, value: string) => void;
}

export interface UseATSCheckerReturn {
  jd: string;
  setJd: React.Dispatch<React.SetStateAction<string>>;
  fileName: string;
  analysis: ATSAnalysisResult | null;
  isLoading: boolean;
  isParsing: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  removeFile: () => void;
  handleCheck: () => Promise<void>;
}

export interface UseMyResumesReturn {
  isAuthenticated: boolean;
  resumes: SavedResume[];
  isLoading: boolean;
  handleDelete: (id: string, e: React.MouseEvent) => Promise<void>;
  handleLoadResume: (resume: SavedResume) => void;
  getTemplateFriendlyName: (formatId: string) => string;
  getTemplateStyleClasses: (formatId: string) => { bg: string; accent: string };
  navigate: (to: string, options?: { replace?: boolean; state?: unknown }) => void;
}

export interface UseWorksSliderReturn {
  expandedId: number;
  toggleExpand: (id: number) => void;
  currentLottie: string;
}



