// app/api/search/route.js - Smart Search với từ đồng nghĩa và fuzzy matching
import pool from '../../../../lib/database';
import { NextResponse } from 'next/server';

// Từ điển đồng nghĩa cho tiếng Việt và tiếng Anh
const synonymsMap = {
    vi: {
        // Chocolate terms
        'chocolate': ['socola', 'sôcôla', 'chocolate', 'chôcôlét'],
        'socola': ['chocolate', 'sôcôla', 'chôcôlét'],
        'sôcôla': ['chocolate', 'socola', 'chôcôlét'],
        
        // Dark chocolate
        'đen': ['tối', 'black', 'dark', 'bitter', 'đắng'],
        'tối': ['đen', 'dark', 'bitter'],
        'đắng': ['bitter', 'đen', 'tối', 'dark'],
        
        // Milk chocolate
        'sữa': ['milk', 'creamy', 'kem', 'béo'],
        'kem': ['cream', 'creamy', 'sữa', 'béo'],
        'béo': ['creamy', 'rich', 'sữa', 'kem'],
        
        // White chocolate
        'trắng': ['white', 'vanilla', 'vani'],
        'vani': ['vanilla', 'trắng', 'white'],
        
        // Sweet terms
        'ngọt': ['sweet', '달콤', 'sucré', 'dulce'],
        '달콤': ['ngọt', 'sweet'],
        
        // Premium terms
        'cao cấp': ['premium', 'luxury', 'high-end', 'sang trọng', 'hạng sang'],
        'premium': ['cao cấp', 'luxury', 'sang trọng'],
        'luxury': ['cao cấp', 'premium', 'sang trọng'],
        'sang trọng': ['luxury', 'premium', 'cao cấp'],
        
        // Gift terms
        'quà': ['gift', 'present', 'tặng', 'quà tặng'],
        'tặng': ['gift', 'present', 'quà'],
        'quà tặng': ['gift set', 'present', 'quà'],
        
        // Nuts
        'hạt': ['nuts', 'nut', 'almond', 'hạnh nhân'],
        'hạnh nhân': ['almond', 'nuts', 'hạt'],
        
        // Truffle
        'truffle': ['nấm', 'ganache'],
        
        // Texture
        'mềm': ['soft', 'smooth', 'creamy', 'mịn'],
        'mịn': ['smooth', 'creamy', 'soft', 'mềm'],
        'giòn': ['crispy', 'crunchy', 'crisp'],
        
        // Collection
        'bộ sưu tập': ['collection', 'set', 'combo'],
        'collection': ['bộ sưu tập', 'set'],
    },
    en: {
        // Chocolate terms
        'chocolate': ['cocoa', 'cacao', 'choco'],
        'cocoa': ['chocolate', 'cacao'],
        'cacao': ['chocolate', 'cocoa'],
        
        // Dark chocolate
        'dark': ['black', 'bitter', 'intense', 'strong'],
        'black': ['dark', 'bitter'],
        'bitter': ['dark', 'black', 'intense'],
        
        // Milk chocolate
        'milk': ['creamy', 'smooth', 'rich'],
        'creamy': ['milk', 'smooth', 'rich'],
        'smooth': ['creamy', 'milk', 'soft'],
        
        // White chocolate
        'white': ['vanilla', 'ivory'],
        'vanilla': ['white', 'ivory'],
        
        // Sweet terms
        'sweet': ['sugary', 'candy'],
        
        // Premium terms
        'premium': ['luxury', 'high-end', 'gourmet', 'artisan'],
        'luxury': ['premium', 'high-end', 'gourmet'],
        'gourmet': ['premium', 'luxury', 'artisan'],
        'artisan': ['handcrafted', 'premium', 'gourmet'],
        
        // Gift terms
        'gift': ['present', 'box'],
        'present': ['gift', 'box'],
        
        // Nuts
        'nuts': ['nut', 'almond', 'hazelnut'],
        'almond': ['nuts', 'nut'],
        'hazelnut': ['nuts', 'nut'],
        
        // Texture
        'soft': ['smooth', 'creamy', 'tender'],
        'crispy': ['crunchy', 'crisp'],
        'crunchy': ['crispy', 'crisp'],
        
        // Collection
        'collection': ['set', 'box', 'assortment'],
        'set': ['collection', 'box'],
        'box': ['collection', 'set'],
    }
};

