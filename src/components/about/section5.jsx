'use client';
import { useTranslations } from '@/lib/useTranslations';
import ProductList from './ProductList';
import ProductShowcase from './productshowcase'; // bạn đã có sẵn
import React, { useState } from 'react';

export default function ProductsSection() {
  const t = useTranslations('Aboutus');
  const categories = ['bonbon', 'bar', 'nuts', 'nama'];
  const [activeCategory, setActiveCategory] = useState('bonbon');

  // 👇 State để hiển thị popup showcase
  const [selectedBoxType, setSelectedBoxType] = useState(null);
  const [showShowcase, setShowShowcase] = useState(false);

  const handleShowcaseOpen = (boxType) => {
    setSelectedBoxType(boxType); // ví dụ: 'box6cb1'
    setShowShowcase(true);
  };

  const handleShowcaseClose = () => {
    setShowShowcase(false);
  };

  return (
    <section
      className="py-12 bg-white relative z-0"
      aria-label={t('section5.section_aria')}
    >
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-gray-800 mb-8">
          {t('section5.title')}
        </h2>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-[Playfair_Display] font-medium text-sm transition-all duration-300 ${activeCategory === category
                ? 'bg-amber-500 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-amber-100 hover:text-amber-700 shadow-md'
                }`}
            >
              {t(`section5.categorybtn.${category}`)}
            </button>
          ))}
        </div>

        {/* Product List */}
        <ProductList
          t={t}
          category={activeCategory}
          onShowcaseOpen={handleShowcaseOpen} // 👈 truyền vào ProductCard
        />
      </div>

      {/* Modal popup showcase */}
      {showShowcase && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
          onClick={handleShowcaseClose} // click ra ngoài thì đóng
        >
          <div
            className="bg-[#fff8f0] border-[3px] border-[#e8cfae] rounded-[32px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] p-6 max-w-3xl w-full relative"
            onClick={(e) => e.stopPropagation()} // chặn sự kiện lan xuống
          >
            {/* Close button */}
            <button
              onClick={handleShowcaseClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition flex items-center justify-center"
            >
              <span className="pointer-events-none">✕</span>
            </button>

            {/* Showcase content */}
            <ProductShowcase boxType={selectedBoxType} />
          </div>
        </div>
      )}
    </section>
  );
}