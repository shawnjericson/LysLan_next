'use client';
import React, { useRef } from 'react';
import { Palette, Package, MessageSquare, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import Image from 'next/image';

const services = [
    {
        icon: <Package className="w-6 h-6" />,
        title: "Thiết kế hộp quà theo bộ nhận diện",
        description: "Tạo packaging độc quyền phù hợp với thương hiệu của bạn"
    },
    {
        icon: <Palette className="w-6 h-6" />,
        title: "In logo, khắc tên cá nhân hóa",
        description: "Khắc laser, in ấn chất lượng cao trên chocolate và bao bì"
    },
    {
        icon: <MessageSquare className="w-6 h-6" />,
        title: "Lựa chọn hương vị & phối màu",
        description: "Tùy chỉnh hương vị và màu sắc theo thông điệp doanh nghiệp"
    },
    {
        icon: <Truck className="w-6 h-6" />,
        title: "Số lượng linh hoạt",
        description: "Từ 50 hộp đến hàng ngàn bộ quà, giao toàn quốc hoặc quốc tế"
    }
];

export default function CustomizationServices() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-20 md:py-32 bg-[#2c1810] text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, #d4a574 0%, transparent 50%),
                                      radial-gradient(circle at 80% 80%, #d4a574 0%, transparent 50%)`
                }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
                        ✨ Dịch Vụ Tùy Chỉnh Theo Thương Hiệu
                    </h2>
                    <motion.div
                        className="w-24 h-0.5 bg-[#d4a574] mx-auto mb-6"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: 96 } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                        Biến chocolate thành phần mở rộng của thương hiệu bạn
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Services Grid */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
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
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                whileHover={{ y: -5, borderColor: "rgba(212, 165, 116, 0.3)" }}
                            >
                                <motion.div
                                    className="inline-flex items-center justify-center w-12 h-12 bg-[#d4a574]/20 rounded-full mb-4"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="text-[#d4a574]">
                                        {service.icon}
                                    </div>
                                </motion.div>
                                <h3 className="text-lg font-medium mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-gray-400">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Visual Showcase */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="relative">
                            {/* Main Image */}
                            <div className="relative h-[500px] rounded-2xl overflow-hidden">
                                <Image
                                    src="/Images/GC10.jpg"
                                    alt="Dịch vụ tùy chỉnh chocolate doanh nghiệp"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/80 to-transparent" />
                            </div>

                            {/* Floating Cards */}
                            <motion.div
                                className="absolute -top-4 -right-4 bg-white rounded-lg p-4 shadow-xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ delay: 0.6 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <p className="text-sm text-gray-600 mb-1">Thời gian sản xuất</p>
                                <p className="text-2xl font-light text-[#d4a574]">7-14 ngày</p>
                            </motion.div>

                            <motion.div
                                className="absolute -bottom-4 -left-4 bg-[#d4a574] text-white rounded-lg p-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ delay: 0.7 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <p className="text-sm mb-1">Đơn hàng tối thiểu</p>
                                <p className="text-2xl font-light">50 hộp</p>
                            </motion.div>
                        </div>

                        {/* Process Steps */}
                        <motion.div
                            className="mt-8 grid grid-cols-4 gap-4"
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1,
                                        delayChildren: 0.8
                                    }
                                }
                            }}
                        >
                            {['Tư vấn', 'Thiết kế', 'Duyệt mẫu', 'Sản xuất'].map((step, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center"
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                >
                                    <div className="w-12 h-12 bg-[#d4a574] rounded-full flex items-center justify-center mx-auto mb-2">
                                        <span className="text-white font-medium">{index + 1}</span>
                                    </div>
                                    <p className="text-xs text-gray-300">{step}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}