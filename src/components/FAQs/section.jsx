'use client';
import { useState } from 'react';
import { useTranslations } from '@/lib/useTranslations';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQSection() {
    const t = useTranslations('FAQs');
    const [openItems, setOpenItems] = useState(new Set());

    const toggleItem = (id) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(id)) {
            newOpenItems.delete(id);
        } else {
            newOpenItems.add(id);
        }
        setOpenItems(newOpenItems);
    };

    // Render answer với animation đẹp hơn
    const renderAnswer = (answer) => {
        if (typeof answer === 'string') {
            return <p className="text-gray-600 leading-relaxed">{answer}</p>;
        }

        if (typeof answer === 'object') {
            return (
                <div className="space-y-3">
                    {Object.values(answer).map((paragraph, index) => (
                        <motion.p
                            key={index}
                            className="text-gray-600 leading-relaxed"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {paragraph}
                        </motion.p>
                    ))}
                </div>
            );
        }

        return null;
    };

    const categories = [
        { key: 'shipping', icon: '🚚', color: 'bg-blue-50 border-blue-200' },
        { key: 'order', icon: '🛒', color: 'bg-green-50 border-green-200' },
        { key: 'product', icon: '🍫', color: 'bg-orange-50 border-orange-200' },
        { key: 'other', icon: '❓', color: 'bg-purple-50 border-purple-200' }
    ];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <motion.h1
                className="text-4xl font-bold text-center mb-12 text-[#5c2e00] font-[Playfair_Display]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Câu hỏi thường gặp
            </motion.h1>

            {categories.map((category, categoryIndex) => (
                <motion.div
                    key={category.key}
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                >
                    <h2 className="text-2xl font-semibold mb-6 text-[#5c2e00] flex items-center gap-3">
                        <span className="text-3xl">{category.icon}</span>
                        {t(`${category.key}.h2`)}
                    </h2>

                    <div className="space-y-4">
                        {Object.keys(t(category.key))
                            .filter(key => key.startsWith('Q'))
                            .map((questionKey, index) => {
                                const answerKey = questionKey.replace('Q', 'A');
                                const itemId = `${category.key}-${questionKey}`;
                                const isOpen = openItems.has(itemId);

                                return (
                                    <motion.div
                                        key={itemId}
                                        className={`border-2 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${category.color}`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                    >
                                        {/* Question Button */}
                                        <button
                                            onClick={() => toggleItem(itemId)}
                                            className="w-full p-5 text-left bg-white/70 hover:bg-white/90 transition-all duration-200 flex justify-between items-center group"
                                        >
                                            <span className="font-medium text-[#5c2e00] pr-4 group-hover:text-[#7d3e00] transition-colors">
                                                {t(`${category.key}.${questionKey}`)}
                                            </span>
                                            <motion.div
                                                animate={{ rotate: isOpen ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="w-6 h-6 text-gray-500 group-hover:text-[#7d3e00]"
                                            >
                                                ▼
                                            </motion.div>
                                        </button>

                                        {/* Answer with Animation */}
                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="p-5 bg-white/50 border-t border-white/30">
                                                        {renderAnswer(t(`${category.key}.${answerKey}`))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
