// src/app/api/categories/route.js - Fixed version
import pool from '../../../../lib/database';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const lang = searchParams.get('lang') || 'vi';

        const query = `
      SELECT 
        c.id,
        c.slug,
        COALESCE(ct.name, ct_default.name) as name,
        COALESCE(ct.slug_localized, ct_default.slug_localized) as slug_localized,
        c.sort_order,
        (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id AND p.is_active = true) as product_count
        
      FROM categories c
      LEFT JOIN category_translations ct ON c.id = ct.category_id AND ct.language_code = $1
      LEFT JOIN category_translations ct_default ON c.id = ct_default.category_id 
        AND ct_default.language_code = (SELECT code FROM languages WHERE is_default = true)
      
      WHERE c.is_active = true
      ORDER BY c.sort_order ASC
    `;

        const result = await pool.query(query, [lang]);

        // Get total products for "All" category
        const totalResult = await pool.query('SELECT COUNT(*) as total FROM products WHERE is_active = true');
        const totalProducts = parseInt(totalResult.rows[0].total);

        const categories = [
            // Chỉ thêm "Toàn bộ sản phẩm" trước
            {
                id: 'all',
                slug: 'all',
                name: lang === 'vi' ? 'Toàn bộ sản phẩm' : 'All Products',
                slug_localized: lang === 'vi' ? 'toan-bo-san-pham' : 'all-products',
                product_count: totalProducts
            },
            // Thêm các categories từ database
            ...result.rows.map(row => ({
                id: row.id,
                slug: row.slug,
                name: row.name,
                slug_localized: row.slug_localized,
                product_count: parseInt(row.product_count)
            }))
            // Bỏ "Bộ sưu tập" tạm thời cho đến khi bạn có data
        ];

        console.log('Categories returned:', categories); // Debug log

        return NextResponse.json({
            success: true,
            data: categories
        });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch categories' },
            { status: 500 }
        );
    }
}