import React from 'react';
import { motion } from 'motion/react';
import { Rocket, MonitorPlay, Users, Handshake, ArrowRight, Pen, FileText } from 'lucide-react';
import { cn } from '../lib/utils';
import { Globe3D, GlobeMarker } from './ui/3d-globe';

const sampleMarkers: GlobeMarker[] = [
  { lat: 39.9042, lng: 116.4074, src: "https://assets.aceternity.com/avatars/1.webp", label: "Beijing" },
  { lat: 31.2304, lng: 121.4737, src: "https://assets.aceternity.com/avatars/2.webp", label: "Shanghai" },
  { lat: 22.5431, lng: 114.0579, src: "https://assets.aceternity.com/avatars/3.webp", label: "Shenzhen" },
  { lat: 23.1291, lng: 113.2644, src: "https://assets.aceternity.com/avatars/4.webp", label: "Guangzhou" },
  { lat: 40.7128, lng: -74.006, src: "https://assets.aceternity.com/avatars/5.webp", label: "New York" },
  { lat: 51.5074, lng: -0.1278, src: "https://assets.aceternity.com/avatars/6.webp", label: "London" },
  { lat: 35.6762, lng: 139.6503, src: "https://assets.aceternity.com/avatars/7.webp", label: "Tokyo" },
  { lat: 1.3521, lng: 103.8198, src: "https://assets.aceternity.com/avatars/8.webp", label: "Singapore" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

import { useLanguage } from '../lib/LanguageContext';

export function MinimalCommunityBento() {
  const { t } = useLanguage();

  return (
    <section id="bento" className="py-24 md:py-40 bg-slate-50 overflow-hidden relative border-t border-slate-100">
      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight"
          >
            {t('bento.title')}
          </motion.h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {/* Card 1: Offline Salon - Large Focus */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2 bg-[#F9FAFB] rounded-3xl p-10 border border-slate-200 flex flex-col justify-between group hover:border-slate-300 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-300 relative overflow-hidden"
          >
            {/* Animated Background Decoration: Pulsing City Points */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute inset-0 opacity-[0.03]" 
                style={{ 
                  backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, 
                  backgroundSize: '40px 40px' 
                }} 
              />
              {[
                { top: '20%', left: '70%', size: '300px' },
                { top: '60%', left: '85%', size: '200px' },
                { top: '10%', left: '10%', size: '150px' }
              ].map((dot, i) => (
                <motion.div 
                  key={i}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{ 
                    duration: 4 + i * 2, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: i 
                  }}
                  className="absolute rounded-full bg-blue-400 blur-3xl"
                  style={{ 
                    top: dot.top, 
                    left: dot.left, 
                    width: dot.size, 
                    height: dot.size,
                    transform: 'translate(-50%, -50%)' 
                  }}
                />
              ))}
              {/* Connecting Lines subtle */}
              <svg className="absolute inset-0 w-full h-full opacity-10 text-slate-400">
                <motion.path
                  d="M100,100 L300,200 L500,50 L700,250"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-10 text-slate-900">
                  <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <Rocket size={28} />
                  </div>
                </div>
                <h3 className="text-3xl font-display font-bold text-slate-900 mb-6">{t('bento.offline.title')}</h3>
                <p className="text-xl text-slate-500 mb-10 max-w-2xl leading-relaxed">
                  {t('bento.offline.desc')}
                </p>
                
                <div className="flex flex-col gap-6">
                  {[
                    t('bento.offline.item1'),
                    t('bento.offline.item2'),
                    t('bento.offline.item3'),
                    t('bento.offline.item4')
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-700 whitespace-nowrap">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Uiverse Decoration */}
              <div className="flex-1 flex items-center justify-center hidden lg:flex py-12 px-8">
                <div className="relative flex justify-center items-center group/glass h-72 scale-125">
                   {/* Card 1: Github */}
                   <div 
                     className="relative w-36 h-44 bg-white/40 border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col justify-center items-center transition-all duration-500 rounded-2xl -mx-10 backdrop-blur-md z-10 hover:z-20 group-hover/glass:rotate-0 group-hover/glass:mx-2 rotate-[-15deg] group-hover/glass:scale-105"
                   >
                     <svg viewBox="0 0 496 512" height="48" className="fill-slate-800 drop-shadow-sm mb-4">
                        <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                     </svg>
                     <div className="absolute bottom-0 w-full h-10 bg-slate-900/5 flex justify-center items-center text-[10px] font-bold text-slate-800 uppercase tracking-[0.2em] rounded-b-2xl">Github</div>
                   </div>

                   {/* Card 2: Code */}
                   <div 
                     className="relative w-36 h-44 bg-white/40 border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col justify-center items-center transition-all duration-500 rounded-2xl -mx-10 backdrop-blur-md z-10 hover:z-20 group-hover/glass:rotate-0 group-hover/glass:mx-2 rotate-[5deg] group-hover/glass:scale-105"
                   >
                     <svg viewBox="0 0 640 512" height="48" className="fill-slate-800 drop-shadow-sm mb-4">
                        <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" />
                     </svg>
                     <div className="absolute bottom-0 w-full h-10 bg-slate-900/5 flex justify-center items-center text-[10px] font-bold text-slate-800 uppercase tracking-[0.2em] rounded-b-2xl">Code</div>
                   </div>

                   {/* Card 3: Share */}
                   <div 
                     className="relative w-36 h-44 bg-white/40 border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col justify-center items-center transition-all duration-500 rounded-2xl -mx-10 backdrop-blur-md z-10 hover:z-20 group-hover/glass:rotate-0 group-hover/glass:mx-2 rotate-[25deg] group-hover/glass:scale-105"
                   >
                     <svg viewBox="0 0 24 24" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800 drop-shadow-sm mb-4">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                     </svg>
                     <div className="absolute bottom-0 w-full h-10 bg-slate-900/5 flex justify-center items-center text-[10px] font-bold text-slate-800 uppercase tracking-[0.2em] rounded-b-2xl">SHARE</div>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Online Live - With 3D Globe */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-3xl p-10 border border-slate-200 flex flex-col group shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-300 relative overflow-hidden h-[550px] hover:border-slate-300"
          >
            <div className="relative z-10">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                <MonitorPlay size={26} />
              </div>
              <h3 className="text-3xl font-display font-bold text-slate-900 mb-6">{t('bento.live.title')}</h3>
              <p className="text-xl text-slate-500 leading-relaxed mb-8">
                {t('bento.live.desc')}
              </p>
            </div>
            
            <div className="absolute -bottom-[55%] left-1/2 -translate-x-1/2 w-[130%] aspect-square z-0 pointer-events-none">
               <Globe3D
                className="h-full w-full opacity-100"
                markers={sampleMarkers}
                config={{
                  radius: 2.2,
                  atmosphereColor: "#3b82f6",
                  atmosphereIntensity: 0.1,
                  bumpScale: 2,
                  autoRotateSpeed: 0.4,
                  ambientIntensity: 1.0,
                  pointLightIntensity: 2.0,
                }}
              />
            </div>

            <div className="mt-auto relative z-10 flex items-center gap-2 text-slate-600 font-mono text-xs font-bold tracking-widest uppercase bg-white/90 backdrop-blur-sm p-3 px-4 rounded-xl w-fit border border-slate-200 shadow-sm">
              <motion.div 
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
              />
              Global Stream / LIVE
            </div>
          </motion.div>

          {/* Card 3: Closed Door */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-3xl p-10 border border-slate-200 flex flex-col group shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 hover:bg-slate-50 transition-all duration-300 relative overflow-hidden"
          >
            {/* Animated Decoration: Privacy Icon */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute top-0 right-0 p-4 opacity-[0.08]">
                <Users size={120} className="text-slate-900" />
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 relative">
                <Users size={26} />
              </div>
              <h3 className="text-3xl font-display font-bold text-slate-900 mb-6">{t('bento.closed.title')}</h3>
              <p className="text-xl text-slate-500 leading-relaxed mb-10">
                {t('bento.closed.desc')}
              </p>
            </div>
            
            <div className="h-4 w-full bg-slate-100 rounded-full relative overflow-hidden mt-auto">
              <motion.div 
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-slate-300 to-transparent"
              />
            </div>
          </motion.div>

          {/* Card 4: Joint Events */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2 bg-white rounded-3xl p-10 border border-slate-200 flex flex-col md:flex-row gap-12 group shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-300 hover:border-slate-300 relative overflow-hidden"
          >
            {/* Background sparkle */}
            <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none z-0">
               <motion.div 
                 animate={{ opacity: [0.1, 0.2, 0.1] }}
                 transition={{ duration: 5, repeat: Infinity }}
                 className="absolute inset-0 bg-gradient-to-l from-amber-50/50 to-transparent" 
               />
            </div>

            <div className="flex-1 relative z-10">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                <Handshake size={28} />
              </div>
              <h3 className="text-3xl font-display font-bold text-slate-900 mb-6">{t('bento.joint.title')}</h3>
              <p className="text-xl text-slate-500 leading-relaxed">
                {t('bento.joint.desc')}
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center border-l border-slate-100 pl-12 hidden md:flex relative z-10">
               <div className="relative w-full aspect-video border border-slate-200 rounded-3xl overflow-hidden bg-white p-8 flex flex-col gap-6 shadow-xl shadow-slate-200/50 group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-2">
                      <div className="w-12 h-3 bg-slate-200 rounded-full" />
                      <div className="w-8 h-3 bg-slate-100 rounded-full" />
                    </div>
                    <motion.div 
                      animate={{ 
                        rotate: [0, -10, 10, 0],
                        x: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="relative"
                    >
                      <div className="absolute -inset-1 bg-slate-200 rounded rotate-6" />
                      <Pen size={16} className="text-slate-500 relative z-10" />
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    initial={{ width: "30%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-2 bg-slate-200 rounded-full" 
                  />
                  <motion.div 
                    initial={{ width: "20%" }}
                    whileInView={{ width: "80%" }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                    className="h-2 bg-slate-200 rounded-full relative overflow-hidden" 
                  >
                    <motion.div 
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                    />
                  </motion.div>
                  
                  <div className="mt-4 flex -space-x-3">
                    {[1,2,3,4,5].map(i => (
                      <motion.div 
                        key={i} 
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1 + i * 0.1 }}
                        whileHover={{ y: -8, zIndex: 10, scale: 1.1 }}
                        className="w-11 h-11 rounded-full bg-slate-50 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden cursor-pointer"
                      >
                         <img src={`https://assets.aceternity.com/avatars/${i+5}.webp`} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                      </motion.div>
                    ))}
                    <div className="w-11 h-11 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                      +99
                    </div>
                  </div>
                  
                  {/* Floating Elements: Pen & Paper Stack */}
                  <motion.div 
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [-2, 2, -2]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-4 right-4"
                  >
                    {/* Shadow/Back Paper */}
                    <div className="absolute top-1 -right-1 w-12 h-14 bg-slate-50 rounded-lg border border-slate-200" />
                    {/* Main Paper */}
                    <div className="relative w-12 h-14 bg-white rounded-lg shadow-xl border border-slate-200 p-2 flex flex-col justify-between">
                      <div className="space-y-1 mt-1">
                        <div className="h-0.5 w-full bg-slate-200" />
                        <div className="h-0.5 w-4/5 bg-slate-200" />
                        <div className="h-0.5 w-full bg-slate-200" />
                      </div>
                      <motion.div
                        animate={{
                          x: [-1, 1, -1],
                          y: [-1, 1, -1]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="self-end"
                      >
                        <Pen className="text-slate-900" size={14} />
                      </motion.div>
                    </div>
                  </motion.div>
               </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
