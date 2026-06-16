import React from 'react';
import { Key } from 'lucide-react';

interface KeywordListProps {
    foundKeywords: string[];
    missingKeywords: string[];
}

export const KeywordList: React.FC<KeywordListProps> = ({
    foundKeywords,
    missingKeywords
}) => {
    return (
        <div className="bg-white rounded-3xl p-10 shadow-[0_0_45px_rgba(0,0,0,0.12)] border border-slate-200 transition-transform duration-300 h-[550px] overflow-y-auto">
            <div className="flex items-center gap-3 mb-8 font-bold text-[1.2rem] text-[#1a1a1a]">
                <Key size={20} className="text-[#4361ee]" />
                <span>Keyword Match</span>
            </div>

            <div className="flex flex-col gap-8">
                <div className="flex flex-col">
                    <label className="block text-[0.75rem] font-extrabold tracking-wider mb-4 text-emerald-500 uppercase">FOUND KEYWORDS ({foundKeywords?.length || 0})</label>
                    <div className="flex flex-wrap gap-3">
                        {foundKeywords?.map((kw, i) => (
                            <span key={i} className="px-4 py-2 rounded-full text-[0.85rem] font-semibold bg-emerald-50 text-emerald-600">{kw}</span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="block text-[0.75rem] font-extrabold tracking-wider mb-4 text-red-500 uppercase">MISSING KEYWORDS ({missingKeywords?.length || 0})</label>
                    <div className="flex flex-wrap gap-3">
                        {missingKeywords?.map((kw, i) => (
                            <span key={i} className="px-4 py-2 rounded-full text-[0.85rem] font-semibold bg-red-50 text-red-600">{kw}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
