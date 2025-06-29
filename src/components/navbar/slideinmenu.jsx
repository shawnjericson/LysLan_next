'use client';
import { useTranslations } from '@/lib/useTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';

export default function SlideInMenu({ onClose, onGoToSubmenu }) {
  const t = useTranslations('slideinmenu');
  const { locale } = useParams();

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white p-6 overflow-y-auto"
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'tween', duration: 0.4 }}
    >
      <div aria-hidden="true" className="fixed inset-0 z-[9999] bg-[#fdfaf5] overflow-y-auto font-[Playfair_Display]">
        <article>
          <button onClick={onClose} className="absolute top-4 right-4 text-3xl z-[10000] bg-[#0000000a] rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

          </button>
          <ul>
            <li className="head_slide mb-8">
              <article>
                <Link href={`/${locale}`}
                >
                  <Image
                    src="/Logo/logo LYSLAN ok-01.svg"
                    alt={t('backtohome.logoalt')}
                    width={180}
                    height={180}
                    loading="lazy"
                    className="m-auto mt-6"
                    onClick={onClose}
                  />
                </Link>
                <h2 className="font-[Playfair_Display] text-[24px] text-center">
                  {t('backtohome.slogan')}
                </h2>
              </article>
            </li>
            <li>
              <div className="flex items-center gap-4 p-3 rounded-xl shadow-[0_1px_6px_rgba(0,0,0,0.05)] bg-white transition-transform duration-150 active:scale-[0.95]">
                <Link href="#" className="flex items-center gap-4 py-4 px-6">
                  <div className="w-[100px] h-[100px] relative rounded-lg overflow-hidden ring-1 ring-[#e0d8cf] shadow-sm shrink-0">
                    <Image
                      src="/Images/Mid Autumn.jpg"
                      alt={t('holiday.alt')}
                      width={100}
                      height={100}
                      className="w-[100px] h-[100px] object-cover rounded relative"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-[17px] font-medium leading-snug tracking-tight text-[#3e2c2c] uppercase">{t('holiday.name')}</h3>
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-4 p-3 rounded-xl shadow-[0_1px_6px_rgba(0,0,0,0.05)] bg-white transition-transform duration-150 active:scale-[0.95]"
              onClick={onGoToSubmenu}>
                <Link href="#"
                  onClick={onGoToSubmenu}
                  className="flex items-center gap-4 py-4 px-6"
                >
                  <div className="w-[100px] h-[100px] relative rounded-lg overflow-hidden ring-1 ring-[#e0d8cf] shadow-sm shrink-0">
                    <Image
                      src="/Images/Bonbon-Elegent.jpg"
                      alt={t('prd_list.alt')}
                      className="w-[100px] h-[100px] object-cover rounded relative"
                      width={100}
                      height={100}
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-[17px] font-medium leading-snug tracking-tight text-[#3e2c2c] uppercase">{t('prd_list.name')}</h3>
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-4 p-3 rounded-xl shadow-[0_1px_6px_rgba(0,0,0,0.05)] bg-white transition-transform duration-150 active:scale-[0.95]">
                <Link href="#" className="flex items-center gap-4 py-4 px-6">
                  <div className="w-[100px] h-[100px] relative rounded-lg overflow-hidden ring-1 ring-[#e0d8cf] shadow-sm shrink-0">
                    <Image
                      src="/Images/Contact.jfif"
                      alt={t('contact_list.alt')}
                      className="w-[100px] h-[100px] object-cover rounded relative"
                      width={100}
                      height={100}
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-[17px] font-medium leading-snug tracking-tight text-[#3e2c2c] uppercase">{t('contact_list.name')}</h3>
                </Link>
              </div>
            </li>
            <li>
              <div
              onClick={onClose}
              className="flex items-center gap-4 p-3 rounded-xl shadow-[0_1px_6px_rgba(0,0,0,0.05)] bg-white transition-transform duration-150 active:scale-[0.95]">
                <Link href={`/${locale}/about`}
                  onClick={onClose}
                  className="flex items-center gap-4 py-4 px-6">
                  <div
                    className="w-[100px] h-[100px] relative rounded-lg overflow-hidden ring-1 ring-[#e0d8cf] shadow-sm shrink-0"
                    onClick={onClose}>
                    <Image
                      src="/Images/Cogai.jpg"
                      alt={t('about_list.alt')}
                      className="w-[100px] h-[100px] object-cover rounded relative shrink-0"
                      width={100}
                      height={100}
                      loading="lazy"
                      onClick={onClose}
                    />
                  </div>
                  <h3 className="text-[17px] font-medium leading-snug tracking-tight text-[#3e2c2c] uppercase">{t('about_list.name')}</h3>
                </Link>
              </div>
            </li>
          </ul>
        </article>
      </div>
    </motion.div>
  );
}