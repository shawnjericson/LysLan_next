'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Gift, Award, Building2 } from 'lucide-react';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function CorporateHero() {
    return (
        <section className="relative min-h-[700px] bg-gradient-to-br from-[#2c1810] via-[#3e2618] to-[#2c1810] overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <motion.div
                        className="space-y-8"
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp}>
                            <div className="flex items-center space-x-2 text-[#d4a574] mb-4">
                                <Gift className="w-5 h-5" />
                                <p className="text-sm tracking-widest font-light">ĐẶT HÀNG DOANH NGHIỆP</p>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
                                Quà Tặng Cao Cấp
                                <span className="block text-[#d4a574] mt-2">Từ Chocolate Việt</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            className="text-lg md:text-xl text-gray-300 font-light leading-relaxed"
                            variants={fadeInUp}
                        >
                            Sang trọng, ý nghĩa, mang bản sắc riêng
                        </motion.p>

                        <motion.div
                            className="space-y-4 text-gray-300"
                            variants={fadeInUp}
                        >
                            <p className="leading-relaxed">
                                Với doanh nghiệp, một món quà không chỉ đơn thuần là lời cảm ơn.
                                Đó còn là một cách để <span className="text-white font-medium">truyền tải giá trị thương hiệu</span>,
                                <span className="text-white font-medium"> gây ấn tượng sâu sắc</span>, và
                                <span className="text-white font-medium"> mở ra những kết nối lâu dài</span>.
                            </p>
                        </motion.div>

                        {/* Key Points */}
                        <motion.div
                            className="space-y-3"
                            variants={fadeInUp}
                        >
                            {[
                                { icon: <Award className="w-5 h-5" />, text: "Chất lượng thật – chocolate thủ công từ 100% cacao Việt Nam" },
                                { icon: <Building2 className="w-5 h-5" />, text: "Thẩm mỹ sang trọng – bao bì thiết kế riêng theo thương hiệu" },
                                { icon: <Gift className="w-5 h-5" />, text: "Cá nhân hóa thông điệp – từng hộp quà kể một câu chuyện" }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center space-x-3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                >
                                    <div className="text-[#d4a574]">{item.icon}</div>
                                    <p className="text-sm text-gray-400">{item.text}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                            variants={fadeInUp}
                        >
                            <motion.button
                                className="px-8 py-4 bg-[#d4a574] hover:bg-[#c19660] text-white font-light tracking-wide transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Nhận Báo Giá
                            </motion.button>
                            <motion.button
                                className="px-8 py-4 border border-white hover:border-[#d4a574] hover:bg-white/10 text-white font-light tracking-wide transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Xem Catalog
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Visual Grid */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            {/* Main Image */}
                            <motion.div
                                className="col-span-2 relative h-64 rounded-lg overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Image
                                    src="/Images/IM6.jpg"
                                    alt="Quà tặng chocolate doanh nghiệp"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            </motion.div>

                            {/* Small Images */}
                            <motion.div
                                className="relative h-48 rounded-lg overflow-hidden"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Image
                                    src="/Images/IM7.jpg"
                                    alt="Hộp quà chocolate cao cấp"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>

                            <motion.div
                                className="relative h-48 rounded-lg overflow-hidden"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Image
                                    src="/Images/CG19.jpg"
                                    alt="Chocolate doanh nghiệp custom"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </div>

                        {/* Stats Badge */}
                        <motion.div
                            className="absolute -bottom-4 -right-4 bg-white p-6 rounded-lg shadow-xl"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, type: "spring" }}
                        >
                            <div className="flex items-center space-x-4">
                                <div>
                                    <p className="text-3xl font-light text-[#d4a574]">500+</p>
                                    <p className="text-sm text-gray-600">Doanh nghiệp tin tưởng</p>
                                </div>
                                <div className="w-px h-12 bg-gray-300" />
                                <div>
                                    <p className="text-3xl font-light text-[#d4a574]">50K+</p>
                                    <p className="text-sm text-gray-600">Hộp quà đã giao</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 50C240 20 480 20 720 50C960 80 1200 80 1440 50V100H0V50Z" fill="white" />
                </svg>
            </div>
        </section>
    );
}