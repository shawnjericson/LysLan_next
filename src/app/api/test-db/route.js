// src/app/api/test-db/route.js
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        console.log('Testing database connection...');

        // Import database
        const pool = (await import('../../../../lib/database')).default;
        console.log('Database imported');

        // Test basic connection
        const testQuery = await pool.query('SELECT NOW() as current_time, 1 as test_number');
        console.log('Basic query successful:', testQuery.rows[0]);

        // Test tables exist
        const tablesQuery = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('products', 'product_translations', 'categories')
      ORDER BY table_name
    `);
        console.log('Tables found:', tablesQuery.rows);

        // Test products table
        const productsCount = await pool.query('SELECT COUNT(*) as count FROM products WHERE is_active = true');
        console.log('Active products count:', productsCount.rows[0]);

        // Test specific product
        const productTest = await pool.query(`
      SELECT p.id, p.slug, p.sku, pt.name 
      FROM products p 
      LEFT JOIN product_translations pt ON p.id = pt.product_id 
      WHERE p.is_active = true 
      LIMIT 5
    `);
        console.log('Sample products:', productTest.rows);

        return NextResponse.json({
            success: true,
            message: 'Database connection successful',
            data: {
                currentTime: testQuery.rows[0].current_time,
                tablesFound: tablesQuery.rows.map(r => r.table_name),
                activeProductsCount: productsCount.rows[0].count,
                sampleProducts: productTest.rows
            }
        });

    } catch (error) {
        console.error('Database test error:', error);

        return NextResponse.json({
            success: false,
            error: error.message,
            stack: error.stack,
            details: {
                name: error.name,
                code: error.code,
                severity: error.severity,
                position: error.position
            }
        }, { status: 500 });
    }
}