import React, { useRef } from 'react';
import { motion, AnimatePresence, useInView, Variants } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { features } from '../constants/works.constants';
import { useWorksSlider } from '../hooks/useWorksSlider';

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Works: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
    const { expandedId, toggleExpand, currentLottie } = useWorksSlider(isInView);

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
                    key={expandedId}
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
