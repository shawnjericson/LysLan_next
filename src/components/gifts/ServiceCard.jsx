'use client';
import { useTranslations } from '@/lib/useTranslations';
import React from 'react';
import Image from 'next/image';

export default function ServiceCard({ serviceKey, image, isHovered, onHover, onLeave, onViewMore }) {
  const t = useTranslations('service');
  const service = t(`${serviceKey}`);

  const isActive = isHovered === serviceKey;
  const isInactive = isHovered && isHovered !== serviceKey;

  const handleCardClick = (e) => {
    // Only trigger hover if not clicking on the button
    if (!e.target.closest('button')) {
      onHover(serviceKey);
    }
  };

  const handleButtonClick = (e) => {
    // Prevent event from bubbling up to the card
    e.stopPropagation();
    console.log('Button clicked for service:', serviceKey);
    onViewMore(serviceKey);
  };

  return (
    <div
      className={`relative overflow-hidden cursor-pointer group transition-all duration-700 ease-out ${isActive
          ? 'flex-[1.8] shadow-2xl'
          : isInactive
            ? 'flex-[0.3] grayscale'
            : 'flex-1 md:hover:shadow-lg'
        }`}
      onMouseEnter={() => onHover(serviceKey)}
      onTouchStart={() => onHover(serviceKey)}
      onMouseLeave={onLeave}
      onClick={handleCardClick}
      style={{
        transformOrigin: 'center',
        transition: 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.4s ease-out',
        willChange: 'transform, opacity',
      }}
    >
      {/* Main Image Container */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <Image
          src={image}
          alt={service.alt}
          fill
          className={`object-cover transition-all duration-1000 ease-out ${isActive
              ? 'scale-110 brightness-110'
              : isInactive
                ? 'scale-95 brightness-50'
                : 'scale-100 brightness-90 group-hover:brightness-100'
            }`}
        />

        {/* Elegant Gradient Overlay */}
        <div
          className={`pointer-events-none absolute inset-0 transition-all duration-700 ease-out ${isActive
              ? 'bg-gradient-to-r from-black/60 via-black/20 to-transparent'
              : isInactive
                ? 'bg-black/50'
                : 'bg-gradient-to-t from-black/40 via-transparent to-transparent'
            }`}
        />

        {/* Subtle Border Animation */}
        <div
          className={`pointer-events-none absolute inset-0 border-2 transition-all duration-500 ${isActive ? 'border-white/20' : 'border-transparent'
            }`}
        />
      </div>

      {/* Content Panel - Desktop */}
      <div
        className={`hidden md:flex absolute top-0 right-0 h-full flex-col justify-center transition-all duration-800 ease-out ${isActive ? 'w-[45%] opacity-100 translate-x-0' : 'w-0 opacity-0 translate-x-full'
          }`}
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 100%)',
          backdropFilter: 'blur(10px)',
          borderLeft: isActive ? '1px solid rgba(255,255,255,0.1)' : 'none'
        }}
      >
        <div className="px-8 py-6 space-y-6">
          {/* Title with Stagger Animation */}
          <div className="space-y-3">
            <h3
              className={`text-2xl font-light text-white transition-all duration-600 delay-100 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              {service.title}
            </h3>

            {/* Elegant Divider */}
            <div
              className={`h-px bg-gradient-to-r from-white/40 to-transparent transition-all duration-700 delay-200 ${isActive ? 'w-16 opacity-100' : 'w-0 opacity-0'
                }`}
            />
          </div>

          {/* Subtitle */}
          <h4
            className={`text-lg font-extralight text-white/90 leading-relaxed transition-all duration-600 delay-300 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
          >
            {service.h2}
          </h4>

          {/* Description */}
          <p
            className={`text-sm text-white/70 leading-relaxed font-light transition-all duration-600 delay-400 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
          >
            {service.description || "Khám phá dịch vụ chuyên nghiệp với chất lượng cao nhất."}
          </p>

          {/* CTA Button */}
          <button
            onClick={handleButtonClick}
            className={`group/btn relative px-8 py-3 text-sm font-medium text-white border border-white/30 hover:border-white/60 transition-all duration-500 delay-500 overflow-hidden 
            ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
            }}
          >
            <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1">
              {t('span')}
            </span>

            {/* Button Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 
            transform -translate-x-full group-hover/btn:translate-x-0 
            transition-transform duration-500 ease-out" />

            {/* Arrow Icon */}
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 
              transition-all duration-300 opacity-0 group-hover/btn:opacity-100 
              group-hover/btn:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Panel - Mobile (Simplified) */}
      <div
        className={`md:hidden absolute bottom-0 left-0 right-0 transition-all duration-800 z-[200] ease-out ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
          }`}
        style={{
          background: 'linear-gradient(to-t, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 100%)'
        }}
      >
        <div className="px-4 py-4 space-y-3">
          {/* Title */}
          <h3 className="text-lg font-light text-white">
            {service.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-white/70 leading-relaxed font-light break-words">
            {service.h2}
          </p>

          {/* CTA Button */}
          <button
            onClick={handleButtonClick}
            className="w-full py-2 text-xs font-medium text-white border border-white/30 hover:border-white/60 transition-all duration-300 z-[300]"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
            }}
          >
            {t('span')}
          </button>
        </div>
      </div>

      {/* Minimalist Title Overlay */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-8 transition-all duration-500 ${isActive ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
      >
        <div className="text-center">
          <h3 className="text-xl font-light text-white mb-2"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {service.title}
          </h3>
          <div className="w-12 h-px bg-white/60 mx-auto" />
        </div>
      </div>

      {/* Hover Indicator */}
      <div
        className={`absolute top-6 left-6 w-2 h-2 rounded-full bg-white/60 transition-all duration-300 ${isActive ? 'scale-125 bg-white' : 'scale-100'
          }`}
      />
    </div>
  );
}