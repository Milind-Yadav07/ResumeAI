import React from 'react';
import { Document } from '@react-pdf/renderer';
import RowLayout from './pdf/RowLayout';
import CreativeLayout from './pdf/CreativeLayout';
import CorporateLayout from './pdf/CorporateLayout';
import AnalystLayout from './pdf/AnalystLayout';
import ShowcaseLayout from './pdf/ShowcaseLayout';
import MinimalistLayout from './pdf/MinimalistLayout';

const PDFExport = ({ data, format }) => {
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
