// components/search/EnhancedSmartSearchOverlay.jsx - Với auto-complete
'use client';
import { useState, useEffect, useRef } from 'react';
import { useTranslations } from '@/lib/useTranslations';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Search, X, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { getSearchSuggestions, getTrendingSearches } from '@/lib/searchSuggestions';

export default function EnhancedSmartSearchOverlay({ locale }) {
    const t = useTranslations('navbar');
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
    const inputRef = useRef(null);
    const debounceRef = useRef(null);
    const suggestionsRef = useRef(null);

    // Get trending searches
    const trendingSearches = getTrendingSearches(locale, 'daily');

    // Focus input when overlay opens
    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);

    // Load recent searches
    useEffect(() => {
        try {
            const saved = localStorage.getItem(`recentSearches_${locale}`);
            if (saved) {
                setRecentSearches(JSON.parse(saved));
            }
        } catch (err) {
            console.warn('Failed to load recent searches:', err);
        }
    }, [locale]);

    // Update suggestions based on query
    useEffect(() => {
        if (query.length >= 1) {
            const newSuggestions = getSearchSuggestions(query, locale, 6);
            setSuggestions(newSuggestions);
            setShowSuggestions(true);
            setSelectedSuggestion(-1);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [query, locale]);

    // Debounced search for results
    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (query.length >= 2) {
            debounceRef.current = setTimeout(() => {
                performSearch(query);
            }, 300);
        } else {
            setResults([]);
        }

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [query, locale]);

    const performSearch = async (searchQuery) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&lang=${locale}&limit=6`);
            const data = await response.json();
            
            if (data.success) {
                setResults(data.data.products || []);
            } else {
                console.error('Search API error:', data.error);
                setResults([]);
            }
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (searchQuery) => {
        if (!searchQuery.trim()) return;

        // Save to recent searches
        try {
            const newRecentSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
            setRecentSearches(newRecentSearches);
            localStorage.setItem(`recentSearches_${locale}`, JSON.stringify(newRecentSearches));
        } catch (err) {
            console.warn('Failed to save recent search:', err);
        }

        // Navigate to search results page
        setOpen(false);
        router.push(`/${locale}/search?q=${encodeURIComponent(searchQuery)}`);
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.term);
        setShowSuggestions(false);
        handleSearch(suggestion.term);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (showSuggestions && suggestions.length > 0) {
                setSelectedSuggestion(prev => 
                    prev < suggestions.length - 1 ? prev + 1 : 0
                );
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (showSuggestions && suggestions.length > 0) {
                setSelectedSuggestion(prev => 
                    prev > 0 ? prev - 1 : suggestions.length - 1
                );
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedSuggestion >= 0 && suggestions[selectedSuggestion]) {
                handleSuggestionClick(suggestions[selectedSuggestion]);
            } else {
                handleSearch(query);
            }
        } else if (e.key === 'Escape') {
            if (showSuggestions) {
                setShowSuggestions(false);
                setSelectedSuggestion(-1);
            } else {
                setOpen(false);
            }
        }
    };

    const handleQuickSearch = (searchTerm) => {
        setQuery(searchTerm);
        handleSearch(searchTerm);
    };

    const formatPrice = (price) => {
        try {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(price);
        } catch (err) {
            return `${price} VND`;
        }
    };

    const handleProductClick = (product) => {
        setOpen(false);
        const productSlug = product.slug || product.id;
        router.push(`/${locale}/products/${productSlug}`);
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'type': return '🍫';
            case 'product': return '🎁';
            case 'flavor': return '🌟';
            case 'occasion': return '💝';
            case 'quality': return '⭐';
            case 'set': return '📦';
            default: return '🔍';
        }
    };

    return (
        <>
            {/* Search Button */}
            <button
                aria-label={t('search.searcharia') || 'Search'}
                title={t('search.searchtitle') || 'Search products'}
                onClick={() => setOpen(true)}
                className="text-[#3e1f0e] hover:bg-[#DE9400] hover:text-white p-2 rounded-full transition"
            >
                <Search className="w-6 h-6" />
            </button>

            {/* Search Overlay */}
            {open && (
                <div className="fixed inset-0 z-[9999] bg-[#fdf8f3]/95 backdrop-blur-sm">
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-[#3e1f0e]/10">
                            <h2 className="text-xl font-[Playfair_Display] text-[#3e1f0e]">
                                {t('search.searchh2') || 'Tìm kiếm sản phẩm'}
                            </h2>
                            <button
                                onClick={() => setOpen(false)}
                                className="p-2 hover:bg-[#3e1f0e]/10 rounded-full transition"
                            >
                                <X className="w-6 h-6 text-[#3e1f0e]" />
                            </button>
                        </div>

                        {/* Search Input with Suggestions */}
                        <div className="p-4">
                            <div className="relative max-w-2xl mx-auto">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#3e1f0e]/50 z-10" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    onFocus={() => query.length >= 1 && setShowSuggestions(true)}
                                    placeholder={t('search.placeholder') || 'Tìm chocolate, truffle, quà tặng...'}
                                    className="w-full pl-12 pr-4 py-4 border border-[#ddd] rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-[#DE9400] transition font-['Montserrat']"
                                />
                                {loading && (
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                        <div className="w-5 h-5 border-2 border-[#DE9400] border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}

                                {/* Auto-complete Suggestions */}
                                {showSuggestions && suggestions.length > 0 && (
                                    <div 
                                        ref={suggestionsRef}
                                        className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 max-h-64 overflow-y-auto z-20"
                                    >
                                        {suggestions.map((suggestion, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleSuggestionClick(suggestion)}
                                                className={`w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition ${
                                                    selectedSuggestion === index ? 'bg-[#DE9400]/10' : ''
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <span className="text-lg">{getCategoryIcon(suggestion.category)}</span>
                                                        <div>
                                                            <div className="font-medium text-[#3e1f0e] font-['Montserrat']">
                                                                {suggestion.term}
                                                            </div>
                                                            <div className="text-sm text-[#3e1f0e]/60 font-['Montserrat']">
                                                                {suggestion.description}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 text-[#3e1f0e]/40" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="max-w-4xl mx-auto">
                                {query.length < 2 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Recent Searches */}
                                        {recentSearches.length > 0 && (
                                            <div>
                                                <h3 className="text-lg font-medium text-[#3e1f0e] mb-4 flex items-center font-['Montserrat']">
                                                    <Clock className="w-5 h-5 mr-2" />
                                                    {locale === 'vi' ? 'Tìm kiếm gần đây' : 'Recent Searches'}
                                                </h3>
                                                <div className="space-y-2">
                                                    {recentSearches.map((search, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => handleQuickSearch(search)}
                                                            className="block w-full text-left p-3 hover:bg-[#3e1f0e]/5 rounded-lg transition font-['Montserrat'] group"
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <span>{search}</span>
                                                                <ArrowRight className="w-4 h-4 text-[#3e1f0e]/40 group-hover:text-[#DE9400] transition" />
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Trending Searches */}
                                        <div>
                                            <h3 className="text-lg font-medium text-[#3e1f0e] mb-4 flex items-center font-['Montserrat']">
                                                <TrendingUp className="w-5 h-5 mr-2" />
                                                {locale === 'vi' ? 'Tìm kiếm thịnh hành' : 'Trending Searches'}
                                            </h3>
                                            <div className="space-y-2">
                                                {trendingSearches.map((search, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleQuickSearch(search)}
                                                        className="block w-full text-left p-3 hover:bg-[#3e1f0e]/5 rounded-lg transition font-['Montserrat'] group"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-2">
                                                                <span className="w-6 h-6 bg-[#DE9400] text-white text-xs rounded-full flex items-center justify-center font-bold">
                                                                    {index + 1}
                                                                </span>
                                                                <span>{search}</span>
                                                            </div>
                                                            <ArrowRight className="w-4 h-4 text-[#3e1f0e]/40 group-hover:text-[#DE9400] transition" />
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    /* Search Results */
                                    <div>
                                        {results.length > 0 ? (
                                            <div>
                                                <p className="text-[#3e1f0e]/60 mb-4 font-['Montserrat']">
                                                    {locale === 'vi' 
                                                        ? `Tìm thấy ${results.length} sản phẩm cho "${query}"`
                                                        : `Found ${results.length} products for "${query}"`
                                                    }
                                                </p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {results.map((product) => (
                                                        <div
                                                            key={product.id}
                                                            onClick={() => handleProductClick(product)}
                                                            className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer group"
                                                        >
                                                            <div className="relative w-full h-32 mb-3 overflow-hidden rounded">
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
                                                                </div>
                                                            </div>
                                                            
                                                            <h4 className="font-medium text-[#3e1f0e] mb-1 line-clamp-2 font-['Montserrat'] group-hover:text-[#DE9400] transition">
                                                                {product.name}
                                                            </h4>
                                                            
                                                            {product.subname && (
                                                                <p className="text-sm text-[#3e1f0e]/60 mb-2 line-clamp-1 font-['Montserrat']">
                                                                    {product.subname}
                                                                </p>
                                                            )}
                                                            
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
                                                        </div>
                                                    ))}
                                                </div>
                                                
                                                <div className="mt-6 text-center">
                                                    <button
                                                        onClick={() => handleSearch(query)}
                                                        className="px-8 py-3 bg-[#DE9400] text-white rounded-full hover:bg-[#DE9400]/90 transition font-['Montserrat'] font-medium"
                                                    >
                                                        {locale === 'vi' ? 'Xem tất cả kết quả' : 'View all results'}
                                                    </button>
                                                </div>
                                            </div>
                                        ) : query.length >= 2 && !loading ? (
                                            <div className="text-center py-12">
                                                <div className="w-24 h-24 mx-auto mb-4 opacity-20">
                                                    <Search className="w-full h-full text-[#3e1f0e]" />
                                                </div>
                                                <p className="text-[#3e1f0e]/60 mb-4 font-['Montserrat'] text-lg">
                                                    {locale === 'vi' 
                                                        ? `Không tìm thấy sản phẩm nào cho "${query}"`
                                                        : `No products found for "${query}"`
                                                    }
                                                </p>
                                                <p className="text-sm text-[#3e1f0e]/40 font-['Montserrat'] mb-6">
                                                    {locale === 'vi' 
                                                        ? 'Thử các từ khóa gợi ý bên dưới:'
                                                        : 'Try these suggested keywords:'
                                                    }
                                                </p>
                                                
                                                {/* Suggested keywords */}
                                                <div className="flex flex-wrap justify-center gap-2">
                                                    {trendingSearches.slice(0, 4).map((suggestion, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => handleQuickSearch(suggestion)}
                                                            className="px-4 py-2 bg-[#3e1f0e]/5 text-[#3e1f0e] rounded-full hover:bg-[#DE9400] hover:text-white transition text-sm font-['Montserrat']"
                                                        >
                                                            {suggestion}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}