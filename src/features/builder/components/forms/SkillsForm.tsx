import React, { useState } from 'react';

interface SkillsFormProps {
    skills: string[];
    onChange: (skills: string[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ skills, onChange }) => {
    // Local state to manage the raw text input for better UX (allows trailing spaces/commas)
    const [inputValue, setInputValue] = useState(() => skills.join(', '));
    const [prevSkills, setPrevSkills] = useState(skills);

    // Sync when the parent forces a new value (e.g., AI rewrite or page load).
    // We compare the parsed values of current input with the skills prop to avoid unnecessary resets.
    if (skills !== prevSkills) {
        setPrevSkills(skills);
        const currentParsed = inputValue.split(',').map(s => s.trim()).filter(Boolean);
        const isSame = currentParsed.length === skills.length && currentParsed.every((val, idx) => val === skills[idx]);
        if (!isSame) {
            setInputValue(skills.join(', '));
        }
    }

    const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInputValue(value);
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

