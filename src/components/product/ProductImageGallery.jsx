// src/components/ProductImageGallery.jsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import './product.css';

export default function ProductImageGallery({ product }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const locale = params?.locale || 'vi';

    // Tạo array images (hiện tại chỉ có 1 image, có thể mở rộng sau)
    const images = product.image?.url ? [product.image] : [];

    // Nếu không có image, hiển thị placeholder
    if (images.length === 0) {
        return (
            <div className="space-y-4">
                <div className="aspect-square bg-gradient-to-br from-[#fff8f5] to-[#f5f5f0] rounded-2xl flex items-center justify-center border border-[#3e1f0e]/10">
                    <div className="text-[#3e1f0e]/30 text-8xl">🍫</div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Main Image Display */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-[#3e1f0e]/10 shadow-lg group">
                {/* Product Badges */}
                {(product.badges?.isFeatured || product.badges?.isNew || product.badges?.isBestseller) && (
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-3">
                        {product.badges.isFeatured && (
                            <div className="luxury-badge featured-badge">
                                <div className="badge-shimmer"></div>
                                <div className="badge-content">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                                    </svg>
                                    <span>{locale === 'vi' ? 'Nổi bật' : 'Featured'}</span>
                                </div>
                            </div>
                        )}
                        {product.badges.isNew && (
                            <div className="luxury-badge new-badge">
                                <div className="badge-shimmer"></div>
                                <div className="badge-content">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                    </svg>
                                    <span>{locale === 'vi' ? 'Mới' : 'New'}</span>
                                </div>
                            </div>
                        )}
                        {product.badges.isBestseller && (
                            <div className="luxury-badge bestseller-badge">
                                <div className="badge-shimmer"></div>
                                <div className="badge-content">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                    </svg>
                                    <span>{locale === 'vi' ? 'Bán chạy' : 'Bestseller'}</span>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Main Image */}
                <img
                    src={images[selectedImage].url}
                    alt={images[selectedImage].alt || product.name}
                    className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                />

                {/* Zoom Icon */}
                <button className="absolute top-4 right-4 bg-white/90 hover:bg-white text-[#3e1f0e] rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                </button>
            </div>

            {/* Thumbnail Images (for future multiple images) */}
            {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`
                flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300
                ${selectedImage === index
                                    ? 'border-[#DE9400] shadow-lg'
                                    : 'border-[#3e1f0e]/20 hover:border-[#DE9400]/50'
                                }
              `}
                        >
                            <img
                                src={image.url}
                                alt={`${product.name} ${index + 1}`}
                                className="w-full h-full object-contain p-2 bg-white"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Image Info */}
            <div className="text-center text-sm text-[#3e1f0e]/60 font-['Montserrat']">
                {images.length > 1 && (
                    <p>{selectedImage + 1} / {images.length}</p>
                )}
                <p className="mt-1">{product.name}</p>
            </div>
        </div>
    );
}