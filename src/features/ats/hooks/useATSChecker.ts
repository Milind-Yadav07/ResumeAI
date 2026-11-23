import { useState, useRef, useCallback, useEffect } from 'react';
import { checkATSScore } from '@/services/aiService';
import { ATSAnalysisResult, UseATSCheckerReturn } from '@/types';
import { extractTextFromPDF } from '@/utils/pdfParser';
import toast from 'react-hot-toast';

export const ATS_SESSION_STORAGE_KEY = 'resumeai_ats_session';

interface StoredATSSession {
    jd: string;
    resumeText: string;
    fileName: string;
    analysis: ATSAnalysisResult | null;
}

const loadATSSession = (): StoredATSSession => {
    try {
        const raw = sessionStorage.getItem(ATS_SESSION_STORAGE_KEY);
        if (!raw) {
            return { jd: '', resumeText: '', fileName: '', analysis: null };
        }
        const parsed = JSON.parse(raw) as Partial<StoredATSSession>;
        return {
            jd: typeof parsed.jd === 'string' ? parsed.jd : '',
            resumeText: typeof parsed.resumeText === 'string' ? parsed.resumeText : '',
            fileName: typeof parsed.fileName === 'string' ? parsed.fileName : '',
            analysis: parsed.analysis ?? null,
        };
    } catch {
        return { jd: '', resumeText: '', fileName: '', analysis: null };
    }
};

export const useATSChecker = (): UseATSCheckerReturn => {
    const initialSession = useRef<StoredATSSession | null>(null);
    if (!initialSession.current) {
        initialSession.current = loadATSSession();
    }

    const [jd, setJd] = useState(initialSession.current.jd);
    const [resumeText, setResumeText] = useState(initialSession.current.resumeText);
    const [fileName, setFileName] = useState(initialSession.current.fileName);
    const [analysis, setAnalysis] = useState<ATSAnalysisResult | null>(initialSession.current.analysis);
    const [isLoading, setIsLoading] = useState(false);
    const [isParsing, setIsParsing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isLoadingRef = useRef(false);

    useEffect(() => {
        try {
            const payload: StoredATSSession = { jd, resumeText, fileName, analysis };
            sessionStorage.setItem(ATS_SESSION_STORAGE_KEY, JSON.stringify(payload));
        } catch {
            // Ignore storage quota or private-mode errors
        }
    }, [jd, resumeText, fileName, analysis]);

    const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            toast.error("Please upload a PDF file");
            return;
        }

        setFileName(file.name);
        setAnalysis(null);
        setIsParsing(true);
        try {
            const text = await extractTextFromPDF(file);
            setResumeText(text);
            toast.success("PDF parsed successfully!");
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : "An error occurred while parsing the PDF.";
            toast.error(errMsg);
            setFileName('');
            setResumeText('');
        } finally {
            setIsParsing(false);
        }
    }, []);

    const removeFile = useCallback(() => {
        setFileName('');
        setResumeText('');
        setAnalysis(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    }, []);

    const handleCheck = useCallback(async () => {
        if (isLoadingRef.current) return;
        if (!jd || !resumeText) {
            toast.error(jd ? "Please upload your resume PDF" : "Please provide both Job Description and Resume");
            return;
        }
        isLoadingRef.current = true;
        setIsLoading(true);
        try {
            const result = await checkATSScore(jd, resumeText);
            setAnalysis(result);
            toast.success("ATS check completed!");
        } catch {
            toast.error("Failed to run ATS checker. Please try again.");
        } finally {
            isLoadingRef.current = false;
            setIsLoading(false);
        }
    }, [jd, resumeText]);


    return {
        jd,
        setJd,
        fileName,
        analysis,
        isLoading,
        isParsing,
        fileInputRef,
        handleFileUpload,
        removeFile,
        handleCheck
    };
};
