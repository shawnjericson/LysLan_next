'use client';
import { useTranslations } from '@/lib/useTranslations';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation'; // Thêm import này

export default function EmotionalFooter() {
    const t = useTranslations('footer');
    const params = useParams(); // Lấy params
    const locale = params.locale; // Lấy locale từ params

    return (
        <footer className="relative bg-[#fff8f5] text-[#3e1f0e] pt-4 overflow-hidden font-serif">
            {/* 🎋 Họa tiết nền */}
            <Image
                src="/icons/lotus-pattern.png"
                alt="Hoa sen trang trí"
                width={700}
                height={100}
                className="absolute bottom-0 left-0 opacity-15 z-0 hidden md:block"
            />

            <div className="relative z-10 max-w-screen-xl mx-auto px-4 pb-10">
                {/* Logo + quote */}
                <div className="text-center">
                    <Image
                        src="/Logo/logo LYSLAN ok-01.svg"
                        alt="LysLan Chocolatier"
                        width={140}
                        height={60}
                        className="mx-auto"
                    />
                    <motion.p
                        className="text-base font-[Playfair_Display] italic text-opacity-80 text-[#4f2813] mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {t('logop')}
                    </motion.p>
                </div>

                {/* Menu + newsletter */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10 text-sm">

                    {/* Menu Khám Phá */}
                    <div>
                        <h2 className="text-base font-semibold uppercase mb-3 tracking-wide text-[#5c2e00]">Khám Phá</h2>
                        <ul className="space-y-2">
                            {['cate1', 'cate2', 'cate3', 'cate4'].map((key) => (
                                <li key={key} className="transition ease-in-out hover:-translate-x-1 hover:scale-105">
                                    <Link href="#" className="font-[Playfair_Display] hover:text-[#b05a1f] transition">{t(key)}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Liên hệ */}
                    <div>
                        <h2 className="text-base font-semibold uppercase mb-3 tracking-wide text-[#5c2e00]">{t('contactcategory')}</h2>
                        <ul className="space-y-2">
                            {['Blog', 'FAQ', 'shipping', 'contactus', 'policy', 'security', 'returnpolicy'].map((key) => {
                                // Định nghĩa các link custom
                                const customLinks = {
                                    'FAQ': `/${locale}/FAQ`,
                                    // Thêm các link khác nếu cần
                                    // 'Blog': `/${locale}/blog`,
                                    // 'contactus': `/${locale}/contact`,
                                };

                                const href = customLinks[key] || '#'; // Dùng link custom hoặc # mặc định

                                return (
                                    <li key={key} className="transition ease-in-out hover:-translate-x-1 hover:scale-105">
                                        <Link href={href} className="font-[Playfair_Display] hover:text-[#b05a1f] transition">
                                            {t(key)}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    {/* Đăng ký */}
                    <div className="md:col-span-2">
                        <h2 className="text-base font-semibold uppercase mb-3 tracking-wide text-[#5c2e00]">
                            {t('Subscription.title')}
                        </h2>
                        <p className="text-sm font-[Playfair_Display] mb-4">{t('Subscription.description')}</p>
                        <form className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder={t('Subscription.placeholder')}
                                className="bg-[#e27a42] text-white text-sm px-3 py-2 rounded-md w-full placeholder-white"
                            />
                            <button className="text-sm text-[#3e1f0e] border border-[#3e1f0e] px-4 py-2 rounded hover:bg-[#3e1f0e] hover:text-white transition">
                                {t('Subscription.subscribe')}
                            </button>
                        </form>

                        {/* Icon mạng xã hội */}
                        <div className="flex gap-4 mt-5">
                            {[
                                { href: 'https://facebook.com/lyslanchocolatier', icon: 'facebook' },
                                { href: 'https://instagram.com/lyslan_chocolatier', icon: 'instagram' },
                                { href: 'https://tiktok.com/@lyslanchocolatier', icon: 'tiktok' },
                                { href: 'https://youtube.com/@lyslan', icon: 'youtube' },
                            ].map(({ href, icon }) => (
                                <Link key={icon} href={href} target="_blank" aria-label={icon}>
                                    <div className="w-9 h-9 rounded-full bg-[#f9d7c4] flex items-center justify-center hover:bg-white transition">
                                        <Image src={`/icons/${icon}.svg`} alt={icon} width={20} height={20} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Divider + Quote */}
                <motion.div
                    className="text-center mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-xs text-[#4f2813] opacity-60">{t('copyright')}</p>
                </motion.div>
            </div>
        </footer>
    );
}