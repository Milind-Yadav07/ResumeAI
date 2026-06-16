export interface FormatItem {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    bgColor: string;
}

export const formats: FormatItem[] = [
    {
        id: 'row',
        title: 'The Executive',
        category: 'PROFESSIONAL',
        description: 'Refined structure for leadership roles.',
        image: '/Resume/executive-resume.png',
        bgColor: '#f1f5f9', 
    },
    {
        id: 'column2',
        title: 'The Creative',
        category: 'CREATIVE',
        description: 'Unique layout for designers and artists.',
        image: '/Resume/creative-resume.png',
        bgColor: '#f8fafc', 
    },
    {
        id: 'minimalist',
        title: 'The Minimalist',
        category: 'MODERN',
        description: 'Clean and direct approach for tech roles.',
        image: '/Resume/minimalist-resume.png',
        bgColor: '#cbd5e1', 
    },
    {
        id: 'corporate',
        title: 'The Corporate',
        category: 'PROFESSIONAL',
        description: 'Trusted by Fortune 500 candidates.',
        image: '/Resume/corporate-resume.png',
        bgColor: '#dcd0c0', 
    },
    {
        id: 'analyst',
        title: 'The Analyst',
        category: 'ACADEMIC',
        description: 'Optimized for data-heavy career histories.',
        image: '/Resume/analyst-resume.png',
        bgColor: '#1b2a4a', 
    },
    {
        id: 'showcase',
        title: 'The Showcase',
        category: 'CREATIVE',
        description: 'Bold layouts for marketing professionals.',
        image: '/Resume/showcase-resume.png',
        bgColor: '#c4b5fd', 
    }
];
