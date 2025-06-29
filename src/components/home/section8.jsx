'use client';
import { useTranslations } from '@/lib/useTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

export default function SocialMediaGallery() {
    const t = useTranslations('section8');

    const imageData = [
        {
            src: '/Images/Bonbononplate.jpg',
            alt: t('img1alt'),
            title: t('img1title'),
            className: 'md:col-span-3 aspect-square',
        },
        {
            src: '/Images/Bonbon1.jpg',
            alt: t('img2alt'),
            title: t('img2title'),
            className: 'md:col-span-6 aspect-[16/9] md:aspect-auto',
        },
        {
            src: '/Images/Bonbon-Elegent.jpg',
            alt: t('img3alt'),
            title: t('img3title'),
            className: 'md:col-span-3 aspect-square',
        },
    ];

    return (
        <section className="pb-10" aria-label={t('sectionaria')}>
            <div className="container mx-auto px-4 space-y-6">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-2xl sm:text-4xl font-[Inter] italic flex gap-4 flex-wrap">
                        <span>@lyslan_chocolatier</span>
                        <Link
                            href="https://www.instagram.com/lyslan_chocolatier/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram LysLan"
                        >
                            <Image
                                src="/Images/Instagram.png"
                                alt="Instagram"
                                width={28}
                                height={28}
                                className="inline-block"
                            />
                        </Link>
                        <Link
                            href="https://www.facebook.com/lyslanchocolatier"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook LysLan"
                        >
                            <Image
                                src="/Images/facebook.svg"
                                alt="Facebook"
                                width={28}
                                height={28}
                                className="inline-block"
                            />
                        </Link>
                    </h2>
                </motion.div>

                {/* Lightbox Gallery */}
                <PhotoProvider>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                        {imageData.map((img, index) => (
                            <motion.div
                                key={index}
                                className={`relative ${img.className}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.15 * index }}
                                viewport={{ once: true }}
                            >
                                <PhotoView src={img.src}>
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        title={img.title}
                                        fill
                                        className="object-cover cursor-zoom-in"
                                        loading="lazy"
                                    />
                                </PhotoView>
                            </motion.div>
                        ))}
                    </div>
                </PhotoProvider>
            </div>
        </section>
    );
}
