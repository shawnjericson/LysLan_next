// components/MinimalLuxuryLoadingIndicator.jsx
'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function MinimalLuxuryLoadingIndicator() {
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const pathname = usePathname();

    // Detect language from pathname
    const isEnglish = pathname.startsWith('/en');

    const loadingMessages = {
        vi: [
            'Đang chuẩn bị...',
            'Đang tải nội dung...',
            'Sắp hoàn thành...'
        ],
        en: [
            'Preparing...',
            'Loading content...',
            'Almost ready...'
        ]
    };

    const brandMessage = {
        vi: 'Mang Sô-cô-la Việt Nam vươn tầm thế giới',
        en: 'Bringing Vietnamese Chocolate to the World'
    };

    const currentMessages = isEnglish ? loadingMessages.en : loadingMessages.vi;
    const currentBrandMessage = isEnglish ? brandMessage.en : brandMessage.vi;

    useEffect(() => {
        setIsLoading(true);
        setProgress(0);
        setCurrentMessageIndex(0);

        // Smooth progress animation
        const progressTimer = setInterval(() => {
            setProgress(prev => {
                const increment = Math.random() * 12 + 3;
                const newProgress = prev + increment;

                // Update message based on progress
                if (newProgress >= 70) setCurrentMessageIndex(2);
                else if (newProgress >= 35) setCurrentMessageIndex(1);

                if (newProgress >= 92) {
                    clearInterval(progressTimer);
                    return 92;
                }
                return newProgress;
            });
        }, 150);

        // Complete loading
        const completeTimer = setTimeout(() => {
            setProgress(100);

            setTimeout(() => {
                setIsLoading(false);
                setProgress(0);
                setCurrentMessageIndex(0);
            }, 400);

            clearInterval(progressTimer);
        }, 1000);

        return () => {
            clearInterval(progressTimer);
            clearTimeout(completeTimer);
        };
    }, [pathname]);

    if (!isLoading) return null;

    return (
        <>
            {/* Minimal Top Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-[100]">
                <div className="h-[1px] bg-stone-200">
                    <div
                        className="h-full bg-gradient-to-r from-amber-700 to-amber-600 transition-all duration-700 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Elegant Overlay */}
            <div className="fixed inset-0 z-[99] bg-white/95 backdrop-blur-sm">
                <div className="h-full flex items-center justify-center">
                    <div className="text-center max-w-lg px-8">

                        {/* Simple Elegant Spinner */}
                        <div className="relative w-12 h-12 mx-auto mb-12">
                            <div className="absolute inset-0 border border-stone-200 rounded-full"></div>
                            <div
                                className="absolute inset-0 border border-amber-700 rounded-full border-t-transparent animate-spin"
                                style={{ animationDuration: '1.5s' }}
                            ></div>
                            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-amber-700 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                        </div>

                        {/* Loading Message */}
                        <div className="mb-8">
                            <p className="text-stone-700 text-lg font-light tracking-wide transition-all duration-500">
                                {currentMessages[currentMessageIndex]}
                            </p>
                        </div>

                        {/* Progress Percentage - Minimal */}
                        <div className="mb-12">
                            <span className="text-2xl font-light text-stone-600 tracking-widest">
                                {Math.round(progress)}%
                            </span>
                        </div>

                        {/* Brand Message */}
                        <div className="border-t border-stone-200 pt-8">
                            <p className="text-stone-600 text-sm font-light tracking-wide leading-relaxed">
                                {currentBrandMessage}
                            </p>
                        </div>

                        {/* Minimal Progress Dots */}
                        <div className="mt-8 flex justify-center space-x-2">
                            {currentMessages.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${index === currentMessageIndex
                                            ? 'bg-amber-700'
                                            : index < currentMessageIndex
                                                ? 'bg-amber-400'
                                                : 'bg-stone-300'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Subtle Bottom Accent */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
            </div>
        </>
    );
}