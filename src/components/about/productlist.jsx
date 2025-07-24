'use client';
import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from './productcard';
import { getProducts, getCategories } from '../../../lib/api'; // Adjust path as needed

export default function ProductList({ t, category, onShowcaseOpen }) {
    const params = useParams();
    const locale = params?.locale || 'vi';

    const [isMobile, setIsMobile] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Screen size detection
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Load categories on mount
    useEffect(() => {
        loadCategories();
    }, [locale]);

    // Load products when category changes
    useEffect(() => {
        if (categories.length > 0) {
            loadProducts();
        }
    }, [category, locale, categories]);

    const loadCategories = async () => {
        try {
            const categoriesData = await getCategories(locale);
            setCategories(categoriesData || []);
        } catch (err) {
            console.error('Error loading categories:', err);
            setError('Failed to load categories');
        }
    };

    const loadProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            // Map your old category names to database category slugs
            const categoryMapping = {
                'bonbon': 'bonbon',
                'bar': 'chocolate-bars',
                'nuts': 'coated-nuts',
                'nama': 'nama-chocolate',
                'all': 'all'
            };

            const dbCategory = categoryMapping[category] || 'all';
            const data = await getProducts(locale, dbCategory, 1, 'featured');

            // Transform database products to match your old structure
            const transformedProducts = (data?.products || []).map(product => ({
                id: product.id,
                name: product.name,
                subName: product.subname || '',
                image: product.image?.url || '/images/placeholder.jpg', // Fallback image
                description: product.description || '',
                link: `/${locale}/products/${product.slug}`, // Dynamic link to product detail
                price: product.price,
                originalPrice: product.originalPrice,
                badges: product.badges,
                rating: product.rating,
                // Add any other fields your ProductCard component needs
                slug: product.slug,
                sku: product.sku
            }));

            setProducts(transformedProducts);
        } catch (err) {
            console.error('Error loading products:', err);
            setError('Failed to load products');
            // Fallback to old hardcoded data if API fails
            setProducts(getHardcodedProducts(category, t));
        } finally {
            setLoading(false);
        }
    };

    const getFlexBasis = (length) => (isMobile ? (length <= 3 ? '85%' : '75%') : '280px');

    // Fallback hardcoded data (keep your original data as backup)
    const getHardcodedProducts = (cat, translate) => {
        const hardcodedData = {
            bonbon: [
                {
                    id: 'box6cb1',
                    name: translate('section5.product.bonbon.box6cb1.name'),
                    subName: translate('section5.product.bonbon.box6cb1.subname'),
                    image: '/images/Boxof6.jpg',
                    description: translate('section5.product.bonbon.box6cb1.description'),
                    link: '#'
                },
                {
                    id: 'box6cb2',
                    name: translate('section5.product.bonbon.box6cb2.name'),
                    subName: translate('section5.product.bonbon.box6cb2.subname'),
                    image: '/images/Boxof6.jpg',
                    description: translate('section5.product.bonbon.box6cb2.description'),
                    link: '#'
                },
                // ... other hardcoded data
            ],
            // ... other categories
        };
        return hardcodedData[cat] || [];
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex gap-6 overflow-x-auto pb-4 px-4">
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className="animate-pulse bg-gray-200 rounded-lg"
                        style={{
                            minWidth: getFlexBasis(4),
                            height: '300px'
                        }}
                    />
                ))}
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-center">
                    <div className="text-red-500 mb-2">⚠️</div>
                    <p className="text-red-600 font-medium">{error}</p>
                    <button
                        onClick={loadProducts}
                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                        {locale === 'vi' ? 'Thử lại' : 'Retry'}
                    </button>
                </div>
            </div>
        );
    }

    // Empty state
    if (products.length === 0) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-center">
                    <div className="text-gray-400 text-4xl mb-4">🍫</div>
                    <p className="text-gray-600">
                        {locale === 'vi' ? 'Không có sản phẩm nào' : 'No products found'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`flex gap-6 overflow-x-auto pb-4 px-4 ${products.length <= 3 ? 'justify-center' : 'justify-start'}`}
            style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch'
            }}
        >
            {products.map((product) => (
                <div key={product.id} style={{ scrollSnapAlign: 'start' }}>
                    <ProductCard
                        product={product}
                        isMobile={isMobile}
                        flexBasis={getFlexBasis(products.length)}
                        showDetail={category === 'bonbon'}
                        onShowcaseOpen={() => onShowcaseOpen(product.id)}
                        locale={locale} // Pass locale to ProductCard if needed
                    />
                </div>
            ))}
        </div>
    );
}