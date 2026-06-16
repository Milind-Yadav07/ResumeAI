import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const Navbar: React.FC = () => {
    const { isAuthenticated, logout, user } = useAuth();

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-[1000] bg-white/98 backdrop-blur-[10px] shadow-[0_4px_15px_rgba(0,0,0,0.15)] border-b border-black/10 transition-all duration-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center py-4 px-[5%] max-w-[1400px] mx-auto w-full relative">

                {/* Logo Section */}
                <Link to="/" className="flex items-center no-underline gap-3 transition-all duration-300 hover:scale-[1.02]">
                    <span className="font-heading text-[1.75rem] font-extrabold tracking-[-0.03em] text-slate-900 flex items-center">
                        Resume<span className="text-blue-500 pl-[2px] relative">AI</span>
                    </span>
                </Link>

                {/* Right Side Section: Links */}
                <div className="flex items-center gap-6 md:gap-8">

                    {/* Navigation Links */}
                    <div className="flex gap-8 items-center max-md:hidden">
                        <NavLink
                            to="/select-format"
                            className={({ isActive }) =>
                                `no-underline font-semibold transition-all duration-300 text-[1.02rem] relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:transition-[width,background-color] after:duration-300 after:rounded-[2px] ${isActive
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
                                `no-underline font-semibold transition-all duration-300 text-[1.02rem] relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:transition-[width,background-color] after:duration-300 after:rounded-[2px] ${isActive
                                    ? 'text-blue-500 after:w-full after:bg-blue-500'
                                    : 'text-black hover:text-blue-500 after:w-0 hover:after:w-full after:bg-blue-500'
                                }`
                            }
                        >
                            Check ATS Score
                        </NavLink>
                        <NavLink
                            to="/my-resumes"
                            className={({ isActive }) =>
                                `no-underline font-semibold transition-all duration-300 text-[1.02rem] relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:transition-[width,background-color] after:duration-300 after:rounded-[2px] ${isActive
                                    ? 'text-blue-500 after:w-full after:bg-blue-500'
                                    : 'text-black hover:text-blue-500 after:w-0 hover:after:w-full after:bg-blue-500'
                                }`
                            }
                        >
                            My Resume
                        </NavLink>
                    </div>

                    {/* Sign In CTA / Logout Button */}
                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-semibold text-slate-700 max-sm:hidden">
                                Hi, {user?.name}
                            </span>
                            <button
                                onClick={logout}
                                className="px-5 py-2.5 text-sm font-semibold rounded-full border border-slate-900 bg-slate-900 text-white hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-[0_2px_10px_rgba(15,23,42,0.1)] hover:shadow-[0_4px_15px_rgba(15,23,42,0.2)] cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="no-underline px-5 py-2.5 text-sm font-semibold rounded-full border border-slate-900 bg-slate-900 text-white hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-[0_2px_10px_rgba(15,23,42,0.1)] hover:shadow-[0_4px_15px_rgba(15,23,42,0.2)]"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
