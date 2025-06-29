'use client';
import { useEffect } from 'react';
import { useTranslations } from '@/lib/useTranslations';

export default function SEOGenericClient({ pageKey }) {
    const t = useTranslations('metadata');
    const site = useTranslations('site');

    useEffect(() => {
        const title = t(`${pageKey}.title`) || site('title');
        const description = t(`${pageKey}.description`) || site('description');
        const keywords = t(`${pageKey}.keywords`) || site('keywords');
        const ogTitle = t(`${pageKey}.ogTitle`) || title;
        const ogDescription = t(`${pageKey}.ogDescription`) || description;
        const ogImage = t(`${pageKey}.ogImage`);

        document.title = title;

        const setMeta = (name, content, prop = false) => {
            if (!content) return;
            const selector = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
            let meta = document.head.querySelector(selector);
            if (!meta) {
                meta = document.createElement('meta');
                if (prop) meta.setAttribute('property', name);
                else meta.setAttribute('name', name);
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
        };

        setMeta('description', description);
        setMeta('keywords', keywords);
        setMeta('og:title', ogTitle, true);
        setMeta('og:description', ogDescription, true);
        setMeta('og:image', ogImage, true);
    }, [pageKey, t]);

    return null;
}
