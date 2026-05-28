import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface PhotoProps {
  col: number;
  row: number;
  image: string;
  onHover: (col: number, row: number | null) => void;
  hoveredCol: number | null;
  hoveredRow: number | null;
}

const Photo: React.FC<PhotoProps> = ({ col, row, image, onHover, hoveredCol, hoveredRow }) => {
  const [revealed, setRevealed] = useState(false);
  const sweepDelay = (col + row) * 0.4;
  
  useEffect(() => {
    const centerCol = 2.5;
    const centerRow = 1;
    const distance = Math.abs(col - centerCol) + Math.abs(row - centerRow);
    const timer = setTimeout(() => setRevealed(true), distance * 70 + 200);
    return () => clearTimeout(timer);
  }, [col, row]);

  const isHovered = hoveredCol === col && hoveredRow === row;
  const isNeighborLeft = hoveredCol === col + 1 && hoveredRow === row;
  const isNeighborRight = hoveredCol === col - 1 && hoveredRow === row;
  const isNeighborUp = hoveredCol === col && hoveredRow === row + 1;
  const isNeighborDown = hoveredCol === col && hoveredRow === row - 1;

  // Neighbor offsets
  let x = 0;
  let y = 0;
  let z = 0;
  let scale = 1;

  if (isHovered) {
    z = 80;
    scale = 1.1;
  } else if (isNeighborLeft) {
    x = -25;
    z = 15;
  } else if (isNeighborRight) {
    x = 25;
    z = 15;
  } else if (isNeighborUp) {
    y = -20;
    z = 15;
  } else if (isNeighborDown) {
    y = 20;
    z = 15;
  }

  return (
    <motion.div
      onMouseEnter={() => onHover(col, row)}
      onMouseLeave={() => onHover(-1, -1)}
      animate={{
        x,
        y,
        z,
        scale,
        opacity: revealed ? 1 : 0,
        filter: revealed ? "blur(0px)" : "blur(20px)",
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 20,
        mass: 1,
        opacity: { duration: 1 },
        filter: { duration: 1.4 }
      }}
      className={cn(
        "relative w-[120px] h-[90px] sm:w-[180px] sm:h-[135px] md:w-[240px] md:h-[180px] lg:w-[300px] lg:h-[225px] rounded-lg overflow-hidden shadow-lg cursor-pointer select-none",
        "will-change-transform backface-hidden",
        isHovered && "z-20 shadow-[0_24px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(58,157,246,0.5)]",
      )}
    >
      <img 
        src={image} 
        alt={`Event Photo ${col}-${row}`} 
        className="w-full h-full object-cover block"
        referrerPolicy="no-referrer"
      />
      {/* Light Sweep Overlay */}
      <div 
        className="absolute top-0 left-[-100%] w-1/2 h-full bg-linear-to-r from-transparent via-white/40 to-transparent -skew-x-[20deg] pointer-events-none animate-[lightSweep_8s_ease-in-out_infinite]"
        style={{ animationDelay: `${sweepDelay}s` }}
      />
    </motion.div>
  );
};

