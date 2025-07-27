// src/app/[locale]/product/page.jsx
import React from 'react';
import Metadata from '@/components/SEO/SEOGeneric';
import ProductList from '@/components/product/ProductList';
import Breadcrumb from '../../../components/layout/BreadCrumb';

export default async function Products(params) {
  const { locale } = await params;
  return (
    <>
      <Metadata pageKey="products" />
      <main>
        <div className="bg-[#fff8f5] py-2">
          <div className="container mx-auto px-4">
            <Breadcrumb
              locale={locale}
              paths={[
                { href: '/', label: 'home' },
                { href: '/products', label: 'products' }
              ]}
            />
          </div>
        </div>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <ProductList />
          </div>
        </div>
      </main>
    </>
  );
}