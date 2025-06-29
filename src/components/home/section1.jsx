'use client';
import { useTranslations } from '@/lib/useTranslations';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export default function VideoIntro() {
  const t = useTranslations('section1');
  const videoRef = useRef(null);
  const [captionIndex, setCaptionIndex] = useState(-1);
  const [ended, setEnded] = useState(false);

  const captions = [
    { start: 0, end: 2, text: t('caption1') },
    { start: 3, end: 9, text: t('caption2') },
    { start: 10, end: 13, text: t('caption3') },
    { start: 15, end: 18, text: t('caption4') },
    { start: 25, end: 29, text: t('caption5') },
    { start: 29, end: 33, text: t('caption6') },
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const activeIndex = captions.findIndex(
        ({ start, end }) => currentTime >= start && currentTime < end
      );
      setCaptionIndex(activeIndex);
    };

    const handleEnded = () => {
      setCaptionIndex(-1);
      setEnded(true);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleReplay = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play();
      setEnded(false);
    }
  };

  return (
    <section
      aria-label={t('sectionaria')}
      className="relative w-full max-h-[80vh] overflow-hidden"
    >
      <div className="relative max-h-[80vh] group">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full max-h-[80vh] object-cover"
          aria-label={t('videoaria')}
        >
          <source src="/chocolateintro.mp4" type="video/mp4" />
          {t('videonote')}
        </video>

        {/* ✅ Fullscreen mặc định (ẩn) – chỉ hiện khi hover */}
        <button
          className="absolute bottom-2 right-2 text-white bg-black/40 p-2 rounded hover:bg-black/70 transition hidden group-hover:block"
          onClick={() => videoRef.current?.requestFullscreen()}
          aria-label="Fullscreen"
        >
          ⛶
        </button>

        {/* ✅ Replay button sau khi kết thúc */}
        {ended && (
          <button
            className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-lg font-bold"
            onClick={handleReplay}
            aria-label="Replay video"
          >
            {t('replay')}
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {captionIndex >= 0 && (
          <motion.p
            key={captionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className={clsx(
              'absolute text-white font-semibold text-sm md:text-2xl text-center px-2 md:px-4 py-1 max-w-[90%] bg-black/30 rounded-md shadow',
              'bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2'
            )}
          >
            {captions[captionIndex].text}
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
