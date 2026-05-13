import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const row1 = [
    { id: 1, img: '/jpg/pikachu.jpg', title: 'Professional Modern' },
    { id: 2, img: '/jpg/gengar.jpg', title: 'Creative Designer' },
    { id: 3, img: '/jpg/lapras.jpg', title: 'Executive Brief' },
    { id: 4, img: '/jpg/onyx.jpg', title: 'Minimalist Clean' },
    { id: 5, img: '/jpg/ditto.jpg', title: 'Startup Tech' },
];

const row2 = [
    { id: 6, img: '/jpg/chikorita.jpg', title: 'Corporate Bold' },
    { id: 7, img: '/jpg/bronzor.jpg', title: 'Academic Research' },
    { id: 8, img: '/jpg/rhyhorn.jpg', title: 'Freelance Portfolio' },
    { id: 9, img: '/jpg/glalie.jpg', title: 'Medical Expert' },
    { id: 10, img: '/jpg/kakuna.jpg', title: 'Legal Professional' },
];

const Designs = () => {
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);

    useEffect(() => {
        const r1 = row1Ref.current;
        const r2 = row2Ref.current;

        // Infinite loop for Row 1 (Left to Right)
        gsap.set(r1, { x: "-50%" });
        gsap.to(r1, {
            x: "0%",
            duration: 40,
            ease: "none",
            repeat: -1,
        });

        // Infinite loop for Row 2 (Right to Left)
        gsap.to(r2, {
            x: "-50%",
            duration: 45,
            ease: "none",
            repeat: -1,
        });
    }, []);

    const MarqueeRow = ({ items, rowRef }) => {
        const duplicatedItems = [...items, ...items];

        return (
            <div className="flex whitespace-nowrap w-fit relative z-[1] hover:z-10" ref={rowRef}>
                {duplicatedItems.map((item, index) => (
                    <div className="group relative w-[240px] h-[340px] mx-[15px] rounded-[15px] overflow-hidden cursor-pointer bg-slate-100 shrink-0 transition-transform duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-lg hover:scale-[1.08] hover:z-50 hover:shadow-2xl" key={`${item.id}-${index}`}>
                        <img src={item.img} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 ease" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease flex flex-col justify-end p-8">
                            <h3 className="text-white text-2xl font-bold translate-y-5 group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)]">{item.title}</h3>
                        </div>
                        <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-[25deg] group-hover:animate-designs-shine"></div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <section className="w-full overflow-hidden py-24 bg-white relative z-10">
            <div className="text-center mb-[60px] px-5">
                <div className="inline-block px-[18px] py-2 bg-white border border-[#2563eb]/20 rounded-full text-[#2563eb] text-sm font-bold mb-5 shadow-sm">Premium Templates</div>
                <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-[#0f172a] mb-5 uppercase">TEMPLATES</h2>
                <p className="text-[clamp(1rem,1.5vw,1.2rem)] text-[#64748b] leading-relaxed max-w-[800px] mx-auto">
                    Explore our diverse selection of templates, each designed to fit different styles and professions. ResumeAI currently offers 6 templates, with more on the way
                </p>
            </div>

            <div className="flex flex-col gap-10 -rotate-3 py-[60px]">
                <MarqueeRow items={row1} rowRef={row1Ref} />
                <MarqueeRow items={row2} rowRef={row2Ref} />
            </div>
        </section>
    );
};

export default Designs;
