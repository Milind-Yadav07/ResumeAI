import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const EducationForm = ({ education, onAdd, onRemove, onUpdate }) => {
    const inputClasses = "bg-white border border-slate-300 p-3.5 rounded-xl text-slate-800 w-full font-inherit focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all";

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center mb-5">
                <button
                    className="bg-blue-50 text-blue-600 border border-dashed border-blue-600 px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 text-[0.9rem] font-semibold transition-all duration-200 hover:bg-blue-600 hover:text-white"
                    onClick={() => onAdd({ degree: '', school: '', year: '' })}
                >
                    <Plus size={16} /> Add Education
                </button>
            </div>
            {education.map((edu, index) => (
                <div key={index} className="p-5 mb-5 flex flex-col gap-3 bg-white rounded-xl border border-slate-200 relative">
                    <div className="flex gap-2.5 items-center">
                        <input
                            type="text"
                            placeholder="Degree / Field of Study"
                            className={inputClasses}
                            value={edu.degree}
                            onChange={(e) => onUpdate(index, 'degree', e.target.value)}
                        />
                        <button className="bg-red-100 text-red-500 border border-red-200 w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 shrink-0 hover:bg-red-500 hover:text-white" onClick={() => onRemove(index)}>
                            <Trash2 size={16} />
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="School / University"
                        className={inputClasses}
                        value={edu.school}
                        onChange={(e) => onUpdate(index, 'school', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Year"
                        className={inputClasses}
                        value={edu.year}
                        onChange={(e) => onUpdate(index, 'year', e.target.value)}
                    />
                </div>
            ))}
        </div>
    );
};

export default EducationForm;
