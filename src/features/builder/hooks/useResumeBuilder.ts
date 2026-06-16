import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useResume } from '@/context/ResumeContext';
import { useAuth } from '@/context/AuthContext';
import { getAISummary } from '@/services/aiService';
import { saveResume } from '@/services/resumeService';
import { usePDF, DocumentProps } from '@react-pdf/renderer';
import React from 'react';
import { SectionType, SectionData, UseResumeBuilderReturn } from '@/types';
import PDFExport from '@/components/PDFExport';
import toast from 'react-hot-toast';

// Named Constants
const PX_PER_MM = 3.7795275591;
const PAGE_HEIGHT_MM = 288;
const DEBOUNCE_DELAY_MS = 1000;
const HEIGHT_SUBTRACT_PX = 5;

export const useResumeBuilder = (): UseResumeBuilderReturn => {
    const [searchParams] = useSearchParams();
    const format = searchParams.get('format') || 'row';
    const { resumeData, updateSection } = useResume();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<string | null>('personal');
    const [isAiLoading, setIsAiLoading] = useState<string | boolean>(false);
    const isAiLoadingRef = useRef<string | boolean>(false);
    const [contentElement, setContentElement] = useState<HTMLDivElement | null>(null);
    const contentRef = useCallback((node: HTMLDivElement | null) => {
        setContentElement(node);
    }, []);
    const [numPages, setNumPages] = useState(1);

    // Keep state values in refs to make callbacks completely stable
    const resumeDataRef = useRef(resumeData);
    const formatRef = useRef(format);

    useEffect(() => {
        resumeDataRef.current = resumeData;
        formatRef.current = format;
    }, [resumeData, format]);

    // Dynamic page calculation for preview
    useEffect(() => {
        if (!contentElement) return;

        const updatePageCount = () => {
            const height = contentElement.offsetHeight;
            const heightMm = (height - HEIGHT_SUBTRACT_PX) / PX_PER_MM;

            let count = 1;
            if (heightMm > PAGE_HEIGHT_MM) {
                count = 1 + Math.ceil((heightMm - PAGE_HEIGHT_MM) / PAGE_HEIGHT_MM);
            }
            setNumPages(count);
        };

        const observer = new ResizeObserver(updatePageCount);
        observer.observe(contentElement);
        updatePageCount();
        return () => observer.disconnect();
    }, [contentElement]); // Removed resumeData and format to prevent observer recreation on every keystroke


    const [instance, updateInstance] = usePDF({
        document: React.createElement(PDFExport, { data: resumeData, format: format }) as unknown as React.ReactElement<DocumentProps>
    });

    // Debounced PDF instance update
    useEffect(() => {
        if (!resumeData) return;
        const timer = setTimeout(() => {
            updateInstance(React.createElement(PDFExport, { data: { ...resumeData }, format: format }) as unknown as React.ReactElement<DocumentProps>);
        }, DEBOUNCE_DELAY_MS);
        return () => clearTimeout(timer);
    }, [resumeData, format, updateInstance]);

    // Safe helper to get array section values from ref
    const getSectionArray = useCallback((section: SectionType): unknown[] => {
        const val = resumeDataRef.current[section];
        return Array.isArray(val) ? (val as unknown[]) : [];
    }, []);

    const handleInputChange = useCallback((section: SectionType, field: string, value: string) => {
        const current = resumeDataRef.current[section];
        updateSection(section, { ...(current as unknown as Record<string, unknown>), [field]: value } as unknown as SectionData);
    }, [updateSection]);

    const handleAddItem = useCallback((section: SectionType, emptyItem: unknown) => {
        updateSection(section, [...getSectionArray(section), emptyItem] as SectionData);
    }, [getSectionArray, updateSection]);

    const handleRemoveItem = useCallback((section: SectionType, index: number) => {
        const newList = [...getSectionArray(section)];
        newList.splice(index, 1);
        updateSection(section, newList as SectionData);
    }, [getSectionArray, updateSection]);

    const handleUpdateItem = useCallback((section: SectionType, index: number, field: string, value: string) => {
        const newList = [...getSectionArray(section)];
        newList[index] = { ...(newList[index] as Record<string, unknown>), [field]: value };
        updateSection(section, newList as SectionData);
    }, [getSectionArray, updateSection]);

    /**
     * Trigger a file download and save the resume to history.
     * Blob URLs are revoked after use to prevent memory leaks.
     */
    const handleDownload = useCallback(async () => {
        if (!instance.url) {
            toast.error('PDF is preparing... please wait a moment and try again.');
            return;
        }

        // 1. Trigger browser download
        const link = document.createElement('a');
        link.href = instance.url;
        link.setAttribute('download', `${resumeDataRef.current.personalInfo.name || 'resume'}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 2. Save to cloud history asynchronously
        try {
            const blobResponse = await fetch(instance.url);
            const blob = await blobResponse.blob();

            await new Promise<void>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = async () => {
                    try {
                        const base64Data = reader.result as string;
                        const resumeName = resumeDataRef.current.personalInfo.name || 'Untitled Resume';
                        const resumeTitle = resumeDataRef.current.personalInfo.summary
                            ? `${resumeDataRef.current.personalInfo.summary.slice(0, 60)}...`
                            : 'No summary provided';

                        await saveResume({
                            name: resumeName,
                            title: resumeTitle,
                            format: formatRef.current,
                            resumeData: resumeDataRef.current,
                            pdfData: base64Data,
                            userEmail: user?.email || 'guest',
                        });
                        toast.success('Resume saved to history!');
                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                };
                reader.onerror = () => reject(reader.error);
                reader.readAsDataURL(blob);
            });
        } catch {
            toast.error('Failed to save resume to cloud history.');
        }
    }, [instance.url, user]);

    /**
     * Generic AI enhancement factory.
     * Fetches text from a section/field, sends to AI, updates the resume data.
     * @param getText - returns the current text to enhance
     * @param updateText - receives the enhanced text and saves it to the resume
     * @param loadingKey - unique key to set on isAiLoading for per-item loading state
     */
    const createAIEnhancer = useCallback((
        getText: () => string | undefined,
        updateText: (improved: string) => void,
        loadingKey: string | boolean
    ) => async () => {
        if (isAiLoadingRef.current) return;
        const text = getText();
        if (!text) {
            toast.error('Please enter some text first for AI to improve.');
            return;
        }
        isAiLoadingRef.current = loadingKey;
        setIsAiLoading(loadingKey);
        try {
            const improved = await getAISummary(text);
            updateText(improved);
            toast.success('Enhanced successfully!');
        } catch {
            toast.error('Failed to enhance with AI. Please try again.');
        } finally {
            isAiLoadingRef.current = false;
            setIsAiLoading(false);
        }
    }, []);

    const handleAISummary = useCallback(async () => {
        await createAIEnhancer(
            () => resumeDataRef.current.personalInfo.summary,
            (improved) => handleInputChange('personalInfo', 'summary', improved),
            true
        )();
    }, [createAIEnhancer, handleInputChange]);

    const handleAIExperience = useCallback(async (index: number) => {
        await createAIEnhancer(
            () => resumeDataRef.current.experience[index]?.description,
            (improved) => handleUpdateItem('experience', index, 'description', improved),
            `exp-${index}`
        )();
    }, [createAIEnhancer, handleUpdateItem]);

    const handleAIProject = useCallback(async (index: number) => {
        await createAIEnhancer(
            () => resumeDataRef.current.projects[index]?.description,
            (improved) => handleUpdateItem('projects', index, 'description', improved),
            `proj-${index}`
        )();
    }, [createAIEnhancer, handleUpdateItem]);

    const handleAIAchievement = useCallback(async (index: number) => {
        await createAIEnhancer(
            () => resumeDataRef.current.achievements[index]?.description,
            (improved) => handleUpdateItem('achievements', index, 'description', improved),
            `ach-${index}`
        )();
    }, [createAIEnhancer, handleUpdateItem]);

    return {
        format,
        resumeData,
        updateSection,
        activeTab,
        setActiveTab,
        isAiLoading,
        contentRef,
        numPages,
        instance,
        handleDownload,
        handleAISummary,
        handleAIExperience,
        handleAIProject,
        handleAIAchievement,
        handleInputChange,
        handleAddItem,
        handleRemoveItem,
        handleUpdateItem
    };
};
