import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface Props {
  images: {
    src: string;
    srcSet: string;
    width: number;
    height: number;
  }[];
}

const GalleryItem = ({ src, srcSet, index }: { src: string; srcSet: string; index: number }) => {
  const ref = useRef(null);
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const scrollContainer = document.querySelector('.parallax-container') as HTMLElement;
    if (scrollContainer) setContainer(scrollContainer);
  }, []);
  
  // Intersection scroll tracking for parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    container: container ? { current: container } : undefined,
    offset: ["start end", "end start"]
  });

  // Soft parallax effect - move slightly slower/faster than scroll
  const yRange = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y = useSpring(yRange, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          duration: 0.8,
          delay: (index % 3) * 0.1, // Stagger based on column-ish position
          ease: [0.21, 1.02, 0.47, 0.98] // Custom cubic-bezier for "soft" feel
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      className="break-inside-avoid mb-8 relative group rounded-2xl md:rounded-3xl overflow-hidden bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-synth-cyan/50 transition-colors duration-500 hover:synth-glow-cyan cursor-zoom-in"
    >
      <img 
        src={src} 
        srcSet={srcSet}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={`Photography piece ${index + 1}`}
        className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-110"
        loading="lazy"
        decoding="async"
      />
      
      {/* Dynamic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-synth-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-8">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          <div className="h-1 w-12 bg-synth-cyan rounded-full"></div>
          <p className="text-white font-black uppercase tracking-widest text-sm md:text-base">View Full Detail</p>
          <p className="text-synth-cyan/80 text-xs font-bold uppercase tracking-tighter">Photography // Select {index + 1}</p>
        </motion.div>
      </div>

      {/* Animated Scanline Overlay (matching site theme) */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"></div>
    </motion.div>
  );
};

export default function MasonryGallery({ images }: Props) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
        {images.map((img, idx) => (
          <GalleryItem key={img.src} src={img.src} srcSet={img.srcSet} index={idx} />
        ))}
      </div>
    </div>
  );
}
