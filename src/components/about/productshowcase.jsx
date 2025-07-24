'use client';
import { useState, useEffect, useCallback } from 'react';
import ProductIntro from './productintro';
import ProductCarousel from './productcarousel';
import './carousel.css'

export default function ProductShowcase({ boxType }) {
    const [phase, setPhase] = useState('intro');
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Memoized callback để tránh re-render không cần thiết
    const handleIntroComplete = useCallback(() => {
        setIsTransitioning(true);

        // Smooth transition phase
        setTimeout(() => {
            setPhase('carousel');
            setIsTransitioning(false);
        }, 600); // Transition duration
    }, []);

    // Auto-advance after maximum time
    useEffect(() => {
        const maxTime = setTimeout(() => {
            if (phase === 'intro') {
                handleIntroComplete();
            }
        }, 4500); // Slightly longer to ensure animation completes

        return () => clearTimeout(maxTime);
    }, [phase, handleIntroComplete]);

    return (
        <div className="relative h-[300px] overflow-hidden bg-gradient-to-b from-amber-50/30 via-transparent to-amber-50/30">
            {/* Main content container */}
            <div className="relative w-full h-full">
                {/* Intro Phase */}
                <div
                    className={`absolute inset-0 transition-all duration-700 ease-out ${phase === 'intro' && !isTransitioning
                            ? 'opacity-100 scale-100 blur-0'
                            : isTransitioning
                                ? 'opacity-60 scale-95 blur-sm'
                                : 'opacity-0 scale-90 blur-md pointer-events-none'
                        }`}
                    style={{
                        transform: phase === 'carousel' ? 'translateY(-20px)' : 'translateY(0)',
                        zIndex: phase === 'intro' ? 20 : 10
                    }}
                >
                    <ProductIntro
                        boxType={boxType}
                        onComplete={handleIntroComplete}
                    />
                </div>

                {/* Transition Effects */}
                {isTransitioning && (
                    <>
                        {/* Smooth gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-transparent animate-pulse" style={{ zIndex: 25 }} />

                        {/* Floating particles during transition */}
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 bg-amber-400 rounded-full animate-float"
                                style={{
                                    left: `${20 + Math.random() * 60}%`,
                                    top: `${30 + Math.random() * 40}%`,
                                    animationDelay: `${i * 0.2}s`,
                                    animationDuration: '2s',
                                    zIndex: 30
                                }}
                            />
                        ))}
                    </>
                )}

                {/* Carousel Phase */}
                <div
                    className={`absolute inset-0 transition-all duration-700 ease-out ${phase === 'carousel' && !isTransitioning
                            ? 'opacity-100 scale-100 blur-0'
                            : 'opacity-0 scale-105 blur-sm pointer-events-none'
                        }`}
                    style={{
                        transform: phase === 'carousel' ? 'translateY(0)' : 'translateY(20px)',
                        zIndex: phase === 'carousel' ? 20 : 10
                    }}
                >
                    {/* Only render carousel when needed to save performance */}
                    {(phase === 'carousel' || isTransitioning) && (
                        <ProductCarousel boxType={boxType} />
                    )}
                </div>
            </div>

            {/* Enhanced Progress Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-3">
                {/* Phase dots */}
                <div className="flex space-x-2">
                    <div className={`w-2 h-2 rounded-full transition-all duration-500 ${phase === 'intro'
                            ? 'bg-amber-500 scale-125 shadow-lg shadow-amber-500/50'
                            : 'bg-gray-300'
                        }`} />
                    <div className={`w-2 h-2 rounded-full transition-all duration-500 ${isTransitioning
                            ? 'bg-amber-400 scale-110 animate-pulse'
                            : 'bg-gray-300'
                        }`} />
                    <div className={`w-2 h-2 rounded-full transition-all duration-500 ${phase === 'carousel'
                            ? 'bg-amber-500 scale-125 shadow-lg shadow-amber-500/50'
                            : 'bg-gray-300'
                        }`} />
                </div>
            </div>
            {/* Loading Overlay (if needed) */}
            {isTransitioning && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 40 }}>
                    <div className="bg-white/80 rounded-full p-3 shadow-lg">
                        <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            )}
        </div>
    );
}