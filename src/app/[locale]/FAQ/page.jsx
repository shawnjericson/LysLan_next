'use client';
import { useTranslations } from '@/lib/useTranslations';
import Metadata from '@/components/SEO/SEOGeneric';
import Breadcrumb from '@/components/FAQs/breadcrumb';
import Banner from '@/components/FAQs/sectionbanner';
import Section from '@/components/FAQs/section';

export default function FAQs() {
  const t = useTranslations('FAQs');
  return (
    <>
      <Metadata pageKey="FAQs" />
      <main>
        <h1 className="sr-only">{t('h1')}</h1>
        <Breadcrumb paths={[  // Đảm bảo truyền đúng keys cho breadcrumb
          { href: '/', label: 'home' },
          { href: '/about', label: 'about' }
        ]} />
        <Banner />
        <Section />
      </main>
    </>
  );
}