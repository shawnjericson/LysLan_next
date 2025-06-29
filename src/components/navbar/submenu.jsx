'use client';
import { useTranslations } from '@/lib/useTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SlideInMenu({ onBack, onClose }) {
    const t = useTranslations('submenu');
    return (
        <motion.div
            className="fixed inset-0 z-50 bg-white p-6 overflow-y-auto"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
        >
            <div aria-hidden="true" className="fixed inset-0 z-[9999] bg-[#fdfaf5] overflow-y-auto font-[Playfair_Display]">
                <article>
                    <div>
                        <h2 className="head_slide mb-8 m-auto mt-6 font-[Playfair_Display] text-5xl text-center">{t('name')}</h2>
                        <button onClick={onBack} className="absolute top-7 left-4 text-3xl z-[10000] bg-[#0000000a] rounded-full p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button onClick={onClose} className="absolute top-7 right-4 text-3xl z-[10000] bg-[#0000000a] rounded-full p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <ul>
                        <li>
                            <div className="flex items-center gap-4 p-3 rounded-xl shadow-[0_1px_6px_rgba(0,0,0,0.05)] bg-white transition-transform duration-150 active:scale-[0.95]">
                                <Link href="#" className="flex items-center gap-4 py-4 px-6">
                                    <div className="w-[100px] h-[100px] relative rounded-lg overflow-hidden ring-1 ring-[#e0d8cf] shadow-sm shrink-0">
                                        <Image
                                            src="/Images/SBM1.jpg"
                                            alt={t('submenu_cate.bonbon.alt')}
                                            width={100}
                                            height={100}
                                            className="w-[100px] h-[100px] object-cover rounded relative"
                                            loading="lazy"
                                        />
                                    </div>
                                    <h3 className="text-[17px] font-medium leading-snug tracking-tight text-[#3e2c2c] uppercase">{t('submenu_cate.bonbon.name')}</h3>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center gap-4 p-3 rounded-xl shadow-[0_1px_6px_rgba(0,0,0,0.05)] bg-white transition-transform duration-150 active:scale-[0.95]">
                                <Link href="#" className="flex items-center gap-4 py-4 px-6">
                                    <div className="w-[100px] h-[100px] relative rounded-lg overflow-hidden ring-1 ring-[#e0d8cf] shadow-sm shrink-0">
                                        <Image
                                            src="/Images/Bar2.jpg"
                                            alt={t('submenu_cate.tablet.alt')}
                                            width={100}
                                            height={100}
                                            className="w-[100px] h-[100px] object-cover rounded relative"
                                            loading="lazy"
                                        />
                                    </div>
                                    <h3 className="text-[17px] font-medium leading-snug tracking-tight text-[#3e2c2c] uppercase">{t('submenu_cate.tablet.name')}</h3>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center gap-4 p-3 rounded-xl shadow-[0_1px_6px_rgba(0,0,0,0.05)] bg-white transition-transform duration-150 active:scale-[0.95]">
                                <Link href="#" className="flex items-center gap-4 py-4 px-6">
                                    <div className="w-[100px] h-[100px] relative rounded-lg overflow-hidden ring-1 ring-[#e0d8cf] shadow-sm shrink-0">
                                        <Image
                                            src="/Images/Dragees.jpg"
                                            alt={t('submenu_cate.dragees.alt')}
                                            width={100}
                                            height={100}
                                            className="w-[100px] h-[100px] object-cover rounded relative"
                                            loading="lazy"
                                        />
                                    </div>
                                    <h3 className="text-[17px] font-medium leading-snug tracking-tight text-[#3e2c2c] uppercase">{t('submenu_cate.dragees.name')}</h3>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center gap-4 p-3 rounded-xl shadow-[0_1px_6px_rgba(0,0,0,0.05)] bg-white transition-transform duration-150 active:scale-[0.95]">
                                <Link href="#" className="flex items-center gap-4 py-4 px-6">
                                    <div className="w-[100px] h-[100px] relative rounded-lg overflow-hidden ring-1 ring-[#e0d8cf] shadow-sm shrink-0">
                                        <Image
                                            src="/Images/Nama.jpg"
                                            alt={t('submenu_cate.nama.alt')}
                                            width={100}
                                            height={100}
                                            className="w-[100px] h-[100px] object-cover rounded relative"
                                            loading="lazy"
                                        />
                                    </div>
                                    <h3 className="text-[17px] font-medium leading-snug tracking-tight text-[#3e2c2c] uppercase">{t('submenu_cate.nama.name')}</h3>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </article>
            </div>
        </motion.div>
    );
}