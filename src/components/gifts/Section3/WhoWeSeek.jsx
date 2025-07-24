'use client';
import React, { useRef } from 'react';
import { Store, Hotel, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

const partnerTypes = [
    {
        icon: <Store className="w-8 h-8" />,
        title: "Cửa hàng & Boutique",
        description: "Các cửa hàng quà tặng, boutique, concept store yêu thích những sản phẩm thủ công, nghệ thuật",
        features: ["Không gian trưng bày đẹp", "Khách hàng có gu thẩm mỹ", "Yêu thích sản phẩm thủ công"],
        color: "#8B6F47"
    },
    {
        icon: <Hotel className="w-8 h-8" />,
        title: "Nhà hàng & Khách sạn",
        description: "Nhà hàng, khách sạn, spa… cần một món quà tặng tinh tế cho khách hàng cao cấp",
        features: ["Phục vụ khách hàng cao cấp", "Cần quà tặng độc đáo", "Tạo trải nghiệm khác biệt"],
        color: "#A0826D"
    },
    {
        icon: <Users className="w-8 h-8" />,
        title: "Cá nhân có ảnh hưởng",
        description: "Các cá nhân có gu thẩm mỹ riêng, muốn giới thiệu sản phẩm chất lượng đến cộng đồng",
        features: ["Có cộng đồng tin tưởng", "Gu thẩm mỹ riêng biệt", "Đam mê chia sẻ giá trị"],
        color: "#BC9A6A"
    }
];

export default function WhoWeSeek() {
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
                        💼 Chúng tôi tìm kiếm ai?
                    </h2>
                    <motion.div
                        className="w-24 h-0.5 bg-[#d4a574] mx-auto mb-6"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: 96 } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Những đối tác có chung tầm nhìn về chất lượng và thẩm mỹ
                    </p>
                </motion.div>

                {/* Partner Types Grid */}
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
                    {partnerTypes.map((type, index) => (
                        <motion.div
                            key={index}
                            className="group relative"
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            <motion.div
                                className="h-full bg-[#faf8f5] rounded-2xl p-8 transition-all duration-300 hover:shadow-xl"
                                whileHover={{ y: -8 }}
                                style={{
                                    borderTop: `4px solid ${type.color}`,
                                }}
                            >
                                {/* Icon */}
                                <motion.div
                                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
                                    style={{ backgroundColor: `${type.color}20` }}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div style={{ color: type.color }}>
                                        {type.icon}
                                    </div>
                                </motion.div>

                                {/* Content */}
                                <h3 className="text-xl font-medium text-[#2c1810] mb-4">
                                    {type.title}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {type.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-2">
                                    {type.features.map((feature, idx) => (
                                        <motion.li
                                            key={idx}
                                            className="flex items-center text-sm text-gray-700"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 + idx * 0.1 }}
                                        >
                                            <div
                                                className="w-1.5 h-1.5 rounded-full mr-3"
                                                style={{ backgroundColor: type.color }}
                                            />
                                            {feature}
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Hover Effect Line */}
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-0.5"
                                    style={{ backgroundColor: type.color }}
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}