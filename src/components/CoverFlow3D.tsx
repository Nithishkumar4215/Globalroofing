import React, { useState, useEffect, useRef, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';

interface CoverFlow3DProps<T> {
  items: T[];
  renderCard: (item: T, isActive: boolean, index: number) => React.ReactNode;
  onActiveIndexChange?: (index: number) => void;
  uniqueId: string;
}

export default function CoverFlow3D<T>({
  items,
  renderCard,
  onActiveIndexChange,
  uniqueId
}: CoverFlow3DProps<T>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Inform parent of index changes
  useEffect(() => {
    if (onActiveIndexChange) {
      onActiveIndexChange(activeIndex);
    }
  }, [activeIndex, onActiveIndexChange]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handleCardClick = (idx: number) => {
    if (idx !== activeIndex) {
      setActiveIndex(idx);
    }
  };

  // Keyboard navigation when user highlights / hovers the grid
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  // Swipe logic for mobile touchscreen devices
  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <div 
      className="relative w-full py-16 px-4 md:px-8 bg-gradient-to-b from-[#0B1528] via-[#111C35] to-[#0B1528] rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-[0_25px_60px_rgba(3,7,18,0.6)] focus:outline-hidden"
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      aria-label="3D Cinematic Carousel"
    >
      {/* 1. Animated mesh gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 mix-blend-color-dodge">
        <motion.div 
          animate={{
            scale: [1, 1.2, 1.1, 1],
            rotate: [0, 90, 180, 270, 360],
            x: [0, 50, -30, 0],
            y: [0, -50, 40, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] rounded-full bg-radial from-[#1E508C]/50 to-transparent blur-[110px]"
        />
        <motion.div 
          animate={{
            scale: [1.1, 1, 1.25, 1.1],
            rotate: [360, 270, 180, 90, 0],
            x: [0, -40, 60, 0],
            y: [0, 60, -30, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-[20%] -right-[20%] w-[80%] h-[80%] rounded-full bg-radial from-amber-500/20 to-transparent blur-[120px]"
        />
      </div>

      {/* 2. Glass reflection sweep + Dynamic spot illumination on top */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#1E508C]/40 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[200px] bg-radial from-[#1E508C]/20 to-transparent blur-[60px] pointer-events-none" />

      {/* 3. Star-dust and floating particle sparks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {[...Array(15)].map((_, i) => {
          const size = Math.random() * 3 + 1;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const delay = Math.random() * 5;
          const duration = Math.random() * 6 + 4;
          return (
            <motion.div
              key={i}
              className="absolute bg-white/40 rounded-full"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.1, 0.7, 0.1],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>

      {/* 3D Stage Container */}
      <div className="relative h-[480px] sm:h-[520px] w-full flex items-center justify-center [perspective:1200px] z-10 select-none">
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {items.map((item, idx) => {
            const diff = idx - activeIndex;
            const absDiff = Math.abs(diff);
            
            // Only render items within view radius to save CPU / keep performance snappy
            const isVisible = absDiff <= 2;
            if (!isVisible) return null;

            // Compute custom depth & rotation layout based on Apple Cover Flow & Vision Pro style specs
            // - Center card: translateZ(150px)
            // - Adjacent cards: translateZ(50px)
            // - Outer cards: translateZ(-100px)
            let zIndex = 100 - absDiff;
            let translateZVal = -100; // default for outer cards (absDiff === 2)
            let rotationVal = 0;
            let translateXVal = 0;
            let opacityVal = 1;
            let scaleVal = 1;

            if (diff === 0) {
              translateZVal = 150;
              rotationVal = 0;
              translateXVal = 0;
              scaleVal = 1.05;
              opacityVal = 1;
              zIndex = 150;
            } else if (diff === -1) {
              translateZVal = 50;
              rotationVal = 32; // tilted facing inwards to center
              translateXVal = -140; // adjacent spacing
              scaleVal = 0.92;
              opacityVal = 0.85;
            } else if (diff === 1) {
              translateZVal = 50;
              rotationVal = -32; // tilted facing inwards to center
              translateXVal = 140; // adjacent spacing
              scaleVal = 0.92;
              opacityVal = 0.85;
            } else if (diff === -2) {
              translateZVal = -100;
              rotationVal = 55;
              translateXVal = -260; // outer spacing
              scaleVal = 0.80;
              opacityVal = 0.55;
            } else if (diff === 2) {
              translateZVal = -100;
              rotationVal = -55;
              translateXVal = 260; // outer spacing
              scaleVal = 0.80;
              opacityVal = 0.55;
            }

            // Adjustment for smaller responsive layouts
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
            if (isMobile) {
              if (diff === -1) {
                translateXVal = -110;
                scaleVal = 0.78;
              } else if (diff === 1) {
                translateXVal = 110;
                scaleVal = 0.78;
              } else if (absDiff === 2) {
                opacityVal = 0.2; // dim down outer outer cards on mobile screens
                translateXVal = diff < 0 ? -190 : 190;
                scaleVal = 0.65;
              }
            }

            return (
              <motion.div
                key={`${uniqueId}-item-${idx}`}
                onClick={() => handleCardClick(idx)}
                style={{
                  position: 'absolute',
                  zIndex,
                  transformStyle: 'preserve-3d',
                  cursor: idx === activeIndex ? 'default' : 'pointer'
                }}
                animate={{
                  x: translateXVal,
                  z: translateZVal,
                  rotateY: rotationVal,
                  scale: scaleVal,
                  opacity: opacityVal
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 24,
                  mass: 1.1
                }}
                className="w-[280px] sm:w-[320px] h-[380px] sm:h-[450px] transition-shadow duration-300 rounded-[28px] overflow-hidden"
              >
                {/* Visual Glow Spotlight Behind Active Card */}
                {diff === 0 && (
                  <div className="absolute inset-[-1px] rounded-[28px] bg-gradient-to-b from-[#1E508C] via-purple-500 to-[#F37021]/30 opacity-70 blur-xs -z-10 animate-pulse duration-2000" />
                )}
                
                {/* Render the actual card markup */}
                {renderCard(item, diff === 0, idx)}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 4. Controls: Center-aligned Chevron Navigation Circular buttons inside the container footer */}
      <div className="relative flex items-center justify-center gap-6 mt-6 z-20">
        <button
          onClick={handlePrev}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Carousel indicators */}
        <div className="flex gap-2.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                i === activeIndex 
                  ? 'w-7 bg-[#1E508C] shadow-[0_0_8px_rgba(30,80,140,0.8)]' 
                  : 'w-2 bg-white/25 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Swipe and click helpful tooltip indicator */}
      <div className="text-white/35 text-[11px] font-medium mt-3 text-center flex items-center justify-center gap-1.5 uppercase tracking-wider select-none">
        <HelpCircle className="w-3.5 h-3.5" />
        <span>Tap side cards or swipe to explore with 3D cinematic depth</span>
      </div>
    </div>
  );
}
