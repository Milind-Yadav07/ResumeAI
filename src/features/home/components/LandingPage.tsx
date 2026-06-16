import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { FileText, SearchCheck, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Works from './Works';
import Designs from './Designs';
import Footer from './Footer';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center w-full min-h-screen relative overflow-x-hidden">
            <Navbar />

            <div className="absolute top-0 left-0 w-full h-screen z-0 overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                >
                    <source src="/landingPage.mp4" type="video/mp4" />
                </video>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/40 to-white/80 z-[1]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full min-h-[90vh] flex flex-col justify-center items-center py-20 px-8 relative z-[2] text-center"
            >
                <div className="max-w-[900px] flex flex-col items-center gap-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-[#2563eb]/20 rounded-full text-[#2563eb] text-sm font-semibold"
                    >
                        <Sparkles size={16} className="text-[#2563eb]" />
                        <span>AI-Powered Career Evolution</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold leading-[1.05] tracking-tighter text-[#0f172a] m-0">
                        Build Your <span className="text-[#2563eb] inline-block">Professional</span> Future
                    </h1>

                    <h2 className="text-xl text-[#64748b] max-w-[800px] mx-auto leading-relaxed font-normal">
                        Create ATS-optimized resumes and check their compatibility with your dream job in seconds using advanced AI assistance.
                    </h2>

                    <div className="flex gap-5 justify-center flex-wrap mt-4 max-md:flex-col max-md:w-full max-md:max-w-[320px]">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="max-md:w-full">
                            <Button
                                variant="primary"
                                className="py-3.5 px-8 text-lg font-semibold rounded-xl transition-all duration-300 bg-[#2563eb] text-white shadow-[#2563eb]/30 shadow-lg hover:shadow-xl max-md:w-full"
                                onClick={() => navigate('/select-format')}
                                icon={FileText}
                            >
                                Build Resume
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="max-md:w-full">
                            <Button
                                variant="secondary"
                                className="py-3.5 px-8 text-lg font-semibold rounded-xl transition-all duration-300 bg-white text-[#0f172a] border-2 border-[#2563eb] shadow-sm max-md:w-full"
                                onClick={() => navigate('/ats-checker')}
                                icon={SearchCheck}
                            >
                                Check ATS Score
                            </Button>
                        </motion.div>
                    </div>

                    <div className="flex items-center gap-12 mt-2 px-12 py-6 bg-white border border-[#f1f5f9] rounded-[20px] shadow-sm max-md:flex-col max-md:gap-6 max-md:px-6 max-md:w-full max-md:max-w-[300px]">
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-xl font-bold text-[#0f172a]">100%</span>
                            <span className="text-[0.75rem] font-medium text-[#64748b] uppercase tracking-wider">ATS Friendly</span>
                        </div>
                        <div className="w-[1px] h-[30px] bg-[#e2e8f0] max-md:w-3/5 max-md:h-[1px]"></div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-xl font-bold text-[#0f172a]">AI</span>
                            <span className="text-[0.75rem] font-medium text-[#64748b] uppercase tracking-wider">Optimized Content</span>
                        </div>
                        <div className="w-[1px] h-[30px] bg-[#e2e8f0] max-md:w-3/5 max-md:h-[1px]"></div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-xl font-bold text-[#0f172a]">Fast</span>
                            <span className="text-[0.75rem] font-medium text-[#64748b] uppercase tracking-wider">Instant Scanning</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            <Works />
            <Designs />
            <Footer />
        </div>
    );
};

export default LandingPage;
