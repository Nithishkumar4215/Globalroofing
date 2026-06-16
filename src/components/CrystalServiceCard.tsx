import React, { useState, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Layers, Sun, Box as CubeIcon, ChevronRight } from 'lucide-react';
import { ServiceCardData } from '../data';

interface CrystalServiceCardProps {
  key?: any;
  service: ServiceCardData;
  index: number;
  scrollToSection: (ref: any) => void;
  contactRef: any;
}

export default function CrystalServiceCard({ service, index, scrollToSection, contactRef }: CrystalServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track continuous custom 3D rotation & sheen positions
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [sheenPos, setSheenPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Math-guided 3D tilt calculation relative to real-time client width & height
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Relative mouse position
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate normalized coords (-0.5 to 0.5)
    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;
    
    // Set tilting intensity (max 12 degrees rotation)
    const tiltX = -normY * 12;
    const tiltY = normX * 12;
    
    setRotation({ x: tiltX, y: tiltY });
    setSheenPos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smooth reset to neutral center
    setRotation({ x: 0, y: 0 });
  };

  // Custom icon determination
  const renderCardIcon = () => {
    const iconClass = "w-5.5 h-5.5 text-[#1E508C] group-hover:scale-110 transition-transform duration-300";
    if (service.iconType === 'grid') return <LayoutGrid className={iconClass} />;
    if (service.iconType === 'layers') return <Layers className={iconClass} />;
    if (service.iconType === 'sun') return <Sun className={iconClass} />;
    return <CubeIcon className={iconClass} />;
  };

  // Select dynamic crystal gradient matching pastel colors with premium border glows
  const getGlowAndBackdrop = () => {
    switch (service.bgColorClass) {
      case 'bg-pastel-green':
        return {
          bg: "bg-gradient-to-br from-pastel-green/50 via-white/80 to-pastel-green/30",
          border: "border-emerald-300/40 hover:border-emerald-400/70",
          glow: "rgba(239, 252, 217, 0.45)",
          shadow: "shadow-[0_15px_30px_rgba(144,238,144,0.12)] hover:shadow-[0_20px_40px_rgba(144,238,144,0.22)]",
          iconBg: "bg-emerald-500/10 text-emerald-700"
        };
      case 'bg-pastel-orange':
        return {
          bg: "bg-gradient-to-br from-pastel-orange/50 via-white/80 to-pastel-orange/30",
          border: "border-orange-300/40 hover:border-orange-400/70",
          glow: "rgba(253, 236, 212, 0.45)",
          shadow: "shadow-[0_15px_30px_rgba(253,190,121,0.12)] hover:shadow-[0_20px_40px_rgba(253,190,121,0.22)]",
          iconBg: "bg-orange-500/10 text-[#1E508C]"
        };
      case 'bg-pastel-blue':
        return {
          bg: "bg-gradient-to-br from-pastel-blue/50 via-white/80 to-pastel-blue/30",
          border: "border-blue-300/40 hover:border-blue-400/70",
          glow: "rgba(227, 242, 253, 0.45)",
          shadow: "shadow-[0_15px_30px_rgba(30,80,140,0.10)] hover:shadow-[0_20px_40px_rgba(30,80,140,0.20)]",
          iconBg: "bg-blue-500/10 text-[#1E508C]"
        };
      case 'bg-pastel-yellow':
        default:
        return {
          bg: "bg-gradient-to-br from-pastel-yellow/50 via-white/80 to-pastel-yellow/30",
          border: "border-amber-300/40 hover:border-amber-400/70",
          glow: "rgba(253, 251, 212, 0.45)",
          shadow: "shadow-[0_15px_30px_rgba(251,191,36,0.12)] hover:shadow-[0_20px_40px_rgba(251,191,36,0.22)]",
          iconBg: "bg-yellow-500/10 text-[#F37021]"
        };
    }
  };

  const styling = getGlowAndBackdrop();

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="h-full [perspective:1000px] select-none"
      id={`crystal-service-${index}`}
    >
      <div 
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`,
          transformStyle: "preserve-3d",
          transition: isHovered ? 'transform 0.05s linear' : 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)'
        }}
        className={`w-full h-full rounded-2xl ${styling.bg} backdrop-blur-md border ${styling.border} overflow-hidden flex flex-col justify-between group relative ${styling.shadow} transition-shadow duration-500`}
      >
        {/* Dynamic speculat glass sheen (crystal reflection) */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-35"
          style={{
            background: `radial-gradient(circle 180px at ${sheenPos.x}px ${sheenPos.y}px, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.1) 40%, rgba(255, 255, 255, 0) 70%)`
          }}
        />

        {/* Ambient background blur backing color spotlight */}
        <div 
          className="absolute -top-12 -left-12 w-36 h-36 rounded-full blur-[40px] pointer-events-none transition-transform duration-500 group-hover:scale-150 z-0" 
          style={{ backgroundColor: styling.glow }}
        />

        {/* Card Main Body */}
        <div className="z-10 relative flex flex-col flex-1" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
          
          {/* Card Image Container with Parallax Scale */}
          <div className="relative aspect-video w-full overflow-hidden bg-slate-100 rounded-t-2xl z-10" style={{ transform: "translateZ(30px)" }}>
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            
            {/* Glossy overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 opacity-70" />

            {/* Floating top right action layout button - with parallax translation */}
            <div 
              className="absolute top-4 right-4 bg-white/95 backdrop-blur-md shadow-lg rounded-xl p-2.5 flex items-center justify-center border border-white/40 z-20 transition-all duration-300 group-hover:shadow-[#1E508C]/10 group-hover:translate-y-[-2px]" 
              style={{ transform: "translateZ(45px)" }}
            >
              {renderCardIcon()}
            </div>
          </div>

          {/* Card Content block with floating layers */}
          <div className="p-8 text-left flex-1 flex flex-col justify-between z-10" style={{ transform: "translateZ(25px)" }}>
            <div>
              {/* Dynamic title color linked beautifully */}
              <h3 className={`font-display text-xl sm:text-2xl font-extrabold mb-3 leading-snug tracking-tight ${service.textColorClass || 'text-slate-900'} group-hover:text-[#1E508C] transition-colors duration-300`}>
                {service.title}
              </h3>
              <p className="text-slate-700 text-[14px] sm:text-[14.5px] leading-relaxed font-medium">
                {service.description}
              </p>
            </div>

            {/* Integrated CTA link into card base for premium interactiveness */}
            <div 
              className="pt-6 mt-6 border-t border-slate-900/10 flex items-center justify-between text-xs font-bold text-[#1E508C] group-hover:text-amber-600 transition-colors duration-300"
              style={{ transform: "translateZ(30px)" }}
            >
              <span 
                className="uppercase tracking-wider cursor-pointer font-black hover:underline" 
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToSection(contactRef);
                }}
              >
                Schedule consultation
              </span>
              <ChevronRight className="w-4 h-4 translate-x-0 group-hover:translate-x-2 transition-transform duration-300 text-[#1E508C] group-hover:text-amber-600" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
