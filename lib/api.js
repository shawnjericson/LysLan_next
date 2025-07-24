// lib/api.js

// Lấy ngôn ngữ từ URL params (cho App Router với i18n)
export const getCurrentLanguage = (params) => {
    // Nếu có params từ useParams() hook
    if (params && params.locale) {
        return params.locale;
    }

    // Fallback: lấy từ URL hoặc default
    if (typeof window !== 'undefined') {
        const pathname = window.location.pathname;
        const locale = pathname.split('/')[1];
        if (locale && (locale === 'vi' || locale === 'en')) {
            return locale;
        }
    }

    return 'vi'; // default
};

// Lấy danh sách sản phẩm
export async function getProducts(locale = 'vi', category = 'all', page = 1, sort = 'featured') {
    try {
        const url = `/api/products?lang=${locale}&category=${category}&page=${page}&sort=${sort}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
            return data.data;
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

// Lấy danh sách categories
export async function getCategories(locale = 'vi') {
    try {
        const url = `/api/categories?lang=${locale}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
            return data.data;
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

// Server-side functions
// Server-side functions
export async function getProductsSSR(locale = 'vi', category = 'all', page = 1) {
    try {
        // In SSR, use absolute URL is safer
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const url = `${baseUrl}/api/products?lang=${locale}&category=${category}&page=${page}`;

        console.log('Fetching products from URL:', url); // Debug log

        const response = await fetch(url, {
            // Cache for 60 seconds
            next: { revalidate: 60 },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        // Check if response is ok and contains JSON
        if (!response.ok) {
            console.log('Products response not ok:', response.status, response.statusText);
            const text = await response.text();
            console.log('Response body:', text);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.log('Response is not JSON:', contentType, text);
            throw new Error('Response is not JSON');
        }
        
        const data = await response.json();

        if (data.success) {
            return data.data;
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error('Error fetching products SSR:', error);
        return { products: [], pagination: {} };
    }
}

export async function getCategoriesSSR(locale = 'vi') {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const url = `${baseUrl}/api/categories?lang=${locale}`;

        const response = await fetch(url, {
            // Cache for 5 minutes
            next: { revalidate: 300 }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        if (data.success) {
            return data.data;
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error('Error fetching categories SSR:', error);
        return [];
    }
}

// Client-side version
export async function getProductBySlug(slug, locale = 'vi') {
    try {
        const url = `/api/products/${slug}?lang=${locale}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
            return data.data;
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error('Error fetching product by slug:', error);
        return null;
    }
}

// Server-side version for SSR
export async function getProductBySlugSSR(slug, locale = 'vi') {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const url = `${baseUrl}/api/products/${slug}?lang=${locale}`;
        
        const response = await fetch(url, {
            // Cache for 5 minutes
            next: { revalidate: 300 }
        });
        
        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
            return data.data;
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error('Error fetching product by slug SSR:', error);
        return null;
    }
}

// Get related products
export async function getRelatedProducts(productId, categoryId, locale = 'vi', limit = 4) {
    try {
        const url = `/api/products/related?productId=${productId}&categoryId=${categoryId}&lang=${locale}&limit=${limit}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
            return data.data;
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error('Error fetching related products:', error);
        return [];
    }
}

// Server-side version for related products
export async function getRelatedProductsSSR(productId, categoryId, locale = 'vi', limit = 4) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const url = `${baseUrl}/api/products/related?productId=${productId}&categoryId=${categoryId}&lang=${locale}&limit=${limit}`;
        
        const response = await fetch(url, {
            next: { revalidate: 300 }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
            return data.data;
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error('Error fetching related products SSR:', error);
        return [];
    }
}