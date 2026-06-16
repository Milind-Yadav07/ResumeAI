export interface FeatureItem {
    id: number;
    text: string;
    description: string;
    lottieUrl: string;
}

export const features: FeatureItem[] = [
    {
        id: 1,
        text: 'Pick a Resume template',
        description: 'Browse our collection of professionally designed templates. Whether you are applying for a creative role or a corporate position, choose a layout that best reflects your professional identity.',
        lottieUrl: 'https://lottie.host/6db25884-3143-421d-bd0c-a2eaead48b36/GrAWvF8ihH.lottie'
    },
    {
        id: 2,
        text: 'Fill in your details',
        description: 'Input your experience, education, and skills into our intuitive editor. Your data is processed in real-time, allowing you to see exactly how your information fits into your chosen design as you type.',
        lottieUrl: 'https://lottie.host/feb26fd0-278f-40dd-af7c-9d4c71e2a444/jHCwe93fRh.lottie'
    },
    {
        id: 3,
        text: 'Let AI write your content',
        description: "Stop worrying about the perfect phrasing. Use the AI to instantly polish your content, fix grammar, and professional achievements that grab recruiters attention.",
        lottieUrl: 'https://lottie.host/0d4884f6-e890-45e2-8cc6-f95ca3d37008/XZh2OPkN0x.lottie'
    },
    {
        id: 4,
        text: 'Check your resume with ATS scanner',
        description: "Upload your resume alongside a job description to see how you rank. Our AI-powered semantic analysis identifies missing keywords, evaluates your compatibility, and provides actionable suggestions to help you reach the interview stage.",
        lottieUrl: 'https://lottie.host/30cf1b82-45bd-4a7d-b724-5faaea3cc5d2/rQOgxjVZQT.lottie'
    },
];
