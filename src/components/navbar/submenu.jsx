'use client';
import { useTranslations } from '@/lib/useTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SlideInSubmenu({ onBack, onClose }) {
    const t = useTranslations('submenu');

    const handleLinkClick = () => {
        // Đóng toàn bộ menu sau khi click link
        setTimeout(() => {
            onClose();
        }, 100);
    };

    const submenuItems = [
        {
            href: "#",
            image: "/Images/SBM1.jpg",
            alt: t('submenu_cate.bonbon.alt'),
            name: t('submenu_cate.bonbon.name'),
            description: t('submenu_cate.bonbon.description'),
            featured: true
        },
        {
            href: "#",
            image: "/Images/Bar2.jpg",
            alt: t('submenu_cate.tablet.alt'),
            name: t('submenu_cate.tablet.name'),
            description: t('submenu_cate.tablet.description')
        },
        {
            href: "#",
            image: "/Images/Dragees.jpg",
            alt: t('submenu_cate.dragees.alt'),
            name: t('submenu_cate.dragees.name'),
            description: t('submenu_cate.dragees.description')
        },
        {
            href: "#",
            image: "/Images/Nama.jpg",
            alt: t('submenu_cate.nama.alt'),
            name: t('submenu_cate.nama.name'),
            description: t('submenu_cate.nama.description')
        }
    ];

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-gradient-to-br from-[#fdfaf5] via-[#f8f4ed] to-[#f5f0e8]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
            <div className="h-full overflow-y-auto">
                {/* Header với navigation */}
                <div className="relative p-6 pb-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={onBack}
                            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300"
                        >
                            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300"
                        >
                            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center mt-6"
                    >
                        <h2 className="font-[Playfair_Display] text-3xl text-gray-800 font-light">
                            {t('name')}
                        </h2>
                        <p className="text-gray-600 mt-2 text-sm font-light">
                            {t('subname')}
                        </p>
                    </motion.div>
                </div>

                {/* Decorative divider */}
                <div className="px-6 mb-8">
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
                </div>

                {/* Submenu items */}
                <div className="px-6 space-y-5">
                    {submenuItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.15 }}
                            className="group"
                        >
                            <div className={`relative rounded-2xl p-5 transition-all duration-300 hover:shadow-xl cursor-pointer overflow-hidden ${item.featured
                                    ? 'bg-gradient-to-r from-amber-50 to-orange-50 ring-2 ring-amber-200/50'
                                    : 'bg-white/60 backdrop-blur-sm hover:bg-white/80'
                                }`}>

                                {/* Premium badge cho featured item */}
                                {item.featured && (
                                    <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                                        {t('highlight')}
                                    </div>
                                )}

                                {/* Gradient overlay khi hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-50/0 to-orange-100/0 group-hover:from-amber-50/30 group-hover:to-orange-100/30 transition-all duration-300 rounded-2xl"></div>

                                <Link
                                    href={item.href}
                                    onClick={handleLinkClick}
                                    className="relative flex items-center gap-5"
                                >
                                    <div className="relative">
                                        <div className={`w-24 h-24 rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${item.featured
                                                ? 'ring-3 ring-amber-300/50 group-hover:ring-amber-400/70'
                                                : 'ring-2 ring-white group-hover:ring-amber-200'
                                            }`}>
                                            <Image
                                                src={item.image}
                                                alt={item.alt}
                                                width={96}
                                                height={96}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>

                                        {/* Decorative corner */}
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-gray-800 group-hover:text-amber-700 transition-colors duration-300 uppercase tracking-wide">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-2 font-light leading-relaxed">
                                            {item.description}
                                        </p>

                                        {/* Subtle indicator line */}
                                        <div className="w-0 h-px bg-gradient-to-r from-amber-400 to-orange-400 mt-3 group-hover:w-12 transition-all duration-500"></div>
                                    </div>

                                    <div className="text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all duration-300">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-12 mb-8 px-6"
                >
                    <div className="text-center bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200/30">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                            {t('supp')}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            {t('suppdesc')}
                        </p>
                        <Link
                            href="/contact"
                            onClick={handleLinkClick}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            {t('contactus')}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}