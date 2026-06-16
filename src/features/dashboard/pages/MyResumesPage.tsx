import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit3, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useMyResumes } from '../hooks/useMyResumes';

const MyResumes: React.FC = () => {
  const {
    isAuthenticated,
    resumes,
    isLoading,
    handleDelete,
    handleLoadResume,
    getTemplateFriendlyName,
    getTemplateStyleClasses,
    navigate
  } = useMyResumes();

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#fafbfc]">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#fafbfc]">
      <Navbar />

      {/* Resume List Grid */}
      <div className="max-w-[1200px] mx-auto py-12 px-8 pb-[100px] pt-[110px]">
        <AnimatePresence mode="popLayout">
          {!isAuthenticated ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center justify-center py-16 px-8 bg-white border border-slate-200/60 rounded-3xl text-center shadow-sm"
            >
              <div className="w-full max-w-[280px] mb-8">
                <img
                  src="/MyResumePageImage.svg"
                  alt="Sign in to view resumes"
                  className="w-full h-auto object-contain select-none mx-auto"
                />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-3 font-heading">
                Sign in to see your resumes
              </h2>
              <p className="text-slate-500 text-[0.95rem] max-w-md mb-8 leading-relaxed">
                It looks like you are not signed in. Connect to your ResumeAI account to view, customize, and manage all your saved resumes.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                Sign In to Your Account
              </button>
            </motion.div>
          ) : resumes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center justify-center py-16 px-8 bg-white border border-slate-200/60 rounded-3xl text-center shadow-sm"
            >
              <div className="w-full max-w-[240px] mb-6">
                <img
                  src="/NoDataImage.svg"
                  alt="No resumes found"
                  className="w-full h-auto object-contain select-none mx-auto"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No resumes found</h3>
              <p className="text-slate-500 text-sm max-w-sm mb-8 leading-relaxed">
                You haven't downloaded any resumes yet. Start customizing a resume now using our AI-driven features!
              </p>
              <button
                onClick={() => navigate('/select-format')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                Choose a Template
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-3 gap-8 w-full max-[1024px]:grid-cols-2 max-md:grid-cols-1">
              {resumes.map((resume, index) => {
                const styles = getTemplateStyleClasses(resume.format);
                return (
                  <motion.div
                    key={resume._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden relative"
                  >
                    {/* Visual Preview Box */}
                    <div className={`w-full aspect-[16/10] ${styles.bg} flex items-center justify-center p-6 border-b border-slate-100 relative group-hover:bg-opacity-80 transition-colors`}>
                      <div className="w-[85%] h-[90%] bg-white rounded-lg shadow-md border border-slate-200/40 p-4 flex flex-col justify-between overflow-hidden relative">
                        <div>
                          <div className="w-12 h-1.5 bg-slate-300 rounded-full mb-2" />
                          <div className="w-20 h-1 bg-slate-200 rounded-full mb-4" />
                          <div className="space-y-1.5">
                            <div className="w-full h-1 bg-slate-100 rounded-full" />
                            <div className="w-[90%] h-1 bg-slate-100 rounded-full" />
                            <div className="w-[95%] h-1 bg-slate-100 rounded-full" />
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <span className={`text-[0.65rem] font-bold border px-2 py-0.5 rounded-full ${styles.accent}`}>
                            {getTemplateFriendlyName(resume.format)}
                          </span>
                          <div className="w-5 h-5 rounded-full bg-slate-100" />
                        </div>
                      </div>
                    </div>

                    {/* Resume Information */}
                    <div className="p-6 flex-1 flex flex-col text-left">
                      <h3 className="text-lg font-bold text-slate-800 mb-1.5 truncate">
                        {resume.name}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5 mb-4">
                        <Calendar size={12} />
                        <span>
                          {new Date(resume.downloadedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </p>
                      <p className="text-sm text-slate-500 leading-normal line-clamp-2 mb-6 flex-1">
                        {resume.title}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                        <button
                          onClick={() => handleLoadResume(resume)}
                          className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50/50 hover:bg-blue-50 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                        >
                          <Edit3 size={13} />
                          <span>Edit Resume</span>
                        </button>
                        <button
                          onClick={(e) => handleDelete(resume._id, e)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                          title="Delete Resume"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyResumes;
