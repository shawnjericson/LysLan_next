// check-files.js - Run this in your project root
const fs = require('fs');
const path = require('path');

const requiredFiles = [
    'lib/database.js',
    'lib/api.js',
    'src/app/api/products/[slug]/route.js',
    'src/app/[locale]/products/[slug]/page.jsx',
    'src/components/product/ProductImageGallery.jsx',
    'src/components/product/ProductInfo.jsx',
    'src/components/product/ProductTabs.jsx',
    '.env.local'
];

console.log('🔍 Checking required files...\n');

requiredFiles.forEach(filePath => {
    const exists = fs.existsSync(filePath);
    const status = exists ? '✅' : '❌';
    console.log(`${status} ${filePath}`);

    if (!exists && filePath === '.env.local') {
        console.log('   💡 Create .env.local with DATABASE_URL and NEXT_PUBLIC_BASE_URL');
    }

    if (!exists && filePath.includes('component')) {
        console.log('   💡 Component missing - may cause import errors');
    }
});

console.log('\n📁 Current directory structure:');
try {
    const srcExists = fs.existsSync('src');
    const libExists = fs.existsSync('lib');

    console.log(`src/ folder: ${srcExists ? '✅' : '❌'}`);
    console.log(`lib/ folder: ${libExists ? '✅' : '❌'}`);

    if (srcExists) {
        const appExists = fs.existsSync('src/app');
        const componentsExists = fs.existsSync('src/components');
        console.log(`  src/app/: ${appExists ? '✅' : '❌'}`);
        console.log(`  src/components/: ${componentsExists ? '✅' : '❌'}`);
    }
} catch (error) {
    console.log('Error checking structure:', error.message);
}

console.log('\n🔧 Next steps:');
console.log('1. Run: node check-files.js');
console.log('2. Create missing files');
console.log('3. Test database: http://localhost:3000/api/test-db');
console.log('4. Test simple page');