'use client';
import React, { useRef } from 'react';
import { Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

export default function PartnershipCTA() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-20 md:py-32 bg-[#faf8f5] relative overflow-hidden">
            {/* Animated Background */}
            <motion.div
                className="absolute top-0 right-0 w-96 h-96 bg-[#d4a574] rounded-full opacity-5"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0]
                }}
                transition={{ duration: 20, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-0 left-0 w-64 h-64 bg-[#2c1810] rounded-full opacity-5"
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -90, 0]
                }}
                transition={{ duration: 25, repeat: Infinity }}
            />

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Content */}
                <motion.div
                    className="text-center space-y-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Icon */}
                    <motion.div
                        className="inline-flex items-center justify-center w-20 h-20 bg-[#d4a574]/10 rounded-full"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <Sparkles className="w-10 h-10 text-[#d4a574]" />
                    </motion.div>

                    {/* Heading */}
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#2c1810]">
                            ✨ LysLan rất mong có cơ hội
                        </h2>
                        <p className="text-2xl md:text-3xl font-light text-[#d4a574]">
                            đồng hành cùng bạn
                        </p>
                    </div>

                    {/* Description */}
                    <motion.p
                        className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        để tạo ra những trải nghiệm ngọt ngào, khác biệt và đậm chất Việt.
                    </motion.p>

                    {/* Divider */}
                    <motion.div
                        className="w-32 h-px bg-[#d4a574] mx-auto"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: 128 } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    />

                    {/* CTA Message */}
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <h3 className="text-2xl font-light text-[#2c1810]">
                            📩 Muốn trở thành người mang chocolate Việt đến nhiều trái tim hơn?
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto italic">
                            Chúng tôi không tuyển đại lý. Chúng tôi kết nối những người chung niềm tin –
                            rằng sản phẩm tốt có thể tạo ra điều tử tế.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Contact Form / Info */}
                <motion.div
                    className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.6
                            }
                        }
                    }}
                >
                    {/* Contact Form */}
                    <motion.div
                        className="bg-white rounded-2xl p-8 shadow-lg"
                        variants={{
                            hidden: { opacity: 0, x: -30 },
                            visible: { opacity: 1, x: 0 }
                        }}
                    >
                        <h4 className="text-xl font-medium text-[#2c1810] mb-6">
                            Bắt đầu câu chuyện của chúng ta
                        </h4>
                        <form className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Họ và tên"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#d4a574] transition-colors"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#d4a574] transition-colors"
                                />
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    placeholder="Số điện thoại"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#d4a574] transition-colors"
                                />
                            </div>
                            <div>
                                <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#d4a574] transition-colors text-gray-500">
                                    <option>Hình thức hợp tác quan tâm</option>
                                    <option>Ký gửi trưng bày</option>
                                    <option>Hợp tác bán lẻ</option>
                                    <option>Sản phẩm độc quyền</option>
                                </select>
                            </div>
                            <div>
                                <textarea
                                    placeholder="Chia sẻ về không gian/dự định của bạn"
                                    rows="4"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#d4a574] transition-colors resize-none"
                                />
                            </div>
                            <motion.button
                                type="submit"
                                className="w-full py-4 bg-[#2c1810] hover:bg-[#3e2618] text-white font-light tracking-wide transition-all duration-300 rounded-lg"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Gửi thông tin
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        className="space-y-8"
                        variants={{
                            hidden: { opacity: 0, x: 30 },
                            visible: { opacity: 1, x: 0 }
                        }}
                    >
                        <div>
                            <h4 className="text-xl font-medium text-[#2c1810] mb-4">
                                📬 Liên hệ với LysLan
                            </h4>
                            <p className="text-gray-600 mb-8 italic">
                                để cùng trò chuyện. Biết đâu, chocolate là cách ta bắt đầu một mối quan hệ lâu dài và nhiều cảm hứng.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <motion.a
                                href="tel:+84975066406"
                                className="flex items-start space-x-4 group"
                                whileHover={{ x: 5 }}
                            >
                                <div className="w-12 h-12 bg-[#d4a574]/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#d4a574]/20 transition-colors">
                                    <Phone className="w-5 h-5 text-[#d4a574]" />
                                </div>
                                <div>
                                    <p className="font-medium text-[#2c1810]">Điện thoại</p>
                                    <p className="text-gray-600">+84 975 066 406</p>
                                </div>
                            </motion.a>

                            <motion.a
                                href="mailto:sales@lyslan-chocolatier.vn"
                                className="flex items-start space-x-4 group"
                                whileHover={{ x: 5 }}
                            >
                                <div className="w-12 h-12 bg-[#d4a574]/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#d4a574]/20 transition-colors">
                                    <Mail className="w-5 h-5 text-[#d4a574]" />
                                </div>
                                <div>
                                    <p className="font-medium text-[#2c1810]">Email</p>
                                    <p className="text-gray-600">sales@lyslan-chocolatier.vn</p>
                                </div>
                            </motion.a>

                            <motion.div
                                className="flex items-start space-x-4"
                                whileHover={{ x: 5 }}
                            >
                                <div className="w-12 h-12 bg-[#d4a574]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-[#d4a574]" />
                                </div>
                                <div>
                                    <p className="font-medium text-[#2c1810]">Địa chỉ</p>
                                    <p className="text-gray-600">3/107 Thủ Khoa Huân, Tx., Ấp Bình Thuận, Thuận Giao, Thuận An, Bình Dương</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Additional Info Box */}
                        <motion.div
                            className="bg-[#2c1810] text-white rounded-xl p-6 mt-8"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <h5 className="font-medium mb-3">Giờ làm việc</h5>
                            <p className="text-sm text-gray-300">Thứ 2 - Thứ 6: 8:00 - 17:00</p>
                            <p className="text-sm text-gray-300 mt-3 italic">
                                Hoặc liên hệ để hẹn gặp ngoài giờ
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Bottom Quote */}
                <motion.div
                    className="text-center mt-20"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                >
                    <p className="text-2xl font-light text-[#2c1810] italic">
                        "Chocolate là cách ta bắt đầu một mối quan hệ lâu dài và nhiều cảm hứng"
                    </p>
                    <div className="flex items-center justify-center mt-6 space-x-2">
                        <div className="w-8 h-px bg-[#d4a574]" />
                        <span className="text-[#d4a574]">LysLan</span>
                        <div className="w-8 h-px bg-[#d4a574]" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}