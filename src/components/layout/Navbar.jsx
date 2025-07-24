'use client';
import { useTranslations } from '@/lib/useTranslations';
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
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
  const t = useTranslations('navbar');
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
    <nav className="sticky top-0 z-50 bg-[#fff8f5] shadow-sm">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="h-28 max-w-[1600px] mx-auto px-8">
          {/* Main navigation container */}
          <div className="flex items-center justify-center h-full relative">
            {/* Navigation items container - flex with specific widths */}
            <div className="flex items-center justify-center w-full max-w-[1400px]">

              {/* Left Navigation Group */}
              <div className="flex items-center justify-end flex-1 gap-8 pr-12">
                <LanguageDropdown />
                <Link
                  href={`/${locale}`}
                  className="nav-link text-[#3e1f0e] font-medium py-2 font-[Playfair_Display] hover:text-[#DE9400] transition-colors duration-300 whitespace-nowrap"
                >
                  {t('left.homepage')}
                </Link>
                <div className="nav-link">
                  <Megadropdown />
                </div>
              </div>

              {/* Center Logo - Fixed width to maintain spacing */}
              <div className="flex-shrink-0 mx-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="transform hover:scale-105 transition-transform duration-300"
                >
                  <Logo />
                </motion.div>
              </div>

              {/* Right Navigation Group */}
              <div className="flex items-center justify-start flex-1 gap-8 pl-12">
                <Link
                  href={`/${locale}/gifts`}
                  className="nav-link text-[#3e1f0e] font-medium py-2 font-[Playfair_Display] hover:text-[#DE9400] transition-colors duration-300 whitespace-nowrap"
                >
                  {t('contact.contactname')}
                </Link>
                <Link
                  href={`/${locale}/about`}
                  className="nav-link text-[#3e1f0e] font-medium py-2 font-[Playfair_Display] hover:text-[#DE9400] transition-colors duration-300 whitespace-nowrap"
                >
                  {t('story.storyname')}
                </Link>
                <Link
                  href={`/${locale}/products`}
                  className="cta-button text-[#fff8f5] px-6 py-2.5 font-medium rounded-full bg-[#DE9400] hover:bg-[#c17f00] shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
                >
                  {t('CTA.CTAname')}
                </Link>
                <div className="flex items-center gap-2 ml-4">
                  <Search />
                  <Cart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet Navigation */}
      <div className="hidden md:block lg:hidden">
        <div className="h-24 px-6">
          <div className="flex items-center justify-between h-full relative">
            {/* Left - Menu & Language */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="p-2 rounded-lg text-[#3e1f0e] hover:bg-[#DE9400] hover:text-white transition-all duration-300"
                onClick={openMenu}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
              <LanguageDropdown />
            </div>

            {/* Center - Logo */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Logo />
            </div>

            {/* Right - Icons */}
            <div className="flex items-center gap-2">
              <Search />
              <Cart />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="block md:hidden">
        <div className="h-20 px-4">
          <div className="flex items-center justify-between h-full relative">
            {/* Left - Menu & Language */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-1.5 rounded-lg text-[#3e1f0e] hover:bg-[#DE9400] hover:text-white transition-all duration-300"
                onClick={openMenu}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
              <div className="scale-90">
                <LanguageDropdown />
              </div>
            </div>

            {/* Center - Logo */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="scale-75">
                <Logo />
              </div>
            </div>

            {/* Right - Icons */}
            <div className="flex items-center gap-1">
              <Search />
              <Cart />
            </div>
          </div>
        </div>
      </div>

      {/* Slide Menus */}
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