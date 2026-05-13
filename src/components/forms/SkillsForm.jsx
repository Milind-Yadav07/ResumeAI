import React, { useState, useEffect } from 'react';

const SkillsForm = ({ skills, onChange }) => {
    // Local state to manage the raw text input for better UX (allows trailing spaces/commas)
    const [inputValue, setInputValue] = useState(skills.join(', '));

    // Update local state when prop changes from outside (e.g., AI summary or clear)
    useEffect(() => {
        const currentJoined = skills.join(', ');
        if (inputValue !== currentJoined && !inputValue.endsWith(', ') && !inputValue.endsWith(',')) {
            setInputValue(currentJoined);
        }
    }, [skills]);

    const handleSkillsChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        // Convert to array and filter out empty strings to update parent state
        const skillsArray = value.split(',').map(s => s.trim()).filter(s => s !== '');
        onChange(skillsArray);
    };

    return (
        <div className="flex flex-col gap-4">
            <p className="text-[0.85rem] text-slate-500 mb-1">Enter skills separated by commas (e.g., React, Node.js, Python)</p>
            <textarea
                placeholder="React, JavaScript, CSS, etc."
                className="bg-white border border-slate-300 p-3.5 rounded-xl text-slate-800 w-full font-inherit focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all resize-none h-[150px]"
                value={inputValue}
                onChange={handleSkillsChange}
                rows={4}
            />
        </div>
    );
};

export default SkillsForm;
