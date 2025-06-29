'use client';
import { useEffect, useState, useMemo } from 'react';
import ProductCard from './productcard';

export default function ProductList({ t, category, onShowcaseOpen }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const getFlexBasis = (length) => (isMobile ? (length <= 3 ? '85%' : '75%') : '280px');

    const products = useMemo(() => {
        const d = {
            bonbon: [
                {
                    id: 'box6cb1',
                    name: t('section5.product.bonbon.box6cb1.name'),
                    subName: t('section5.product.bonbon.box6cb1.subname'),
                    image: '/images/Boxof6.jpg',
                    description: t('section5.product.bonbon.box6cb1.description'),
                    link: '#'
                },
                {
                    id: 'box6cb2',
                    name: t('section5.product.bonbon.box6cb2.name'),
                    subName: t('section5.product.bonbon.box6cb2.subname'),
                    image: '/images/Boxof6.jpg',
                    description: t('section5.product.bonbon.box6cb2.description'),
                    link: '#'
                },
                {
                    id: 'box12',
                    name: t('section5.product.bonbon.box12.name'),
                    subName: t('section5.product.bonbon.box12.subname'),
                    image: '/images/Bonbon12pieces.jpg',
                    description: t('section5.product.bonbon.box12.description'),
                    link: '#'
                },
                {
                    id: 'box24',
                    name: t('section5.product.bonbon.box24.name'),
                    subName: t('section5.product.bonbon.box24.subname'),
                    image: '/images/Bonbon24pieces2.jpg',
                    description: t('section5.product.bonbon.box24.description'),
                    link: '#'
                }
            ],
            bar: [
                {
                    id: 'bar1',
                    name: t('section5.product.bar.bar1.name'),
                    subName: t('section5.product.bar.bar1.subname'),
                    image: '/images/WhiteCoconut.jpg',
                    description: t('section5.product.bar.bar1.description'),
                    link: '#'
                },
                {
                    id: 'bar2',
                    name: t('section5.product.bar.bar2.name'),
                    subName: t('section5.product.bar.bar2.subname'),
                    image: '/images/Dairymilk.jpg',
                    description: t('section5.product.bar.bar2.description'),
                    link: '#'
                },
                {
                    id: 'bar3',
                    name: t('section5.product.bar.bar3.name'),
                    subName: t('section5.product.bar.bar3.subname'),
                    image: '/images/Dalgona.jpg',
                    description: t('section5.product.bar.bar3.description'),
                    link: '#'
                },
                {
                    id: 'bar4',
                    name: t('section5.product.bar.bar4.name'),
                    subName: t('section5.product.bar.bar4.subname'),
                    image: '/images/Brownrice.jpg',
                    description: t('section5.product.bar.bar4.description'),
                    link: '#'
                },
                {
                    id: 'bar5',
                    name: t('section5.product.bar.bar5.name'),
                    subName: t('section5.product.bar.bar5.subname'),
                    image: '/images/Mixnuts.jpg',
                    description: t('section5.product.bar.bar5.description'),
                    link: '#'
                },
                {
                    id: 'bar6',
                    name: t('section5.product.bar.bar6.name'),
                    subName: t('section5.product.bar.bar6.subname'),
                    image: '/images/Pumpkin.jpg',
                    description: t('section5.product.bar.bar6.description'),
                    link: '#'
                }
            ],
            nuts: [
                {
                    id: 'dg1',
                    name: t('section5.product.nuts.dg1.name'),
                    subName: t('section5.product.nuts.dg1.subname'),
                    image: '/images/cashew50g.jpg',
                    description: t('section5.product.nuts.dg1.description'),
                    link: '#'
                },
                {
                    id: 'dg2',
                    name: t('section5.product.nuts.dg2.name'),
                    subName: t('section5.product.nuts.dg2.subname'),
                    image: '/images/Cashew150gr.jpg',
                    description: t('section5.product.nuts.dg2.description'),
                    link: '#'
                },
                {
                    id: 'dg3',
                    name: t('section5.product.nuts.dg3.name'),
                    subName: t('section5.product.nuts.dg3.subname'),
                    image: '/images/Almond50g.jpg',
                    description: t('section5.product.nuts.dg3.description'),
                    link: '#'
                },
                {
                    id: 'dg4',
                    name: t('section5.product.nuts.dg4.name'),
                    subName: t('section5.product.nuts.dg4.subname'),
                    image: '/images/Almond150g.jpg',
                    description: t('section5.product.nuts.dg4.description'),
                    link: '#'
                },
                {
                    id: 'dg5',
                    name: t('section5.product.nuts.dg5.name'),
                    subName: t('section5.product.nuts.dg5.subname'),
                    image: '/images/EggCoffeeDragees.jpg',
                    description: t('section5.product.nuts.dg5.description'),
                    link: '#'
                },
                {
                    id: 'dg6',
                    name: t('section5.product.nuts.dg6.name'),
                    subName: t('section5.product.nuts.dg6.subname'),
                    image: '/images/EggCoffeeDragees.jpg',
                    description: t('section5.product.nuts.dg6.description'),
                    link: '#'
                }
            ],
            nama: [
                {
                    id: 'pomelo',
                    name: t('section5.product.nama.pomelo.name'),
                    subName: t('section5.product.nama.pomelo.subname'),
                    image: '/images/PomeloNama.jpg',
                    description: t('section5.product.nama.pomelo.description'),
                    link: '#'
                },
                {
                    id: 'matcha',
                    name: t('section5.product.nama.matcha.name'),
                    subName: t('section5.product.nama.matcha.subname'),
                    image: '/images/Matcha-Nama.jpg',
                    description: t('section5.product.nama.matcha.description'),
                    link: '#'
                },
                {
                    id: 'creambrulee',
                    name: t('section5.product.nama.creambrulee.name'),
                    subName: t('section5.product.nama.creambrulee.subname'),
                    image: '/images/CreameBrulee.jpg',
                    description: t('section5.product.nama.creambrulee.description'),
                    link: '#'
                }
            ]
        };
        return d[category] || [];
    }, [t, category]);

    return (
        <div
            className={`flex gap-6 overflow-x-auto pb-4 px-4 ${products.length <= 3 ? 'justify-center' : 'justify-start'
                }`}
            style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch'
            }}
        >
            {products.map((product) => (
                <div key={product.id} style={{ scrollSnapAlign: 'start' }}>
                    <ProductCard
                        product={product}
                        isMobile={isMobile}
                        flexBasis={getFlexBasis(products.length)}
                        showDetail={category === 'bonbon'}
                        onShowcaseOpen={() => onShowcaseOpen(product.id)} // Truyền callback
                    />
                </div>
            ))}
        </div>
    );
}
