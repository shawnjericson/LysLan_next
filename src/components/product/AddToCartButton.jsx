'use client';
import { useCart } from '@/context/CartContext';

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="bg-black text-white px-4 py-2 mt-2"
    >
      Thêm vào giỏ
    </button>
  );
}