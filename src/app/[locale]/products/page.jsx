// src/app/[locale]/product/page.jsx
import React from 'react';
import Metadata from '@/components/SEO/SEOGeneric';
import ProductList from '@/components/product/ProductList';

export default function Products() {
  return (
    <>
      <Metadata pageKey="products" />
      <main>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
            </h1>
            <p className="text-center text-gray-600 mb-12">
            </p>

            <ProductList />
          </div>
        </div>
      </main>
    </>
  );
}