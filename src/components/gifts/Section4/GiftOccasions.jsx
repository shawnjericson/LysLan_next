'use client';
import React, { useRef } from 'react';
import { Users, Calendar, Gift, Award, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../../app/globals.css';

const occasions = [
    {
        icon: <Users className="w-6 h-6" />,
        title: "Quà tri ân khách hàng & đối tác",
        description: "Thể hiện sự trân trọng với những người đồng hành",
        image: "/Images/IM17.jpg",
        color: "#8B6F47"
    },
    {
        icon: <Calendar className="w-6 h-6" />,
        title: "Quà tặng sự kiện, hội nghị",
        description: "Điểm nhấn ấn tượng cho mọi sự kiện quan trọng",
        image: "/Images/GC14.jpg",
        color: "#A0826D"
    },
    {
        icon: <Gift className="w-6 h-6" />,
        title: "Bộ quà Tết, Trung thu, Giáng Sinh",
        description: "Món quà ý nghĩa cho các dịp lễ đặc biệt",
        image: "/Images/Mooncake.jpg",
        color: "#BC9A6A"
    },
    {
        icon: <Award className="w-6 h-6" />,
        title: "Quà vinh danh nhân viên",
        description: "Ghi nhận đóng góp, tạo động lực nội bộ",
        image: "/Images/CG14.jpg",
        color: "#D4A574"
    },
    {
        icon: <Briefcase className="w-6 h-6" />,
        title: "Quà tặng trải nghiệm cao cấp",
        description: "Resort, bất động sản, dịch vụ premium",
        image: "/Images/CG7.jpg",
        color: "#6B4423"
    }
];

export default function GiftOccasions() {
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
                        🌟 Quà Tặng Chocolate Dành Cho
                    </h2>
                    <motion.div
                        className="w-24 h-0.5 bg-[#d4a574] mx-auto mb-6"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: 96 } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Mỗi dịp đặc biệt đều xứng đáng có một món quà độc đáo
                    </p>
                </motion.div>

                {/* Desktop Masonry Grid */}
                <motion.div
                    className="hidden lg:block"
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
                    <div className="grid grid-cols-3 gap-8">
                        {/* First Column - Large Card */}
                        <motion.div
                            className="row-span-2"
                            variants={{
                                hidden: { opacity: 0, scale: 0.9 },
                                visible: { opacity: 1, scale: 1 }
                            }}
                        >
                            <motion.div
                                className="h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                                whileHover={{ y: -8 }}
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                                    <Image
                                        src={occasions[0].image}
                                        alt={occasions[0].title}
                                        fill
                                        className="object-cover hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 z-20">
                                        <motion.div
                                            className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                                            style={{ color: occasions[0].color }}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                        >
                                            {occasions[0].icon}
                                        </motion.div>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-xl font-medium text-[#2c1810] mb-3">
                                        {occasions[0].title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {occasions[0].description}
                                    </p>
                                    <motion.button
                                        className="mt-6 text-sm font-medium flex items-center space-x-2 hover:space-x-3 transition-all"
                                        style={{ color: occasions[0].color }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <span>Tìm hiểu thêm</span>
                                        <span>→</span>
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Second Column - Two Small Cards */}
                        <div className="space-y-8">
                            {occasions.slice(1, 3).map((occasion, index) => (
                                <motion.div
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.9 },
                                        visible: { opacity: 1, scale: 1 }
                                    }}
                                >
                                    <motion.div
                                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                                        whileHover={{ y: -8 }}
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                                            <Image
                                                src={occasion.image}
                                                alt={occasion.title}
                                                fill
                                                className="object-cover hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute top-4 left-4 z-20">
                                                <motion.div
                                                    className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                                                    style={{ color: occasion.color }}
                                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                                >
                                                    {occasion.icon}
                                                </motion.div>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-lg font-medium text-[#2c1810] mb-2">
                                                {occasion.title}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {occasion.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Third Column - Two Small Cards */}
                        <div className="space-y-8">
                            {occasions.slice(3, 5).map((occasion, index) => (
                                <motion.div
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.9 },
                                        visible: { opacity: 1, scale: 1 }
                                    }}
                                >
                                    <motion.div
                                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                                        whileHover={{ y: -8 }}
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                                            <Image
                                                src={occasion.image}
                                                alt={occasion.title}
                                                fill
                                                className="object-cover hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute top-4 left-4 z-20">
                                                <motion.div
                                                    className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                                                    style={{ color: occasion.color }}
                                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                                >
                                                    {occasion.icon}
                                                </motion.div>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-lg font-medium text-[#2c1810] mb-2">
                                                {occasion.title}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {occasion.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Mobile/Tablet Slider */}
                <motion.div
                    className="lg:hidden"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        pagination={{
                            clickable: true,
                            bulletClass: 'swiper-pagination-bullet custom-bullet',
                            bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active'
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                        }}
                        className="pb-12"
                    >
                        {occasions.map((occasion, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-full">
                                    <div className="relative h-48 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                                        <Image
                                            src={occasion.image}
                                            alt={occasion.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute top-4 left-4 z-20">
                                            <div
                                                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                                                style={{ color: occasion.color }}
                                            >
                                                {occasion.icon}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-medium text-[#2c1810] mb-2">
                                            {occasion.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {occasion.description}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <p className="text-gray-600 mb-6">
                        Mỗi dịp đặc biệt đều có giải pháp chocolate phù hợp từ LysLan
                    </p>
                    <motion.button
                        className="px-8 py-3 bg-[#2c1810] hover:bg-[#3e2618] text-white font-light tracking-wide transition-all duration-300 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Tư vấn chọn quà phù hợp
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}