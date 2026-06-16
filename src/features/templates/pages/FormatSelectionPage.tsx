import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { formats } from '../constants/formats.constants';

const FormatSelection: React.FC = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = React.useState('All Templates');

    const filters = ['All Templates', 'Professional', 'Creative', 'Modern', 'Academic'];

    const filteredFormats = formats.filter(format =>
        activeFilter === 'All Templates' || format.category.toLowerCase() === activeFilter.toLowerCase()
    );

    const handleSelect = (formatId: string) => {
        navigate(`/builder?format=${formatId}`);
    };

    return (
        <div className="w-full min-h-screen bg-[#fafbfc]">
            <Navbar />
            {/* Hero Section */}
            <section className="w-full pt-[80px] pb-20 px-16 flex justify-center bg-white max-[1024px]:px-8 max-[1024px]:py-[50px]">
                <div className="max-w-[1200px] w-full flex items-center justify-between gap-16 max-[1024px]:flex-col max-[1024px]:text-center max-[1024px]:gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 max-w-[600px]"
                    >
                        <h1 className="text-[clamp(3rem,6vw,4.5rem)] font-[850] leading-[1.1] text-[#1a1a1a] tracking-tighter mb-8 max-md:text-[2.5rem]">
                            Select Your <br />
                            <span className="text-blue-600 inline-block">Professional</span> <br />
                            Resume
                        </h1>
                        <p className="text-[1.25rem] text-slate-600 leading-relaxed max-w-[500px] font-[450] max-[1024px]:mx-auto">
                            Choose a template meticulously crafted for success and tailored for
                            high-end career opportunities across global industries.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-1 flex justify-end max-[1024px]:hidden"
                    >
                        <div className="w-full max-w-[550px] rounded-3xl overflow-hidden shadow-2xl">
                            <img src="/hero-graphic.png" alt="Resume Premium Visual" fetchPriority="high" className="w-full h-auto block" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Template Grid Section */}
            <div className="max-w-[1200px] mx-auto py-10 px-8 pb-[100px]">
                <div className="flex justify-between items-center border-b border-[#eef2f6] mb-15 pb-1 max-md:flex-col max-md:items-start max-md:gap-5 max-md:mb-10">
                    <div className="flex gap-10 max-[1024px]:gap-5 max-md:w-full max-md:overflow-x-auto max-md:pb-2.5 max-md:gap-6">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                className={`bg-none border-none py-3 text-[1.05rem] font-semibold cursor-pointer relative transition-colors duration-300 ${activeFilter === filter ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                                {activeFilter === filter && <motion.div layoutId="activeTab" className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-blue-500 rounded-full" />}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-8 w-full max-[1024px]:grid-cols-2 max-md:grid-cols-1">
                    {filteredFormats.map((format, index) => (
                        <motion.div
                            key={format.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white rounded-[20px] p-4 cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-sm border border-slate-100 hover:-translate-y-2 hover:shadow-xl"
                            onClick={() => handleSelect(format.id)}
                        >
                            <div className="w-full aspect-[4/5] rounded-[14px] flex items-center justify-center overflow-hidden mb-6 p-10" style={{ backgroundColor: format.bgColor }}>
                                <img src={format.image} alt={format.title} loading="lazy" className="w-full h-full object-contain shadow-2xl transition-transform duration-500 group-hover:scale-105" />
                            </div>
                            <div className="px-2 pb-2">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-[1.4rem] font-bold text-slate-900 m-0">{format.title}</h3>
                                    <span className="text-[0.75rem] font-bold text-blue-600 bg-blue-50 px-[10px] py-1 rounded-md tracking-wider uppercase">{format.category}</span>
                                </div>
                                <p className="text-base text-slate-500 leading-relaxed m-0 font-[450]">{format.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default FormatSelection;
