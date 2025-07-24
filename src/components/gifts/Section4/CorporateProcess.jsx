'use client';
import React, { useRef } from 'react';
import { Phone, FileText, Palette, Package, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

const steps = [
    {
        icon: <Phone className="w-6 h-6" />,
        title: "Tư vấn & Lắng nghe",
        description: "Tìm hiểu nhu cầu, mục tiêu và thông điệp của doanh nghiệp"
    },
    {
        icon: <FileText className="w-6 h-6" />,
        title: "Báo giá chi tiết",
        description: "Gửi báo giá minh bạch với nhiều phương án lựa chọn"
    },
    {
        icon: <Palette className="w-6 h-6" />,
        title: "Thiết kế mẫu",
        description: "Thiết kế và gửi mẫu thử trong vòng 48h"
    },
    {
        icon: <Package className="w-6 h-6" />,
        title: "Sản xuất",
        description: "Sản xuất với quy trình kiểm soát chất lượng nghiêm ngặt"
    },
    {
        icon: <Truck className="w-6 h-6" />,
        title: "Giao hàng",
        description: "Đóng gói cẩn thận và giao hàng đúng hẹn"
    }
];

export default function CorporateProcess() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-20 md:py-32 bg-[#faf8f5]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#2c1810] mb-6">
                        Quy Trình Đặt Hàng Chuyên Nghiệp
                    </h2>
                    <motion.div
                        className="w-24 h-0.5 bg-[#d4a574] mx-auto mb-6"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: 96 } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Chúng tôi không cung cấp "sản phẩm bán sẵn". Chúng tôi tạo ra
                        <span className="font-medium text-[#2c1810]"> trải nghiệm tặng quà hoàn chỉnh</span> –
                        từ hương vị, hình ảnh đến cảm xúc cuối cùng khi người nhận mở hộp.
                    </p>
                </motion.div>

                {/* Process Timeline */}
                <div className="relative">
                    {/* Desktop Timeline */}
                    <div className="hidden lg:block">
                        {/* Connection Line */}
                        <motion.div
                            className="absolute top-24 left-0 right-0 h-0.5 bg-gray-300"
                            initial={{ scaleX: 0 }}
                            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />

                        <motion.div
                            className="grid grid-cols-5 gap-8"
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.2,
                                        delayChildren: 0.3
                                    }
                                }
                            }}
                        >
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center relative"
                                    variants={{
                                        hidden: { opacity: 0, y: 30 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                >
                                    {/* Icon Circle */}
                                    <motion.div
                                        className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-6 relative z-10"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <div className="text-[#d4a574]">
                                            {step.icon}
                                        </div>
                                        {/* Step Number */}
                                        <motion.div
                                            className="absolute -top-2 -right-2 w-8 h-8 bg-[#d4a574] text-white rounded-full flex items-center justify-center text-sm font-medium"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.5 + index * 0.2, type: "spring" }}
                                        >
                                            {index + 1}
                                        </motion.div>
                                    </motion.div>

                                    {/* Content */}
                                    <h3 className="text-lg font-medium text-[#2c1810] mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {step.description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Mobile Timeline */}
                    <motion.div
                        className="lg:hidden space-y-6"
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
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                className="flex items-start space-x-4"
                                variants={{
                                    hidden: { opacity: 0, x: -30 },
                                    visible: { opacity: 1, x: 0 }
                                }}
                            >
                                <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center flex-shrink-0">
                                    <div className="text-[#d4a574]">
                                        {step.icon}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-medium text-[#2c1810] mb-1">
                                        {index + 1}. {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Trust Indicators */}
                <motion.div
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 1 }}
                >
                    {[
                        { value: "100%", label: "Đúng cam kết" },
                        { value: "48h", label: "Có mẫu thử" },
                        { value: "24/7", label: "Hỗ trợ tư vấn" },
                        { value: "0₫", label: "Phí thiết kế" }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="text-center"
                            whileHover={{ y: -5 }}
                        >
                            <p className="text-3xl font-light text-[#d4a574] mb-2">{item.value}</p>
                            <p className="text-sm text-gray-600">{item.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}