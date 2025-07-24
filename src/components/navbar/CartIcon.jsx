'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useTranslations } from '@/lib/useTranslations';
import CartModal from './CartModal';

export default function CartIcon() {
    const t = useTranslations('navbar');
    const { totalItems } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCartClick = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    return (
        <>
            <button
                onClick={handleCartClick}
                aria-label={t('cartaria')}
                title={t('carttitle')}
                className="relative text-[#3e1f0e] cursor-pointer hover: rounded-full px-2 py-2 hover:bg-[#DE9400] hover:text-amber-50 transition-all duration-300"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                {totalItems > 0 && (
                    <span className="absolute -top-1 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-1.5 py-0.5 rounded-full font-medium shadow-lg animate-pulse">
                        {totalItems}
                    </span>
                )}
            </button>

            {/* Cart Modal */}
            <CartModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}