import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Search, FileCheck, AlertCircle, Loader2, FileText, X, Lightbulb, Key, CheckCircle2 } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import { checkATSScore } from '../../utils/gemini';
import { extractTextFromPDF } from '../../utils/pdfParser';

const ATSChecker = () => {
    const [jd, setJd] = useState('');
    const [resumeText, setResumeText] = useState('');
    const [fileName, setFileName] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isParsing, setIsParsing] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            alert("Please upload a PDF file");
            return;
        }

        setFileName(file.name);
        setIsParsing(true);
        try {
            const text = await extractTextFromPDF(file);
            setResumeText(text);
        } catch (error) {
            alert(error.message);
            setFileName('');
        } finally {
            setIsParsing(false);
        }
    };

    const removeFile = () => {
        setFileName('');
        setResumeText('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleCheck = async () => {
        if (!jd || !resumeText) {
            alert(jd ? "Please upload your resume PDF" : "Please provide both Job Description and Resume");
            return;
        }
        setIsLoading(true);
        const result = await checkATSScore(jd, resumeText);
        setAnalysis(result);
        setIsLoading(false);
    };

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <div className="py-24 px-8 max-w-[1200px] mx-auto min-h-screen font-sans">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-[3.5rem] font-extrabold text-[#1a1a1a] tracking-tighter mb-4 max-[968px]:text-[2.5rem]">Optimize Your Resume for <span className="text-[#4361ee]">ATS Success</span></h1>
                    <p className="text-[1.125rem] text-[#666] max-w-[700px] mx-auto leading-relaxed">Beat the bots and land your dream job with our advanced AI-powered ATS checker. Match your skills to the job description perfectly.</p>
                </motion.div>

                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-2 gap-10 max-[968px]:grid-cols-1">
                        <div className="bg-white rounded-[20px] p-10 shadow-[0_0_45px_rgba(0,0,0,0.12)] border border-slate-300 flex flex-col gap-6">
                            <div className="flex items-center gap-3">
                                <FileText size={20} className="text-[#4361ee]" />
                                <h3 className="text-xl font-bold text-[#1a1a1a] m-0">Job Description</h3>
                            </div>
                            <textarea
                                className="w-full h-[300px] p-5 rounded-xl border border-slate-200 bg-slate-50 text-base leading-relaxed resize-none text-slate-700 transition-all duration-200 focus:outline-none focus:border-[#4361ee] focus:bg-white focus:ring-4 focus:ring-[#4361ee]/10"
                                placeholder="Paste the job description here to see how you stack up..."
                                value={jd}
                                onChange={(e) => setJd(e.target.value)}
                            />
                        </div>

                        <div className="bg-white rounded-[20px] p-10 shadow-[0_0_45px_rgba(0,0,0,0.12)] border border-slate-300 flex flex-col gap-6">
                            <div className="flex items-center gap-3">
                                <Upload size={20} className="text-[#4361ee]" />
                                <h3 className="text-xl font-bold text-[#1a1a1a] m-0">Upload Your Resume</h3>
                            </div>
                            <div
                                className={`w-full h-[300px] border-[1.5px] border-dashed rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 ${fileName ? 'border-[#4361ee] bg-blue-50/50' : 'border-slate-200 bg-slate-50 hover:border-[#4361ee] hover:bg-blue-50/50'} ${isParsing ? 'opacity-70' : ''}`}
                                onClick={() => !fileName && !isParsing && fileInputRef.current.click()}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    accept=".pdf"
                                    style={{ display: 'none' }}
                                />

                                <AnimatePresence mode="wait">
                                    {isParsing ? (
                                        <motion.div
                                            key="parsing"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col items-center text-center"
                                        >
                                            <Loader2 size={40} className="animate-spin text-[#4361ee]" />
                                            <p className="mt-4 text-slate-600">Extracting text from PDF...</p>
                                        </motion.div>
                                    ) : fileName ? (
                                        <motion.div
                                            key="file"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="flex flex-col items-center gap-4"
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <FileCheck size={40} className="text-emerald-500" />
                                                <span className="font-semibold text-[#1a1a1a]">{fileName}</span>
                                            </div>
                                            <button className="bg-red-100 text-red-500 border-none w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-red-200 hover:scale-110" onClick={(e) => { e.stopPropagation(); removeFile(); }}>
                                                <X size={20} />
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="empty"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col items-center text-center"
                                        >
                                            <div className="w-16 h-16 bg-blue-100/50 rounded-full flex items-center justify-center text-[#4361ee] mb-6">
                                                <Upload size={32} />
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <p className="text-[1.125rem] font-semibold text-[#1a1a1a] mb-1">Drag and drop your file here</p>
                                                <p className="text-[0.875rem] text-slate-500 mb-6">Supports PDF or DOCX (Max 5MB)</p>
                                                <button className="bg-white border border-slate-200 px-5 py-2.5 rounded-lg font-semibold text-[#4361ee] cursor-pointer transition-all duration-200 hover:bg-slate-50 hover:border-slate-300">Browse Files</button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleCheck}
                            className="bg-[#4361ee] text-white px-12 py-5 rounded-xl text-[1.125rem] font-semibold border-none cursor-pointer flex items-center gap-3 transition-all duration-300 shadow-[0_10px_25px_rgba(67,97,238,0.2)] hover:translate-y-[-2px] hover:shadow-[0_15px_30px_rgba(67,97,238,0.3)] hover:bg-[#3851d4] disabled:opacity-70 disabled:cursor-not-allowed group disabled:transform-none"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    Analyze Resume
                                    <span className="text-[1.25rem] transition-transform duration-300 group-hover:translate-x-1">→</span>
                                </>
                            )}
                        </button>
                    </div>

                    <AnimatePresence>
                        {analysis && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="mt-20 pt-20 border-t border-[#eef2f6]"
                            >
                                <div className="text-center mb-14">
                                    <h2 className="text-[2.5rem] font-extrabold text-[#1a1a1a] mb-2">Analysis Results</h2>
                                </div>

                                <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-10 items-stretch max-md:grid-cols-1">
                                    {/* Score Card */}
                                    <div className="bg-white rounded-3xl p-10 shadow-[0_0_45px_rgba(0,0,0,0.12)] border border-slate-200 transition-transform duration-300 flex flex-col items-center text-center gap-8 h-[550px] overflow-y-auto">
                                        <div className="relative w-40 h-40 flex items-center justify-center">
                                            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                                <circle cx="50" cy="50" r="45" className="fill-none stroke-slate-100 stroke-[8]" />
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="45"
                                                    className="fill-none stroke-[8] stroke-round transition-[stroke-dasharray] duration-1000 ease-out"
                                                    style={{
                                                        strokeDasharray: `${analysis.matchPercentage * 2.82}, 282`,
                                                        stroke: analysis.matchPercentage > 70 ? '#2563eb' :
                                                            analysis.matchPercentage > 40 ? '#f59e0b' : '#ef4444'
                                                    }}
                                                />
                                            </svg>
                                            <div className="absolute flex flex-col items-center">
                                                <span className="text-5xl font-extrabold text-[#1a1a1a] leading-none">{analysis.matchPercentage}</span>
                                                <span className="text-[0.75rem] font-bold text-slate-400 tracking-widest mt-1">SCORE</span>
                                            </div>
                                        </div>
                                        <div className="score-info">
                                            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">{analysis.matchLevel}</h3>
                                            <p className="text-slate-500 text-base leading-relaxed">{analysis.matchDescription}</p>
                                        </div>
                                    </div>

                                    {/* Keyword Match Card */}
                                    <div className="bg-white rounded-3xl p-10 shadow-[0_0_45px_rgba(0,0,0,0.12)] border border-slate-200 transition-transform duration-300 h-[550px] overflow-y-auto">
                                        <div className="flex items-center gap-3 mb-8 font-bold text-[1.2rem] text-[#1a1a1a]">
                                            <Key size={20} className="text-[#4361ee]" />
                                            <span>Keyword Match</span>
                                        </div>

                                        <div className="flex flex-col gap-8">
                                            <div className="flex flex-col">
                                                <label className="block text-[0.75rem] font-extrabold tracking-wider mb-4 text-emerald-500 uppercase">FOUND KEYWORDS ({analysis.foundKeywords?.length || 0})</label>
                                                <div className="flex flex-wrap gap-3">
                                                    {analysis.foundKeywords?.map((kw, i) => (
                                                        <span key={i} className="px-4 py-2 rounded-full text-[0.85rem] font-semibold bg-emerald-50 text-emerald-600">{kw}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex flex-col">
                                                <label className="block text-[0.75rem] font-extrabold tracking-wider mb-4 text-red-500 uppercase">MISSING KEYWORDS ({analysis.missingKeywords?.length || 0})</label>
                                                <div className="flex flex-wrap gap-3">
                                                    {analysis.missingKeywords?.map((kw, i) => (
                                                        <span key={i} className="px-4 py-2 rounded-full text-[0.85rem] font-semibold bg-red-50 text-red-600">{kw}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Tips Card */}
                                    <div className="bg-white rounded-3xl p-10 shadow-[0_0_45px_rgba(0,0,0,0.12)] border border-slate-200 transition-transform duration-300 h-[550px] overflow-y-auto">
                                        <div className="flex items-center gap-3 mb-8 font-bold text-[1.2rem] text-[#1a1a1a]">
                                            <Lightbulb size={20} className="text-[#4361ee]" />
                                            <span>Quick Tips</span>
                                        </div>

                                        <div className="flex flex-col gap-6 mb-10">
                                            {analysis.quickTips?.map((tip, i) => (
                                                <div key={i} className="flex gap-4 items-start">
                                                    {tip.type === 'success' ? <CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> :
                                                        tip.type === 'warning' ? <Lightbulb size={18} className="text-amber-500 shrink-0" /> :
                                                            <Lightbulb size={18} className="text-blue-500 shrink-0" />}
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
