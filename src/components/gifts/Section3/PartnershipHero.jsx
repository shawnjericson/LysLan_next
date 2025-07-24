'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

export default function PartnershipHero() {
    return (
        <section className="relative min-h-[700px] bg-gradient-to-br from-[#faf8f5] to-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, #d4a574 0%, transparent 50%),
                                      radial-gradient(circle at 80% 80%, #d4a574 0%, transparent 50%)`
                }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <motion.div
                        className="space-y-8"
                        initial="initial"
                        animate="animate"
                        variants={{
                            animate: {
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                    >
                        <motion.div variants={fadeInUp}>
                            <p className="text-[#d4a574] text-sm tracking-widest font-light mb-4 flex items-center">
                                <Sparkles className="w-4 h-4 mr-2" />
                                CÙNG LYSLAN PHÁT TRIỂN
                            </p>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#2c1810] leading-tight">
                                Trở Thành Đối Tác
                                <span className="block text-[#d4a574] mt-2">Phân Phối Cùng LysLan</span>
                            </h2>
                        </motion.div>

                        <motion.p
                            className="text-lg md:text-xl text-gray-700 font-light leading-relaxed"
                            variants={fadeInUp}
                        >
                            Kết nối những giá trị Việt, lan tỏa trải nghiệm chocolate đích thực
                        </motion.p>

                        <motion.div
                            className="space-y-4 text-gray-600"
                            variants={fadeInUp}
                        >
                            <p className="leading-relaxed">
                                <strong className="text-[#2c1810] font-medium">LysLan</strong> không đơn thuần là một thương hiệu chocolate –
                                chúng tôi là người kể chuyện bằng cacao.
                            </p>
                            <p className="leading-relaxed italic">
                                Và để câu chuyện ấy được lan tỏa rộng hơn, sâu hơn, chạm đến đúng những người trân trọng
                                cái đẹp và chất lượng thật, chúng tôi luôn tìm kiếm những đối tác phù hợp để cùng đồng hành.
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                            variants={fadeInUp}
                        >
                            <motion.button
                                className="px-8 py-4 bg-[#2c1810] hover:bg-[#3e2618] text-white font-light tracking-wide transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Đăng Ký Ngay
                            </motion.button>
                            <motion.button
                                className="px-8 py-4 border border-[#2c1810] hover:border-[#d4a574] hover:bg-[#faf8f5] text-[#2c1810] font-light tracking-wide transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Tìm Hiểu Thêm
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Visual */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative">
                            {/* Main Image */}
                            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/Images/PNS.jpg"
                                    alt="Đối tác LysLan"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/20 to-transparent" />
                            </div>

                            {/* Floating Elements */}
                            <motion.div
                                className="absolute -top-4 -right-4 bg-white p-6 rounded-xl shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <p className="text-3xl font-light text-[#d4a574]">100%</p>
                                <p className="text-sm text-gray-600">Cacao Việt Nam</p>
                            </motion.div>

                            <motion.div
                                className="absolute -bottom-4 -left-4 bg-[#2c1810] text-white p-6 rounded-xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <p className="text-2xl font-light">Tìm kiếm</p>
                                <p className="text-sm opacity-80">Đối tác toàn quốc</p>
                            </motion.div>
                        </div>

                        {/* Decorative dots */}
                        <motion.div
                            className="absolute top-1/2 -right-8 flex flex-col gap-2"
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="w-2 h-2 bg-[#d4a574] rounded-full opacity-40" />
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bottom Text */}
                <motion.p
                    className="text-center text-gray-600 mt-16 max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    Nếu bạn sở hữu một không gian đẹp, một cộng đồng tin tưởng, hay chỉ đơn giản là một niềm yêu thích
                    với chocolate thủ công, <span className="text-[#d4a574] font-medium">LysLan rất sẵn lòng kết nối.</span>
                </motion.p>
            </div>
        </section>
    );
}