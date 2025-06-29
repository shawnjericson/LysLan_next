import { useState } from 'react';
import LetterPopup from '@/components/home/LetterPopup';
import { useTranslations } from '@/lib/useTranslations';

export default function FounderStory() {
    const [showLetter, setShowLetter] = useState(false);
    const t = useTranslations('section4');

    return (
        <section className="py-10" aria-label={t('sectionaria')}>
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img
                        src="/Images/Founder Story Banner.jpg"
                        alt={t('imgalt')}
                        title={t('imgtitle')}
                        className="rounded-lg shadow-lg object-cover w-full h-auto"
                        loading="lazy"
                    />
                </div>

                <div>
                    <h2 className="font-[Playfair_Display] text-7xl leading-snug mb-4">
                        {t('h2.span1')}
                        <span className="text-[#DE9400]">{t('h2.span2')}</span>
                        {t('h2.span3')}
                        <span className="text-[#DE9400]">{t('h2.span4')}</span>
                    </h2>

                    <h3 className="font-[Inter] text-lg text-gray-700 mb-6">{t('h3')}</h3>

                    <button
                        onClick={() => setShowLetter(true)}
                        className="relative inline-block btn-slide-custom"
                    >
                        <span className="absolute inset-0 bg-[#DE9400] scale-x-0 origin-left transition-transform duration-500 ease-in-out z-[-1] hover:scale-x-100"></span>
                        {t('CTA')}
                    </button>

                    <div className="signature mt-8 text-right text-4xl font-[Playwrite_US_Trad] text-[#5c2e00]">
                        {t('signature')}
                    </div>
                </div>
            </div>

            <LetterPopup isOpen={showLetter} onClose={() => setShowLetter(false)} />
        </section>
    );
}
