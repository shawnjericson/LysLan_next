'use client';
import React, { useRef, useState } from 'react';
import { Store, Package, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';

const models = [
    {
        id: 'consignment',
        icon: <Store className="w-8 h-8" />,
        title: "Ký gửi trưng bày",
        subtitle: "Tại không gian của bạn",
        description: "Chúng tôi cung cấp sản phẩm, trưng bày và hỗ trợ hình ảnh – bạn chỉ cần tạo không gian phù hợp.",
        features: [
            "Không cần vốn đầu tư ban đầu",
            "Hỗ trợ trưng bày chuyên nghiệp",
            "Linh hoạt thay đổi sản phẩm"
        ],
        suitable: "Lý tưởng cho showroom, concept store, spa, resort, phòng tranh hoặc không gian lifestyle có gu riêng.",
        color: "#8B6F47"
    },
    {
        id: 'retail',
        icon: <Package className="w-8 h-8" />,
        title: "Hợp tác bán lẻ",
        subtitle: "Theo đơn đặt hàng",
        description: "Dành cho cửa hàng quà tặng, boutique, nhà hàng – nơi chocolate có thể trở thành một phần trong trải nghiệm của khách hàng.",
        features: [
            "Đặt hàng linh hoạt theo nhu cầu",
            "Chiết khấu hấp dẫn theo số lượng",
            "Hỗ trợ marketing và bán hàng"
        ],
        suitable: "Phù hợp với cửa hàng quà tặng, boutique cao cấp, nhà hàng fine dining.",
        color: "#A0826D"
    },
    {
        id: 'exclusive',
        icon: <Star className="w-8 h-8" />,
        title: "Sản phẩm độc quyền",
        subtitle: "Cho không gian của bạn",
        description: "Ví dụ: Thanh chocolate vị hoa nhài cho một spa, hộp chocolate tên riêng cho một phòng tranh…",
        features: [
            "Thiết kế riêng theo yêu cầu",
            "Độc quyền trong khu vực",
            "Tạo điểm nhấn thương hiệu"
        ],
        suitable: "LysLan có thể đồng sáng tạo cùng bạn nếu bạn muốn thứ gì đó không chỉ là sản phẩm – mà là điểm nhấn thương hiệu.",
        color: "#BC9A6A"
    }
];

export default function PartnershipModels() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [selectedModel, setSelectedModel] = useState(models[0]);

    return (
        <section ref={ref} className="py-20 md:py-32 bg-[#2c1810] text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
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
                        🤲 Hình Thức Hợp Tác Linh Hoạt
                    </h2>
                    <motion.div
                        className="w-24 h-0.5 bg-[#d4a574] mx-auto mb-6"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: 96 } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                        Chúng tôi hiểu rằng mỗi đối tác đều có một cách tiếp cận thị trường riêng.
                        Vì vậy, LysLan luôn sẵn sàng linh hoạt trong mô hình hợp tác.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Model Selector */}
                    <motion.div
                        className="lg:col-span-1 space-y-4"
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                    >
                        {models.map((model) => (
                            <motion.div
                                key={model.id}
                                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${selectedModel.id === model.id
                                        ? 'bg-white/10 border border-[#d4a574]'
                                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                                    }`}
                                onClick={() => setSelectedModel(model)}
                                variants={{
                                    hidden: { opacity: 0, x: -30 },
                                    visible: { opacity: 1, x: 0 }
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center space-x-4">
                                    <motion.div
                                        className="text-[#d4a574]"
                                        animate={{
                                            rotate: selectedModel.id === model.id ? 360 : 0
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {model.icon}
                                    </motion.div>
                                    <div>
                                        <h3 className="font-medium">{model.title}</h3>
                                        <p className="text-sm text-gray-400">{model.subtitle}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Model Details */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedModel.id}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10"
                            >
                                {/* Header */}
                                <div className="flex items-start space-x-4 mb-8">
                                    <div
                                        className="p-4 rounded-xl"
                                        style={{ backgroundColor: `${selectedModel.color}20` }}
                                    >
                                        <div style={{ color: selectedModel.color }}>
                                            {selectedModel.icon}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-light mb-2">{selectedModel.title}</h3>
                                        <p className="text-gray-400">{selectedModel.subtitle}</p>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-300 mb-8 leading-relaxed">
                                    {selectedModel.description}
                                </p>

                                {/* Features */}
                                <div className="space-y-3 mb-8">
                                    {selectedModel.features.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-center space-x-3"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div
                                                className="w-2 h-2 rounded-full"
                                                style={{ backgroundColor: selectedModel.color }}
                                            />
                                            <span className="text-sm">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Suitable For */}
                                <div className="pt-6 border-t border-white/10">
                                    <p className="text-sm text-gray-400 italic">
                                        {selectedModel.suitable}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Bottom Note */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <p className="text-gray-400 italic">
                        Nếu bạn thấy hợp, chúng ta bắt đầu bằng một hộp chocolate và một buổi trò chuyện nhỏ.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}