
export const renderDescription = (description: string) => {
    if (!description) return null;
    const items = typeof description === 'string' ? description.split('\n').filter(item => item.trim()) : [];
    if (items.length <= 1) return <p className="text-[10.5pt] text-slate-600 my-[4pt] leading-relaxed">{description}</p>;
    return (
        <ul className="mt-[6pt] ml-[12pt] mb-0 p-0 list-none">
            {items.map((item, i) => (
                <li key={i} className="text-[10pt] text-slate-600 relative pl-[14pt] mb-1 before:content-['•'] before:text-blue-500 before:absolute before:left-0 before:font-bold">
                    {item.replace(/^[•\-*]\s*/, '')}

                </li>
            ))}
        </ul>
    );
};
