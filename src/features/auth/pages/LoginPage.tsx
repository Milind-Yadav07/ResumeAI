import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLogin } from '../hooks/useLogin';
import { LoginForm } from '../components';

const LoginPage: React.FC = () => {
    const loginState = useLogin();
    const { handleSubmit, navigate } = loginState;

    return (
        <div className="min-h-screen w-screen bg-slate-50 flex overflow-hidden font-sans antialiased text-slate-800">
            <motion.button
                onClick={() => navigate('/')}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 shadow-sm transition-all hover:shadow-md cursor-pointer"
            >
                <ArrowLeft size={16} />
                <span>Back to Home</span>
            </motion.button>

            <div className="w-full lg:w-[45%] xl:w-[40%] min-h-screen bg-white flex flex-col justify-center px-8 sm:px-16 lg:px-12 xl:px-16 py-12 relative z-10 shadow-2xl shadow-slate-200/50">
                <div className="w-full max-w-md mx-auto">
                    <div className="mb-10 text-left">
                        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-3xl text-center font-bold tracking-tight text-slate-900 mb-2 font-heading">
                            Welcome back
                        </motion.h2>
                    </div>

                    <LoginForm {...loginState} onSubmit={handleSubmit} />

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-10 text-center">
                        <p className="text-slate-500 text-sm">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
                                Sign up for free
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="hidden lg:block lg:w-[55%] xl:w-[60%] h-screen relative bg-slate-900 overflow-hidden">
                <motion.div initial={{ scale: 1.05, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0">
                    <img src="/AccountPage-image.jpg" alt="ResumeAI Dashboard Preview" className="w-full h-full object-cover opacity-90 object-center" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-slate-900/40 to-transparent"></div>
                </motion.div>
                <div className="absolute bottom-16 left-16 right-16 z-20">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 max-w-xl text-left">
                        <div className="flex items-center gap-2 mb-3.5"><span className="text-xs font-semibold text-white/90 uppercase tracking-widest">Designed by ResumeAI</span></div>
                        <p className="text-white text-xl font-medium leading-relaxed font-heading">"The easiest and most professional way to build an ATS-compatible resume. Tailored suggestions make a huge difference."</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
