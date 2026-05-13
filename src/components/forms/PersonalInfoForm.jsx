import React from 'react';
import { Sparkles } from 'lucide-react';

const PersonalInfoForm = ({ data, onChange, onAISummary, isAiLoading, format }) => {
    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onChange('photo', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const inputClasses = "bg-white border border-slate-300 p-3.5 rounded-xl text-slate-800 w-full font-inherit focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all";

    return (
        <div className="flex flex-col gap-4">
            <input
                type="text"
                placeholder="Full Name"
                className={inputClasses}
                value={data.name}
                onChange={(e) => onChange('name', e.target.value)}
            />
            {(format === 'corporate' || format === 'column' || format === 'analyst') && (
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-600">Profile Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        className={inputClasses}
                        onChange={handlePhotoUpload}
                    />
                    {data.photo && (
                        <div className="mt-2">
                            <img src={data.photo} alt="Profile Preview" className="w-20 h-20 object-cover rounded-full border-2 border-slate-200" />
                        </div>
                    )}
                </div>
            )}
            <input
                type="email"
                placeholder="Email"
                className={inputClasses}
                value={data.email}
                onChange={(e) => onChange('email', e.target.value)}
            />
            <input
                type="text"
                placeholder="Phone"
                className={inputClasses}
                value={data.phone}
                onChange={(e) => onChange('phone', e.target.value)}
            />
            <input
                type="text"
                placeholder="Location"
                className={inputClasses}
                value={data.location || ''}
                onChange={(e) => onChange('location', e.target.value)}
            />
            <input
                type="text"
                placeholder="Links (LinkedIn, GitHub, Portfolio)"
                className={inputClasses}
                value={data.links}
                onChange={(e) => onChange('links', e.target.value)}
            />
            <div className="relative">
                <textarea
                    placeholder="Summary / About Me"
                    className={`${inputClasses} h-[150px] resize-none`}
                    value={data.summary}
                    onChange={(e) => onChange('summary', e.target.value)}
                />
                <button
                    className="absolute bottom-3 right-3 bg-blue-600 border-none text-white px-3 py-1.5 rounded-md text-[0.8rem] font-semibold flex items-center gap-1.5 cursor-pointer transition-all duration-200 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
                    onClick={onAISummary}
                    disabled={isAiLoading}
                >
                    {isAiLoading ? '...' : <Sparkles size={16} />}
                    {isAiLoading ? 'Generating' : 'Enhance'}
                </button>
            </div>
        </div>
    );
};

export default PersonalInfoForm;
