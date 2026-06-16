import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Linkedin, Github, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
    const navigate = useNavigate();

    return (
        <footer className="w-full bg-[#dbeafe] text-[#0f172a] py-20 pb-10 font-sans border-t border-[rgba(15,23,42,0.05)]">
            <div className="max-w-[1400px] mx-auto px-[60px] max-sm:px-[25px]">
                <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr] gap-[60px] mb-20 max-lg:grid-cols-2 max-lg:gap-10 max-sm:grid-cols-1">
                    {/* Brand Column */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-[25px]">
                            <h2 className="text-2xl font-bold tracking-tight m-0 text-[#1e293b]">Resume<span className="text-[#2563eb]">AI</span></h2>
                        </div>
                        <p className="text-[#475569] leading-[1.7] text-[0.95rem] max-w-[320px]">
                            Empowering students and early-career professionals to land their dream jobs through cutting-edge, AI-driven resume optimization and personal branding.
                        </p>
                    </div>

                    {/* Navigation Column */}
                    <div className="flex flex-col">
                        <h3 className="text-[0.85rem] font-extrabold text-[#1e293b] tracking-[0.1em] mb-[30px] uppercase">NAVIGATION</h3>
                        <ul className="list-none p-0 m-0">
                            <li className="text-[#475569] mb-[15px] text-base cursor-pointer transition-colors duration-200 hover:text-[#2563eb]" onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</li>
                            <li className="text-[#475569] mb-[15px] text-base cursor-pointer transition-colors duration-200 hover:text-[#2563eb]" onClick={() => { navigate('/select-format'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Templates</li>
                            <li className="text-[#475569] mb-[15px] text-base cursor-pointer transition-colors duration-200 hover:text-[#2563eb]" onClick={() => { navigate('/builder'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Resume Builder</li>
                            <li className="text-[#475569] mb-[15px] text-base cursor-pointer transition-colors duration-200 hover:text-[#2563eb]" onClick={() => { navigate('/ats-checker'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>ATS Checker</li>
                        </ul>
                    </div>

                    {/* Connect Column */}
                    <div className="flex flex-col">
                        <h3 className="text-[0.85rem] font-extrabold text-[#1e293b] tracking-[0.1em] mb-[30px] uppercase">CONNECT</h3>
                        <div className="flex gap-[15px]">
                            <a href="https://www.linkedin.com/in/milind-yadav-a89157326" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-[rgba(37,99,235,0.1)] rounded-full flex items-center justify-center text-black transition-all duration-300 hover:bg-[#2563eb] hover:text-white hover:-translate-y-[3px]">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://github.com/Milind-Yadav07" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-[rgba(37,99,235,0.1)] rounded-full flex items-center justify-center text-black transition-all duration-300 hover:bg-[#2563eb] hover:text-white hover:-translate-y-[3px]">
                                <Github size={20} />
                            </a>
                            <a href="https://www.instagram.com/milind_yadav07/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-[rgba(37,99,235,0.1)] rounded-full flex items-center justify-center text-black transition-all duration-300 hover:bg-[#2563eb] hover:text-white hover:-translate-y-[3px]">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Get Started Column */}
                    <div className="flex flex-col">
                        <h3 className="text-[0.85rem] font-extrabold text-[#1e293b] tracking-[0.1em] mb-[30px] uppercase">GET STARTED</h3>
                        <p className="text-[#475569] mb-[25px] text-base">Ready to boost your career?</p>
                        <div className="flex flex-col gap-3 items-start">
                            <button className="border-none py-3 px-6 rounded-lg text-[0.9rem] font-semibold cursor-pointer transition-all duration-250 text-center w-fit min-w-[160px] bg-[#2563eb] text-white shadow-[0_8px_16px_rgba(37,99,235,0.2)] hover:bg-[#1d4ed8] hover:-translate-y-[2px] hover:shadow-[0_10px_20px_rgba(37,99,235,0.3)]" onClick={() => { navigate('/select-format'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                Build Resume
                            </button>
                            <button className="border-none py-3 px-6 rounded-lg text-[0.9rem] font-semibold cursor-pointer transition-all duration-250 text-center w-fit min-w-[160px] bg-white text-[#2563eb] border border-[#2563eb] hover:bg-[rgba(37,99,235,0.1)] hover:border-[#3b82f6] hover:-translate-y-[2px]" onClick={() => { navigate('/ats-checker'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                Check ATS Score
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-[rgba(15,23,42,0.1)] flex justify-center items-center text-center max-sm:flex-col max-sm:gap-5">
                    <p className="text-[#64748b] text-[0.9rem]">
                        © 2026 ResumeAI. Empowering careers through intelligent analysis.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