// Hàm mở rộng từ khóa với đồng nghĩa
function expandSearchTerms(query, locale) {
    const words = query.toLowerCase().split(/\s+/).filter(word => word.length > 1);
    const expandedTerms = new Set([query.toLowerCase()]);
    
    const synonyms = synonymsMap[locale] || synonymsMap.vi;
    
    words.forEach(word => {
        // Thêm từ gốc
        expandedTerms.add(word);
        
        // Thêm đồng nghĩa
        if (synonyms[word]) {
            synonyms[word].forEach(synonym => {
                expandedTerms.add(synonym.toLowerCase());
            });
        }
        
        // Fuzzy matching - bỏ dấu tiếng Việt
        const normalized = removeDiacritics(word);
        if (normalized !== word) {
            expandedTerms.add(normalized);
            
            // Thêm đồng nghĩa của từ đã bỏ dấu
            if (synonyms[normalized]) {
                synonyms[normalized].forEach(synonym => {
                    expandedTerms.add(synonym.toLowerCase());
                });
            }
        }
        
        // Partial matching cho từ dài
        if (word.length > 4) {
            expandedTerms.add(word.substring(0, word.length - 1));
            expandedTerms.add(word.substring(1));
        }
    });
    
    return Array.from(expandedTerms);
}

// Hàm bỏ dấu tiếng Việt
function removeDiacritics(str) {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
}

