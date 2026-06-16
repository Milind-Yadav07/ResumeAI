import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useResume } from '@/context/ResumeContext';
import { fetchResumes, deleteResume } from '@/services/resumeService';
import { SavedResume, UseMyResumesReturn } from '@/types';
import toast from 'react-hot-toast';

export const useMyResumes = (): UseMyResumesReturn => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { setResumeData } = useResume();
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const loadResumes = async () => {
      setIsLoading(true);
      try {
        const data = await fetchResumes();
        setResumes(data.resumes);
      } catch {
        toast.error('Failed to load your saved resumes. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadResumes();
  }, [isAuthenticated]);

  const handleDelete = useCallback(async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this resume from your history?')) {
      return;
    }

    try {
      await deleteResume(id);
      setResumes(prev => prev.filter(r => r._id !== id));
      toast.success('Resume deleted.');
    } catch {
      toast.error('Failed to delete resume. Please try again.');
    }
  }, []);

  const handleLoadResume = useCallback((resume: SavedResume) => {
    setResumeData(resume.resumeData);
    navigate(`/builder?format=${resume.format}`);
  }, [setResumeData, navigate]);

  const getTemplateFriendlyName = useCallback((formatId: string): string => {
    const names: Record<string, string> = {
      row: 'The Executive',
      column2: 'The Creative',
      minimalist: 'The Minimalist',
      corporate: 'The Corporate',
      analyst: 'The Analyst',
      showcase: 'The Showcase',
    };
    return names[formatId] || 'Custom Template';
  }, []);

  const getTemplateStyleClasses = useCallback((formatId: string): { bg: string; accent: string } => {
    const styles: Record<string, { bg: string; accent: string }> = {
      row: { bg: 'bg-slate-100', accent: 'border-slate-500 text-slate-800' },
      column2: { bg: 'bg-slate-50', accent: 'border-blue-500 text-blue-600' },
      minimalist: { bg: 'bg-slate-200', accent: 'border-slate-800 text-slate-900' },
      corporate: { bg: 'bg-[#f4efe8]', accent: 'border-[#d4af37] text-[#a0522d]' },
      analyst: { bg: 'bg-[#1b2a4a]/10', accent: 'border-[#1b2a4a] text-[#1b2a4a]' },
      showcase: { bg: 'bg-violet-100', accent: 'border-violet-600 text-violet-600' },
    };
    return styles[formatId] || { bg: 'bg-blue-50', accent: 'border-blue-600 text-blue-600' };
  }, []);

  return {
    isAuthenticated,
    resumes,
    isLoading,
    handleDelete,
    handleLoadResume,
    getTemplateFriendlyName,
    getTemplateStyleClasses,
    navigate
  };
};
