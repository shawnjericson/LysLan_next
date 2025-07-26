// lib/database.js
// Working configuration based on debug results

const { Pool } = require('pg');

// Use the working SSL config from debug
let poolConfig;

if (process.env.DATABASE_URL) {
    // Connection string method (WORKS!)
    poolConfig = {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }, // This works!
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
    };
} else {
    // Individual parameters method (WORKS!)
    poolConfig = {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        ssl: { rejectUnauthorized: false }, // This works!
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
    };
}

console.log('🔧 Database config:', {
    method: process.env.DATABASE_URL ? 'connection_string' : 'individual_params',
    host: poolConfig.host || 'from connection string',
    ssl: 'rejectUnauthorized: false',
    max: poolConfig.max
});

// Create connection pool
const pool = new Pool(poolConfig);

// Connection event handlers
pool.on('connect', (client) => {
    console.log('✅ Database connection established');
});

pool.on('error', (err, client) => {
    console.error('❌ Database pool error:', err.message);
});

// Test connection on startup (optional)
async function testConnection() {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT 1 as test');
        console.log('🎉 Database pool ready!');
        client.release();
    } catch (err) {
        console.error('❌ Database connection test failed:', err.message);
    }
}

// Test when module loads (remove this in production if you want)
testConnection();

module.exports = pool;