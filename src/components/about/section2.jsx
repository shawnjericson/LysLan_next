'use client';
import { useTranslations } from '@/lib/useTranslations';
import { useEffect } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function CoreValuesSection() {
    const t = useTranslations('Aboutus');
    useEffect(() => {
        // Initialize AOS animations
        AOS.init({
            duration: 2000,
            offset: 50, // Reduced for mobile
            easing: 'ease-in-out',
            once: true,
        });
        AOS.refresh();
    }, []);

    return (
        <section aria-label={t('section2.sectionaria')} className="overflow-x-hidden relative aos-init">
            {/* Mobile Layout */}
            <div className="block lg:hidden">
                <div className="space-y-6 py-8">
                    <div className="space-y-4">
                        <div
                            className="bg-orange-200 rounded-lg p-6 text-center"
                            style={{
                                backgroundColor: '#cd9771',
                                backgroundImage: 'url("/Images/Bonbon-Minimalist.jpg")'
                            }}
                            aria-label={t('section2.mobile.div1.arialabel')}
                            data-aos="fade-left"
                        >
                            <h2 className="text-2xl font-light text-amber-600 mb-2 font-[Playfair_Display]">
                                {t('section2.mobile.div1.h2')}
                            </h2>
                        </div>
                        <div
                            className="bg-orange-200 rounded-lg p-6 text-center"
                            style={{ backgroundColor: '#cd9771' }}
                            data-aos="fade-right"
                        >
                            <h2 className="text-2xl font-light text-white font-[Playfair_Display]">
                                {t('section2.mobile.div2.h2')}
                            </h2>
                        </div>
                        <div
                            className="bg-orange-200 rounded-lg p-6 h-30 bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: 'url("/Images/Grinding.jpg")' }}
                            data-aos="fade-right"
                            aria-label={t('section2.mobile.div3.arialabel')}
                        >
                            <span className="sr-only">{t('section2.mobile.div3.span')}</span>
                        </div>
                    </div>
                    <div className="flex justify-center mb-8" data-aos="fade-up">
                        <Image
                            src="/Logo/logo LYSLAN ok-01.svg"
                            alt={t('section2.mobile.logo.alt')}
                            width={300}
                            height={300}
                            className="w-auto h-40"
                            loading="lazy"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        {/* Dòng 1 */}
                        <Image
                            src="/Images/Matcha-Nama.jpg"
                            alt={t('section2.mobile.img4.alt')}
                            width={200}
                            height={200}
                            className="w-full h-auto rounded-lg"
                            data-aos="fade-up"
                            loading="lazy"
                        />
                        <Image
                            src="/Images/NamaMaking.jpg"
                            alt={t('section2.mobile.img5.alt')}
                            width={200}
                            height={200}
                            className="w-full h-auto rounded-lg"
                            data-aos="fade-up"
                            loading="lazy"
                        />

                        {/* Dòng 2 */}
                        <Image
                            src="/Images/Thanh.jpg"
                            alt={t('section2.mobile.img6.alt')}
                            width={200}
                            height={300} // hoặc 280
                            className="w-full h-[220px] object-cover rounded-lg"
                            data-aos="fade-up"
                            loading="lazy"
                        />
                        <Image
                            src="/Images/Chế-tác-thủ-công.jpg"
                            alt={t('section2.mobile.img7.alt')}
                            width={200}
                            height={300} // vẫn vậy
                            className="w-full h-[220px] object-cover rounded-lg"
                            data-aos="fade-up"
                            loading="lazy"
                        />

                        {/* Dòng 3 */}
                        <Image
                            src="/Images/Pomelo-Desert2.jpg"
                            alt={t('section2.mobile.img8.alt')}
                            width={200}
                            height={200}
                            className="w-full h-auto rounded-lg"
                            data-aos="fade-up"
                            loading="lazy"
                        />
                        <Image
                            src="/Images/EggCoffeeDragees.jpg"
                            alt={t('section2.mobile.img9.alt')}
                            width={200}
                            height={200}
                            className="w-full h-auto rounded-lg"
                            data-aos="fade-up"
                            loading="lazy"
                        />

                        {/* Dòng 4 – full width */}
                        <div className="col-span-2">
                            <Image
                                src="/Images/Sôcola.jpg"
                                alt={t('section2.mobile.img10.alt')}
                                width={400}
                                height={250}
                                className="w-full h-auto object-cover rounded-lg"
                                data-aos="fade-up"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div
                            className="bg-orange-200 rounded-lg p-6 text-center"
                            style={{
                                backgroundColor: '#cd9771',
                                backgroundImage: 'url("/Images/Chế-tác-thủ-công.jpg")'
                            }}
                            data-aos="fade-right"
                            aria-label={t('section2.mobile.div4.arialabel')}
                        >
                            <h2 className="text-2xl font-light text-white font-[Playfair_Display]">
                                {t('section2.mobile.div4.h2')}
                            </h2>
                        </div>
                        <div
                            className="bg-orange-200 rounded-lg p-6 text-center"
                            style={{ backgroundColor: '#cd9771' }}
                            data-aos="fade-left"
                        >
                            <h2 className="text-2xl font-light text-white font-[Playfair_Display]">
                                {t('section2.mobile.div5.h2')}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block">
                <div className="grid grid-cols-6 gap-2 mx-4 xl:mx-15 my-15 bg-cover bg-top bg-no-repeat"
                    aria-label={t('section2.desktop.arialabel')}
                    style={{
                        gridTemplateRows: 'repeat(6, 210px)',
                        backgroundImage: 'url("/Images/Bonbon-Minimalist.jpg")'
                    }}>
                    {/* Item 1 - Tinh tế và sáng tạo */}
                    <div
                        className="col-span-1 row-span-5 flex flex-col items-center justify-start gap-2 pt-40 font-light text-4xl bg-cover bg-top bg-no-repeat font-[Playfair_Display]"
                        style={{
                            backgroundImage: 'url("/Images/Bonbon-Minimalist.jpg")'
                        }}
                        data-aos="fade-down"
                        data-aos-delay="500"
                        aria-label={t('section2.desktop.div1.arialabel')}
                    >
                        <span>{t('section2.desktop.div1.s1')}</span>
                        <span>{t('section2.desktop.div1.s2')}</span>
                        <span>{t('section2.desktop.div1.s3')}</span>
                        <span>{t('section2.desktop.div1.s4')}</span>
                        <span>{t('section2.desktop.div1.s5')}</span>
                        <span className="sr-only">
                            {t('section2.desktop.div1.spansr')}
                        </span>
                    </div>

                    {/* Item 2 - Nguyên liệu thuần Việt */}
                    <div
                        className="col-span-5 row-span-1 flex flex-col items-center justify-center gap-2 font-light text-4xl xl:text-6xl text-white"
                        style={{
                            backgroundColor: '#cd9771',
                            fontFamily: 'Playfair Display, serif'
                        }}
                        data-aos="fade-right"
                        data-aos-delay="0"
                    >
                        {t('section2.desktop.div2')}
                    </div>

                    {/* Item 3 - Chế tác thủ công */}
                    <div
                        className="col-start-6 col-span-1 row-start-2 row-span-5 flex flex-col items-center justify-start pt-60 gap-2 font-light text-5xl bg-gray-50 bg-cover bg-center bg-no-repeat font-[Playfair_Display]"
                        style={{
                            backgroundImage: 'url("/Images/Chế-tác-thủ-công.jpg")'
                        }}
                        data-aos="fade-up"
                        data-aos-delay="1000"
                        aria-label={t('section2.desktop.div3.arialabel')}
                    >
                        <span>{t('section2.desktop.div3.s1')}</span>
                        <span>{t('section2.desktop.div3.s2')}</span>
                        <span>{t('section2.desktop.div3.s3')}</span>
                        <span>{t('section2.desktop.div3.s4')}</span>
                        <span className="sr-only">
                            {t('section2.desktop.div3.spansr')}
                        </span>
                    </div>

                    {/* Item 4 - Background grinding */}
                    <div
                        className="col-start-1 col-span-5 row-start-6 row-span-1 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: 'url("/Images/Grinding.jpg")'
                        }}
                        data-aos="fade-left"
                        aria-label={t('section2.desktop.div4.arialabel')}
                    >
                        <span className="sr-only">
                            {t('section2.desktop.div4.spansr')}
                        </span>
                    </div>

                    {/* Item 5 - Nguyên Chất và Thượng Hạng */}
                    <div
                        className="col-start-2 col-span-1 row-start-2 row-span-3 flex flex-col"
                        style={{ backgroundColor: '#cd9771' }}
                        data-aos="fade-up"
                        data-aos-delay="1000"
                    >
                        <Image
                            src="/Images/Sôcola.jpg"
                            alt={t('section2.desktop.div5.alt')}
                            width={300}
                            height={200}
                            className="w-full h-auto object-cover"
                            loading="lazy"
                        />
                        <span
                            className="row-span-5 flex flex-col items-center justify-start text-center text-5xl pt-15 text-white font-light px-2 font-[Playfair_Display]"
                        >
                            <span>{t('section2.desktop.div5.s1')}</span>
                            <span>{t('section2.desktop.div5.s2')}</span>
                            <span>{t('section2.desktop.div5.s3')}</span>
                            <span>{t('section2.desktop.div5.s4')}</span>
                            <span>{t('section2.desktop.div5.s5')}</span>
                        </span>
                    </div>

                    {/* Item Logo */}
                    <div className="col-start-3 col-span-2 row-start-3 row-span-2 flex items-center justify-center">
                        <Image
                            src="/Logo/logo LYSLAN ok-01.svg"
                            alt={t('section2.desktop.logo.alt')}
                            width={200}
                            height={150}
                            className="max-h-full w-auto"
                            loading="lazy"
                        />
                    </div>

                    {/* Item 6 - Product images */}
                    <div className="col-start-3 col-span-3 row-start-2 row-span-1 flex items-center justify-center overflow-hidden">
                        <Image
                            src="/Images/GóiThanh.jpg"
                            alt={t('section2.desktop.div6.alt1')}
                            width={200}
                            height={170}
                            className="max-h-52 w-auto px-1"
                            data-aos="fade-down"
                            data-aos-delay="1500"
                            loading="lazy"
                        />
                        <Image
                            src="/Images/NamaMaking.jpg"
                            alt={t('section2.desktop.div6.alt2')}
                            width={200}
                            height={170}
                            className="max-h-52 w-auto px-1"
                            data-aos="fade-up"
                            data-aos-delay="1600"
                            loading="lazy"
                        />
                        <Image
                            src="/Images/Matcha-Nama.jpg"
                            alt={t('section2.desktop.div6.alt3')}
                            width={200}
                            height={170}
                            className="max-h-52 w-auto px-1"
                            data-aos="fade-down"
                            data-aos-delay="1700"
                            loading="lazy"
                        />
                    </div>

                    {/* Item 7 - Thanh socola trắng */}
                    <div
                        className="col-start-5 col-span-1 row-start-3 row-span-3 bg-gray-50 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: 'url("/Images/Thanh.jpg")'
                        }}
                        data-aos="fade-up"
                        aria-label={t('section2.desktop.div7.arialabel')}
                    >
                        <span className="sr-only">
                            {t('section2.desktop.div7.spansr')}
                        </span>
                    </div>

                    {/* Item 8 - Bottom product images */}
                    <div className="col-start-2 col-span-3 row-start-5 row-span-1 flex items-center justify-center" data-aos="fade-right">
                        <Image
                            src="/Images/Pomelo-Desert2.jpg"
                            alt={t('section2.desktop.div8.alt1')}
                            width={240}
                            height={200}
                            className="max-h-50 w-auto px-2 xl:px-5"
                            loading="lazy"
                        />
                        <Image
                            src="/Images/EggCoffeeDragees.jpg"
                            alt={t('section2.desktop.div8.alt2')}
                            width={240}
                            height={200}
                            className="max-h-50 w-auto px-2 xl:px-5"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}