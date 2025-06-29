'use client';

import { useTranslations } from '@/lib/useTranslations';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export default function LanguageDropdown() {
  const t = useTranslations('navbar');
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLocale = pathname.split('/')[1] || 'vi';
  const otherLocale = currentLocale === 'vi' ? 'en' : 'vi';

  const LANG_CONFIG = {
    vi: {
      label: t('language.vnname'),
      alt: t('language.vnalt'),
      flag: '/Flag/flag-vn.png',
    },
    en: {
      label: t('language.enname'),
      alt: t('language.enalt'),
      flag: '/Flag/flag-en.png',
    },
  };

  const changeLanguage = (locale) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    router.push(segments.join('/'));
    setOpen(false);
  };

  // ❗️Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded hover:bg-gray-100 cursor-pointer text-[#3e1f0e]"
        aria-label={t('language.pick')}
      >
        <Image
          src={LANG_CONFIG[currentLocale].flag}
          alt={LANG_CONFIG[currentLocale].alt}
          width={24}
          height={16}
        />
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="absolute left-0 mt-2 w-30 bg-[#fff8f5] border border-gray-200 rounded shadow z-50">
          <li
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => changeLanguage(otherLocale)}
          >
            <Image
              src={LANG_CONFIG[otherLocale].flag}
              alt={LANG_CONFIG[otherLocale].alt}
              width={20}
              height={14}
            />
            <span className="text-xs text-[#3e1f0e]">{LANG_CONFIG[otherLocale].label}</span>
          </li>
        </ul>
      )}
    </div>
  );
}
