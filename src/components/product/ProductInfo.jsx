// src/components/ProductInfo.jsx
'use client';

import { useState } from 'react';
import AddToCartButton from './AddToCartButton';

export default function ProductInfo({ product, locale }) {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    return (
        <div className="space-y-6">
            {/* Product Name & Subname */}
            <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-['Playfair_Display'] text-[#3e1f0e] leading-tight">
                    {product.name}
                </h1>
                {product.subname && (
                    <p className="text-lg text-[#DE9400] font-['Montserrat'] font-medium italic">
                        {product.subname}
                    </p>
                )}
            </div>

            {/* Rating */}
            {product.rating?.average && (
                <div className="flex items-center gap-4">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <span
                                key={i}
                                className={`text-xl ${i < Math.floor(product.rating.average) ? 'text-[#DE9400]' : 'text-gray-300'}`}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <span className="text-sm text-[#3e1f0e]/60 font-['Montserrat']">
                        {product.rating.average.toFixed(1)} ({product.rating.totalReviews} {locale === 'vi' ? 'đánh giá' : 'reviews'})
                    </span>
                </div>
            )}

            {/* Price */}
            <div className="space-y-2">
                <div className="flex items-baseline gap-4">
                    <span className="text-3xl text-[#3e1f0e] tracking-wide">
                        {product.price.toLocaleString('vi-VN')}₫
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-lg text-[#3e1f0e]/40 line-through font-['Montserrat']">
                            {product.originalPrice.toLocaleString('vi-VN')}₫
                        </span>
                    )}
                </div>

                {product.originalPrice && product.originalPrice > product.price && (
                    <div className="inline-flex items-center gap-2">
                        <span className="text-sm text-[#DE9400] font-['Montserrat'] font-medium bg-[#DE9400]/10 px-3 py-1 rounded-full">
                            {locale === 'vi' ? 'Tiết kiệm' : 'Save'} {((product.originalPrice - product.price) / product.originalPrice * 100).toFixed(0)}%
                        </span>
                        <span className="text-sm text-green-600 font-['Montserrat'] font-medium">
                            -{(product.originalPrice - product.price).toLocaleString('vi-VN')}₫
                        </span>
                    </div>
                )}
            </div>

            {/* Product Description */}
            <div className="prose prose-sm max-w-none">
                <p className="text-[#3e1f0e]/80 leading-relaxed font-['Montserrat'] text-base">
                    {product.description}
                </p>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#3e1f0e]/10">

                {product.weight && (
                    <div>
                        <span className="text-sm text-[#3e1f0e]/60 font-['Montserrat'] font-medium">
                            {locale === 'vi' ? 'Trọng lượng' : 'Weight'}
                        </span>
                        <p className="text-[#3e1f0e] font-['Montserrat'] font-medium mt-1">
                            {product.weight}g
                        </p>
                    </div>
                )}

                {product.categoryName && (
                    <div>
                        <span className="text-sm text-[#3e1f0e]/60 font-['Montserrat'] font-medium">
                            {locale === 'vi' ? 'Danh mục' : 'Category'}
                        </span>
                        <p className="text-[#3e1f0e] font-['Montserrat'] font-medium mt-1">
                            {product.categoryName}
                        </p>
                    </div>
                )}

                {product.quantityPerPackage && product.quantityPerPackage > 1 && (
                    <div>
                        <span className="text-sm text-[#3e1f0e]/60 font-['Montserrat'] font-medium">
                            {locale === 'vi' ? 'Số lượng/hộp' : 'Pieces/Box'}
                        </span>
                        <p className="text-[#3e1f0e] font-['Montserrat'] font-medium mt-1">
                            {product.quantityPerPackage} {locale === 'vi' ? 'viên' : 'pieces'}
                        </p>
                    </div>
                )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-base text-[#3e1f0e] font-['Montserrat'] font-medium">
                        {locale === 'vi' ? 'Số lượng:' : 'Quantity:'}
                    </span>

                    <div className="flex items-center border border-[#3e1f0e]/20 rounded-lg overflow-hidden bg-white shadow-sm">
                        <button
                            onClick={() => handleQuantityChange(-1)}
                            className="px-6 py-3 hover:bg-[#fff8f5] transition-colors text-[#3e1f0e] font-['Montserrat'] font-medium text-lg disabled:opacity-50"
                            disabled={quantity <= 1}
                        >
                            −
                        </button>
                        <span className="px-8 py-3 border-x border-[#3e1f0e]/20 bg-[#fff8f5] min-w-[4rem] text-center font-['Montserrat'] font-medium text-lg text-[#3e1f0e]">
                            {quantity}
                        </span>
                        <button
                            onClick={() => handleQuantityChange(1)}
                            className="px-6 py-3 hover:bg-[#fff8f5] transition-colors text-[#3e1f0e] font-['Montserrat'] font-medium text-lg"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Subtotal */}
                <div className="flex justify-between items-center p-4 bg-[#fff8f5] rounded-lg border border-[#3e1f0e]/10">
                    <span className="text-lg font-['Montserrat'] font-medium text-[#3e1f0e]">
                        {locale === 'vi' ? 'Tạm tính:' : 'Subtotal:'}
                    </span>
                    <span className="text-xl font-semibold text-[#DE9400]">
                        {(product.price * quantity).toLocaleString('vi-VN')}₫
                    </span>
                </div>
            </div>

            {/* Add to Cart Button */}
            <div className="pt-4">
                <AddToCartButton
                    product={{ ...product, quantity }}
                    locale={locale}
                />
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                <div className="flex items-center gap-3 text-sm text-[#3e1f0e]/70 font-['Montserrat']">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                    {locale === 'vi' ? 'Chất lượng đảm bảo' : 'Quality guaranteed'}
                </div>

                <div className="flex items-center gap-3 text-sm text-[#3e1f0e]/70 font-['Montserrat']">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                    {locale === 'vi' ? 'Miễn phí vận chuyển > 1.000.000₫' : 'Free shipping > 1.000.000₫'}
                </div>
            </div>
        </div>
    );
}