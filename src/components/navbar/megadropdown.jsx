'use client';
import { useState } from 'react';
import { useTranslations } from '@/lib/useTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function MegaDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('megadropmenu');
    const { locale } = useParams();
    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {/* Nút trigger */}
            <Link href={`/${locale}/products`}
                className="block w-full max-w-[380px] text-center text-[#3e1f0e] text-[18px] font-[500] py-[8px] px-[18px] rounded-[8px] font-[Playfair_Display] mx-auto whitespace-normal no-underlin transition cursor-pointer"
                title={t('droptitle')}
                aria-label={t('droparia-label')}
            >
                {t('dropmenu')}
            </Link>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute left-0 top-full mt-0 bg-[#fff8f5] border-b-pink-200 rounded shadow-lg z-50 w-[700px] p-6 min-h-[150px]">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Danh sách sản phẩm bên trái */}
                        <div className="flex flex-col gap-2">
                            {[
                                { key: 'bonbon', src: '/Images/SBM1.jpg' },
                                { key: 'tablet', src: '/Images/Bar2.jpg' },
                                { key: 'dragees', src: '/Images/Dragees.jpg' },
                                { key: 'nama', src: '/Images/Nama.jpg' }
                            ].map(({ key, src }) => (
                                <Link
                                    href={`/${locale}/products?category=${key}`}
                                    key={key}
                                    className="flex items-center gap-3 font-[Playfair_Display] hover:bg-linear-to-tr from-gray-50 to-gray-100 transition hover:opacity-90"
                                >
                                    <Image
                                        src={src}
                                        alt={t(`${key}.alt`)}
                                        width={50}
                                        height={50}
                                        className="rounded shadow"
                                    />
                                    <span>{t(`${key}.name`)}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Hình ảnh mô tả bên phải */}
                        <div>
                            <Image
                                src="/Images/LysLan-box.jpg"
                                alt={t('col2.alt')}
                                width={200}
                                height={140}
                                className="rounded shadow mb-3"
                            />
                            <h3 className="text-lg font-semibold font-[Playfair_Display]">{t('col2.h3')}</h3>
                            <p className="text-sm text-gray-600 font-[Playfair_Display]">{t('col2.p')}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}