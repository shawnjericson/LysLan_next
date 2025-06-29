'use client';
import { useTranslations } from '@/lib/useTranslations'; // Đảm bảo đúng path
import Metadata from '@/components/SEO/SEOGeneric';
import Breadcrumb from '@/components/about/breadcrumb';
import Herobanner from '@/components/about/herobanner';
import Section1 from '@/components/about/section1';
import Section2 from '@/components/about/section2';
import Section3 from '@/components/about/section3';
import Section4 from '@/components/about/section4';
import Section5 from '@/components/about/section5';

export default function Home() {
  const t = useTranslations('Aboutus');
  return (
    <>
      <Metadata pageKey="about" />
      <main>
        <h1 className="sr-only">{t('h1')}</h1>
        <Breadcrumb paths={[  // Đảm bảo truyền đúng keys cho breadcrumb
          { href: '/', label: 'home' },
          { href: '/about', label: 'about' }
        ]} />
        <Herobanner />
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
      </main>
    </>
  );
}