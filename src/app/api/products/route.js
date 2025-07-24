// src/app/api/products/route.js - Cập nhật phần category mapping

import pool from '../../../../lib/database';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category') || 'all';
        const lang = searchParams.get('lang') || 'vi';
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 12;
        const sort = searchParams.get('sort') || 'featured';

        const offset = (page - 1) * limit;

        let query = `
      SELECT DISTINCT
        p.id,
        p.sku,
        p.price,
        p.original_price,
        p.slug,
        p.is_featured,
        p.is_bestseller,
        p.is_new,
        p.created_at,
        
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
        AND pt_default.language_code = (SELECT code FROM languages WHERE is_default = true)
      
      LEFT JOIN category_translations ct ON p.category_id = ct.category_id AND ct.language_code = $1
      LEFT JOIN category_translations ct_default ON p.category_id = ct_default.category_id 
        AND ct_default.language_code = (SELECT code FROM languages WHERE is_default = true)
      
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
      LEFT JOIN product_stats ps ON p.id = ps.product_id
      
      WHERE p.is_active = true
    `;

        const queryParams = [lang];
        let paramIndex = 2;

        // Category filter - cập nhật mapping này
        if (category !== 'all' && category !== 'collection') {
            // Mapping từ frontend category names sang database slugs
            const categoryMapping = {
                'bonbon': 'bonbon',
                'tablet': 'chocolate-bars',
                'dragees': 'coated-nuts',
                'nama': 'nama-chocolate'
            };

            const dbCategorySlug = categoryMapping[category] || category;

            query += ` AND c.slug = $${paramIndex}`;
            queryParams.push(dbCategorySlug);
            paramIndex++;

            console.log(`Filtering by category: ${category} -> ${dbCategorySlug}`); // Debug log
        }

        // Sorting
        switch (sort) {
            case 'featured':
                query += ` ORDER BY p.is_featured DESC, p.is_bestseller DESC, p.created_at DESC`;
                break;
            case 'newest':
                query += ` ORDER BY p.created_at DESC`;
                break;
            case 'price_asc':
                query += ` ORDER BY p.price ASC`;
                break;
            case 'price_desc':
                query += ` ORDER BY p.price DESC`;
                break;
            case 'name':
                query += ` ORDER BY COALESCE(pt.name, pt_default.name) ASC`;
                break;
            default:
                query += ` ORDER BY p.is_featured DESC, p.created_at DESC`;
        }

        query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
        queryParams.push(limit, offset);

        console.log('Final query:', query); // Debug log
        console.log('Query params:', queryParams); // Debug log

        const result = await pool.query(query, queryParams);

        // Count total với cùng filter
        let countQuery = `
      SELECT COUNT(DISTINCT p.id) as total
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = true
    `;

        let countParams = [];
        if (category !== 'all' && category !== 'collection') {
            const categoryMapping = {
                'bonbon': 'bonbon',
                'tablet': 'chocolate-bars',
                'dragees': 'coated-nuts',
                'nama': 'nama-chocolate'
            };

            const dbCategorySlug = categoryMapping[category] || category;
            countQuery += ` AND c.slug = $1`;
            countParams.push(dbCategorySlug);
        }

        const countResult = await pool.query(countQuery, countParams);
        const total = parseInt(countResult.rows[0].total);

        console.log(`Found ${result.rows.length} products, total: ${total}`); // Debug log

        const products = result.rows.map(row => ({
            id: row.id,
            sku: row.sku,
            name: row.name,
            subname: row.subname,
            description: row.description,
            price: parseFloat(row.price),
            originalPrice: row.original_price ? parseFloat(row.original_price) : null,
            slug: row.slug_localized || row.slug,
            categoryName: row.category_name,
            categorySlug: row.category_slug,
            image: {
                url: row.image_url,
                alt: row.alt_text || row.name
            },
            badges: {
                isFeatured: row.is_featured,
                isBestseller: row.is_bestseller,
                isNew: row.is_new
            },
            rating: {
                average: row.average_rating ? parseFloat(row.average_rating) : null,
                totalReviews: row.total_reviews || 0
            }
        }));

        return NextResponse.json({
            success: true,
            data: {
                products,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    totalPages: Math.ceil(total / limit),
                    hasNext: page * limit < total,
                    hasPrev: page > 1
                },
                debug: {
                    category,
                    queryParams,
                    resultCount: result.rows.length
                }
            }
        });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch products', details: error.message },
            { status: 500 }
        );
    }
}