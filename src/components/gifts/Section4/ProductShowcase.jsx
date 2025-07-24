'use client';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import Image from 'next/image';

const products = [
    {
        id: 'bonbon',
        name: 'Bonbon',
        subtitle: 'Nghệ thuật trong từng viên',
        description: 'Thiết kế nghệ thuật, nhân chocolate thủ công độc đáo, phù hợp khách hàng cao cấp',
        features: ['Thiết kế tinh xảo', 'Nhân đa dạng', 'Vỏ chocolate mỏng'],
        image: '/Images/Pomelo-Desert2.jpg',
        color: '#8B4513'
    },
    {
        id: 'bar',
        name: 'Thanh Chocolate',
        subtitle: 'Tối giản & Tinh tế',
        description: 'Tối giản, tinh tế, lý tưởng để đồng bộ hóa với bộ giftset',
        features: ['In logo doanh nghiệp', 'Đa dạng hàm lượng cacao', 'Bao bì cá nhân hóa'],
        image: '/Images/IM5.jpg',
        color: '#6B4423'
    },
    {
        id: 'dragees',
        name: 'Dragees',
        subtitle: 'Sang trọng & Tiện lợi',
        description: 'Chocolate bọc hạt cao cấp, tiện lợi & dễ chia sẻ',
        features: ['Hạt nhập khẩu cao cấp', 'Lớp phủ hoàn hảo', 'Đóng gói sang trọng'],
        image: '/Images/IM10.jpg',
        color: '#A0522D'
    },
    {
        id: 'nama',
        name: 'Nama',
        subtitle: 'Mềm mịn tan chảy',
        description: 'Mềm mịn, tan chảy, phù hợp không gian tiếp khách riêng',
        features: ['Tan chảy trong miệng', 'Hương vị tinh khiết', 'Bảo quản lạnh'],
        image: '/Images/PomeloNama.jpg',
        color: '#4A2C17'
    }
];

export default function ProductShowcase() {
    const [selectedProduct, setSelectedProduct] = useState(products[0]);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-20 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#2c1810] mb-6">
                        🍫 Sản Phẩm Chocolate Doanh Nghiệp
                    </h2>
                    <motion.div
                        className="w-24 h-0.5 bg-[#d4a574] mx-auto mb-6"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: 96 } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        LysLan mang đến 4 dòng sản phẩm chủ lực, phù hợp nhiều nhu cầu tặng phẩm.
                        Tất cả đều được chế tác từ <span className="font-medium text-[#2c1810]">100% cacao Việt Nam nguyên chất</span>.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Display */}
                    <motion.div
                        className="order-2 lg:order-1"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedProduct.id}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 30 }}
                                transition={{ duration: 0.4 }}
                                className="sticky top-8"
                            >
                                {/* Product Image */}
                                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl mb-8">
                                    <Image
                                        src={selectedProduct.image}
                                        alt={selectedProduct.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                                    {/* Product Badge */}
                                    <motion.div
                                        className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring" }}
                                    >
                                        <p className="text-sm font-medium" style={{ color: selectedProduct.color }}>
                                            {selectedProduct.subtitle}
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Product Info */}
                                <div className="bg-[#faf8f5] rounded-2xl p-8">
                                    <h3 className="text-2xl font-medium text-[#2c1810] mb-4">
                                        {selectedProduct.name}
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        {selectedProduct.description}
                                    </p>

                                    {/* Features */}
                                    <div className="space-y-3">
                                        {selectedProduct.features.map((feature, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex items-center space-x-3"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.4 + index * 0.1 }}
                                            >
                                                <div
                                                    className="w-2 h-2 rounded-full"
                                                    style={{ backgroundColor: selectedProduct.color }}
                                                />
                                                <span className="text-sm text-gray-700">{feature}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Product Selector */}
                    <motion.div
                        className="order-1 lg:order-2"
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.4
                                }
                            }
                        }}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            {products.map((product) => (
                                <motion.div
                                    key={product.id}
                                    className={`p-6 rounded-xl cursor-pointer transition-all duration-300 border-2 ${selectedProduct.id === product.id
                                            ? 'border-[#d4a574] bg-white shadow-lg'
                                            : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300'
                                        }`}
                                    onClick={() => setSelectedProduct(product)}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.div
                                        className="w-16 h-16 rounded-full mb-4 mx-auto"
                                        style={{ backgroundColor: `${product.color}20` }}
                                        animate={{
                                            scale: selectedProduct.id === product.id ? 1.1 : 1
                                        }}
                                    >
                                        <div className="w-full h-full rounded-full flex items-center justify-center">
                                            <div
                                                className="w-8 h-8 rounded-full"
                                                style={{ backgroundColor: product.color }}
                                            />
                                        </div>
                                    </motion.div>
                                    <h4 className={`text-center font-medium ${selectedProduct.id === product.id
                                            ? 'text-[#2c1810]'
                                            : 'text-gray-700'
                                        }`}>
                                        {product.name}
                                    </h4>
                                    <p className="text-xs text-center text-gray-500 mt-1">
                                        {product.subtitle}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Call to Action */}
                        <motion.div
                            className="mt-8 text-center"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1 }
                            }}
                        >
                            <p className="text-gray-600 mb-4">
                                Mỗi sản phẩm có thể tùy chỉnh theo yêu cầu riêng của doanh nghiệp
                            </p>
                            <motion.button
                                className="text-[#d4a574] hover:text-[#c19660] font-medium transition-colors"
                                whileHover={{ x: 5 }}
                            >
                                Xem thêm chi tiết sản phẩm →
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}