import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

interface Props {
  images: {
    src: string;
    srcSet: string;
    placeholder: string;
    width: number;
    height: number;
  }[];
}

const GalleryItem = ({ src, srcSet, placeholder, index, isLite }: { src: string; srcSet: string; placeholder: string; index: number; isLite: boolean }) => {
  const ref = useRef(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const scrollContainer = document.querySelector('.parallax-container') as HTMLElement;
    if (scrollContainer) setContainer(scrollContainer);
  }, []);

  // Handle cached images where onLoad might not fire
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, []);
  
  // Intersection scroll tracking for parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    container: container ? { current: container } : undefined,
    offset: ["start end", "end start"]
  });

  // Soft parallax effect - move slightly slower/faster than scroll
  // Disable parallax on lite devices
  const yRange = useTransform(scrollYProgress, [0, 1], isLite ? [0, 0] : [30, -30]);
  const y = useSpring(yRange, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, y: isLite ? 20 : 60, scale: isLite ? 1 : 0.9 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          duration: isLite ? 0.4 : 0.8,
          delay: isLite ? 0 : (index % 3) * 0.1, // Stagger based on column-ish position
          ease: isLite ? "easeOut" : [0.21, 1.02, 0.47, 0.98] // Custom cubic-bezier for "soft" feel
        }
      }}
      viewport={{ once: true, margin: isLite ? "50px" : "-100px" }}
      whileHover={isLite ? {} : { 
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      className="break-inside-avoid mb-8 relative group rounded-2xl md:rounded-3xl overflow-hidden bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-synth-cyan/50 transition-colors duration-500 hover:synth-glow-cyan cursor-zoom-in"
    >
      {/* Blurred Placeholder (LQIP) */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-cover bg-center blur-2xl scale-110"
          style={{ backgroundImage: `url(${placeholder})` }}
          aria-hidden="true"
        />
      )}

      <img 
        ref={imgRef}
        src={src} 
        srcSet={srcSet}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={`Photography piece ${index + 1}`}
        className={`w-full h-auto object-cover transform transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${!isLite && 'group-hover:scale-110'}`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        decoding="async"
      />
      
      {/* Dynamic Overlay */}
      <div className={`absolute inset-0 liquid-glass-cyan opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-8 ${isLite ? 'hidden sm:flex' : 'flex'}`}>
        <motion.div 
          initial={isLite ? { opacity: 0 } : { y: 20, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          <div className="h-1 w-12 bg-synth-cyan rounded-full"></div>
          <p className="text-white font-black uppercase tracking-widest text-sm md:text-base drop-shadow-md">View Full Detail</p>
          <p className="text-synth-cyan text-xs font-bold uppercase tracking-tighter drop-shadow-sm">Photography // Select {index + 1}</p>
        </motion.div>
      </div>

      {/* Animated Scanline Overlay (matching site theme) - Disable on Lite for better performance */}
      {!isLite && (
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"></div>
      )}
    </motion.div>
  );
};

export default function MasonryGallery({ images }: Props) {
  const [isLite, setIsLite] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect "Lite" Mode (Slow Internet or Weak Device)
    const checkPerformance = () => {
      let lite = false;
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // 1. Connection check (Slow 2G/3G or Save Data)
      const conn = (navigator as any).connection;
      if (conn) {
        if (conn.saveData || /(2g|3g|slow-2g)/.test(conn.effectiveType || '')) {
          lite = true;
        }
      }

      // 2. Device Memory check (Weak device < 4GB RAM)
      const memory = (navigator as any).deviceMemory;
      if (memory && memory < 4) {
        lite = true;
      }

      // 3. Hardware Concurrency check (Low core count)
      const cores = navigator.hardwareConcurrency;
      if (cores && cores <= 4) {
        lite = true;
      }

      // 4. Reduced Motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        lite = true;
      }

      // 5. Always use lite on mobile for gallery to ensure smoothness
      if (mobile) lite = true;

      setIsLite(lite);
    };

    checkPerformance();
    window.addEventListener('resize', checkPerformance);
    return () => window.removeEventListener('resize', checkPerformance);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {isLite && !isMobile && (
        <div className="mb-8 p-4 rounded-xl bg-synth-cyan/5 border border-synth-cyan/20 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-synth-cyan/80">
            Lite Mode Enabled // Performance Optimized
          </p>
        </div>
      )}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
        {images.map((img, idx) => (
          <GalleryItem key={img.src} src={img.src} srcSet={img.srcSet} placeholder={img.placeholder} index={idx} isLite={isLite} />
        ))}
      </div>
    </div>
  );
}
