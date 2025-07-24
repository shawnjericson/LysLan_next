'use client';
import React, { useRef } from 'react';
import { Send, Phone, Mail, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import Image from 'next/image';

export default function CorporateCTA() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-20 md:py-32 bg-white relative overflow-hidden">
            {/* Background Elements */}
            <motion.div
                className="absolute top-0 left-0 w-96 h-96 bg-[#d4a574] rounded-full opacity-5"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [-100, -50, -100]
                }}
                transition={{ duration: 20, repeat: Infinity }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#2c1810] mb-6">
                                📩 Đặt Hàng Doanh Nghiệp
                            </h2>
                            <p className="text-xl text-[#d4a574] font-light mb-6">
                                Chuyên Nghiệp, Linh Hoạt & Đáng Tin Cậy
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Tại LysLan, chúng tôi không cung cấp "sản phẩm bán sẵn".
                                Chúng tôi tạo ra <strong>trải nghiệm tặng quà hoàn chỉnh</strong> –
                                từ hương vị, hình ảnh đến cảm xúc cuối cùng khi người nhận mở hộp.
                            </p>
                        </div>

                        {/* Contact Options */}
                        <div className="space-y-4">
                            <motion.a
                                href="tel:+84xxxxxxxxx"
                                className="flex items-center space-x-4 p-4 bg-[#faf8f5] rounded-lg hover:bg-[#f0e6d8] transition-colors group"
                                whileHover={{ x: 5 }}
                            >
                                <div className="w-12 h-12 bg-[#d4a574]/20 rounded-full flex items-center justify-center group-hover:bg-[#d4a574]/30 transition-colors">
                                    <Phone className="w-5 h-5 text-[#d4a574]" />
                                </div>
                                <div>
                                    <p className="font-medium text-[#2c1810]">Hotline tư vấn</p>
                                    <p className="text-sm text-gray-600">+84 xxx xxx xxx</p>
                                </div>
                            </motion.a>

                            <motion.a
                                href="mailto:corporate@lyslan.com"
                                className="flex items-center space-x-4 p-4 bg-[#faf8f5] rounded-lg hover:bg-[#f0e6d8] transition-colors group"
                                whileHover={{ x: 5 }}
                            >
                                <div className="w-12 h-12 bg-[#d4a574]/20 rounded-full flex items-center justify-center group-hover:bg-[#d4a574]/30 transition-colors">
                                    <Mail className="w-5 h-5 text-[#d4a574]" />
                                </div>
                                <div>
                                    <p className="font-medium text-[#2c1810]">Email doanh nghiệp</p>
                                    <p className="text-sm text-gray-600">corporate@lyslan.com</p>
                                </div>
                            </motion.a>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <motion.button
                                className="px-8 py-4 bg-[#2c1810] hover:bg-[#3e2618] text-white font-light tracking-wide transition-all duration-300 rounded-lg flex items-center justify-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Send className="w-4 h-4 mr-2" />
                                Gửi yêu cầu báo giá
                            </motion.button>
                            <motion.button
                                className="px-8 py-4 border border-[#2c1810] hover:border-[#d4a574] hover:bg-[#faf8f5] text-[#2c1810] font-light tracking-wide transition-all duration-300 rounded-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Tải catalog sản phẩm
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className="bg-[#faf8f5] rounded-2xl p-8 shadow-xl"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-light text-[#2c1810] mb-6">
                            Liên hệ nhận tư vấn
                        </h3>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Tên doanh nghiệp"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#d4a574] transition-colors"
                                />
                                <input
                                    type="text"
                                    placeholder="Người liên hệ"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#d4a574] transition-colors"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#d4a574] transition-colors"
                                />
                                <input
                                    type="tel"
                                    placeholder="Số điện thoại"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#d4a574] transition-colors"
                                />
                            </div>
                            <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#d4a574] transition-colors text-gray-500">
                                <option>Loại sản phẩm quan tâm</option>
                                <option>Bonbon cao cấp</option>
                                <option>Thanh chocolate</option>
                                <option>Dragees</option>
                                <option>Nama chocolate</option>
                                <option>Combo nhiều loại</option>
                            </select>
                            <input
                                type="number"
                                placeholder="Số lượng dự kiến (hộp)"
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#d4a574] transition-colors"
                            />
                            <textarea
                                placeholder="Mô tả yêu cầu của bạn (dịp tặng quà, đối tượng nhận, yêu cầu đặc biệt...)"
                                rows="4"
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#d4a574] transition-colors resize-none"
                            />
                            <motion.button
                                type="submit"
                                className="w-full py-4 bg-[#d4a574] hover:bg-[#c19660] text-white font-light tracking-wide transition-all duration-300 rounded-lg flex items-center justify-center"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Gửi thông tin
                            </motion.button>
                        </form>

                        {/* Trust Badge */}
                        <motion.div
                            className="mt-6 pt-6 border-t border-gray-200"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                                <span>✓ Phản hồi trong 24h</span>
                                <span>✓ Tư vấn miễn phí</span>
                                <span>✓ Báo giá nhanh</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-20"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <p className="text-2xl font-light text-[#2c1810] italic mb-6">
                        "Liên hệ với đội ngũ LysLan để nhận tư vấn cá nhân hóa
                        và báo giá chi tiết cho đơn hàng doanh nghiệp."
                    </p>
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-8 h-px bg-[#d4a574]" />
                        <span className="text-[#d4a574]">LysLan</span>
                        <div className="w-8 h-px bg-[#d4a574]" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}