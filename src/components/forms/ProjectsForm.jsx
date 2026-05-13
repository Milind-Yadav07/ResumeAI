import React from 'react';
import { Plus, Trash2, Sparkles } from 'lucide-react';

const ProjectsForm = ({ projects, onAdd, onRemove, onUpdate, onAISummary, isAiLoading }) => {
    const inputClasses = "bg-white border border-slate-300 p-3.5 rounded-xl text-slate-800 w-full font-inherit focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all";

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center mb-5">
                <button
                    className="bg-blue-50 text-blue-600 border border-dashed border-blue-600 px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 text-[0.9rem] font-semibold transition-all duration-200 hover:bg-blue-600 hover:text-white"
                    onClick={() => onAdd({ title: '', link: '', description: '' })}
                >
                    <Plus size={16} /> Add Project
                </button>
            </div>
            {projects.map((proj, index) => (
                <div key={index} className="p-5 mb-5 flex flex-col gap-3 bg-white rounded-xl border border-slate-200 relative">
                    <div className="flex gap-2.5 items-center">
                        <input
                            type="text"
                            placeholder="Project Title"
                            className={inputClasses}
                            value={proj.title}
                            onChange={(e) => onUpdate(index, 'title', e.target.value)}
                        />
                        <button className="bg-red-100 text-red-500 border border-red-200 w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 shrink-0 hover:bg-red-500 hover:text-white" onClick={() => onRemove(index)}>
                            <Trash2 size={16} />
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Project Link (Optional)"
                        className={inputClasses}
                        value={proj.link}
                        onChange={(e) => onUpdate(index, 'link', e.target.value)}
                    />
                    <div className="relative">
                        <textarea
                            placeholder="Project Description"
                            className={`${inputClasses} h-[150px] resize-none`}
                            value={proj.description}
                            onChange={(e) => onUpdate(index, 'description', e.target.value)}
                        />
                        <button
                            className="absolute bottom-3 right-3 bg-blue-600 border-none text-white px-3 py-1.5 rounded-md text-[0.8rem] font-semibold flex items-center gap-1.5 cursor-pointer transition-all duration-200 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
                            onClick={() => onAISummary(index)}
                            disabled={isAiLoading === `proj-${index}`}
                        >
                            {isAiLoading === `proj-${index}` ? '...' : <Sparkles size={16} />}
                            {isAiLoading === `proj-${index}` ? 'Generating' : 'Enhance'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProjectsForm;
