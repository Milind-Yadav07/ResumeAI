/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
import { ResumeData, ResumeContextType, SectionType, SectionData } from '../types';

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};

const addIdsToResumeData = (data: ResumeData): ResumeData => {
    return {
        ...data,
        experience: (data.experience || []).map(item => ({ id: item.id || crypto.randomUUID(), ...item })),
        education: (data.education || []).map(item => ({ id: item.id || crypto.randomUUID(), ...item })),
        projects: (data.projects || []).map(item => ({ id: item.id || crypto.randomUUID(), ...item })),
        achievements: (data.achievements || []).map(item => ({ id: item.id || crypto.randomUUID(), ...item })),
    };
};

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [resumeData, setResumeDataInternal] = useState<ResumeData>({
        personalInfo: {
            name: '',
            email: '',
            phone: '',
            location: '',
            links: '',
            summary: '',
            photo: ''
        },
        skills: [],
        experience: [],
        education: [],
        projects: [],
        achievements: [],
        certifications: []
    });

    const setResumeData = useCallback((value: React.SetStateAction<ResumeData>) => {
        setResumeDataInternal(prev => {
            const next = typeof value === 'function' ? (value as (prev: ResumeData) => ResumeData)(prev) : value;
            return addIdsToResumeData(next);
        });
    }, []);

    const updateSection = useCallback((section: SectionType, data: SectionData) => {
        setResumeDataInternal(prev => {
            let sectionData = data;
            if (Array.isArray(data) && ['experience', 'education', 'projects', 'achievements'].includes(section)) {
                sectionData = (data as unknown as Array<{ id?: string } & Record<string, unknown>>).map(item => ({
                    id: item.id || crypto.randomUUID(),
                    ...item
                })) as SectionData;
            }
            return {
                ...prev,
                [section]: sectionData
            };
        });
    }, []);

    const contextValue = useMemo(() => ({
        resumeData,
        updateSection,
        setResumeData
    }), [resumeData, updateSection, setResumeData]);

    return (
        <ResumeContext.Provider value={contextValue}>
            {children}
        </ResumeContext.Provider>
    );
};

