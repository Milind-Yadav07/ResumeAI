import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-[1000] bg-white/98 backdrop-blur-[10px] shadow-[0_4px_15px_rgba(0,0,0,0.15)] border-b border-black/10 transition-all duration-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center py-4 px-[5%] max-w-[1400px] mx-auto w-full">
                <Link to="/" className="flex items-center no-underline gap-3 transition-all duration-300 hover:scale-[1.02]">
                    <span className="font-heading text-[1.75rem] font-extrabold tracking-[-0.03em] text-slate-900 flex items-center">
                        Resume<span className="text-blue-500 pl-[2px] relative">AI</span>
                    </span>
                </Link>
                <div className="flex gap-10 items-center max-md:hidden">
                    <NavLink 
                        to="/select-format" 
                        className={({ isActive }) => 
                            `no-underline font-semibold transition-all duration-300 text-[1.05rem] relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:transition-[width,background-color] after:duration-300 after:rounded-[2px] ${
                                isActive 
                                ? 'text-blue-500 after:w-full after:bg-blue-500' 
                                : 'text-black hover:text-blue-500 after:w-0 hover:after:w-full after:bg-blue-500'
                            }`
                        }
                    >
                        Build Resume
                    </NavLink>
                    <NavLink 
                        to="/ats-checker" 
                        className={({ isActive }) => 
                            `no-underline font-semibold transition-all duration-300 text-[1.05rem] relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:transition-[width,background-color] after:duration-300 after:rounded-[2px] ${
                                isActive 
                                ? 'text-blue-500 after:w-full after:bg-blue-500' 
                                : 'text-black hover:text-blue-500 after:w-0 hover:after:w-full after:bg-blue-500'
                            }`
                        }
                    >
                        Check ATS Score
                    </NavLink>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
