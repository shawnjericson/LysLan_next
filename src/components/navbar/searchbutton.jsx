'use client';
import { useState } from 'react';
import { useTranslations } from '@/lib/useTranslations';

export default function SearchOverlay() {
    const t = useTranslations('navbar');
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Nút mở tìm kiếm */}
            <button
                aria-label={t('search.searcharia')}
                title={t('search.searchtitle')}
                onClick={() => setOpen(true)}
                className="text-[#3e1f0e] hover:bg-[#DE9400] hover:text-white p-2 rounded-full transition"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197M15.803 15.803A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </button>

            {/* Overlay tìm kiếm */}
            {open && (
                <div
                    className="fixed inset-0 z-[9999] bg-[#fdf8f3]/95 backdrop-blur-sm flex flex-col items-center justify-center px-4 transition-all duration-300"
                    aria-hidden={!open}
                >
                    {/* Nút đóng */}
                    <button
                        aria-label={t('search.closearia')}
                        onClick={() => setOpen(false)}
                        className="absolute top-4 right-4 text-3xl z-[10000] bg-[#0000000a] rounded-full p-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Form tìm kiếm */}
                    <form
                        action="/search"
                        method="GET"
                        className="text-[#3e1f0e] text-center space-y-6 w-full max-w-md"
                        role="search"
                    >
                        <h2 className="text-2xl font-[Playfair_Display] tracking-tight">
                            {t('search.searchh2')}
                        </h2>

                        <input
                            type="text"
                            name="q"
                            placeholder={t('search.placeholder')}
                            aria-label={t('search.formaria')}
                            required
                            className="w-full px-6 py-3 border border-[#ddd] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#DE9400] transition"
                        />

                        {/* Nút tìm kiếm với style bạn thích */}
                        <button
                            type="submit"
                            className="w-[140px] h-[45px] font-roboto text-[11px] uppercase tracking-[2.5px] font-medium text-black bg-white rounded-full shadow-md transition-all duration-300 hover:bg-[#2ee59d] hover:text-white hover:shadow-lg hover:-translate-y-2"
                        >
                            {t('search.submit')}
                        </button>

                        {/* Nút cancel phụ (nếu muốn) */}
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="text-sm underline text-[#666] hover:text-black transition"
                        >
                            {t('search.cancel')}
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}