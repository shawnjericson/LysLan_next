// src/app/api/products/[slug]/route.js
import pool from '../../../../../lib/database';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'vi';

    // Main product query với tất cả thông tin chi tiết
    const query = `
      SELECT 
        p.id,
        p.sku,
        p.price,
        p.original_price,
        p.slug,
        p.is_featured,
        p.is_bestseller,
        p.is_new,
        p.weight_grams,
        p.quantity_per_package,
        p.storage_temperature_min,
        p.storage_temperature_max,
        p.created_at,
        
        -- Product translations
        COALESCE(pt.name, pt_default.name) as name,
        COALESCE(pt.subname, pt_default.subname) as subname,
        COALESCE(pt.description, pt_default.description) as description,
        COALESCE(pt.storage_instructions, pt_default.storage_instructions) as storage_instructions,
        COALESCE(pt.slug_localized, pt_default.slug_localized) as slug_localized,
        
        -- Category info
        COALESCE(ct.name, ct_default.name) as category_name,
        c.slug as category_slug,
        
        -- Primary image
        pi.image_url,
        pi.alt_text,
        
        -- Stats
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
      
      WHERE (p.slug = $2 OR pt.slug_localized = $2 OR pt_default.slug_localized = $2)
      AND p.is_active = true
      LIMIT 1
    `;

    const result = await pool.query(query, [lang, slug]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    const productData = result.rows[0];

    // Get ingredients cho sản phẩm
    const ingredientsQuery = `
      SELECT 
        i.id,
        i.slug as ingredient_slug,
        pi.percentage,
        pi.sort_order,
        pi.notes,
        COALESCE(it.name, it_default.name) as name,
        COALESCE(it.description, it_default.description) as description
      FROM product_ingredients pi
      JOIN ingredients i ON pi.ingredient_id = i.id
      LEFT JOIN ingredient_translations it ON i.id = it.ingredient_id AND it.language_code = $1
      LEFT JOIN ingredient_translations it_default ON i.id = it_default.ingredient_id 
        AND it_default.language_code = (SELECT code FROM languages WHERE is_default = true)
      WHERE pi.product_id = $2
      ORDER BY pi.sort_order ASC, pi.percentage DESC
    `;

    const ingredientsResult = await pool.query(ingredientsQuery, [lang, productData.id]);

    // Get flavors cho sản phẩm
    const flavorsQuery = `
      SELECT 
        f.id,
        f.slug as flavor_slug,
        f.color_code,
        COALESCE(ft.name, ft_default.name) as name,
        COALESCE(ft.description, ft_default.description) as description
      FROM product_flavors pf
      JOIN flavors f ON pf.flavor_id = f.id
      LEFT JOIN flavor_translations ft ON f.id = ft.flavor_id AND ft.language_code = $1
      LEFT JOIN flavor_translations ft_default ON f.id = ft_default.flavor_id 
        AND ft_default.language_code = (SELECT code FROM languages WHERE is_default = true)
      WHERE pf.product_id = $2
      AND f.is_active = true
    `;

    const flavorsResult = await pool.query(flavorsQuery, [lang, productData.id]);

    // Get allergens cho sản phẩm
    const allergensQuery = `
      SELECT 
        a.id,
        a.slug as allergen_slug,
        a.warning_level,
        a.icon,
        COALESCE(at.name, at_default.name) as name,
        COALESCE(at.description, at_default.description) as description,
        COALESCE(at.warning_text, at_default.warning_text) as warning_text
      FROM product_allergens pa
      JOIN allergens a ON pa.allergen_id = a.id
      LEFT JOIN allergen_translations at ON a.id = at.allergen_id AND at.language_code = $1
      LEFT JOIN allergen_translations at_default ON a.id = at_default.allergen_id 
        AND at_default.language_code = (SELECT code FROM languages WHERE is_default = true)
      WHERE pa.product_id = $2
      AND a.is_active = true
      ORDER BY a.warning_level DESC
    `;

    const allergensResult = await pool.query(allergensQuery, [lang, productData.id]);

    // Format response
    const product = {
      id: productData.id,
      sku: productData.sku,
      name: productData.name,
      subname: productData.subname,
      description: productData.description,
      price: parseFloat(productData.price),
      originalPrice: productData.original_price ? parseFloat(productData.original_price) : null,
      weight: productData.weight_grams,
      quantityPerPackage: productData.quantity_per_package,
      slug: productData.slug_localized || productData.slug,
      categoryName: productData.category_name,
      categorySlug: productData.category_slug,
      
      // Storage info
      storageTemperatureMin: productData.storage_temperature_min,
      storageTemperatureMax: productData.storage_temperature_max,
      storageInstructions: productData.storage_instructions,
      
      // Image
      image: {
        url: productData.image_url,
        alt: productData.alt_text || productData.name
      },
      
      // Badges
      badges: {
        isFeatured: productData.is_featured,
        isBestseller: productData.is_bestseller,
        isNew: productData.is_new
      },
      
      // Rating
      rating: {
        average: productData.average_rating ? parseFloat(productData.average_rating) : null,
        totalReviews: productData.total_reviews || 0
      },
      
      // Details
      ingredients: ingredientsResult.rows.map(row => ({
        id: row.id,
        name: row.name,
        description: row.description,
        percentage: row.percentage ? parseFloat(row.percentage) : null,
        notes: row.notes
      })),
      
      flavors: flavorsResult.rows.map(row => ({
        id: row.id,
        name: row.name,
        description: row.description,
        colorCode: row.color_code,
        slug: row.flavor_slug
      })),
      
      allergens: allergensResult.rows.map(row => ({
        id: row.id,
        name: row.name,
        description: row.description,
        warningText: row.warning_text,
        warningLevel: row.warning_level,
        icon: row.icon,
        slug: row.allergen_slug
      }))
    };

    return NextResponse.json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('Error fetching product detail:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product details', details: error.message },
      { status: 500 }
    );
  }
}