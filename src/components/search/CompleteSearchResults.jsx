// components/search/SearchResultsContent.jsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Filter, SortAsc, Grid, List, Star, Search } from 'lucide-react';

export default function SearchResultsContent({ locale, query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'relevance'
  });
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0
  });
  const [noResults, setNoResults] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories = [
    { value: '', label: locale === 'vi' ? 'Tất cả danh mục' : 'All Categories' },
    { value: 'bonbon', label: 'Bonbon' },
    { value: 'tablet', label: locale === 'vi' ? 'Thanh chocolate' : 'Chocolate Bars' },
    { value: 'dragees', label: locale === 'vi' ? 'Hạt phủ chocolate' : 'Coated Nuts' },
    { value: 'nama', label: 'Nama Chocolate' }
  ];

  const sortOptions = [
    { value: 'relevance', label: locale === 'vi' ? 'Phù hợp nhất' : 'Most Relevant' },
    { value: 'price_asc', label: locale === 'vi' ? 'Giá thấp đến cao' : 'Price: Low to High' },
    { value: 'price_desc', label: locale === 'vi' ? 'Giá cao đến thấp' : 'Price: High to Low' },
    { value: 'name', label: locale === 'vi' ? 'Tên A-Z' : 'Name A-Z' },
    { value: 'newest', label: locale === 'vi' ? 'Mới nhất' : 'Newest' }
  ];

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get('category') || '';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const sortBy = searchParams.get('sort') || 'relevance';
    
    setFilters({ category, minPrice, maxPrice, sortBy });
  }, [searchParams]);

  // Search when query or filters change
  useEffect(() => {
    if (query) {
      searchProducts();
    } else {
      setResults([]);
      setNoResults(false);
    }
  }, [query, filters, locale]);

  const searchProducts = async (page = 1) => {
    if (!query || query.length < 2) {
      setResults([]);
      setNoResults(false);
      return;
    }

    setLoading(true);
    setNoResults(false);
    
    try {
      const searchBody = {
        query: query,
        locale: locale,
        filters: {
          category: filters.category,
          minPrice: filters.minPrice ? parseInt(filters.minPrice) : undefined,
          maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : undefined
        },
        sortBy: filters.sortBy,
        page: page,
        limit: 12
      };

      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchBody)
      });

      const data = await response.json();
      
      if (data.success) {
        const products = data.data.products || [];
        setResults(products);
        setPagination(data.data.pagination || { page: 1, totalPages: 1, total: 0 });
        setNoResults(products.length === 0);
      } else {
        console.error('Search error:', data.error);
        setResults([]);
        setNoResults(true);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key === 'sortBy' ? 'sort' : key, value);
    } else {
      params.delete(key === 'sortBy' ? 'sort' : key);
    }
    
    router.push(`/${locale}/search?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'relevance'
    });
    
    // Clear URL params except query
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    router.push(`/${locale}/search?${params.toString()}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleProductClick = (product) => {
    const productSlug = product.slug || product.id;
    router.push(`/${locale}/products/${productSlug}`);
  };

  const handlePageChange = (newPage) => {
    searchProducts(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If no query, show empty state
  if (!query) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 opacity-20">
          <Search className="w-full h-full text-[#3e1f0e]" />
        </div>
        <h2 className="text-xl font-medium text-[#3e1f0e] mb-2 font-['Montserrat']">
          {locale === 'vi' ? 'Nhập từ khóa để tìm kiếm' : 'Enter keywords to search'}
        </h2>
        <p className="text-[#3e1f0e]/60 font-['Montserrat']">
          {locale === 'vi' 
            ? 'Tìm kiếm chocolate, truffle, bonbon và nhiều sản phẩm khác'
            : 'Search for chocolate, truffle, bonbon and many other products'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters & Controls */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Results count & view mode */}
          <div className="flex items-center justify-between">
            <p className="text-[#3e1f0e]/70 font-['Montserrat']">
              {loading ? (
                locale === 'vi' ? 'Đang tìm kiếm...' : 'Searching...'
              ) : noResults ? (
                locale === 'vi' ? 'Không tìm thấy sản phẩm nào' : 'No products found'
              ) : (
                locale === 'vi' 
                  ? `Tìm thấy ${pagination.total} sản phẩm`
                  : `Found ${pagination.total} products`
              )}
            </p>

            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#DE9400] text-white' : 'text-[#3e1f0e]'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#DE9400] text-white' : 'text-[#3e1f0e]'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop Filters */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Category Filter */}
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-['Montserrat'] focus:ring-2 focus:ring-[#DE9400] focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>

            {/* Price Range */}
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder={locale === 'vi' ? 'Giá từ' : 'Min price'}
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm font-['Montserrat'] focus:ring-2 focus:ring-[#DE9400] focus:border-transparent"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder={locale === 'vi' ? 'Giá đến' : 'Max price'}
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm font-['Montserrat'] focus:ring-2 focus:ring-[#DE9400] focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-['Montserrat'] focus:ring-2 focus:ring-[#DE9400] focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            {/* Clear Filters */}
            {(filters.category || filters.minPrice || filters.maxPrice || filters.sortBy !== 'relevance') && (
              <button
                onClick={clearFilters}
                className="text-[#3e1f0e]/60 hover:text-[#DE9400] text-sm font-['Montserrat'] underline"
              >
                {locale === 'vi' ? 'Xóa bộ lọc' : 'Clear filters'}
              </button>
            )}

            {/* View Mode */}
            <div className="flex items-center space-x-2 border-l border-gray-300 pl-4">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#DE9400] text-white' : 'text-[#3e1f0e]'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#DE9400] text-white' : 'text-[#3e1f0e]'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center justify-center space-x-2 bg-[#DE9400] text-white px-4 py-2 rounded-lg font-['Montserrat']"
          >
            <Filter className="w-4 h-4" />
            <span>{locale === 'vi' ? 'Bộ lọc' : 'Filters'}</span>
          </button>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 space-y-4">
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 font-['Montserrat']"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>

            <div className="flex space-x-2">
              <input
                type="number"
                placeholder={locale === 'vi' ? 'Giá từ' : 'Min price'}
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 font-['Montserrat']"
              />
              <input
                type="number"
                placeholder={locale === 'vi' ? 'Giá đến' : 'Max price'}
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 font-['Montserrat']"
              />
            </div>

            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 font-['Montserrat']"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            {(filters.category || filters.minPrice || filters.maxPrice || filters.sortBy !== 'relevance') && (
              <button
                onClick={clearFilters}
                className="w-full text-[#3e1f0e]/60 hover:text-[#DE9400] font-['Montserrat'] underline"
              >
                {locale === 'vi' ? 'Xóa tất cả bộ lọc' : 'Clear all filters'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-sm animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : noResults ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 opacity-20">
            <Search className="w-full h-full text-[#3e1f0e]" />
          </div>
          <h3 className="text-xl font-medium text-[#3e1f0e] mb-2 font-['Montserrat']">
            {locale === 'vi' ? 'Không tìm thấy sản phẩm' : 'No products found'}
          </h3>
          <p className="text-[#3e1f0e]/60 mb-4 font-['Montserrat']">
            {locale === 'vi' 
              ? `Không tìm thấy sản phẩm nào phù hợp với "${query}"`
              : `No products found matching "${query}"`
            }
          </p>
          <p className="text-sm text-[#3e1f0e]/40 font-['Montserrat'] mb-6">
            {locale === 'vi' 
              ? 'Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm'
              : 'Try adjusting your filters or search terms'
            }
          </p>
          {(filters.category || filters.minPrice || filters.maxPrice || filters.sortBy !== 'relevance') && (
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-[#DE9400] text-white rounded-lg hover:bg-[#DE9400]/90 transition font-['Montserrat']"
            >
              {locale === 'vi' ? 'Xóa tất cả bộ lọc' : 'Clear all filters'}
            </button>
          )}
        </div>
      ) : results.length > 0 ? (
        <>
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }>
            {results.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className={`bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer group ${
                  viewMode === 'list' ? 'flex items-center p-4 space-x-4' : 'p-4'
                }`}
              >
                <div className={`relative overflow-hidden rounded ${
                  viewMode === 'list' ? 'w-24 h-24 flex-shrink-0' : 'w-full h-48 mb-4'
                }`}>
                  {product.image?.url ? (
                    <Image
                      src={product.image.url}
                      alt={product.image.alt || product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No image</span>
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex gap-1">
                    {product.badges?.isFeatured && (
                      <span className="bg-[#DE9400] text-white text-xs px-2 py-1 rounded">
                        {locale === 'vi' ? 'Nổi bật' : 'Featured'}
                      </span>
                    )}
                    {product.badges?.isNew && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                        {locale === 'vi' ? 'Mới' : 'New'}
                      </span>
                    )}
                    {product.badges?.isBestseller && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                        {locale === 'vi' ? 'Bán chạy' : 'Bestseller'}
                      </span>
                    )}
                  </div>
                </div>

                <div className={viewMode === 'list' ? 'flex-1' : ''}>
                  <h3 className="font-medium text-[#3e1f0e] mb-1 font-['Montserrat'] group-hover:text-[#DE9400] transition">
                    {product.name}
                  </h3>

                  {product.subname && (
                    <p className="text-sm text-[#3e1f0e]/60 mb-2 font-['Montserrat']">
                      {product.subname}
                    </p>
                  )}

                  {viewMode === 'list' && product.description && (
                    <p className="text-sm text-[#3e1f0e]/60 mb-2 line-clamp-2 font-['Montserrat']">
                      {product.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="font-['Montserrat']">
                      {product.originalPrice && product.originalPrice > product.price ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-[#DE9400] font-semibold">
                            {formatPrice(product.price)}
                          </span>
                          <span className="text-gray-400 line-through text-sm">
                            {formatPrice(product.originalPrice)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[#DE9400] font-semibold">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>

                    {/* Rating */}
                    {product.rating?.average && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-['Montserrat']">{product.rating.average.toFixed(1)}</span>
                        {product.rating.totalReviews > 0 && (
                          <span className="ml-1 text-xs text-gray-400">({product.rating.totalReviews})</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Category */}
                  {product.categoryName && (
                    <p className="text-xs text-[#3e1f0e]/40 mt-2 font-['Montserrat']">
                      {product.categoryName}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={!pagination.hasPrev}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#DE9400] hover:text-white hover:border-[#DE9400] transition font-['Montserrat']"
              >
                {locale === 'vi' ? 'Trước' : 'Previous'}
              </button>

              {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 border rounded-lg font-['Montserrat'] transition ${
                      pagination.page === pageNum
                        ? 'bg-[#DE9400] text-white border-[#DE9400]'
                        : 'border-gray-300 hover:bg-[#DE9400] hover:text-white hover:border-[#DE9400]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={!pagination.hasNext}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#DE9400] hover:text-white hover:border-[#DE9400] transition font-['Montserrat']"
              >
                {locale === 'vi' ? 'Tiếp' : 'Next'}
              </button>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}