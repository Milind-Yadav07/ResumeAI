import { useState, useEffect, useCallback } from 'react';
import { features } from '../constants/works.constants';
import { UseWorksSliderReturn } from '@/types';

export const useWorksSlider = (isInView: boolean): UseWorksSliderReturn => {
    const [expandedId, setExpandedId] = useState(1);

    useEffect(() => {
        if (!isInView) return;

        const intervalTime = 5000; // 5 seconds
        
        const interval = setInterval(() => {
            setExpandedId((prevId) => (prevId % features.length) + 1);
        }, intervalTime);

        return () => clearInterval(interval);
    }, [isInView]);

    const toggleExpand = useCallback((id: number) => {
        setExpandedId(id);
    }, []);


    const currentLottie = features.find(f => f.id === expandedId)?.lottieUrl || features[0].lottieUrl;

    return {
        expandedId,
        toggleExpand,
        currentLottie
    };
};
