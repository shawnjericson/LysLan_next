'use client';
import Link from 'next/link';
import { useTranslations } from '@/lib/useTranslations'; // Đảm bảo rằng đúng path
import { motion } from 'framer-motion';

export default function Breadcrumb({ paths }) {
    const t = useTranslations('FAQs.breadcrumb'); // Lấy dữ liệu breadcrumb từ "Aboutus"

    if (!paths || paths.length === 0) {
        return null; // Nếu không có paths, trả về null
    }

    return (
        <nav aria-label="breadcrumb" className="py-2">
            <ol className="flex flex-wrap items-center text-sm font-[Inter] text-[#4f2813] space-x-1">
                {paths.map((item, idx) => {
                    const isLast = idx === paths.length - 1;
                    return (
                        <motion.li
                            key={item.href}
                            className="flex items-center space-x-1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                        >
                            {!isLast ? (
                                <>
                                    <Link
                                        href={item.href}
                                        className="text-[#4f2813] hover:text-[#c47a40] transition"
                                    >
                                        {t(item.label)} {/* Tạo các breadcrumb từ dữ liệu ngôn ngữ */}
                                    </Link>
                                    <span className="mx-2 text-[#bbb]">/</span>
                                </>
                            ) : (
                                <span className="text-[#c47a40] font-medium">{t(item.label)}</span>
                            )}
                        </motion.li>
                    );
                })}
            </ol>
        </nav>
    );
}
