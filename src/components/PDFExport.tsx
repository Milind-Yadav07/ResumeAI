import React from 'react';
import { Document } from '@react-pdf/renderer';
import { ResumeData } from '../types';
import RowLayout from '@features/templates/components/layouts/RowLayout';
import CreativeLayout from '@features/templates/components/layouts/CreativeLayout';
import CorporateLayout from '@features/templates/components/layouts/CorporateLayout';
import AnalystLayout from '@features/templates/components/layouts/AnalystLayout';
import ShowcaseLayout from '@features/templates/components/layouts/ShowcaseLayout';
import MinimalistLayout from '@features/templates/components/layouts/MinimalistLayout';

interface PDFExportProps {
    data: ResumeData;
    format: string;
}

const PDFExport: React.FC<PDFExportProps> = ({ data, format }) => {
    if (!data || !data.personalInfo) return null;

    const renderLayout = () => {
        switch (format) {
            case 'column2':
                return <CreativeLayout data={data} />;
            case 'corporate':
                return <CorporateLayout data={data} />;
            case 'analyst':
                return <AnalystLayout data={data} />;
            case 'showcase':
                return <ShowcaseLayout data={data} />;
            case 'minimalist':
                return <MinimalistLayout data={data} />;
            default:
                return <RowLayout data={data} />;
        }
    };

    return (
        <Document
            author={data.personalInfo.name || 'Resume'}
            title={`${data.personalInfo.name || 'User'} - Resume`}
        >
            {renderLayout()}
        </Document>
    );
};

export default PDFExport;
