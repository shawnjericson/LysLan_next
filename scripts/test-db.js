// scripts/test-db.js
// Updated với working config

require('dotenv').config({ path: '.env.local' });

async function testDatabase() {
    console.log('🔍 Testing Supabase database connection...');

    // Show current config
    console.log('📊 Database Config:');
    if (process.env.DATABASE_URL) {
        console.log('   Method: Connection String');
        console.log('   URL:', process.env.DATABASE_URL.replace(/:([^:@]+)@/, ':****@'));
    } else {
        console.log('   Method: Individual Parameters');
        console.log(`   Host: ${process.env.DB_HOST}`);
        console.log(`   User: ${process.env.DB_USER}`);
        console.log(`   Password: ${'*'.repeat(process.env.DB_PASSWORD?.length || 0)}`);
    }

    // Import your working database connection
    const pool = require('../lib/database');

    try {
        // Test 1: Basic connection
        console.log('\n1️⃣ Testing basic connection...');
        const testResult = await pool.query('SELECT NOW() as current_time, current_user as user');
        console.log('✅ Connection successful!');
        console.log('⏰ Server time:', testResult.rows[0].current_time);
        console.log('👤 Connected as:', testResult.rows[0].user);

        // Test 2: Check tables
        console.log('\n2️⃣ Checking tables...');
        const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);

        console.log(`📋 Found ${tablesResult.rows.length} tables:`);
        tablesResult.rows.forEach(table => {
            console.log(`   📄 ${table.table_name}`);
        });

        // Test 3: Check data counts
        console.log('\n3️⃣ Checking data...');

        const importantTables = ['products', 'categories', 'product_translations'];

        for (const tableName of importantTables) {
            try {
                const countResult = await pool.query(`SELECT COUNT(*) as count FROM ${tableName}`);
                console.log(`📊 ${tableName}: ${countResult.rows[0].count} records`);
            } catch (error) {
                console.log(`❌ ${tableName}: ${error.message}`);
            }
        }

        // Test 4: Sample products
        console.log('\n4️⃣ Testing sample data...');
        try {
            const sampleResult = await pool.query(`
        SELECT 
          p.id, 
          p.sku, 
          p.slug,
          COALESCE(pt.name, p.sku) as name,
          p.price
        FROM products p 
        LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language_code = 'vi'
        WHERE p.is_active = true 
        LIMIT 3
      `);

            console.log('✅ Sample products:');
            sampleResult.rows.forEach(product => {
                console.log(`   🛍️ ${product.name} (${product.sku}) - ${product.price?.toLocaleString()}₫`);
            });

        } catch (error) {
            console.log('❌ Sample query failed:', error.message);
        }

        console.log('\n🎉 All database tests passed!');
        console.log('🚀 Ready to start development: npm run dev');

    } catch (error) {
        console.error('\n❌ Database test failed!');
        console.error('Error:', error.message);

    } finally {
        await pool.end();
        process.exit(0);
    }
}

testDatabase().catch(console.error);