'use client';
import React from 'react';
import Section1 from '../gifts/Section1';
import Section2 from '../gifts/Section2';
import Section3 from '../gifts/Section3';
import Section4 from '../gifts/Section4';


const sectionMap = {
    S1: Section1,
    S2: Section2,
    S3: Section3,
    S4: Section4,
};

export default function ServicePreview({ title, subtitle, description, serviceKey, onClose }) {
    const SectionComponent = sectionMap[serviceKey];
    return (
        <div className="animate-in fade-in slide-in-from-top-4 duration-700 ease-out mt-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200/50">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-1 h-8 bg-gradient-to-b from-gray-800 to-gray-600 rounded-full" />
                        <h2 className="text-2xl font-light text-gray-800">{title}</h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 
                                 flex items-center justify-center transition-all duration-200 
                                 hover:scale-110 group"
                    >
                        <svg className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Subtitle and Description */}
                {(subtitle || description) && (
                    <div className="mb-8 space-y-2">
                        {subtitle && (
                            <h3 className="text-lg font-light text-gray-700">{subtitle}</h3>
                        )}
                        {description && (
                            <p className="text-gray-600 leading-relaxed">{description}</p>
                        )}
                    </div>
                )}

                {/* Dynamic content */}
                {SectionComponent && <SectionComponent />}
            </div>
        </div>
    );
}