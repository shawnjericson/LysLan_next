'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from '@/lib/useTranslations';

export default function ProductCard({ product, isMobile, flexBasis, showDetail, onShowcaseOpen }) {
    const t = useTranslations('Aboutus');
    return (
        <div
            className="flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group relative"
            style={{
                flexBasis,
                minWidth: isMobile ? '250px' : '280px'
            }}
        >
            <Link href={product.link} className="block no-underline text-inherit hover:text-inherit">
                <div className="relative h-64 w-full">
                    <Image
                        src={product.image}
                        alt={product.name || 'LysLan Product'}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                    />
                </div>

                {/* Info Section */}
                <div className="p-4">
                    <h5 className="text-lg font-[Monserrat] font-bold text-gray-800 mb-1 uppercase line-clamp-2">{product.name}</h5>
                    <div className="text-sm font-[Monserrat] font-medium text-amber-600 tracking-wide">{product.subName}</div>
                </div>

                {/* Slide Description (hidden at first) */}
                <div
                    className="
                        absolute bottom-0 left-0 right-0 px-4 py-3
                        text-sm text-gray-600 leading-relaxed
                        max-h-0 overflow-hidden opacity-0 font-[Monserrat]
                        transform translate-y-4
                        transition-all duration-500 ease-in-out
                        group-hover:max-h-40 group-hover:opacity-100 group-hover:translate-y-0
                        p-4 bg-gradient-to-r from-yellow-100 via-amber-200 to-orange-100 rounded-lg shadow-lg mt-4
                    "
                >
                    {product.description}
                </div>
            </Link>
            {showDetail && (
                <button
                    onClick={() => onShowcaseOpen(product.id)}
                    className="absolute top-2 right-2 bg-amber-500 text-white px-3 py-1 text-xs rounded hover:bg-amber-600 transition font-[Playfair_Display]"
                >
                    {t('section5.product.button')}
                </button>
            )}
        </div>
    );
}