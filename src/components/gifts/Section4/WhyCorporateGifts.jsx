'use client';
import React, { useRef } from 'react';
import { Target, Sparkles, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

const benefits = [
    {
        icon: <Target className="w-8 h-8" />,
        title: "Truyền tải giá trị thương hiệu",
        description: "Mỗi hộp chocolate là một thông điệp, một câu chuyện về văn hóa và giá trị cốt lõi của doanh nghiệp bạn.",
        color: "#8B6F47"
    },
    {
        icon: <Sparkles className="w-8 h-8" />,
        title: "Gây ấn tượng sâu sắc",
        description: "Quà tặng độc đáo, sang trọng giúp doanh nghiệp nổi bật giữa hàng trăm món quà thông thường.",
        color: "#A0826D"
    },
    {
        icon: <Handshake className="w-8 h-8" />,
        title: "Mở ra kết nối lâu dài",
        description: "Một món quà ý nghĩa là khởi đầu cho mối quan hệ bền vững với đối tác và khách hàng.",
        color: "#BC9A6A"
    }
];

export default function WhyCorporateGifts() {
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
                        Tại Sao Chocolate LysLan?
                    </h2>
                    <motion.div
                        className="w-24 h-0.5 bg-[#d4a574] mx-auto mb-6"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: 96 } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        <strong>LysLan</strong> cung cấp giải pháp <strong>chocolate cao cấp thuần Việt</strong> dành riêng cho các doanh nghiệp,
                        tổ chức và thương hiệu đang tìm kiếm món quà tặng hội tụ đủ 3 yếu tố:
                    </p>
                </motion.div>

                {/* Benefits Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.15
                            }
                        }
                    }}
                >
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            className="relative group"
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            <motion.div
                                className="h-full bg-[#faf8f5] rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl relative overflow-hidden"
                                whileHover={{ y: -8 }}
                            >
                                {/* Background Decoration */}
                                <motion.div
                                    className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                                    style={{ backgroundColor: benefit.color }}
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />

                                {/* Icon */}
                                <motion.div
                                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
                                    style={{ backgroundColor: `${benefit.color}20` }}
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div style={{ color: benefit.color }}>
                                        {benefit.icon}
                                    </div>
                                </motion.div>

                                {/* Content */}
                                <h3 className="text-xl font-medium text-[#2c1810] mb-4">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {benefit.description}
                                </p>

                                {/* Hover Line */}
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-1"
                                    style={{ backgroundColor: benefit.color }}
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Stats */}
                <motion.div
                    className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    {[
                        { number: "100%", label: "Cacao Việt Nam nguyên chất" },
                        { number: "48h", label: "Thiết kế mẫu theo yêu cầu" },
                        { number: "50+", label: "Đơn hàng tối thiểu" }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                        >
                            <p className="text-4xl font-light text-[#d4a574] mb-2">{stat.number}</p>
                            <p className="text-gray-600">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}