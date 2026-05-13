import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const features = [
    {
        id: 1,
        text: 'Pick a Resume template',
        description: 'Browse our collection of professionally designed templates. Whether you are applying for a creative role or a corporate position, choose a layout that best reflects your professional identity.',
        lottieUrl: 'https://lottie.host/6db25884-3143-421d-bd0c-a2eaead48b36/GrAWvF8ihH.lottie'
    },
    {
        id: 2,
        text: 'Fill in your details',
        description: 'Input your experience, education, and skills into our intuitive editor. Your data is processed in real-time, allowing you to see exactly how your information fits into your chosen design as you type.',
        lottieUrl: 'https://lottie.host/feb26fd0-278f-40dd-af7c-9d4c71e2a444/jHCwe93fRh.lottie'
    },
    {
        id: 3,
        text: 'Let AI write your content',
        description: "Stop worrying about the perfect phrasing. Use the AI to instantly polish your content, fix grammar, and professional achievements that grab recruiters attention.",
        lottieUrl: 'https://lottie.host/0d4884f6-e890-45e2-8cc6-f95ca3d37008/XZh2OPkN0x.lottie'
    },
    {
        id: 4,
        text: 'Check your resume with ATS scanner',
        description: "Upload your resume alongside a job description to see how you rank. Our AI-powered semantic analysis identifies missing keywords, evaluates your compatibility, and provides actionable suggestions to help you reach the interview stage.",
        lottieUrl: 'https://lottie.host/30cf1b82-45bd-4a7d-b724-5faaea3cc5d2/rQOgxjVZQT.lottie'
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Works = () => {
    const [expandedId, setExpandedId] = useState(1);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

    useEffect(() => {
        if (!isInView) return;

        const intervalTime = 5000; // 5 seconds
        
        const interval = setInterval(() => {
            setExpandedId((prevId) => (prevId % features.length) + 1);
        }, intervalTime);

        return () => clearInterval(interval);
    }, [expandedId, isInView]);

    const toggleExpand = (id) => {
        setExpandedId(id);
    };

    const currentLottie = features.find(f => f.id === expandedId)?.lottieUrl || features[0].lottieUrl;

    return (
        <section className="flex flex-col items-center w-full max-w-[1200px] mx-auto mt-[100px] pb-32 px-8 gap-16 max-[900px]:mt-[60px] max-[900px]:pb-20 max-[500px]:px-[1.2rem]" ref={sectionRef}>
            <div className="flex flex-col items-center text-center gap-6 max-w-[800px]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2 px-[18px] py-2 bg-white border border-[#2563eb]/20 rounded-full text-[#2563eb] text-sm font-bold shadow-sm"
                >
                    Simple Process
                </motion.div>

                <motion.h2
                    className="text-5xl font-extrabold text-[#0f172a] leading-[1.1] tracking-tight m-0 uppercase max-sm:text-3xl max-[500px]:text-[1.8rem]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    BUILD YOUR RESUME
                </motion.h2>

                <motion.p
                    className="text-[1.1rem] text-[#64748b] leading-relaxed max-w-[650px] m-0 max-[500px]:text-[0.95rem]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Our streamlined process helps you create a professional resume in minutes with intelligent AI powered features
                </motion.p>
            </div>

            <div className="flex items-center justify-center gap-24 w-full lg:gap-12 max-[900px]:flex-col max-[900px]:gap-12">
                {/* Left: Lottie Animation Side */}
                <motion.div
                    className="flex-1 flex items-center justify-center min-w-0"
                    key={expandedId} // Force remount for new animation
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-full max-w-[450px] h-[450px] flex items-center justify-center bg-transparent rounded-3xl relative overflow-visible max-[900px]:max-w-[300px] max-[900px]:h-[300px]">
                        <div className="absolute inset-[-10%] flex items-center justify-center z-[-1] pointer-events-none">
                            <img src="/cloud.svg" alt="" loading="lazy" className="w-full h-auto object-contain opacity-95 scale-[1.2]" />
                        </div>
                        <DotLottieReact
                            src={currentLottie}
                            loop
                            autoplay
                            className="!w-full !h-full z-[1]"
                        />
                    </div>
                </motion.div>

                {/* Right: Feature list */}
                <motion.div
                    className="flex-1 flex flex-col gap-0 min-w-0"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <ul className="list-none m-0 p-0 flex flex-col gap-[1.2rem]">
                        {features.map((feature) => (
                            <motion.li
                                key={feature.id}
                                className={`flex flex-col px-6 py-5 rounded-[18px] transition-all duration-300 cursor-pointer overflow-hidden ${expandedId === feature.id ? 'bg-[#dbeafe]' : 'bg-transparent hover:bg-slate-50 hover:translate-x-[6px]'}`}
                                variants={itemVariants}
                                onClick={() => toggleExpand(feature.id)}
                            >
                                <div className="flex items-center w-full">
                                    <span className="text-base font-extrabold text-[#1e293b] leading-[1.45]">{feature.text}</span>
                                </div>
                                <AnimatePresence>
                                    {expandedId === feature.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                            animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="w-full overflow-hidden"
                                        >
                                            <p className="text-[0.95rem] leading-relaxed font-medium m-0 pl-0.5">
                                                {feature.description}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>
    );
};

export default Works;
