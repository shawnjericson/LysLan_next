// components/common/ElegantBreadcrumb.jsx
'use client';
import Link from 'next/link';

export default function ElegantBreadcrumb({ locale, paths, className = 'mb-8' }) {
    const labels = {
        vi: {
            home: 'Trang chủ',
            about: 'Giới thiệu',
            products: 'Sản phẩm',
            contact: 'Liên hệ',
            story: 'Câu chuyện',
            checkout: 'Thanh toán',
            cart: 'Giỏ hàng'
        },
        en: {
            home: 'Home',
            about: 'About',
            products: 'Products',
            contact: 'Contact',
            story: 'Our Story',
            checkout: 'Checkout',
            cart: 'Cart'
        }
    };

    const currentLabels = locale === 'en' ? labels.en : labels.vi;

    const getLocalizedHref = (href) => {
        if (locale === 'vi') return href;
        return href === '/' ? '/en' : `/en${href}`;
    };

    return (
        <nav className={`flex items-center mt-4 space-x-2 text-sm font-['Montserrat'] ${className}`}>
            {paths.map((path, index) => {
                const isLast = index === paths.length - 1;
                const label = path.customLabel || currentLabels[path.label] || path.label;

                return (
                    <div key={path.href} className="flex items-center space-x-2">
                        {/* Breadcrumb Link or Text */}
                        {isLast ? (
                            <span className="text-[#3e1f0e] font-medium">
                                {label}
                            </span>
                        ) : (
                            <Link
                                href={getLocalizedHref(path.href)}
                                className="text-[#3e1f0e]/60 hover:text-[#DE9400] transition-colors"
                            >
                                {label}
                            </Link>
                        )}

                        {/* Separator - only show if not last item */}
                        {!isLast && (
                            <span className="text-[#3e1f0e]/40">›</span>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}