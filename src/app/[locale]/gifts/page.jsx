import React from 'react';
import Metadata from '@/components/SEO/SEOGeneric';
import ServiceGrid from '@/components/gifts/ServiceGrid';
import Breadcrumb from '@/components/gifts/breadcrumb';

export default function GiftsPage() {
  return (
    <>
      <Metadata pageKey="gifts" />
      <main>
        <Breadcrumb paths={[  // Đảm bảo truyền đúng keys cho breadcrumb
          { href: '/', label: 'home' },
          { href: '/service', label: 'service' }
        ]} />
        <ServiceGrid />\
      </main>
    </>
  );
}