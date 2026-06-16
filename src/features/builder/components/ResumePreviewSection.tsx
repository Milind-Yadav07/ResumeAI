import React from 'react';

interface ResumePreviewSectionProps {
    contentRef: React.Ref<HTMLDivElement>;
    format: string;
    numPages: number;
    children: React.ReactNode;
}

export const ResumePreviewSection: React.FC<ResumePreviewSectionProps> = ({
    contentRef,
    format,
    numPages,
    children
}) => {
    return (
        <div className="overflow-y-auto p-10 flex justify-center">
            {/* Hidden measurer to calculate total height of the content */}
            <div style={{ position: 'absolute', top: '-10000px', width: '210mm', left: '-10000px', pointerEvents: 'none', visibility: 'hidden' }}>
                <div ref={contentRef}>
                    {children}
                </div>
            </div>

            <div className="w-[210mm] m-auto relative flex flex-col items-center gap-[30px] py-[50px]">
                {[...Array(numPages)].map((_, i) => (
                    <div key={i} className="w-[210mm] h-[297mm] relative bg-white shadow-[0_0_40px_rgba(0,0,0,0.15)] shrink-0 overflow-hidden">
                        {/* The background image is now per-page */}
                        <div
                            className={`absolute inset-0 z-[1] ${format === 'analyst' ? 'bg-[url("/Resume%20Templates/analystDesign.png")] bg-cover bg-center bg-no-repeat' : format === 'showcase' ? (i === 0 ? 'bg-[url("/Resume%20Templates/showcaseDesign.png")] bg-cover bg-center bg-no-repeat' : 'bg-[url("/Resume%20Templates/simpleDesign.png")] bg-cover bg-center bg-no-repeat') : format === 'corporate' ? (i === 0 ? 'bg-[url("/Resume%20Templates/corporateDesign.png")] bg-cover bg-center bg-no-repeat' : 'bg-[url("/Resume%20Templates/corporateDesign2.png")] bg-cover bg-center bg-no-repeat') : format === 'minimalist' ? 'bg-[url("/Resume%20Templates/minimalistDesign.png")] bg-cover bg-center bg-no-repeat' : format === 'row' ? 'bg-[url("/Resume%20Templates/simpleDesign.png")] bg-cover bg-center bg-no-repeat' : format === 'column2' ? 'bg-[url("/Resume%20Templates/creativeDesign.png")] bg-cover bg-center bg-no-repeat' : ''}`}
                        />

                        {/* For Showcase, we add the black border frame on every page box */}
                        {format === 'showcase' && <div className="absolute top-[1mm] left-[10.5mm] w-[189mm] h-[289mm] border-none pointer-events-none z-[10] bg-transparent" />}

                        {/* The viewport that actually shows the sliced content */}
                        <div
                            className={`absolute inset-0 z-[5] overflow-hidden ${format === 'showcase' ? 'top-[1mm] left-[10.5mm] w-[189mm] h-[289mm]' : ''}`}
                            style={format !== 'showcase' ? (i === 0 ? { top: '1mm', height: '289mm' } : { top: '5mm', height: '288mm' }) : {}}
                        >
                            <div
                                className="w-full flex flex-col"
                                style={{
                                    transform: `translateY(-${i === 0 ? 0 : 288 + (i - 1) * 288}mm)`
                                }}
                            >
                                {children}
                            </div>
                        </div>

                        <div className="absolute bottom-[5mm] right-[10mm] text-[10px] text-slate-400 z-[100]">
                            Page {i + 1} of {numPages}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
