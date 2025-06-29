'use client';
import { useTranslations } from '@/lib/useTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useParams } from 'next/navigation';

import SlideInMenu from '../navbar/slideinmenu';
import Submenu from '../navbar/submenu';
import Megadropdown from '../navbar/megadropdown';
import Logo from '../navbar/Logo';
import Search from '../navbar/searchbutton';
import Cart from '../navbar/CartIcon';
import LanguageDropdown from '@/components/navbar/LanguageDropdown';
import { AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const t = useTranslations('navbar');
  // 💡 State để điều khiển menu
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const { locale } = useParams();

  const openMenu = () => {
    setMenuOpen(true);
    setSubMenuOpen(false);
  };

  const openSubMenu = () => {
    setMenuOpen(false);
    setSubMenuOpen(true);
  };

  const closeAll = () => {
    setMenuOpen(false);
    setSubMenuOpen(false);
  };
  return (
    <nav className="sticky h-28 top-0 items-center bg-[#fff8f5]">
      <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-4 items-center">
        <div className="relative flex h-28 items-center">
          <div className="flex items-center justify-center sm:hidden gap-1 mr-10 ml-1.5">
            {/* Mobile menu button */}
            <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-[#3e1f0e] hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset" aria-controls="mobile-menu" aria-expanded="false" onClick={openMenu}>
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>

              {/* Icon when menu is closed. */}

              {/* Menu open: "hidden", Menu closed: "block" */}

              <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>

              {/* Icon when menu is open. */}

              {/* Menu open: "block", Menu closed: "hidden" */}

              <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center justify-center">
              <LanguageDropdown />
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center">
              <LanguageDropdown />
            </div>
          <div className="flex-1 items-center justify-end gap-2 hidden lg:flex">
            <div>
              <Link href={`/${locale}`}
                title={t('left.hometitle')}
                aria-label={t('left.homearia-label')}
                className="btn-glow block w-full max-w-[380px] text-center text-[#3e1f0e] text-[18px] font-[500] py-[8px] px-[18px] rounded-[8px] font-[Playfair_Display] mx-auto whitespace-normal no-underline hover:bg-[#DE9400] hover:text-amber-50 transition"
              >
                {t('left.homepage')}
              </Link>
            </div>
            <Megadropdown />
          </div>
          <div className="flex justify-center items-center w-full lg:w-auto px-4">
            <Logo />
          </div>
          <div className="items-center justify-start gap-2 hidden lg:flex">
            <div>
              <Link href={`/${locale}/products`}
                title={t('contact.contacttitle')}
                aria-label={t('contact.contactaria')}
                className="btn-glow block w-full max-w-[380px] text-center text-[#3e1f0e] text-[18px] font-[500] py-[8px] px-[18px] rounded-[8px] font-[Playfair_Display] mx-auto whitespace-normal no-underline hover:bg-[#DE9400] hover:text-amber-50 transition"
                priority="true"
              >
                {t('contact.contactname')}

              </Link>
            </div>
            <div>
              <Link href={`/${locale}/about`}
                title={t('story.storytitle')}
                aria-label={t('story.storyaria')}
                className="btn-glow block w-full max-w-[380px] text-center text-[#3e1f0e] text-[18px] font-[500] py-[8px] px-[18px] rounded-[8px] font-[Playfair_Display] mx-auto whitespace-normal no-underline hover:bg-[#DE9400] hover:text-amber-50 transition"
              >
                {t('story.storyname')}
              </Link>
            </div>
          </div>
          <div className="flex items-center right-0 m-0 ml-1">
            <div className="hidden lg:flex mr-4">
              <Link href={`/${locale}/products`}
                title={t('CTA.CTAtitle')}
                aria-label={t('CTA.CTAaria')}
                className="cta-glow relative inline-block text-[#3e1f0e] px-6 py-3 text-lg font-bold font-[roboto] rounded-md bg-gradient-to-r from-[#ffecec] to-[#f6c1c1]  shadow-lg z-[0]"
              >
                {t('CTA.CTAname')}
              </Link>
            </div>
            <div className="m-0 p-0 flex gap-0.5">
              <Search />
              <Cart />
            </div>
          </div>
        </div>
      </div>
      {/* 💥 Slide menu + Submenu */}
      <AnimatePresence>
        {menuOpen && (
          <SlideInMenu
            onClose={closeAll}
            onGoToSubmenu={openSubMenu}
          />
        )}

        {subMenuOpen && (
          <Submenu
            onClose={closeAll}
            onBack={() => {
              setSubMenuOpen(false);
              setMenuOpen(true);
            }}
          />
        )}
      </AnimatePresence>
    </nav>
  );
}