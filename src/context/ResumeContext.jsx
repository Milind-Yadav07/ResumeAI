import React, { createContext, useState, useContext } from 'react';

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState({
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

    const updateSection = (section, data) => {
        setResumeData(prev => ({
            ...prev,
            [section]: data
        }));
    };

    return (
        <ResumeContext.Provider value={{ resumeData, updateSection }}>
            {children}
        </ResumeContext.Provider>
    );
};
