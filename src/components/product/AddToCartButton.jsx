// src/components/AddToCartButton.jsx
'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function AddToCartButton({ product, locale = 'vi' }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);

    try {
      // Gọi addToCart với quantity từ product
      for (let i = 0; i < (product.quantity || 1); i++) {
        addToCart(product);
      }

      // Show success state
      setJustAdded(true);

      // Reset after 2 seconds
      setTimeout(() => {
        setJustAdded(false);
      }, 2000);

    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  // Success state
  if (justAdded) {
    return (
      <button
        disabled
        className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg font-light tracking-wide flex items-center justify-center gap-3 transition-all duration-300 shadow-lg"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="text-sm uppercase">
          {locale === 'vi' ? 'Đã thêm vào giỏ' : 'Added to Cart'}
        </span>
      </button>
    );
  }

  // Loading state
  if (isAdding) {
    return (
      <button
        disabled
        className="w-full bg-[#DE9400]/80 text-white px-8 py-4 rounded-lg font-light tracking-wide flex items-center justify-center gap-3 transition-all duration-300"
      >
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm uppercase">
          {locale === 'vi' ? 'Đang thêm...' : 'Adding...'}
        </span>
      </button>
    );
  }

  // Default state - Premium luxury style
  return (
    <button
      onClick={handleAddToCart}
      className="group relative w-full bg-[#3e1f0e] hover:bg-[#DE9400] text-white px-8 py-4 rounded-lg font-light tracking-wide uppercase text-sm transition-all duration-500 overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1"
    >
      {/* Golden shimmer effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></span>

      <div className="relative flex items-center justify-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>

        <span>
          {locale === 'vi' ? 'Thêm vào giỏ hàng' : 'Add to Cart'}
          {product.quantity > 1 && (
            <span className="ml-2 text-xs opacity-75 bg-white/20 px-2 py-1 rounded-full">
              {product.quantity}
            </span>
          )}
        </span>
      </div>

      {/* Bottom border highlight */}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#DE9400] to-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
    </button>
  );
}