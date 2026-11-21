import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { googleAuthUser } from '@/services/authService';
import { GOOGLE_CLIENT_ID } from '@/config';

interface GoogleTokenResponse {
    access_token?: string;
    error?: string;
    error_description?: string;
}

interface GoogleTokenClient {
    requestAccessToken: (overrideConfig?: { prompt?: string }) => void;
}

declare global {
    interface Window {
        google?: {
            accounts?: {
                oauth2?: {
                    initTokenClient: (config: {
                        client_id: string;
                        scope: string;
                        callback: (response: GoogleTokenResponse) => void;
                        error_callback?: (err: { message?: string }) => void;
                    }) => GoogleTokenClient;
                };
            };
        };
    }
}

interface GoogleAuthButtonProps {
    disabled?: boolean;
    onError?: (message: string) => void;
}

const GSI_SCRIPT_ID = 'google-identity-services-script';

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ disabled = false, onError }) => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isScriptReady, setIsScriptReady] = useState(
        typeof window !== 'undefined' && !!window.google?.accounts?.oauth2
    );

    useEffect(() => {
        if (window.google?.accounts?.oauth2) {
            setIsScriptReady(true);
            return;
        }

        let script = document.getElementById(GSI_SCRIPT_ID) as HTMLScriptElement | null;
        const handleLoad = () => setIsScriptReady(true);

        if (!script) {
            script = document.createElement('script');
            script.id = GSI_SCRIPT_ID;
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            script.addEventListener('load', handleLoad);
            document.head.appendChild(script);
        } else {
            script.addEventListener('load', handleLoad);
        }

        return () => {
            script?.removeEventListener('load', handleLoad);
        };
    }, []);

    const handleGoogleClick = () => {
        if (!window.google?.accounts?.oauth2) {
            onError?.('Google Sign-In is still loading. Please try again in a moment.');
            return;
        }

        setIsGoogleLoading(true);

        const tokenClient = window.google.accounts.oauth2.initTokenClient({
            client_id: GOOGLE_CLIENT_ID,
            scope: 'openid email profile',
            callback: async (response: GoogleTokenResponse) => {
                if (response.error || !response.access_token) {
                    setIsGoogleLoading(false);
                    if (response.error && response.error !== 'access_denied') {
                        onError?.(response.error_description || 'Google Sign-In was cancelled.');
                    }
                    return;
                }

                try {
                    const user = await googleAuthUser(response.access_token);
                    login(user);
                    setIsGoogleLoading(false);
                    navigate('/');
                } catch (err) {
                    setIsGoogleLoading(false);
                    const msg = err instanceof Error ? err.message : 'Google Sign-In failed. Please try again.';
                    onError?.(msg);
                }
            },
            error_callback: () => {
                setIsGoogleLoading(false);
            }
        });

        tokenClient.requestAccessToken({ prompt: 'select_account' });
    };

    return (
        <div className="space-y-4 pt-1">
            <div className="relative flex items-center justify-center">
                <div className="w-full border-t border-slate-200" />
                <span className="bg-white px-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    or
                </span>
                <div className="w-full border-t border-slate-200" />
            </div>

            <button
                type="button"
                onClick={handleGoogleClick}
                disabled={disabled || isGoogleLoading || !isScriptReady}
                className="w-full py-3.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl text-sm font-semibold shadow-sm hover:shadow transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isGoogleLoading ? (
                    <div className="w-5 h-5 border-2 border-slate-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                    <>
                        <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        <span>Continue with Google</span>
                    </>
                )}
            </button>
        </div>
    );
};
