import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import Button from '@/components/Button';
import ExecutiveTemplate from '@/features/templates/components/ExecutiveTemplate';
import MinimalistTemplate from '@/features/templates/components/MinimalistTemplate';
import CreativeTemplate from '@/features/templates/components/CreativeTemplate';
import CorporateTemplate from '@/features/templates/components/CorporateTemplate';
import AnalystTemplate from '@/features/templates/components/AnalystTemplate';
import ShowcaseTemplate from '@/features/templates/components/ShowcaseTemplate';
import { useResumeBuilder } from '../hooks/useResumeBuilder';
import { ResumeFormSection, ResumePreviewSection } from '../components';

const ResumeBuilder: React.FC = () => {
    const builderState = useResumeBuilder();
    const { format, resumeData, instance, handleDownload, contentRef, numPages } = builderState;

    const renderedTemplate = useMemo(() => {
        if (format === 'minimalist') return <MinimalistTemplate data={resumeData} />;
        if (format === 'column2') return <CreativeTemplate data={resumeData} />;
        if (format === 'corporate') return <CorporateTemplate data={resumeData} />;
        if (format === 'analyst') return <AnalystTemplate data={resumeData} />;
        if (format === 'showcase') return <ShowcaseTemplate data={resumeData} />;
        return <ExecutiveTemplate data={resumeData} />;
    }, [format, resumeData]);

    return (
        <div className="h-screen flex flex-col">
            <header className="h-[72px] bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-[100] sticky top-0">
                <div className="flex items-center">
                    <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-bold text-slate-900 tracking-tight">
                        Build your resume with <span className="text-blue-500"> AI</span>
                    </motion.h1>
                </div>
                <div className="flex items-center">
                    <Button onClick={handleDownload} icon={Download} variant="primary" className="!bg-blue-600 !text-white" disabled={instance.loading}>
                        Download
                    </Button>
                </div>
            </header>

            <main className="flex-1 grid grid-cols-[500px_1fr] overflow-hidden bg-slate-50 p-6 gap-6 min-h-0">
                <ResumeFormSection {...builderState} />
                <ResumePreviewSection contentRef={contentRef} format={format} numPages={numPages}>
                    {renderedTemplate}
                </ResumePreviewSection>
            </main>
        </div>
    );
};

export default ResumeBuilder;