export function PhotoWall() {
  const stageRef = useRef<HTMLDivElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);
  const [hoveredPos, setHoveredPos] = useState<{ col: number | null, row: number | null }>({ col: null, row: null });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
  const COLS = 6;
  const ROWS = 3;
  const [angles, setAngles] = useState([52, 31, 10, -10, -31, -52]);

  useEffect(() => {
    const updateAngles = () => {
      if (window.innerWidth <= 1024) {
        setAngles([42, 25, 8, -8, -25, -42]);
      } else {
        setAngles([52, 31, 10, -10, -31, -52]);
      }
    };
    
    updateAngles();
    window.addEventListener('resize', updateAngles);
    return () => window.removeEventListener('resize', updateAngles);
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setRotation(prev => {
        const targetRotateY = isInside ? (mousePos.x - 0.5) * 12 : 0;
        const targetRotateX = isInside ? -(mousePos.y - 0.5) * 6 : 0;
        
        return {
          x: prev.x + (targetRotateX - prev.x) * 0.08,
          y: prev.y + (targetRotateY - prev.y) * 0.08
        };
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInside, mousePos]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
    setIsInside(true);
  };

  const handleMouseEnter = () => setIsInside(true);
  const handleMouseLeave = () => {
    setIsInside(false);
    setHoveredPos({ col: null, row: null });
  };

  const images = [
    "https://user10655.cn.imgto.link/public/20260509/segment-1.avif",
    "https://user10655.cn.imgto.link/public/20260509/cmo.avif",
    "https://user10655.cn.imgto.link/public/20260509/aigc.avif",
    "https://user10655.cn.imgto.link/public/20260509/segment.avif",
    "https://user10655.cn.imgto.link/public/20260509/aigclink-1.avif",
    "https://user10655.cn.imgto.link/public/20260509/aigclink.avif",
    "https://user10655.cn.imgto.link/public/20260509/aigclink-mvp.avif",
    "https://user10655.cn.imgto.link/public/20260509/7d2b9f60074d1a8c92438ffd877020f6471000665.avif",
    "https://user10655.cn.imgto.link/public/20260509/1p2a2933.avif",
    "https://user10655.cn.imgto.link/public/20260509/1p2a2879.avif",
    "https://user10655.cn.imgto.link/public/20260509/1p2a2489.avif",
    "https://user10655.cn.imgto.link/public/20260509/1p2a2109.avif",
    "https://user10655.cn.imgto.link/public/20260509/1p2a2057.avif",
    "https://user10655.cn.imgto.link/public/20260509/20260117085159-1299-6.avif",
    "https://user10655.cn.imgto.link/public/20260509/20260117085159-1294-6.avif",
    "https://user10655.cn.imgto.link/public/20260509/segment-2.avif"
  ];

  const photoImages = Array.from({ length: COLS * ROWS }).map((_, i) => 
    i < images.length 
      ? images[i]
      : `https://picsum.photos/seed/aigclink${i}/300/300`
  );

  return (
    <section 
      id="photo-wall" 
      className="relative min-h-[500px] md:min-h-[750px] py-16 md:py-32 flex items-center justify-center overflow-hidden bg-[#0A0E27]"
    >
      {/* Background Decor - Grid Lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(58, 157, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(58, 157, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div 
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="photo-wall-stage relative w-full h-[450px] sm:h-[600px] md:h-[700px] lg:h-[850px] [perspective:1000px] sm:[perspective:1200px] md:[perspective:1500px] flex items-center justify-center z-1"
      >
        {/* Cursor Glow */}
        {isInside && (
          <div 
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none mix-blend-screen opacity-0 animate-in fade-in duration-400"
            style={{
              left: `${mousePos.x * 100}%`,
              top: `${mousePos.y * 100}%`,
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(58, 157, 246, 0.3) 0%, rgba(58, 157, 246, 0) 70%)',
              opacity: isInside ? 1 : 0
            }}
          />
        )}

        {/* Central Title */}
        <div className="absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] text-center pointer-events-none z-30">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-[36px] md:text-[64px] font-black tracking-[0.2em] md:tracking-[0.3em] lg:tracking-[0.4em] mb-4 text-transparent bg-clip-text bg-linear-to-br from-white to-blue-200 drop-shadow-[0_4px_32px_rgba(0,0,0,0.9)]">
              AIGCLINK
            </h2>
            <p className="text-[12px] md:text-lg text-white/90 tracking-[0.2em] md:tracking-[0.4em] lg:tracking-[0.6em] drop-shadow-[0_2px_16px_rgba(0,0,0,0.8)] uppercase font-medium">
              历届活动 · 精彩瞬间
            </p>
          </motion.div>
        </div>

        {/* Photo Wall Grid */}
        <div 
          ref={wallRef}
          className={cn(
            "flex gap-4 md:gap-8 lg:gap-12 [transform-style:preserve-3d] transition-transform duration-400 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
            !isInside && "animate-[breathing_6s_ease-in-out_infinite]"
          )}
          style={{
            transform: `rotateY(${rotation.y}deg) rotateX(${rotation.x}deg)`
          }}
        >
          {Array.from({ length: COLS }).map((_, col) => (
            <div 
              key={col} 
              className="flex flex-col gap-4 md:gap-8 lg:gap-12 [transform-style:preserve-3d] transition-transform duration-800 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: `rotateY(${angles[col]}deg)`
              }}
            >
              {Array.from({ length: ROWS }).map((_, row) => (
                <Photo
                  key={`${col}-${row}`}
                  col={col}
                  row={row}
                  image={photoImages[col * ROWS + row]}
                  onHover={(c, r) => setHoveredPos({ col: c, row: r })}
                  hoveredCol={hoveredPos.col}
                  hoveredRow={hoveredPos.row}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
