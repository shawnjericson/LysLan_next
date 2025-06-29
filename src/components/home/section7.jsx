'use client';
import { useTranslations } from '@/lib/useTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CraftingSection() {
    const t = useTranslations('section7');

    return (
        <section className="pb-16" aria-label={t('sectionaria')}>
            <div className="container mx-auto px-4 space-y-12">

                {/* Ảnh đầu */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Image
                        src="/Images/MakingIMG1.jpg"
                        alt={t('img1alt')}
                        title={t('img1title')}
                        width={1200}
                        height={600}
                        className="w-full h-100 object-cover rounded-xl shadow-md"
                        loading="lazy"
                    />
                </motion.div>

                {/* Heading chính */}
                <div className="text-center">
                    <motion.h2
                        className="font-[Playfair_Display] text-5xl sm:text-7xl text-black leading-tight"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {t('h2')}
                    </motion.h2>
                </div>

                {/* Con Tim + câu nói */}
                <motion.div
                    className="flex flex-col items-center sm:flex-row sm:justify-center gap-4 text-center sm:text-left pl-26"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <motion.h2
                        className="font-[Playfair_Display] text-[#c31f1f] text-5xl sm:text-7xl"
                        initial={{ rotate: -3, opacity: 0 }}
                        whileInView={{ rotate: 0, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 100, delay: 0.5 }}
                    >
                        {t('h3')}
                    </motion.h2>
                    <p className="font-[Inter] text-sm italic text-black max-w-xs sm:ml-4 mt-2 sm:mt-4">
                        {t('p')}
                    </p>
                </motion.div>

                {/* CTA */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Link
                        href="#"
                        className="inline-block px-6 py-3 text-[#DE9400] border border-[#DE9400] rounded-full font-medium transition-all duration-500 hover:text-white hover:bg-[#DE9400] hover:shadow-xl tracking-wide"
                    >
                        {t('CTA')}
                    </Link>
                </motion.div>

                {/* Ảnh cuối */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <Image
                        src="/Images/MakingIMG5.jpg"
                        alt={t('img2alt')}
                        title={t('img2title')}
                        width={1200}
                        height={600}
                        className="w-full h-100 object-cover rounded-xl shadow-md"
                        loading="lazy"
                    />
                </motion.div>
            </div>
        </section>
    );
}
