'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CartModal({ isOpen, onClose }) {
    const {
        cart,
        totalItems,
        totalPrice,
        totalSavings,
        incrementQuantity,
        decrementQuantity,
        removeFromCart
    } = useCart();

    const params = useParams();
    const router = useRouter();
    const locale = params?.locale || 'vi';

    const [isAnimating, setIsAnimating] = useState(false);

    const FREE_SHIPPING_THRESHOLD = 1000000; // 1,000,000 VND
    const isEligibleForFreeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD;
    const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - totalPrice;

    // Handle modal animations
    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const handleCheckout = () => {
        handleClose();
        router.push(`/${locale}/checkout`);
    };

    const handleContinueShopping = () => {
        handleClose();
        router.push(`/${locale}/products`);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${isAnimating ? 'opacity-60' : 'opacity-0'
                    }`}
                onClick={handleClose}
            />

            {/* Modal Content */}
            <div className={`
                relative bg-[#fff8f5] rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden
                transform transition-all duration-300 
                ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
            `}>
                {/* Header */}
                <div className="bg-[#3e1f0e] text-[#fff8f5] px-8 py-6 relative overflow-hidden">

                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-light tracking-wide">
                                {locale === 'vi' ? 'Giỏ hàng của bạn' : 'Your Cart'}
                            </h2>
                            <p className="text-[#fff8f5]/70 text-sm mt-1">
                                {totalItems} {locale === 'vi' ? 'sản phẩm' : 'items'}
                            </p>
                        </div>

                        <button
                            onClick={handleClose}
                            className="text-[#fff8f5] hover:text-[#DE9400] transition-colors p-2"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Free Shipping Bar */}
                {!isEligibleForFreeShipping && remainingForFreeShipping > 0 && (
                    <div className="bg-gradient-to-r from-[#DE9400]/20 to-yellow-400/20 px-8 py-4 border-b border-[#3e1f0e]/10">
                        <div className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>

                            <div className="flex-1">
                                <p className="text-sm text-[#3e1f0e] font-medium">
                                    {locale === 'vi'
                                        ? `Mua thêm ${remainingForFreeShipping.toLocaleString('vi-VN')}₫ để được miễn phí vận chuyển!`
                                        : `Add ${remainingForFreeShipping.toLocaleString('vi-VN')}₫ more for free shipping!`
                                    }
                                </p>
                                <div className="w-full bg-[#3e1f0e]/20 rounded-full h-2 mt-2">
                                    <div
                                        className="bg-gradient-to-r from-[#DE9400] to-yellow-400 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${(totalPrice / FREE_SHIPPING_THRESHOLD) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Free Shipping Achievement */}
                {isEligibleForFreeShipping && (
                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-8 py-4 border-b border-[#3e1f0e]/10">
                        <div className="flex items-center gap-3">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-green-700 font-medium">
                                {locale === 'vi' ? '🎉 Chúc mừng! Bạn được miễn phí vận chuyển' : '🎉 Congratulations! You qualify for free shipping'}
                            </p>
                        </div>
                    </div>
                )}

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto max-h-96 px-8 py-6">
                    {cart.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-[#3e1f0e]/30 text-6xl mb-4">🛒</div>
                            <h3 className="text-xl font-light text-[#3e1f0e] mb-2">
                                {locale === 'vi' ? 'Giỏ hàng trống' : 'Your cart is empty'}
                            </h3>
                            <p className="text-[#3e1f0e]/60 mb-6">
                                {locale === 'vi'
                                    ? 'Hãy khám phá bộ sưu tập chocolate cao cấp của chúng tôi'
                                    : 'Discover our premium chocolate collection'
                                }
                            </p>
                            <button
                                onClick={handleContinueShopping}
                                className="bg-[#DE9400] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#c58400] transition-colors"
                            >
                                {locale === 'vi' ? 'Bắt đầu mua sắm' : 'Start Shopping'}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cart.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    locale={locale}
                                    onIncrement={() => incrementQuantity(item.id)}
                                    onDecrement={() => decrementQuantity(item.id)}
                                    onRemove={() => removeFromCart(item.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer with totals and actions */}
                {cart.length > 0 && (
                    <div className="border-t border-[#3e1f0e]/10 px-8 py-6 bg-[#fff8f5]">
                        {/* Savings */}
                        {totalSavings > 0 && (
                            <div className="flex justify-between items-center mb-3 text-green-600">
                                <span className="font-medium">
                                    {locale === 'vi' ? 'Bạn tiết kiệm:' : 'You save:'}
                                </span>
                                <span className="font-bold">
                                    {totalSavings.toLocaleString('vi-VN')}₫
                                </span>
                            </div>
                        )}

                        {/* Total */}
                        <div className="flex justify-between items-center mb-6 text-lg">
                            <span className="font-light text-[#3e1f0e]">
                                {locale === 'vi' ? 'Tổng cộng:' : 'Total:'}
                            </span>
                            <span className="font-bold text-2xl text-[#3e1f0e]">
                                {totalPrice.toLocaleString('vi-VN')}₫
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleContinueShopping}
                                className="flex-1 bg-white border border-[#3e1f0e]/20 text-[#3e1f0e] px-6 py-3 rounded-lg font-medium hover:bg-[#fff8f5] hover:border-[#DE9400] transition-all duration-300"
                            >
                                {locale === 'vi' ? 'Tiếp tục mua' : 'Continue Shopping'}
                            </button>

                            <button
                                onClick={handleCheckout}
                                className="flex-1 bg-gradient-to-r from-[#3e1f0e] to-[#2d1609] text-[#fff8f5] px-6 py-3 rounded-lg font-medium hover:from-[#DE9400] hover:to-[#c58400] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                {locale === 'vi' ? 'Thanh toán' : 'Checkout'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Cart Item Component
function CartItem({ item, locale, onIncrement, onDecrement, onRemove }) {
    return (
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-[#3e1f0e]/10 hover:shadow-md transition-shadow">
            {/* Product Image */}
            <div className="w-20 h-20 bg-[#fff8f5] rounded-lg overflow-hidden flex-shrink-0">
                {item.image?.url ? (
                    <img
                        src={item.image.url}
                        alt={item.name}
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#3e1f0e]/30">
                        🍫
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
                <h4 className="font-medium text-[#3e1f0e] text-sm mb-1 line-clamp-2">
                    {item.name}
                </h4>
                {item.subname && (
                    <p className="text-xs text-[#DE9400] mb-2 italic">
                        {item.subname}
                    </p>
                )}
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[#3e1f0e]">
                        {item.price.toLocaleString('vi-VN')}₫
                    </span>
                    {item.originalPrice && item.originalPrice > item.price && (
                        <span className="text-xs text-[#3e1f0e]/40 line-through">
                            {item.originalPrice.toLocaleString('vi-VN')}₫
                        </span>
                    )}
                </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
                <button
                    onClick={onDecrement}
                    className="w-8 h-8 rounded-full border border-[#3e1f0e]/20 flex items-center justify-center hover:bg-[#fff8f5] transition-colors text-[#3e1f0e]"
                    disabled={item.quantity <= 1}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    </svg>
                </button>
                <span className="w-8 text-center text-sm font-medium text-[#3e1f0e]">
                    {item.quantity}
                </span>
                <button
                    onClick={onIncrement}
                    className="w-8 h-8 rounded-full border border-[#3e1f0e]/20 flex items-center justify-center hover:bg-[#fff8f5] transition-colors text-[#3e1f0e]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                </button>
            </div>

            {/* Subtotal */}
            <div className="text-right min-w-[80px]">
                <div className="font-bold text-[#3e1f0e]">
                    {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                </div>
            </div>

            {/* Remove Button */}
            <button
                onClick={onRemove}
                className="w-8 h-8 rounded-full hover:bg-red-50 flex items-center justify-center text-red-500 hover:text-red-700 transition-colors"
                title={locale === 'vi' ? 'Xóa sản phẩm' : 'Remove item'}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </button>
        </div>
    );
}
