import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileCheck, Loader2, FileText, X, Lightbulb } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useATSChecker } from '../hooks/useATSChecker';
import { AtsScoreCard, KeywordList } from '../components';

const ATSChecker: React.FC = () => {
    const {
        jd,
        setJd,
        fileName,
        analysis,
        isLoading,
        isParsing,
        fileInputRef,
        handleFileUpload,
        removeFile,
        handleCheck
    } = useATSChecker();

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <div className="py-24 px-8 max-w-[1200px] mx-auto min-h-screen font-sans">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <h1 className="text-5xl md:text-[3.5rem] font-extrabold text-[#1a1a1a] tracking-tighter mb-4">Optimize Your Resume for <span className="text-[#4361ee]">ATS Success</span></h1>
                    <p className="text-[1.125rem] text-[#666] max-w-[700px] mx-auto leading-relaxed">Beat the bots and land your dream job with our advanced AI-powered ATS checker.</p>
                </motion.div>

                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-2 gap-10 max-[968px]:grid-cols-1">
                        <div className="bg-white rounded-[20px] p-10 shadow-[0_0_45px_rgba(0,0,0,0.12)] border border-slate-300 flex flex-col gap-6">
                            <div className="flex items-center gap-3"><FileText size={20} className="text-[#4361ee]" /><h3 className="text-xl font-bold text-[#1a1a1a]">Job Description</h3></div>
                            <textarea className="w-full h-[300px] p-5 rounded-xl border border-slate-200 bg-slate-50 text-base leading-relaxed resize-none transition-all duration-200 focus:outline-none focus:border-[#4361ee] focus:bg-white focus:ring-4 focus:ring-[#4361ee]/10" placeholder="Paste the job description here..." value={jd} onChange={(e) => setJd(e.target.value)} />
                        </div>
                        <div className="bg-white rounded-[20px] p-10 shadow-[0_0_45px_rgba(0,0,0,0.12)] border border-slate-300 flex flex-col gap-6">
                            <div className="flex items-center gap-3"><Upload size={20} className="text-[#4361ee]" /><h3 className="text-xl font-bold text-[#1a1a1a]">Upload Your Resume</h3></div>
                            <div className={`w-full h-[300px] border-[1.5px] border-dashed rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 ${fileName ? 'border-[#4361ee] bg-blue-50/50' : 'border-slate-200 bg-slate-50 hover:border-[#4361ee]'} ${isParsing ? 'opacity-70' : ''}`} onClick={() => !fileName && !isParsing && fileInputRef.current?.click()}>
                                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf" className="hidden" />
                                <AnimatePresence mode="wait">
                                    {isParsing ? (
                                        <motion.div key="parsing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                                            <Loader2 size={40} className="animate-spin text-[#4361ee]" />
                                            <p className="mt-4 text-slate-600">Extracting text...</p>
                                        </motion.div>
                                    ) : fileName ? (
                                        <motion.div key="file" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4">
                                            <FileCheck size={40} className="text-emerald-500" /><span className="font-semibold text-[#1a1a1a]">{fileName}</span>
                                            <button className="bg-red-100 text-red-500 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-200" onClick={(e) => { e.stopPropagation(); removeFile(); }}><X size={20} /></button>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                                            <div className="w-16 h-16 bg-blue-100/50 rounded-full flex items-center justify-center text-[#4361ee] mb-6"><Upload size={32} /></div>
                                            <p className="text-[1.125rem] font-semibold text-[#1a1a1a] mb-1">Drag and drop here</p>
                                            <button className="bg-white border px-5 py-2.5 rounded-lg font-semibold text-[#4361ee]">Browse Files</button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button onClick={handleCheck} className="bg-[#4361ee] text-white px-12 py-5 rounded-xl text-[1.125rem] font-semibold cursor-pointer flex items-center gap-3 transition-all duration-300 shadow-[0_10px_25px_rgba(67,97,238,0.2)] hover:translate-y-[-2px]" disabled={isLoading}>
                            {isLoading ? <><Loader2 size={20} className="animate-spin" />Analyzing...</> : <>Analyze Resume →</>}
                        </button>
                    </div>

                    <AnimatePresence>
                        {analysis && (
                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="mt-20 pt-20 border-t border-[#eef2f6]">
                                <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-10 items-stretch max-md:grid-cols-1">
                                    <AtsScoreCard matchPercentage={analysis.matchPercentage} matchLevel={analysis.matchLevel} matchDescription={analysis.matchDescription} />
                                    <KeywordList foundKeywords={analysis.foundKeywords} missingKeywords={analysis.missingKeywords} />
                                    <div className="bg-white rounded-3xl p-10 shadow-[0_0_45px_rgba(0,0,0,0.12)] border border-slate-200 h-[550px] overflow-y-auto">
                                        <div className="flex items-center gap-3 mb-8 font-bold text-[1.2rem] text-[#1a1a1a]"><Lightbulb size={20} className="text-[#4361ee]" /><span>Quick Tips</span></div>
                                        <div className="flex flex-col gap-6">
                                            {analysis.quickTips?.map((tip) => (
                                                <div key={tip.text} className="flex gap-4 items-start">
                                                    <Lightbulb size={18} className={`${tip.type === 'success' ? 'text-emerald-500' : tip.type === 'warning' ? 'text-amber-500' : 'text-blue-500'} shrink-0`} />
                                                    <p className="text-[0.95rem] text-slate-600 leading-relaxed">{tip.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ATSChecker;
