import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Check } from 'lucide-react';

interface LoginFormProps {
    email: string;
    setEmail: (val: string) => void;
    password: string;
    setPassword: (val: string) => void;
    showPassword: boolean;
    setShowPassword: (val: boolean) => void;
    rememberMe: boolean;
    setRememberMe: (val: boolean) => void;
    isLoading: boolean;
    error: string | null;
    onSubmit: (e: React.FormEvent) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    rememberMe,
    setRememberMe,
    isLoading,
    error,
    onSubmit
}) => {
    return (
        <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-5"
        >
            {error && (
                <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-medium animate-fadeIn">
                    {error}
                </div>
            )}

            {/* Email Input */}
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">Email Address</label>
                <div className="relative group">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300">
                        <Mail size={18} />
                    </span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl text-sm font-normal text-slate-800 outline-none transition-all duration-300 focus:ring-4 focus:ring-blue-100"
                    />
                </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">Password</label>
                    <a href="#forgot" className="text-xs font-medium text-blue-600 hover:underline">Forgot password?</a>
                </div>
                <div className="relative group">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300">
                        <Lock size={18} />
                    </span>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-11 pr-10 py-3 bg-slate-50/50 border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl text-sm font-normal text-slate-800 outline-none transition-all duration-300 focus:ring-4 focus:ring-blue-100"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>

            {/* Keep Signed In */}
            <div className="flex items-center justify-between py-1">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                    <div className="relative flex items-center">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 ${rememberMe
                            ? 'bg-blue-600 border-blue-600 shadow-sm'
                            : 'bg-slate-50 border-slate-300 group-hover:border-slate-400'
                            }`}>
                            {rememberMe && <Check size={12} className="text-white stroke-[3px]" />}
                        </div>
                    </div>
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">Keep me signed in</span>
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed group relative overflow-hidden"
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    <>
                        <span>Sign In</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </>
                )}
            </button>
        </motion.form>
    );
};
