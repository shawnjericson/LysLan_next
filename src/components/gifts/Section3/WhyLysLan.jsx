'use client';
import React, { useRef } from 'react';
import { Heart, Palette, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const reasons = [
    {
        icon: <Heart className="w-8 h-8" />,
        title: "Chocolate thật – kể chuyện thật – từ đất Việt",
        description: "100% cacao Việt Nam, mỗi sản phẩm đều mang câu chuyện riêng",
        image: "/Images/Beantobar_IMG3.jfif"
    },
    {
        icon: <Palette className="w-8 h-8" />,
        title: "Sản phẩm thủ công, tinh tế",
        description: "Mang tinh thần tặng phẩm cao cấp chứ không phải sản phẩm tiêu dùng đại trà",
        image: "/Images/GC9.jpg"
    },
    {
        icon: <Award className="w-8 h-8" />,
        title: "Hình thức chỉn chu",
        description: "Phù hợp với phân khúc khách hàng cao cấp, quà tặng doanh nghiệp, showroom",
        image: "/Images/IM11.jpg"
    }
];

export default function WhyLysLan() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-20 md:py-32 bg-white relative overflow-hidden">
            {/* Background Elements */}
            <motion.div
                className="absolute top-20 left-0 w-96 h-96 bg-[#d4a574] rounded-full opacity-5"
                animate={{
                    x: [-100, -50, -100],
                    y: [0, 50, 0]
                }}
                transition={{ duration: 20, repeat: Infinity }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#2c1810] mb-6">
                        Tại sao là LysLan?
                    </h2>
                    <motion.div
                        className="w-24 h-0.5 bg-[#d4a574] mx-auto mb-6"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: 96 } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light">
                        Không chỉ là chocolate, chúng tôi mang đến giá trị văn hóa và nghệ thuật
                    </p>
                </motion.div>

                {/* Reasons Grid */}
                <motion.div
                    className="space-y-20"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                }`}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            {/* Content */}
                            <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                <motion.div
                                    className="inline-flex items-center justify-center w-20 h-20 bg-[#d4a574]/10 rounded-full"
                                    whileHover={{ scale: 1.1, rotate: 10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="text-[#d4a574]">
                                        {reason.icon}
                                    </div>
                                </motion.div>

                                <h3 className="text-2xl md:text-3xl font-light text-[#2c1810]">
                                    {reason.title}
                                </h3>

                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {reason.description}
                                </p>

                                <motion.div
                                    className="flex items-center space-x-2 text-[#d4a574]"
                                    whileHover={{ x: 10 }}
                                >
                                    <Link href="#" className="text-sm font-medium">Tìm hiểu thêm</Link>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </motion.div>
                            </div>

                            {/* Image */}
                            <motion.div
                                className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                                    <Image
                                        src={reason.image}
                                        alt={reason.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/20 to-transparent" />
                                </div>

                                {/* Decorative element */}
                                <motion.div
                                    className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#d4a574] rounded-full opacity-10"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}