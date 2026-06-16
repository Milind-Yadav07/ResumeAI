import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, GraduationCap, Code, Layers, Trophy } from 'lucide-react';
import PersonalInfoForm from './forms/PersonalInfoForm';
import SkillsForm from './forms/SkillsForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import ProjectsForm from './forms/ProjectsForm';
import AchievementsForm from './forms/AchievementsForm';

import { ResumeData, SectionType, SectionData } from '@/types';

interface ResumeFormSectionProps {
    activeTab: string | null;
    setActiveTab: (tab: string | null) => void;
    resumeData: ResumeData;
    handleInputChange: (section: SectionType, field: string, value: string) => void;
    handleAISummary: () => void;
    updateSection: (section: SectionType, data: SectionData) => void;
    handleAddItem: (section: SectionType, item: unknown) => void;
    handleRemoveItem: (section: SectionType, index: number) => void;
    handleUpdateItem: (section: SectionType, index: number, field: string, value: string) => void;
    handleAIExperience: (index: number) => void;
    handleAIProject: (index: number) => void;
    handleAIAchievement: (index: number) => void;
    isAiLoading: string | boolean;
    format: string;
}


export const ResumeFormSection: React.FC<ResumeFormSectionProps> = React.memo(({
    activeTab,
    setActiveTab,
    resumeData,
    handleInputChange,
    handleAISummary,
    updateSection,
    handleAddItem,
    handleRemoveItem,
    handleUpdateItem,
    handleAIExperience,
    handleAIProject,
    handleAIAchievement,
    isAiLoading,
    format
}) => {
    return (
        <div className="overflow-y-auto p-0 rounded-[20px] bg-white border border-slate-200 shadow-sm flex flex-col min-h-0">
            <div className="flex flex-col">
                {[
                    { id: 'personal', label: 'Personal Information', icon: User },
                    { id: 'skills', label: 'Technical Skills', icon: Code },
                    { id: 'experience', label: 'Work Experience', icon: Briefcase },
                    { id: 'education', label: 'Education', icon: GraduationCap },
                    { id: 'projects', label: 'Projects', icon: Layers },
                    { id: 'achievements', label: 'Achievements', icon: Trophy },
                ].map((item) => (
                    <div key={item.id} className={`border-b border-slate-100 last:border-b-0 ${activeTab === item.id ? 'active' : ''}`}>
                        <button
                            className="w-full flex items-center justify-between p-6 bg-transparent border-none cursor-pointer transition-colors duration-200 hover:bg-slate-50/50"
                            onClick={() => setActiveTab(activeTab === item.id ? null : item.id)}
                        >
                            <div className="flex items-center gap-5">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${activeTab === item.id ? 'bg-blue-600 text-white scale-105 shadow-[0_4px_12px_rgba(59,130,246,0.25)]' : 'bg-slate-50 text-slate-500'}`}>
                                    <item.icon size={18} />
                                </div>
                                <div className="flex flex-col items-start gap-0.5">
                                    <span className="text-[1.05rem] font-bold text-slate-800">{item.label}</span>
                                </div>
                            </div>
                            <motion.div
                                animate={{ rotate: activeTab === item.id ? 180 : 0 }}
                                className={`${activeTab === item.id ? 'text-blue-600' : 'text-slate-400'} transition-colors duration-200`}
                            >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                        {activeTab === item.id && (
                            <motion.div
                                key={item.id}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden bg-white"
                            >
                                <div className="px-6 pb-8 pt-0">
                                    {item.id === 'personal' && (
                                        <PersonalInfoForm
                                            data={resumeData.personalInfo}
                                            onChange={(field, value) => handleInputChange('personalInfo', field, value)}
                                            onAISummary={handleAISummary}
                                            isAiLoading={isAiLoading === true}
                                            format={format}
                                        />
                                    )}
                                    {item.id === 'skills' && (
                                        <SkillsForm
                                            skills={resumeData.skills}
                                            onChange={(skills) => updateSection('skills', skills)}
                                        />
                                    )}
                                    {item.id === 'experience' && (
                                        <ExperienceForm
                                            experiences={resumeData.experience}
                                            onAdd={(item) => handleAddItem('experience', item)}
                                            onRemove={(index) => handleRemoveItem('experience', index)}
                                            onUpdate={(index, field, value) => handleUpdateItem('experience', index, field, value)}
                                            onAISummary={handleAIExperience}
                                            isAiLoading={typeof isAiLoading === 'string' ? isAiLoading : ''}
                                        />
                                    )}
                                    {item.id === 'education' && (
                                        <EducationForm
                                            education={resumeData.education}
                                            onAdd={(item) => handleAddItem('education', item)}
                                            onRemove={(index) => handleRemoveItem('education', index)}
                                            onUpdate={(index, field, value) => handleUpdateItem('education', index, field, value)}
                                        />
                                    )}
                                    {item.id === 'projects' && (
                                        <ProjectsForm
                                            projects={resumeData.projects}
                                            onAdd={(item) => handleAddItem('projects', item)}
                                            onRemove={(index) => handleRemoveItem('projects', index)}
                                            onUpdate={(index, field, value) => handleUpdateItem('projects', index, field, value)}
                                            onAISummary={handleAIProject}
                                            isAiLoading={typeof isAiLoading === 'string' ? isAiLoading : ''}
                                        />
                                    )}
                                    {item.id === 'achievements' && (
                                        <AchievementsForm
                                            achievements={resumeData.achievements}
                                            onAdd={(item) => handleAddItem('achievements', item)}
                                            onRemove={(index) => handleRemoveItem('achievements', index)}
                                            onUpdate={(index, field, value) => handleUpdateItem('achievements', index, field, value)}
                                            onAISummary={handleAIAchievement}
                                            isAiLoading={typeof isAiLoading === 'string' ? isAiLoading : ''}
                                        />
                                    )}
                                </div>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
});