// Hàm tính relevance score thông minh
function calculateRelevanceScore(product, searchTerms, originalQuery) {
    let score = 0;
    const productText = `${product.name} ${product.subname || ''} ${product.description || ''} ${product.sku || ''}`.toLowerCase();
    const productTextNormalized = removeDiacritics(productText);
    
    searchTerms.forEach(term => {
        const termNormalized = removeDiacritics(term);
        
        // Exact match trong tên - highest score
        if (product.name?.toLowerCase().includes(term)) {
            score += 15;
        }
        
        // Exact match trong tên (normalized)
        if (removeDiacritics(product.name?.toLowerCase() || '').includes(termNormalized)) {
            score += 12;
        }
        
        // Match trong subname
        if (product.subname?.toLowerCase().includes(term)) {
            score += 10;
        }
        
        // Match trong SKU
        if (product.sku?.toLowerCase().includes(term)) {
            score += 8;
        }
        
        // Match trong description
        if (product.description?.toLowerCase().includes(term)) {
            score += 5;
        }
        
        // Normalized matches
        if (productTextNormalized.includes(termNormalized)) {
            score += 3;
        }
        
        // Word boundary matches (whole words)
        const wordBoundaryRegex = new RegExp(`\\b${term}\\b`, 'i');
        if (wordBoundaryRegex.test(productText)) {
            score += 7;
        }
    });
    
    // Bonus cho exact query match
    if (productText.includes(originalQuery.toLowerCase())) {
        score += 20;
    }
    
    // Bonus cho featured/bestseller products
    if (product.is_featured) score += 5;
    if (product.is_bestseller) score += 3;
    if (product.is_new) score += 2;
    
    return score;
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const originalQuery = searchParams.get('q') || '';
        const lang = searchParams.get('lang') || searchParams.get('locale') || 'vi';
        const category = searchParams.get('category') || '';
        const minPrice = parseInt(searchParams.get('minPrice')) || 0;
        const maxPrice = parseInt(searchParams.get('maxPrice')) || 999999999;
        const limit = parseInt(searchParams.get('limit')) || 20;

        if (!originalQuery || originalQuery.length < 2) {
            return NextResponse.json({ 
                success: true,
                data: {
                    products: [], 
                    total: 0,
                    query: originalQuery
                }
            });
        }

        // Mở rộng từ khóa search
        const expandedTerms = expandSearchTerms(originalQuery, lang);
        console.log('🔍 Expanded search terms:', expandedTerms);

        // Build smart search query
        let searchQuery = `
            SELECT DISTINCT
                p.id,
                p.sku,
                p.price,
                p.original_price,
                p.slug,
                p.is_featured,
                p.is_bestseller,
                p.is_new,
                p.weight_grams,
                
                COALESCE(pt.name, pt_default.name) as name,
                COALESCE(pt.subname, pt_default.subname) as subname,
                COALESCE(pt.description, pt_default.description) as description,
                COALESCE(pt.slug_localized, pt_default.slug_localized) as slug_localized,
                
                COALESCE(ct.name, ct_default.name) as category_name,
                c.slug as category_slug,
                
                pi.image_url,
                pi.alt_text,
                
                ps.average_rating,
                ps.total_reviews
                
            FROM products p
            
            LEFT JOIN categories c ON p.category_id = c.id
            
            LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language_code = $1
            LEFT JOIN product_translations pt_default ON p.id = pt_default.product_id 
                AND pt_default.language_code = (
                    SELECT code FROM languages WHERE is_default = true LIMIT 1
                )
            
            LEFT JOIN category_translations ct ON p.category_id = ct.category_id AND ct.language_code = $1
            LEFT JOIN category_translations ct_default ON p.category_id = ct_default.category_id 
                AND ct_default.language_code = (
                    SELECT code FROM languages WHERE is_default = true LIMIT 1
                )
            
            LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
            LEFT JOIN product_stats ps ON p.id = ps.product_id
            
            WHERE p.is_active = true
            AND p.price >= $2
            AND p.price <= $3
        `;

        let queryParams = [lang, minPrice, maxPrice];
        let paramIndex = 4;

        // Xây dựng điều kiện search thông minh
        const searchConditions = [];
        
        expandedTerms.forEach((term, index) => {
            if (term.length >= 2) {
                searchConditions.push(`(
                    LOWER(COALESCE(pt.name, pt_default.name)) LIKE $${paramIndex}
                    OR LOWER(COALESCE(pt.subname, pt_default.subname)) LIKE $${paramIndex}
                    OR LOWER(COALESCE(pt.description, pt_default.description)) LIKE $${paramIndex}
                    OR LOWER(p.sku) LIKE $${paramIndex}
                    OR LOWER(COALESCE(ct.name, ct_default.name)) LIKE $${paramIndex}
                )`);
                queryParams.push(`%${term}%`);
                paramIndex++;
            }
        });

        if (searchConditions.length > 0) {
            searchQuery += ` AND (${searchConditions.join(' OR ')})`;
        }

        // Category filter
        if (category && category !== 'all') {
            const categoryMapping = {
                'bonbon': 'bonbon',
                'tablet': 'chocolate-bars',
                'dragees': 'coated-nuts',
                'nama': 'nama-chocolate'
            };

            const dbCategorySlug = categoryMapping[category] || category;
            searchQuery += ` AND c.slug = $${paramIndex}`;
            queryParams.push(dbCategorySlug);
            paramIndex++;
        }

        searchQuery += ` LIMIT $${paramIndex}`;
        queryParams.push(limit * 2); // Lấy nhiều hơn để sort theo relevance

        console.log('🔍 Executing smart search...');
        const result = await pool.query(searchQuery, queryParams);

        // Calculate relevance scores và sort
        const productsWithScores = result.rows.map(row => {
            const product = {
                id: row.id,
                sku: row.sku,
                name: row.name,
                subname: row.subname,
                description: row.description,
                price: parseFloat(row.price),
                originalPrice: row.original_price ? parseFloat(row.original_price) : null,
                slug: row.slug_localized || row.slug,
                weight: row.weight_grams,
                categoryName: row.category_name,
                categorySlug: row.category_slug,
                image: {
                    url: row.image_url,
                    alt: row.alt_text || row.name
                },
                badges: {
                    isFeatured: Boolean(row.is_featured),
                    isBestseller: Boolean(row.is_bestseller),
                    isNew: Boolean(row.is_new)
                },
                rating: {
                    average: row.average_rating ? parseFloat(row.average_rating) : null,
                    totalReviews: row.total_reviews || 0
                },
                is_featured: row.is_featured,
                is_bestseller: row.is_bestseller,
                is_new: row.is_new
            };

            const relevanceScore = calculateRelevanceScore(product, expandedTerms, originalQuery);
            return { ...product, relevanceScore };
        });

        // Sort by relevance score
        productsWithScores.sort((a, b) => b.relevanceScore - a.relevanceScore);

        // Take only the requested limit
        const products = productsWithScores.slice(0, limit).map(({ relevanceScore, ...product }) => product);

        console.log(`✅ Smart search found ${products.length} products with relevance scores`);

        return NextResponse.json({
            success: true,
            data: {
                products,
                total: products.length,
                query: originalQuery,
                expandedTerms: expandedTerms,
                debug: {
                    lang,
                    searchConditions: searchConditions.length,
                    expandedTermsCount: expandedTerms.length
                }
            }
        });

    } catch (error) {
        console.error('❌ Smart search error:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to search products',
                details: error.message 
            },
            { status: 500 }
        );
    }
}

// POST method với cùng logic thông minh
export async function POST(request) {
    try {
        const body = await request.json();
        const { 
            query = '', 
            locale = 'vi', 
            filters = {},
            sortBy = 'relevance',
            page = 1,
            limit = 12 
        } = body;

        // Redirect to GET method với expanded parameters
        const searchParams = new URLSearchParams({
            q: query,
            lang: locale,
            category: filters.category || '',
            minPrice: filters.minPrice || '0',
            maxPrice: filters.maxPrice || '999999999',
            limit: limit.toString()
        });

        const mockRequest = {
            url: `http://localhost:3000/api/search?${searchParams.toString()}`
        };

        const response = await GET(mockRequest);
        const data = await response.json();

        // Add pagination info for POST response
        if (data.success) {
            const total = data.data.products.length;
            data.data.pagination = {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / limit),
                hasNext: page * limit < total,
                hasPrev: page > 1
            };
        }

        return NextResponse.json(data);

    } catch (error) {
        console.error('❌ Smart search POST error:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to perform smart search',
                details: error.message 
            },
            { status: 500 }
        );
    }
}