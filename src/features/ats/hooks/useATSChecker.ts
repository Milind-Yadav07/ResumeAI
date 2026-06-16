import { useState, useRef, useCallback } from 'react';
import { checkATSScore } from '@/services/aiService';
import { ATSAnalysisResult, UseATSCheckerReturn } from '@/types';
import { extractTextFromPDF } from '@/utils/pdfParser';
import toast from 'react-hot-toast';

export const useATSChecker = (): UseATSCheckerReturn => {
    const [jd, setJd] = useState('');
    const [resumeText, setResumeText] = useState('');
    const [fileName, setFileName] = useState('');
    const [analysis, setAnalysis] = useState<ATSAnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isParsing, setIsParsing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isLoadingRef = useRef(false);

    const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            toast.error("Please upload a PDF file");
            return;
        }

        setFileName(file.name);
        setIsParsing(true);
        try {
            const text = await extractTextFromPDF(file);
            setResumeText(text);
            toast.success("PDF parsed successfully!");
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : "An error occurred while parsing the PDF.";
            toast.error(errMsg);
            setFileName('');
        } finally {
            setIsParsing(false);
        }
    }, []);

    const removeFile = useCallback(() => {
        setFileName('');
        setResumeText('');
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
