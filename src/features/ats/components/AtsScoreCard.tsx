import React from 'react';

interface AtsScoreCardProps {
    matchPercentage: number;
    matchLevel: string;
    matchDescription: string;
}

export const AtsScoreCard: React.FC<AtsScoreCardProps> = ({
    matchPercentage,
    matchLevel,
    matchDescription
}) => {
    return (
        <div className="bg-white rounded-3xl p-10 shadow-[0_0_45px_rgba(0,0,0,0.12)] border border-slate-200 transition-transform duration-300 flex flex-col items-center text-center gap-8 h-[550px] overflow-y-auto">
            <div className="relative w-40 h-40 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="45" className="fill-none stroke-slate-100 stroke-[8]" />
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        className="fill-none stroke-[8] stroke-round transition-[stroke-dasharray] duration-1000 ease-out"
                        style={{
                            strokeDasharray: `${matchPercentage * 2.82}, 282`,
                            stroke: matchPercentage > 70 ? '#2563eb' :
                                matchPercentage > 40 ? '#f59e0b' : '#ef4444'
                        }}
                    />
                </svg>
                <div className="absolute flex flex-col items-center">
                    <span className="text-5xl font-extrabold text-[#1a1a1a] leading-none">{matchPercentage}</span>
                    <span className="text-[0.75rem] font-bold text-slate-400 tracking-widest mt-1">SCORE</span>
                </div>
            </div>
            <div className="score-info">
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">{matchLevel}</h3>
                <p className="text-slate-500 text-base leading-relaxed">{matchDescription}</p>
            </div>
        </div>
    );
};
