'use client';
import { useTranslations } from '@/lib/useTranslations';
import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, FlaskConical, Package, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';




export default function ProcessSection() {
    const [activeStep, setActiveStep] = useState(1);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const t = useTranslations('service');
    const processSteps = [
        {
            id: 1,
            icon: <Sparkles className="w-6 h-6" />,
            title: t('section2.process.title1'),
            description: t('section2.process.description1'),
            alt: t('section2.process.imageAlt1'),
            image: "/Images/GC1.jpg"
        },
        {
            id: 2,
            icon: <FlaskConical className="w-6 h-6" />,
            title: t('section2.process.title2'),
            description: t('section2.process.description2'),
            alt: t('section2.process.imageAlt2'),
            image: "/Images/GC2.jpg"
        },
        {
            id: 3,
            icon: <Package className="w-6 h-6" />,
            title: t('section2.process.title3'),
            description: t('section2.process.description3'),
            alt: t('section2.process.imageAlt3'),
            image: "/Images/GC3.jpg"
        },
        {
            id: 4,
            icon: <Award className="w-6 h-6" />,
            title: t('section2.process.title4'),
            description: t('section2.process.description4'),
            alt: t('section2.process.imageAlt4'),
            image: "/Images/GC4.jpg"
        }
    ];
    return (
        <section ref={ref} className="py-20 md:py-32 bg-[#faf8f5]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#2c1810] mb-6">
                        {t('section2.process.headline')}
                    </h2>
                    <div className="w-24 h-0.5 bg-[#d4a574] mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {t('section2.process.subheadline')}
                    </p>
                </motion.div>

                {/* Process Steps */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Steps List */}
                    <motion.div
                        className="space-y-6"
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
                        {processSteps.map((step) => (
                            <motion.div
                                key={step.id}
                                className={`p-6 rounded-lg cursor-pointer transition-all duration-500 ${activeStep === step.id
                                    ? 'bg-white shadow-lg border-l-4 border-[#d4a574]'
                                    : 'bg-transparent hover:bg-white/50'
                                    }`}
                                onClick={() => setActiveStep(step.id)}
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    visible: { opacity: 1, x: 0 }
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-start space-x-4">
                                    <motion.div
                                        className={`p-3 rounded-full transition-colors duration-300 ${activeStep === step.id
                                            ? 'bg-[#d4a574] text-white'
                                            : 'bg-gray-200 text-gray-600'
                                            }`}
                                        animate={activeStep === step.id ? { rotate: 360 } : { rotate: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {step.icon}
                                    </motion.div>
                                    <div className="flex-1">
                                        <h3 className={`text-xl font-medium mb-2 transition-colors duration-300 ${activeStep === step.id ? 'text-[#2c1810]' : 'text-gray-700'
                                            }`}>
                                            {step.id}. {step.title}
                                        </h3>
                                        <motion.p
                                            className={`text-sm leading-relaxed transition-all duration-300 ${activeStep === step.id
                                                ? 'text-gray-700'
                                                : 'text-gray-500'
                                                }`}
                                            initial={false}
                                            animate={{
                                                height: activeStep === step.id ? "auto" : 0,
                                                opacity: activeStep === step.id ? 1 : 0
                                            }}
                                            transition={{ duration: 0.3 }}
                                            style={{ overflow: "hidden" }}
                                        >
                                            {step.description}
                                        </motion.p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Visual Display */}
                    <motion.div
                        className="relative hidden md:block"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <motion.div
                            className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden shadow-2xl"
                            layoutId="process-image"
                        >
                            {/* Placeholder for step image */}
                            <div className="w-1/2 h-full bg-gradient-to-br from-[#2c1810] to-[#3e2618] flex items-center justify-center">
                                <motion.div
                                    className="text-center text-white"
                                    key={activeStep}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="mb-4">
                                        {React.cloneElement(processSteps.find(s => s.id === activeStep)?.icon || <></>, {
                                            className: "w-12 h-12 mx-auto"
                                        })}
                                    </div>
                                    <h3 className="text-2xl font-light mb-2">
                                        {processSteps.find(s => s.id === activeStep)?.title}
                                    </h3>
                                    <p className="text-sm text-gray-300 max-w-sm mx-auto px-4">
                                        {processSteps.find(s => s.id === activeStep)?.description}
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                        <motion.div
                            key={activeStep}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="absolute bottom-0 right-0 w-1/2 h-full rounded-br-2xl rounded-tr-2xl overflow-hidden shadow-lg z-10"
                        >
                            <Image
                                src={processSteps.find(s => s.id === activeStep)?.image}
                                alt={processSteps.find(s => s.id === activeStep)?.alt}
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                        {/* Progress indicator */}
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {processSteps.map((step) => (
                                <motion.div
                                    key={step.id}
                                    className="h-1 bg-gray-300"
                                    animate={{
                                        width: activeStep === step.id ? 32 : 16,
                                        backgroundColor: activeStep === step.id ? "#d4a574" : "#d1d5db"
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}