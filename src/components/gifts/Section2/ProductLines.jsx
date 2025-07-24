'use client';
import { useTranslations } from '@/lib/useTranslations';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';

export default function ProductLines() {
    const t = useTranslations('service');
    const products = [
        {
            id: 'bonbon',
            name: t('section2.productLines.name1'),
            description: t('section2.productLines.description1'),
            features: [t('section2.productLines.features1'), t('section2.productLines.features2'), t('section2.productLines.features3')],
            image: '/Images/GC12.jpg',
            color: '#8B4513'
        },
        {
            id: 'bar',
            name: t('section2.productLines.name2'),
            description: t('section2.productLines.description2'),
            features: [t('section2.productLines.features4'), t('section2.productLines.features5'), t('section2.productLines.features6')],
            image: '/Images/IM19.jpg',
            color: '#6B4423'
        },
        {
            id: 'dragees',
            name: t('section2.productLines.name3'),
            description: t('section2.productLines.description3'),
            features: [t('section2.productLines.features7'), t('section2.productLines.features8'), t('section2.productLines.features9')],
            image: '/Images/GC15.jpg',
            color: '#A0522D'
        },
        {
            id: 'nama',
            name: t('section2.productLines.name4'),
            description: t('section2.productLines.description4'),
            features: [t('section2.productLines.features10'), t('section2.productLines.features11'), t('section2.productLines.features12')],
            image: '/Images/IM1.jpg',
            color: '#4A2C17'
        }
    ];
    const [selectedProduct, setSelectedProduct] = useState(products[0]);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-16 md:py-20 lg:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#2c1810] mb-4 md:mb-6">
                        {t('section2.productLines.headline')}
                    </h2>
                    <motion.div
                        className="w-16 sm:w-20 md:w-24 h-0.5 bg-[#d4a574] mx-auto mb-4 md:mb-6"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "100%" } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
                        {t('section2.productLines.subheadline')}
                    </p>
                </motion.div>

                {/* Product Display - Mobile First */}
                <motion.div
                    className="lg:hidden mb-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="relative">
                        {/* Mobile Image Display */}
                        <div className="relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden shadow-xl">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedProduct.id}
                                    className="absolute inset-0"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Image
                                        src={selectedProduct.image}
                                        alt={selectedProduct.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

                                    {/* Content Overlay for Mobile */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <motion.h3
                                            className="text-2xl font-light mb-2"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {selectedProduct.name}
                                        </motion.h3>
                                        <motion.p
                                            className="text-sm text-gray-200 line-clamp-2"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            {selectedProduct.description}
                                        </motion.p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* Product Selector - Mobile */}
                <motion.div
                    className="lg:hidden mb-8"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.3
                            }
                        }
                    }}
                >
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {products.map((product) => (
                            <motion.div
                                key={product.id}
                                className={`relative p-4 sm:p-5 rounded-lg cursor-pointer transition-all duration-300 border-2 ${selectedProduct.id === product.id
                                        ? 'border-[#d4a574] bg-[#faf8f5] shadow-lg'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                onClick={() => setSelectedProduct(product)}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="flex items-start space-x-3">
                                    <motion.div
                                        className="w-4 h-4 rounded-full flex-shrink-0 mt-1"
                                        style={{ backgroundColor: product.color }}
                                        animate={{
                                            scale: selectedProduct.id === product.id ? 1.2 : 1
                                        }}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`text-sm sm:text-base font-medium mb-1 ${selectedProduct.id === product.id ? 'text-[#2c1810]' : 'text-gray-700'
                                            }`}>
                                            {product.name}
                                        </h3>
                                        <p className="text-xs text-gray-600 line-clamp-2">
                                            {product.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Features for Mobile */}
                <motion.div
                    className="lg:hidden bg-[#faf8f5] rounded-xl p-6 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h4 className="text-lg font-medium text-[#2c1810] mb-4">Đặc điểm nổi bật</h4>
                    <div className="space-y-2">
                        {selectedProduct.features.map((feature, index) => (
                            <div key={index} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-[#d4a574] rounded-full mt-1.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Desktop Layout */}
                <div className="hidden lg:grid grid-cols-2 gap-12 items-center">
                    {/* Product Selector - Desktop */}
                    <motion.div
                        className="order-2 lg:order-1"
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.3
                                }
                            }
                        }}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            {products.map((product) => (
                                <motion.div
                                    key={product.id}
                                    className={`relative p-6 rounded-lg cursor-pointer transition-all h-60 duration-500 border-2 overflow-hidden ${selectedProduct.id === product.id
                                            ? 'border-[#d4a574] bg-[#faf8f5] shadow-lg'
                                            : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                                        }`}
                                    onClick={() => setSelectedProduct(product)}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    whileHover={{
                                        scale: selectedProduct.id === product.id ? 1 : 1.05,
                                        transition: { duration: 0.2 }
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div
                                        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 transition transform"
                                        style={{
                                            backgroundImage: `url(${product.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                                            opacity: 0.3
                                        }}
                                    />
                                    <div className="relative z-10 h-full flex flex-col justify-end">
                                        <motion.div
                                            className="w-6 h-6 rounded-full mb-4"
                                            style={{ backgroundColor: product.color }}
                                            animate={{
                                                scale: selectedProduct.id === product.id ? 1.2 : 1,
                                                rotate: selectedProduct.id === product.id ? 360 : 0
                                            }}
                                            transition={{ duration: 0.5 }}
                                        />
                                        <h3 className={`text-lg font-medium mb-2 transition-colors duration-300 ${selectedProduct.id === product.id ? 'text-[#2c1810]' : 'text-gray-700'
                                            }`}>
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {product.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Product Display - Desktop */}
                    <motion.div
                        className="order-1 lg:order-2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="relative">
                            <div
                                className="aspect-square rounded-2xl overflow-hidden shadow-xl bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${selectedProduct.image})`,
                                    backgroundColor: '#faf8f5'
                                }}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedProduct.id}
                                        className="w-1/2 h-full bg-gradient-to-br from-[#faf8f5] to-[#f0e6d8] flex items-center justify-center"
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className="text-center p-8">
                                            <motion.h3
                                                className="text-3xl font-light text-[#2c1810] mb-4"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                {selectedProduct.name}
                                            </motion.h3>
                                            <motion.p
                                                className="text-gray-600 mb-8 max-w-sm mx-auto"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                {selectedProduct.description}
                                            </motion.p>

                                            <motion.div
                                                className="space-y-3"
                                                initial="hidden"
                                                animate="visible"
                                                variants={{
                                                    visible: {
                                                        transition: {
                                                            staggerChildren: 0.1,
                                                            delayChildren: 0.4
                                                        }
                                                    }
                                                }}
                                            >
                                                {selectedProduct.features.map((feature, index) => (
                                                    <motion.div
                                                        key={index}
                                                        className="flex items-center justify-center space-x-2"
                                                        variants={{
                                                            hidden: { opacity: 0, x: -20 },
                                                            visible: { opacity: 1, x: 0 }
                                                        }}
                                                    >
                                                        <motion.div
                                                            className="w-1.5 h-1.5 bg-[#d4a574] rounded-full"
                                                            animate={{ scale: [1, 1.5, 1] }}
                                                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                                                        />
                                                        <span className="text-sm text-gray-700">{feature}</span>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Decorative elements */}
                            <motion.div
                                className="absolute -top-4 -right-4 w-24 h-24 bg-[#d4a574] rounded-full opacity-10"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 180, 360]
                                }}
                                transition={{ duration: 20, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#2c1810] rounded-full opacity-5"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, -180, -360]
                                }}
                                transition={{ duration: 25, repeat: Infinity }}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Additional Info */}
                <motion.div
                    className="mt-12 md:mt-16 text-center"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <p className="text-sm sm:text-base text-gray-600 mb-4 px-4">
                        {t('section2.productLines.quantity1')}
                        <span className="font-medium text-[#2c1810]">{t('section2.productLines.quantity2')}</span>
                        {t('section2.productLines.quantity3')}
                    </p>
                    <motion.button
                        className="text-[#d4a574] hover:text-[#c19660] font-medium transition-colors duration-300"
                        whileHover={{ x: 5 }}
                        whileTap={{ x: 0 }}
                    >
                        {t('section2.productLines.catalogButton')}
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}