import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, User, Briefcase, GraduationCap, Code, Layers, Trophy } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import Button from '../../components/layout/Button';
import ExecutiveTemplate from '../../templates/executive/executivetemplate';
import MinimalistTemplate from '../../templates/minimalist/minimalisttemplate';
import CreativeTemplate from '../../templates/creative/creativetemplate';
import CorporateTemplate from '../../templates/corporate/corporatetemplate';
import AnalystTemplate from '../../templates/analyst/analysttemplate';
import ShowcaseTemplate from '../../templates/showcase/showcasetemplate';
import { getAISummary } from '../../utils/gemini';
import { usePDF } from '@react-pdf/renderer';
import PDFExport from '../../components/PDFExport';
import PersonalInfoForm from '../../components/forms/PersonalInfoForm';
import SkillsForm from '../../components/forms/SkillsForm';
import ExperienceForm from '../../components/forms/ExperienceForm';
import EducationForm from '../../components/forms/EducationForm';
import ProjectsForm from '../../components/forms/ProjectsForm';
import AchievementsForm from '../../components/forms/AchievementsForm';

const ResumeBuilder = () => {
    const [searchParams] = useSearchParams();
    const format = searchParams.get('format') || 'row';
    const { resumeData, updateSection } = useResume();
    const [activeTab, setActiveTab] = useState('personal');
    const [isAiLoading, setIsAiLoading] = useState(false);
    const contentRef = React.useRef(null);
    const [isClient, setIsClient] = useState(false);
    const [numPages, setNumPages] = useState(1);

    // Dynamic page calculation for preview
    useEffect(() => {
        const updatePageCount = () => {
            if (contentRef.current) {
                const height = contentRef.current.offsetHeight;
                const pxPerMm = 3.7795275591;
                const heightMm = (height - 5) / pxPerMm;

                let count = 1;
                // Use 288mm as a safe printable height for all templates (A4 is 297mm)
                // This leaves room for margins and prevents text from hitting the edges
                if (heightMm > 288) {
                    count = 1 + Math.ceil((heightMm - 288) / 288);
                }
                setNumPages(count);
            }
        };

        const observer = new ResizeObserver(updatePageCount);
        if (contentRef.current) observer.observe(contentRef.current);

        // Initial check
        updatePageCount();

        return () => observer.disconnect();
    }, [resumeData, format]);

    // Use the hook to generate the PDF instance
    const [instance, updateInstance] = usePDF({ document: <PDFExport data={resumeData} format={format} /> });

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Force update PDF when data changes (with debounce to prevent crash)
    useEffect(() => {
        if (!resumeData) return;

        const timer = setTimeout(() => {
            console.log("Updating PDF instance with latest data:", resumeData);
            updateInstance(<PDFExport data={{ ...resumeData }} format={format} />);
        }, 1000); // 1s debounce for stability
        return () => clearTimeout(timer);
    }, [resumeData, format, updateInstance]);

    const handleDownload = () => {
        if (instance.url) {
            const link = document.createElement('a');
            link.href = instance.url;
            link.setAttribute('download', `${resumeData.personalInfo.name || 'resume'}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert('PDF is preparing... please wait a moment and try again.');
        }
    };

    const handleAISummary = async () => {
        if (!resumeData.personalInfo.summary) {
            alert("Please enter some text first for AI to improve.");
            return;
        }
        setIsAiLoading(true);
        const improved = await getAISummary(resumeData.personalInfo.summary);
        handleInputChange('personalInfo', 'summary', improved);
        setIsAiLoading(false);
    };

    const handleAIExperience = async (index) => {
        const text = resumeData.experience[index].description;
        if (!text) {
            alert("Please enter some description first for AI to improve.");
            return;
        }
        setIsAiLoading(`exp-${index}`); // Using detailed prefix to track which one is loading
        const improved = await getAISummary(text);
        handleUpdateItem('experience', index, 'description', improved);
        setIsAiLoading(false);
    };

    const handleAIProject = async (index) => {
        const text = resumeData.projects[index].description;
        if (!text) {
            alert("Please enter some description first for AI to improve.");
            return;
        }
        setIsAiLoading(`proj-${index}`);
        const improved = await getAISummary(text);
        handleUpdateItem('projects', index, 'description', improved);
        setIsAiLoading(false);
    };

    const handleAIAchievement = async (index) => {
        const text = resumeData.achievements[index].description;
        if (!text) {
            alert("Please enter some description first for AI to improve.");
            return;
        }
        setIsAiLoading(`ach-${index}`);
        const improved = await getAISummary(text);
        handleUpdateItem('achievements', index, 'description', improved);
        setIsAiLoading(false);
    };

    const handleInputChange = (section, field, value) => {
        updateSection(section, { ...resumeData[section], [field]: value });
    };

    const handleAddItem = (section, emptyItem) => {
        updateSection(section, [...resumeData[section], emptyItem]);
    };

    const handleRemoveItem = (section, index) => {
        const newList = [...resumeData[section]];
        newList.splice(index, 1);
        updateSection(section, newList);
    };

    const handleUpdateItem = (section, index, field, value) => {
        const newList = [...resumeData[section]];
        newList[index] = { ...newList[index], [field]: value };
        updateSection(section, newList);
    };

    const renderTemplate = () => {
        if (format === 'minimalist') return <MinimalistTemplate data={resumeData} />;
        if (format === 'column2') return <CreativeTemplate data={resumeData} />;
        if (format === 'corporate') return <CorporateTemplate data={resumeData} />;
        if (format === 'analyst') return <AnalystTemplate data={resumeData} />;
        if (format === 'showcase') return <ShowcaseTemplate data={resumeData} />;
        return <ExecutiveTemplate data={resumeData} />;
    };

    return (
        <div className="h-screen flex flex-col">
            <header className="h-[72px] bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-[100] sticky top-0">
                <div className="flex items-center">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-bold text-slate-900 tracking-tight"
                    >
                        Build your resume with <span className="text-blue-500"> AI</span>
                    </motion.h1>
                </div>
                <div className="flex items-center">
                    <Button
                        onClick={handleDownload}
                        icon={Download}
                        variant="primary"
                        className="!bg-blue-600 !text-white"
                        disabled={instance.loading}
                    >
                        Download
                    </Button>
                </div>
            </header>

            <main className="flex-1 grid grid-cols-[500px_1fr] overflow-hidden bg-slate-50 p-6 gap-6 min-h-0">
                <div className="overflow-y-auto p-0 rounded-[20px] bg-white border border-slate-200 shadow-sm flex flex-col min-h-0">
                    <div className="flex flex-col">
                        {[
                            { id: 'personal', label: 'Personal Information', icon: User },
                            { id: 'skills', label: 'Technical Skills', icon: Code },
                            { id: 'experience', label: 'Work Experience', icon: Briefcase },
                            { id: 'education', label: 'Education', icon: GraduationCap },
                            { id: 'projects', label: 'Projects', icon: Layers },
                            { id: 'achievements', label: 'Achievements', icon: Trophy },
                        ].map((item, index) => (
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

                                {activeTab === item.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden bg-white"
                                    >
                                        <div className="px-6 pb-8 pt-0">
                                            {item.id === 'personal' && (
                                                <PersonalInfoForm
                                                    data={resumeData.personalInfo}
                                                    onChange={(field, value) => handleInputChange('personalInfo', field, value)}
                                                    onAISummary={handleAISummary}
                                                    isAiLoading={isAiLoading}
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
                                                    isAiLoading={isAiLoading}
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
                                                    isAiLoading={isAiLoading}
                                                />
                                            )}
                                            {item.id === 'achievements' && (
                                                <AchievementsForm
                                                    achievements={resumeData.achievements}
                                                    onAdd={(item) => handleAddItem('achievements', item)}
                                                    onRemove={(index) => handleRemoveItem('achievements', index)}
                                                    onUpdate={(index, field, value) => handleUpdateItem('achievements', index, field, value)}
                                                    onAISummary={handleAIAchievement}
                                                    isAiLoading={isAiLoading}
                                                />
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="overflow-y-auto p-10 flex justify-center">
                    {/* Hidden measurer to calculate total height of the content */}
                    <div style={{ position: 'absolute', top: '-10000px', width: '210mm', left: '-10000px', pointerEvents: 'none', visibility: 'hidden' }}>
                        <div ref={contentRef}>
                            {renderTemplate()}
                        </div>
                    </div>

                    <div className="w-[210mm] m-auto relative flex flex-col items-center gap-[30px] py-[50px]">
                        {[...Array(numPages)].map((_, i) => (
                            <div key={i} className="w-[210mm] h-[297mm] relative bg-white shadow-[0_0_40px_rgba(0,0,0,0.15)] shrink-0 overflow-hidden">
                                {/* The background image is now per-page */}
                                <div
                                    className={`absolute inset-0 z-[1] ${format === 'analyst' ? 'bg-[url("/Resume%20Templates/analystDesign.png")] bg-cover bg-center bg-no-repeat' : format === 'showcase' ? (i === 0 ? 'bg-[url("/Resume%20Templates/showcaseDesign.png")] bg-cover bg-center bg-no-repeat' : 'bg-[url("/Resume%20Templates/simpleDesign.png")] bg-cover bg-center bg-no-repeat') : format === 'corporate' ? (i === 0 ? 'bg-[url("/Resume%20Templates/corporateDesign.png")] bg-cover bg-center bg-no-repeat' : 'bg-[url("/Resume%20Templates/corporateDesign2.png")] bg-cover bg-center bg-no-repeat') : format === 'minimalist' ? 'bg-[url("/Resume%20Templates/minimalistDesign.png")] bg-cover bg-center bg-no-repeat' : format === 'row' ? 'bg-[url("/Resume%20Templates/simpleDesign.png")] bg-cover bg-center bg-no-repeat' : format === 'column2' ? 'bg-[url("/Resume%20Templates/creativeDesign.png")] bg-cover bg-center bg-no-repeat' : ''}`}
                                />

                                {/* For Showcase, we add the black border frame on every page box */}
                                {format === 'showcase' && <div className="absolute top-[1mm] left-[10.5mm] w-[189mm] h-[289mm] border-none pointer-events-none z-[10] bg-transparent" />}

                                {/* The viewport that actually shows the sliced content */}
                                <div
                                    className={`absolute inset-0 z-[5] overflow-hidden ${format === 'showcase' ? 'top-[1mm] left-[10.5mm] w-[189mm] h-[289mm]' : ''}`}
                                    style={format !== 'showcase' ? (i === 0 ? { top: '1mm', height: '289mm' } : { top: '5mm', height: '288mm' }) : {}}
                                >
                                    <div
                                        className="w-full flex flex-col"
                                        style={{
                                            transform: `translateY(-${i === 0 ? 0 : 288 + (i - 1) * 288}mm)`
                                        }}
                                    >
                                        {renderTemplate()}
                                    </div>
                                </div>

                                <div className="absolute bottom-[5mm] right-[10mm] text-[10px] text-slate-400 z-[100]">
                                    Page {i + 1} of {numPages}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ResumeBuilder;
