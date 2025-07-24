// src/app/[locale]/products/[slug]/page.jsx
import { notFound } from 'next/navigation';
import ProductImageGallery from '../../../../components/product/ProductImageGallery';
import ProductInfo from '../../../../components/product/ProductInfo';
import ProductTabs from '../../../../components/product/ProductTabs';
import { getProductBySlugSSR } from '../../../../../lib/api'; // Use SSR version

export default async function ProductDetailPage({ params }) {
    const { locale, slug } = await params; // Add await here for Next.js 15
    
    console.log('ProductDetailPage - Loading:', { locale, slug });

    try {
        // Use SSR version that handles absolute URLs properly
        const product = await getProductBySlugSSR(slug, locale);
        
        console.log('Product loaded:', product ? 'Success' : 'Not found');

        if (!product) {
            console.log('Product not found, calling notFound()');
            notFound();
        }

        return (
            <div className="min-h-screen bg-[#fff8f5] py-8">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Breadcrumb */}
                    <nav className="flex items-center space-x-2 text-sm mb-8 font-['Montserrat']">
                        <a
                            href={`/${locale}`}
                            className="text-[#3e1f0e]/60 hover:text-[#DE9400] transition-colors"
                        >
                            {locale === 'vi' ? 'Trang chủ' : 'Home'}
                        </a>
                        <span className="text-[#3e1f0e]/40">›</span>
                        <a
                            href={`/${locale}/products`}
                            className="text-[#3e1f0e]/60 hover:text-[#DE9400] transition-colors"
                        >
                            {locale === 'vi' ? 'Sản phẩm' : 'Products'}
                        </a>
                        <span className="text-[#3e1f0e]/40">›</span>
                        <span className="text-[#3e1f0e] font-medium">{product.name}</span>
                    </nav>

                    {/* Main Product Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Side - Product Images */}
                        <ProductImageGallery product={product} />

                        {/* Right Side - Product Information */}
                        <div className="space-y-8">
                            <ProductInfo product={product} locale={locale} />
                            <ProductTabs product={product} locale={locale} />
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error loading product:', error);
        notFound();
    }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
    const { locale, slug } = await params; // Add await here for Next.js 15
    
    console.log('generateMetadata - Loading:', { locale, slug });

    try {
        // Use SSR version for metadata as well
        const product = await getProductBySlugSSR(slug, locale);

        if (!product) {
            console.log('No product found for metadata');
            return {
                title: 'Product Not Found',
                description: 'The requested product could not be found.',
            };
        }

        return {
            title: `${product.name} - LysLan Chocolate`,
            description: product.description || 'Premium chocolate products',
            twitter: {
                card: 'summary_large_image',
                title: product.name,
                description: product.description || 'Premium chocolate products',
                images: product.image?.url ? [product.image.url] : [],
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Product Not Found',
            description: 'The requested product could not be found.',
        };
    }
}