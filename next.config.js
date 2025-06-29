/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ['en', 'vi'],
        defaultLocale: 'en',
        localeDetection: true,
    },
    async rewrites() {
        return [
            // Vietnamese URLs
            {
                source: '/vi/gioi-thieu',
                destination: '/vi/about',
            },
            {
                source: '/vi/san-pham',
                destination: '/vi/products',
            },
            {
                source: '/vi/lien-he',
                destination: '/vi/contact',
            },
            {
                source: '/vi/tin-tuc',
                destination: '/vi/news',
            },
            // English URLs (optional, nếu muốn custom)
            {
                source: '/en/about-us',
                destination: '/en/about',
            },
        ];
    },
};