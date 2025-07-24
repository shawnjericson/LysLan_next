'use client';
import React, { useRef } from 'react';
import { Package, Megaphone, TrendingUp, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const benefits = [
    {
        icon: <Package className="w-6 h-6" />,
        title: "Sản phẩm cao cấp",
        description: "Được tiếp cận sản phẩm chocolate thủ công cao cấp với nguồn nguyên liệu 100% cacao Việt Nam, thiết kế đẹp mắt và dễ kể chuyện"
    },
    {
        icon: <Megaphone className="w-6 h-6" />,
        title: "Hỗ trợ truyền thông",
        description: "Được hỗ trợ truyền thông, hình ảnh, thông tin sản phẩm rõ ràng – giúp bạn giới thiệu đến khách hàng một cách tinh tế và đầy cảm hứng"
    },
    {
        icon: <TrendingUp className="w-6 h-6" />,
        title: "Linh hoạt & Thoải mái",
        description: "Không bị áp lực về số lượng lớn hay chỉ tiêu – chúng tôi ưu tiên sự phù hợp và đồng điệu hơn là doanh số"
    },
    {
        icon: <Shield className="w-6 h-6" />,
        title: "Quyền lợi minh bạch",
        description: "Được chia sẻ quyền lợi minh bạch, hợp lý, dựa trên giá trị thật và sự tin tưởng"
    }
];

const testimonials = [
    {
        quote: "LysLan không chỉ là nhà cung cấp, họ là đối tác thực sự. Sản phẩm luôn được khách hàng yêu thích.",
        author: "Nguyễn Thanh Hà",
        position: "Chủ Boutique Saigon Heritage"
    },
    {
        quote: "Chocolate LysLan giúp chúng tôi tạo điểm nhấn độc đáo cho không gian và trải nghiệm khách hàng.",
        author: "Trần Minh Đức",
        position: "Quản lý Resort Mũi Né"
    },
    {
        quote: "Sự hỗ trợ từ LysLan rất chuyên nghiệp. Họ hiểu rõ thị trường và luôn đồng hành cùng chúng tôi.",
        author: "Lê Thu Trang",
        position: "Founder Gift & More"
    }
];

export default function PartnerBenefits() {
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
                        🧡 Khi đồng hành cùng LysLan
                    </h2>
                    <motion.div
                        className="w-24 h-0.5 bg-[#d4a574] mx-auto mb-6"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: 96 } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Bạn không chỉ bán sản phẩm, bạn đang chia sẻ một câu chuyện
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Benefits Grid */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
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
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                whileHover={{ y: -5 }}
                            >
                                <motion.div
                                    className="inline-flex items-center justify-center w-12 h-12 bg-[#d4a574]/10 rounded-full mb-4"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="text-[#d4a574]">
                                        {benefit.icon}
                                    </div>
                                </motion.div>
                                <h3 className="text-lg font-medium text-[#2c1810] mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Testimonial Slider */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="bg-[#2c1810] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-5">
                                <div className="absolute inset-0" style={{
                                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
                                }} />
                            </div>

                            <div className="relative z-10">
                                <div className="text-5xl text-[#d4a574] mb-6">"</div>

                                <Swiper
                                    modules={[Autoplay]}
                                    effect="slide"
                                    autoplay={{
                                        delay: 5000,
                                        disableOnInteraction: false,
                                    }}
                                    loop={true}
                                    className="h-[240px] mb-8"
                                >
                                    {testimonials.map((testimonial, index) => (
                                        <SwiperSlide key={index} className="flex items-center h-full px-2">
                                            <div className="w-96 ml-10 mt-2">
                                                <p className="text-lg md:text-xl font-light leading-relaxed mb-6 italic">
                                                    {testimonial.quote}
                                                </p>
                                                <div>
                                                    <p className="font-medium text-[#d4a574]">
                                                        {testimonial.author}
                                                    </p>
                                                    <p className="text-sm text-gray-400">
                                                        {testimonial.position}
                                                    </p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            {/* Decorative dots */}
                            <div className="absolute bottom-4 right-4 flex gap-2">
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-2 h-2 bg-[#d4a574] rounded-full opacity-40"
                                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                                        transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}