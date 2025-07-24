'use client';
import { useTranslations } from '@/lib/useTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';

export default function SlideInMenu({ onClose, onGoToSubmenu }) {
  const t = useTranslations('slideinmenu');
  const { locale } = useParams();

  const handleLinkClick = () => {
    // Đóng menu sau một chút để có animation mượt
    setTimeout(() => {
      onClose();
    }, 100);
  };

  const menuItems = [
    {
      href: "#",
      onClick: null,
      image: "/Images/Mid Autumn.jpg",
      alt: t('holiday.alt'),
      name: t('holiday.name'),
      description: t('holiday.description')
    },
    {
      href: "#",
      onClick: onGoToSubmenu,
      image: "/Images/Bonbon-Elegent.jpg",
      alt: t('prd_list.alt'),
      name: t('prd_list.name'),
      description: t('prd_list.description'),
      hasSubmenu: true
    },
    {
      href: `/${locale}/gifts`,
      onClick: handleLinkClick,
      image: "/Images/Contact.jfif",
      alt: t('contact_list.alt'),
      name: t('contact_list.name'),
      description: t('contact_list.description')
    },
    {
      href: `/${locale}/about`,
      onClick: handleLinkClick,
      image: "/Images/Cogai.jpg",
      alt: t('about_list.alt'),
      name: t('about_list.name'),
      description: t('about_list.description')
    }
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-br from-[#fdfaf5] via-[#f8f4ed] to-[#f5f0e8]"
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
      <div className="h-full overflow-y-auto">
        {/* Header với nút đóng */}
        <div className="relative p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 z-50"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo và slogan */}
          <div className="text-center mt-4">
            <Link href={`/${locale}`} onClick={handleLinkClick}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block"
              >
                <Image
                  src="/Logo/logo LYSLAN ok-01.svg"
                  alt={t('backtohome.logoalt')}
                  width={140}
                  height={140}
                  className="hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            </Link>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-[Playfair_Display] text-lg text-gray-700 mt-3 font-light tracking-wide"
            >
              {t('backtohome.slogan')}
            </motion.h2>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="px-6 mb-6">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>
        </div>

        {/* Menu items */}
        <div className="px-6 space-y-4">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="group"
            >
              <div
                className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:bg-white/80 cursor-pointer overflow-hidden"
                onClick={item.onClick}
              >
                {/* Gradient overlay khi hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-50/0 to-amber-100/0 group-hover:from-amber-50/20 group-hover:to-amber-100/20 transition-all duration-300 rounded-2xl"></div>

                <Link
                  href={item.href}
                  onClick={item.onClick}
                  className="relative flex items-center gap-4"
                >
                  <div className="relative">
                    <div className="w-20 h-20 rounded-xl overflow-hidden ring-2 ring-white shadow-md group-hover:ring-amber-200 transition-all duration-300">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    {item.hasSubmenu && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shadow-md">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-base font-medium text-gray-800 group-hover:text-amber-700 transition-colors duration-300 uppercase tracking-wide">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 font-light">
                      {item.description}
                    </p>
                  </div>

                  <div className="text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 mb-8 text-center"
        >
          <div className="inline-flex items-center space-x-2 text-gray-400">
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-8 h-px bg-gray-300"></div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}