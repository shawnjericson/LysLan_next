// src/components/ProductList.jsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { getProducts, getCategories } from '../../../lib/api';
import AddToCartButton from './AddToCartButton';
import './product.css';

export default function ProductList() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = params?.locale || 'vi';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(searchParams.get('category') || 'all');
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [mounted, setMounted] = useState(false);

  // Đảm bảo component đã mount để tránh hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load categories on mount
  useEffect(() => {
    if (mounted) {
      loadCategories();
    }
  }, [locale, mounted]);

  // Load products when category changes
  useEffect(() => {
    if (mounted) {
      loadProducts(currentCategory);
    }
  }, [currentCategory, locale, mounted]);

  // Sync URL with state
  useEffect(() => {
    if (mounted) {
      const urlCategory = searchParams.get('category') || 'all';
      if (urlCategory !== currentCategory) {
        setCurrentCategory(urlCategory);
      }
    }
  }, [searchParams, mounted]);

  const loadCategories = async () => {
    try {
      const categoriesData = await getCategories(locale);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadProducts = async (category, page = 1) => {
    setLoading(true);
    try {
      const data = await getProducts(locale, category, page);
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categorySlug) => {
    setCurrentCategory(categorySlug);

    // Update URL with new category
    const newUrl = `/${locale}/products?category=${categorySlug}`;
    router.push(newUrl, { scroll: false });
  };

  const handlePageChange = (page) => {
    loadProducts(currentCategory, page);

    // Update URL with pagination
    const newUrl = `/${locale}/products?category=${currentCategory}&page=${page}`;
    router.push(newUrl, { scroll: false });
  };

  // Không render gì cho đến khi component mount
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#fff8f5] flex items-center justify-center">
        <div className="text-[#3e1f0e] text-lg animate-pulse font-['Montserrat']">
          {locale === 'vi' ? 'Đang tải...' : 'Loading...'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      {/* Premium Category Navigation */}
      <div className="bg-[#3e1f0e] shadow-lg relative overflow-hidden">
        {/* Continuous Golden Dust Animation Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#DE9400] rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            />
          ))}
          {[...Array(30)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute text-[#DE9400] opacity-10 animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                fontSize: `${8 + Math.random() * 6}px`
              }}
            >
              ✨
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-wrap justify-center">
            {categories.map(category => (
              <CategoryButton
                key={category.slug}
                category={category}
                isActive={currentCategory === category.slug}
                onClick={() => handleCategoryChange(category.slug)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Current Category Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] text-[#3e1f0e] mb-4 tracking-wide">
            {categories.find(cat => cat.slug === currentCategory)?.name ||
              (locale === 'vi' ? 'Sản phẩm' : 'Products')}
          </h1>
          <div className="w-24 h-px bg-[#DE9400] mx-auto mb-6"></div>
          <p className="text-[#3e1f0e]/70 text-lg font-['Montserrat'] font-light">
            {products.length} {locale === 'vi' ? 'sản phẩm cao cấp' : 'premium products'}
          </p>
        </div>

        {/* Loading State */}
        {loading && products.length === 0 && (
          <div className="flex justify-center items-center py-24">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-2 border-[#DE9400] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-[#3e1f0e]/70 font-['Montserrat'] font-light">
                {locale === 'vi' ? 'Đang tải sản phẩm...' : 'Loading products...'}
              </p>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                locale={locale}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {products.length === 0 && !loading && (
          <div className="text-center py-24">
            <div className="text-[#3e1f0e]/30 text-8xl mb-8">🍫</div>
            <h3 className="text-2xl font-['Playfair_Display'] text-[#3e1f0e] mb-4">
              {locale === 'vi' ? 'Không có sản phẩm nào' : 'No products found'}
            </h3>
            <p className="text-[#3e1f0e]/70 mb-8 font-['Montserrat']">
              {locale === 'vi'
                ? 'Không tìm thấy sản phẩm nào trong danh mục này.'
                : 'No products found in this category.'}
            </p>
            <button
              onClick={() => handleCategoryChange('all')}
              className="inline-flex items-center px-8 py-3 bg-[#DE9400] text-white font-['Montserrat'] font-medium rounded-lg hover:bg-[#c58400] transition-colors"
            >
              {locale === 'vi' ? 'Xem tất cả sản phẩm' : 'View all products'}
            </button>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center mt-16 gap-3">
            {pagination.hasPrev && (
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                className="px-6 py-3 bg-white text-[#3e1f0e] border border-[#3e1f0e]/20 rounded-lg hover:bg-[#fff8f5] hover:border-[#DE9400] transition-all duration-300 font-['Montserrat'] font-medium"
              >
                {locale === 'vi' ? 'Trước' : 'Previous'}
              </button>
            )}

            <span className="px-6 py-3 bg-[#DE9400] text-white rounded-lg font-['Montserrat'] font-medium">
              {pagination.page} / {pagination.totalPages}
            </span>

            {pagination.hasNext && (
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                className="px-6 py-3 bg-white text-[#3e1f0e] border border-[#3e1f0e]/20 rounded-lg hover:bg-[#fff8f5] hover:border-[#DE9400] transition-all duration-300 font-['Montserrat'] font-medium"
              >
                {locale === 'vi' ? 'Sau' : 'Next'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Premium Category Button Component
function CategoryButton({ category, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-8 py-6 text-sm md:text-base font-['Montserrat'] font-medium tracking-wide uppercase transition-all duration-500 overflow-hidden group
        ${isActive
          ? 'text-[#DE9400] bg-[#DE9400]/10'
          : 'text-[#fff8f5] hover:text-[#DE9400]'
        }
      `}
      style={{
        background: isActive ? 'rgba(222, 148, 0, 0.1)' : 'transparent'
      }}
    >
      {/* Animated background particles */}
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-[#DE9400] rounded-full animate-pulse"
            style={{
              left: `${20 + (i * 12)}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: '2s'
            }}
          />
        ))}
      </span>

      {/* Golden light sweep effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#DE9400]/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out"></span>

      {/* Subtle glow effect */}
      <span className="absolute inset-0 bg-gradient-radial from-[#DE9400]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

      {/* Category name with subtle bounce */}
      <span className="relative z-10 inline-block group-hover:animate-pulse">
        {category.name}
      </span>

      {/* Bottom border for active state */}
      {isActive && (
        <>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-[#DE9400] animate-pulse"></span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-yellow-300 blur-sm"></span>
        </>
      )}

      {/* Hover bottom border */}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#DE9400] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></span>
    </button>
  );
}

// Premium Product Card Component
function ProductCard({ product, locale }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  // Tạo URL cho product detail
  const productUrl = `/${locale}/products/${product.slug}`;

  return (
    <div className="group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-[#3e1f0e]/10 hover:border-[#DE9400]/30 product-card">
      {/* Product Image - Clickable */}
      <a href={productUrl} className="block">
        {product.image.url ? (
          <div className="aspect-square overflow-hidden relative bg-[#fff8f5] cursor-pointer">
            <img
              src={product.image.url}
              alt={product.image.alt}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 p-4"
            />

            {/* Enhanced Premium Badges */}
            {(product.badges.isFeatured || product.badges.isNew || product.badges.isBestseller) && (
              <div className="absolute top-4 left-4 flex flex-col gap-3">
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

            {/* View Details Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-3 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                <span className="text-[#3e1f0e] font-['Montserrat'] font-medium text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {locale === 'vi' ? 'Xem chi tiết' : 'View Details'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="aspect-square bg-gradient-to-br from-[#fff8f5] to-[#f5f5f0] flex items-center justify-center cursor-pointer group-hover:bg-gradient-to-br group-hover:from-[#f5f5f0] group-hover:to-[#fff8f5] transition-all duration-300">
            <div className="text-[#3e1f0e]/30 text-4xl group-hover:text-[#DE9400]/50 transition-colors">🍫</div>
          </div>
        )}
      </a>

      <div className="p-6">
        {/* Product Name - Clickable */}
        <a href={productUrl} className="block">
          <h3 className="font-['Playfair_Display'] text-xl mb-3 text-[#3e1f0e] line-clamp-2 hover:text-[#DE9400] transition-colors duration-300 tracking-wide cursor-pointer">
            {product.name}
          </h3>
        </a>

        {/* Subname */}
        {product.subname && (
          <p className="text-[#DE9400] text-sm font-['Montserrat'] font-medium mb-3 italic">
            {product.subname}
          </p>
        )}

        {/* Description */}
        <p className="text-[#3e1f0e]/70 text-sm mb-6 line-clamp-3 leading-relaxed font-['Montserrat'] font-light">
          {product.description}
        </p>

        {/* Rating */}
        {product.rating.average && (
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${i < Math.floor(product.rating.average) ? 'text-[#DE9400]' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-[#3e1f0e]/60 ml-3 font-['Montserrat'] font-light">
              {product.rating.average.toFixed(1)} ({product.rating.totalReviews} {locale === 'vi' ? 'đánh giá' : 'reviews'})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-3">
            <span className="text-2xl text-[#3e1f0e] tracking-wide price-main">
              {product.price.toLocaleString('vi-VN')}₫
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-[#3e1f0e]/40 line-through font-['Montserrat'] font-light">
                {product.originalPrice.toLocaleString('vi-VN')}₫
              </span>
            )}
          </div>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-[#DE9400] font-['Montserrat'] font-medium bg-[#DE9400]/10 px-2 py-1 rounded-full mt-2 inline-block">
              {locale === 'vi' ? 'Tiết kiệm' : 'Save'} {((product.originalPrice - product.price) / product.originalPrice * 100).toFixed(0)}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 mb-6">
          {/* View Details Button */}
          <a
            href={productUrl}
            className="flex-1 bg-white border border-[#3e1f0e]/20 text-[#3e1f0e] px-4 py-2 rounded-lg font-['Montserrat'] font-medium text-sm hover:bg-[#fff8f5] hover:border-[#DE9400] transition-all duration-300 text-center flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {locale === 'vi' ? 'Chi tiết' : 'Details'}
          </a>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-[#3e1f0e]/70 font-light">
            {locale === 'vi' ? 'Số lượng:' : 'Quantity:'}
          </span>
          <div className="flex items-center border border-[#3e1f0e]/20 rounded-lg overflow-hidden">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="px-4 py-2 hover:bg-[#fff8f5] transition-colors text-[#3e1f0e] font-light"
              disabled={quantity <= 1}
            >
              −
            </button>
            <span className="px-6 py-2 border-x border-[#3e1f0e]/20 bg-[#fff8f5] min-w-[3rem] text-center font-light text-[#3e1f0e]">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="px-4 py-2 hover:bg-[#fff8f5] transition-colors text-[#3e1f0e] font-light"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <AddToCartButton
          product={{ ...product, quantity }}
          locale={locale}
        />
      </div>
    </div>
  );
}