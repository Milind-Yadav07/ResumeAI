import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { loginUser } from '@/services/authService';

export const useLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        setError('');
        setIsLoading(true);

        try {
            const user = await loginUser(email, password);
            login(user);
            setIsLoading(false);
            navigate('/');
        } catch (err) {
            setIsLoading(false);
            const errMsg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
            setError(errMsg);
        }

    };

    return {
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
        handleSubmit,
        navigate
    };
};
