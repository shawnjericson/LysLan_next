'use client';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from '@/lib/useTranslations';

export default function LetterPopup({ isOpen, onClose }) {
    const t = useTranslations('section4');
    const overlayRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (e.target === overlayRef.current) {
                onClose();
            }
        };
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={overlayRef}
                    className="fixed inset-0 z-[9999] bg-black/60 flex justify-center items-center overflow-y-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="relative w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto bg-[#fffdf7] rounded-lg shadow-2xl p-6 sm:p-10 font-[Playwrite_US_Trad] text-[#4f2813] text-justify"
                        initial={{ rotateX: -90, scale: 0.9 }}
                        animate={{ rotateX: 0, scale: 1 }}
                        exit={{ rotateX: -90, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 80 }}
                    >
                        <button
                            className="absolute top-4 right-5 text-2xl text-[#5c2e00] hover:text-red-500"
                            onClick={onClose}
                            aria-label="Đóng popup"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>

                        </button>

                        <h2 className="text-2xl font-[Playfair_Display] text-[#5c2e00] text-center mb-4">
                            {t('letter.h2')}
                        </h2>

                        <div className="space-y-4 leading-relaxed sm:leading-loose prose max-w-none tracking-wide text-lg">
                            <p>{t('letter.p1')}</p>
                            <p>{t('letter.p2')}</p>
                            <p>{t('letter.p3')}</p>
                        </div>

                        <div className="mt-6 text-right text-3xl font-[Playwrite_US_Trad] text-[#5c2e00]">
                            {t('signature')}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
