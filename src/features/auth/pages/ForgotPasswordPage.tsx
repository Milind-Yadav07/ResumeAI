import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import {
    requestPasswordResetOtp,
    verifyPasswordResetOtp,
    resetPasswordWithOtp,
} from '@/services/authService';

type Step = 'email' | 'otp' | 'password';

const ForgotPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<Step>('email');
    const [email, setEmail] = useState('');
    const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [resendTimer, setResendTimer] = useState(0);

    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        if (resendTimer <= 0) return;
        const timer = setInterval(() => {
            setResendTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [resendTimer]);

    const otpCode = otpDigits.join('');

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) {
            setError('Please enter your email address.');
            return;
        }
        setError(null);
        setIsLoading(true);
        try {
            const msg = await requestPasswordResetOtp(email.trim());
            toast.success(msg);
            setStep('otp');
            setResendTimer(60);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send OTP.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (resendTimer > 0 || isLoading) return;
        setError(null);
        setIsLoading(true);
        try {
            const msg = await requestPasswordResetOtp(email.trim());
            toast.success(msg);
            setOtpDigits(['', '', '', '', '', '']);
            setResendTimer(60);
            inputRefs.current[0]?.focus();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to resend OTP.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        const digit = value.replace(/\D/g, '').slice(-1);
        const updated = [...otpDigits];
        updated[index] = digit;
        setOtpDigits(updated);

        if (digit && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (!pasted) return;
        const updated = ['', '', '', '', '', ''];
        for (let i = 0; i < pasted.length; i++) {
            updated[i] = pasted[i];
        }
        setOtpDigits(updated);
        const focusIndex = Math.min(pasted.length, 5);
        inputRefs.current[focusIndex]?.focus();
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otpCode.length !== 6) {
            setError('Please enter the complete 6-digit verification code.');
            return;
        }
        setError(null);
        setIsLoading(true);
        try {
            await verifyPasswordResetOtp(email.trim(), otpCode);
            toast.success('OTP verified! Please set your new password.');
            setStep('password');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Invalid verification code.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPassword || !confirmPassword) {
            setError('Please fill in both password fields.');
            return;
        }
        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setError(null);
        setIsLoading(true);
        try {
            const msg = await resetPasswordWithOtp(email.trim(), otpCode, newPassword);
            toast.success(msg);
            navigate('/login');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to reset password.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-screen bg-slate-50 flex overflow-hidden font-sans antialiased text-slate-800">
            <div className="w-full lg:w-[45%] xl:w-[40%] min-h-screen bg-white flex flex-col justify-center px-8 sm:px-16 lg:px-12 xl:px-16 py-12 relative z-10 shadow-2xl shadow-slate-200/50">
                <div className="w-full max-w-md mx-auto">
                    <div className="mb-8 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="text-3xl font-bold tracking-tight text-slate-900 mb-2 font-heading"
                        >
                            {step === 'email' && 'Forgot Password?'}
                            {step === 'otp' && 'Verify Your Email'}
                            {step === 'password' && 'Set New Password'}
                        </motion.h2>
                        <p className="text-slate-500 text-sm">
                            {step === 'email' &&
                                'Enter your registered email and we will send you a 6-digit verification code.'}
                            {step === 'otp' && (
                                <>
                                    We sent a 6-digit code to{' '}
                                    <span className="font-semibold text-slate-700">{email}</span>
                                </>
                            )}
                            {step === 'password' &&
                                'Create a strong new password for your ResumeAI account.'}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-5 p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-medium animate-fadeIn">
                            {error}
                        </div>
                    )}

                    {/* STEP 1: Enter Email */}
                    {step === 'email' && (
                        <motion.form
                            onSubmit={handleSendOtp}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-5"
                        >
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300">
                                        <Mail size={18} />
                                    </span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@company.com"
                                        required
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl text-sm font-normal text-slate-800 outline-none transition-all duration-300 focus:ring-4 focus:ring-blue-100"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed group"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Send 6-Digit OTP</span>
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                                            →
                                        </span>
                                    </>
                                )}
                            </button>
                        </motion.form>
                    )}

                    {/* STEP 2: Enter 6-Digit OTP */}
                    {step === 'otp' && (
                        <motion.form
                            onSubmit={handleVerifyOtp}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase block text-center">
                                    Enter 6-Digit Verification Code
                                </label>
                                <div className="flex items-center justify-between gap-2 sm:gap-3 pt-1">
                                    {otpDigits.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => {
                                                inputRefs.current[index] = el;
                                            }}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                            onPaste={handleOtpPaste}
                                            className="w-12 h-14 sm:w-13 sm:h-14 text-center text-xl font-bold text-slate-900 bg-slate-50/70 border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all duration-200 focus:ring-4 focus:ring-blue-100"
                                        />
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || otpCode.length !== 6}
                                className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed group"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Verify Code</span>
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                                            →
                                        </span>
                                    </>
                                )}
                            </button>

                            <div className="flex items-center justify-center text-xs text-slate-500 pt-1">
                                <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    disabled={resendTimer > 0 || isLoading}
                                    className="inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:underline disabled:text-slate-400 disabled:no-underline cursor-pointer disabled:cursor-not-allowed"
                                >
                                    <RefreshCw size={13} />
                                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                                </button>
                            </div>
                        </motion.form>
                    )}

                    {/* STEP 3: Enter New Password */}
                    {step === 'password' && (
                        <motion.form
                            onSubmit={handleResetPassword}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
                                    New Password
                                </label>
                                <div className="relative group">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300">
                                        <Lock size={18} />
                                    </span>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="At least 8 characters"
                                        required
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

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
                                    Confirm New Password
                                </label>
                                <div className="relative group">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300">
                                        <Lock size={18} />
                                    </span>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Re-enter new password"
                                        required
                                        className="w-full pl-11 pr-10 py-3 bg-slate-50/50 border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl text-sm font-normal text-slate-800 outline-none transition-all duration-300 focus:ring-4 focus:ring-blue-100"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed group"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Reset Password</span>
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                                            →
                                        </span>
                                    </>
                                )}
                            </button>
                        </motion.form>
                    )}

                    <div className="mt-8 text-center">
                        <p className="text-slate-500 text-sm">
                            Remembered your password?{' '}
                            <Link to="/login" className="font-semibold text-blue-600 hover:underline">
                                Back to Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <div className="hidden lg:block lg:w-[55%] xl:w-[60%] h-screen relative bg-slate-900 overflow-hidden">
                <motion.div
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                >
                    <img
                        src="/AccountPage-image.jpg"
                        alt="ResumeAI Dashboard Preview"
                        className="w-full h-full object-cover opacity-90 object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-slate-900/40 to-transparent" />
                </motion.div>
                <div className="absolute bottom-16 left-16 right-16 z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 max-w-xl text-left"
                    >
                        <div className="flex items-center gap-2 mb-3.5">
                            <span className="text-xs font-semibold text-white/90 uppercase tracking-widest">
                                Designed by ResumeAI
                            </span>
                        </div>
                        <p className="text-white text-xl font-medium leading-relaxed font-heading">
                            "The easiest and most professional way to build an ATS-compatible resume. Tailored suggestions make a huge difference."
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
