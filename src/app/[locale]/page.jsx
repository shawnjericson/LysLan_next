'use client';
import { useTranslations } from '@/lib/useTranslations'; // Đảm bảo đúng path
import Metadata from '@/components/SEO/SEOGeneric';
import Section1 from '@/components/home/section1';
import Section2 from '@/components/home/section2';
import Section3 from '@/components/home/section3';
import Section4 from '@/components/home/section4';
import Section5 from '@/components/home/section5';
import Section6 from '@/components/home/section6';
import Section7 from '@/components/home/section7';
import Section8 from '@/components/home/section8';
export default function Home() {
  const t = useTranslations('home');
  return (
    <>
      <Metadata pageKey="home" />
      <main>
        <h1 className="sr-only">{t('h1')}</h1>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <Section7 />
        <Section8 />
      </main>
    </>
  );
}