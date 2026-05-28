import React from 'react';
import { motion } from 'motion/react';
import { Check, User, Mail, Phone } from 'lucide-react';
import { cn } from '../lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const blobVariants = {
  animate: {
    translate: [
      '0px 0px',
      '60px -40px',
      '-40px 50px',
      '0px 0px'
    ],
    scale: [1, 1.1, 0.95, 1],
    transition: {
      duration: 22,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

import { useLanguage } from '../lib/LanguageContext';

export function CommunityCooperation() {
  const { t } = useLanguage();

  return (
    <section id="cooperation" className="relative py-28 px-6 overflow-hidden bg-slate-50">
      {/* Background Decor - Similar to SectionBackground in App.tsx */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: "#f8fafc"
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(58, 157, 246, 0.05) 0%, transparent 70%)",
            filter: "blur(60px)"
          }}
        />
      </div>

      {/* Code Decorative Blocks */}
      <motion.div 
        animate={{ y: [0, -12, 0], rotate: [3, 1, 3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:block absolute top-32 right-[4%] z-10 font-mono text-lg leading-relaxed p-8 rounded-2xl border border-blue-500/20 bg-white/60 backdrop-blur-xl shadow-xl select-none pointer-events-none text-slate-500"
      >
        <div className="text-purple-500/80 mb-2"># AIGCLink Partner</div>
        <div className="mb-1"><span className="text-purple-500/80">def</span> <span className="text-emerald-600/80">join_aigclink</span>():</div>
        <div className="pl-6"><span className="text-purple-500/80">return</span> <span className="text-amber-600/80">"welcome"</span></div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, -12, 0], rotate: [-2, -4, -2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: -3 }}
        className="hidden lg:block absolute bottom-32 left-[3%] z-10 font-mono text-lg leading-relaxed p-8 rounded-2xl border border-blue-500/20 bg-white/60 backdrop-blur-xl shadow-xl select-none pointer-events-none text-slate-500"
      >
        <div className="text-purple-500/80 mb-2"># Build together</div>
        <div className="mb-1"><span className="text-purple-500/80">async def</span> <span className="text-emerald-600/80">collaborate</span>(<span className="text-amber-600/80">you</span>):</div>
        <div className="pl-6"><span className="text-purple-500/80">await</span> connect()</div>
        <div className="pl-6"><span className="text-purple-500/80">return</span> <span className="text-amber-600/80">"🚀"</span></div>
      </motion.div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/60 border border-blue-200/50 rounded-full text-sm font-bold text-blue-600 tracking-wider mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            COMMUNITY · {t('nav.cooperation')}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold bg-gradient-to-br from-slate-900 to-slate-500 bg-clip-text text-transparent mb-4 tracking-tight">
            {t('coop.title')}
          </h2>
          <p className="text-lg text-slate-500 font-medium">{t('coop.subtitle')}</p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 pt-10"
        >
          {/* Card 1: Venue */}
          <motion.div 
            variants={cardVariants}
            className="group relative bg-gradient-to-br from-blue-50 to-purple-50 p-12 pt-20 rounded-[2.5rem] shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 cursor-pointer border border-white/50"
          >
            <div className="absolute top-[-60px] right-2 w-32 h-32 z-20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
               <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
                <defs>
                  <linearGradient id="venueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#93c5fd"/>
                    <stop offset="100%" stopColor="#3b82f6"/>
                  </linearGradient>
                  <linearGradient id="venueGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#dbeafe"/>
                    <stop offset="100%" stopColor="#93c5fd"/>
                  </linearGradient>
                </defs>
                <ellipse cx="50" cy="92" rx="32" ry="4" fill="rgba(37, 99, 235, 0.2)"/>
                <rect x="38" y="22" width="24" height="68" rx="3" fill="url(#venueGrad)"/>
                <rect x="42" y="28" width="6" height="6" rx="1" fill="#fef3c7"/>
                <rect x="52" y="28" width="6" height="6" rx="1" fill="#fef3c7"/>
                <rect x="42" y="40" width="6" height="6" rx="1" fill="#fef3c7" opacity="0.6"/>
                <rect x="52" y="40" width="6" height="6" rx="1" fill="#fef3c7"/>
                <rect x="42" y="52" width="6" height="6" rx="1" fill="#fef3c7"/>
                <rect x="52" y="52" width="6" height="6" rx="1" fill="#fef3c7" opacity="0.6"/>
                <rect x="42" y="64" width="6" height="6" rx="1" fill="#fef3c7" opacity="0.6"/>
                <rect x="52" y="64" width="6" height="6" rx="1" fill="#fef3c7"/>
                <rect x="42" y="76" width="6" height="6" rx="1" fill="#fef3c7"/>
                <rect x="52" y="76" width="6" height="6" rx="1" fill="#fef3c7" opacity="0.6"/>
                <rect x="20" y="50" width="18" height="40" rx="2" fill="url(#venueGrad2)"/>
                <rect x="24" y="56" width="4" height="4" rx="1" fill="#fef3c7"/>
                <rect x="30" y="56" width="4" height="4" rx="1" fill="#fef3c7" opacity="0.6"/>
                <rect x="24" y="64" width="4" height="4" rx="1" fill="#fef3c7"/>
                <rect x="30" y="64" width="4" height="4" rx="1" fill="#fef3c7"/>
                <rect x="46" y="14" width="8" height="8" rx="1" fill="#60a5fa"/>
                <circle cx="50" cy="12" r="2" fill="#fbbf24"/>
              </svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-display font-bold text-slate-900 mb-3">{t('coop.card1.title')}</h3>
              <p className="text-base text-slate-500 mb-6 pb-6 border-b border-blue-200/50 dashed font-medium">{t('coop.card1.subtitle')}</p>
              <ul className="space-y-5">
                {[
                  t('coop.card1.item1'),
                  t('coop.card1.item2'),
                  t('coop.card1.item3')
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-base text-slate-600 leading-relaxed font-medium">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Check className="w-4 h-4 text-blue-600" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Card 2: Mentor */}
          <motion.div 
            variants={cardVariants}
            className="group relative bg-gradient-to-br from-amber-50 to-orange-50 p-12 pt-20 rounded-[2.5rem] shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 cursor-pointer border border-white/50"
          >
            <div className="absolute top-[-60px] right-2 w-32 h-32 z-20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
                <defs>
                  <linearGradient id="mentorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fcd34d"/>
                    <stop offset="100%" stopColor="#f59e0b"/>
                  </linearGradient>
                  <linearGradient id="mentorGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fef3c7"/>
                    <stop offset="100%" stopColor="#fbbf24"/>
                  </linearGradient>
                </defs>
                <ellipse cx="50" cy="92" rx="30" ry="3" fill="rgba(245, 158, 11, 0.2)"/>
                <rect x="22" y="68" width="56" height="20" rx="3" fill="url(#mentorGrad2)"/>
                <rect x="22" y="68" width="56" height="3" fill="#f59e0b"/>
                <line x1="50" y1="71" x2="50" y2="88" stroke="#f59e0b" strokeWidth="1" opacity="0.5"/>
                <polygon points="50,30 88,45 50,60 12,45" fill="url(#mentorGrad)"/>
                <rect x="42" y="50" width="16" height="14" rx="2" fill="#d97706"/>
                <rect x="44" y="52" width="12" height="2" fill="#fbbf24"/>
                <line x1="80" y1="48" x2="80" y2="68" stroke="#dc2626" strokeWidth="2"/>
                <circle cx="80" cy="70" r="4" fill="#dc2626"/>
                <circle cx="80" cy="70" r="2" fill="#fbbf24" opacity="0.8"/>
                <circle cx="50" cy="32" r="3" fill="#fef3c7"/>
              </svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-display font-bold text-slate-900 mb-3">{t('coop.card2.title')}</h3>
              <p className="text-base text-slate-500 mb-6 pb-6 border-b border-amber-200/50 dashed font-medium">{t('coop.card2.subtitle')}</p>
              <ul className="space-y-5">
                {[
                  t('coop.card2.item1'),
                  t('coop.card2.item2'),
                  t('coop.card2.item3'),
                  t('coop.card2.item4')
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-base text-slate-600 leading-relaxed font-medium">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Check className="w-4 h-4 text-amber-600" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Card 3: Developer */}
          <motion.div 
            variants={cardVariants}
            className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 p-12 pt-20 rounded-[2.5rem] shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 cursor-pointer border border-white/50"
          >
            <div className="absolute top-[-60px] right-2 w-32 h-32 z-20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
                <defs>
                  <linearGradient id="devGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6ee7b7"/>
                    <stop offset="100%" stopColor="#10b981"/>
                  </linearGradient>
                </defs>
                <ellipse cx="50" cy="92" rx="30" ry="3" fill="rgba(16, 185, 129, 0.2)"/>
                <rect x="14" y="20" width="72" height="56" rx="6" fill="url(#devGrad)"/>
                <rect x="20" y="26" width="60" height="40" rx="3" fill="#0f172a"/>
                <rect x="24" y="32" width="4" height="3" rx="1" fill="#6ee7b7"/>
                <rect x="30" y="32" width="20" height="3" rx="1" fill="#fbbf24"/>
                <rect x="52" y="32" width="14" height="3" rx="1" fill="#d1fae5" opacity="0.6"/>
                <rect x="28" y="40" width="6" height="3" rx="1" fill="#c084fc"/>
                <rect x="36" y="40" width="16" height="3" rx="1" fill="#6ee7b7"/>
                <rect x="54" y="40" width="10" height="3" rx="1" fill="#fbbf24"/>
                <rect x="32" y="48" width="12" height="3" rx="1" fill="#d1fae5" opacity="0.6"/>
                <rect x="46" y="48" width="8" height="3" rx="1" fill="#6ee7b7"/>
                <rect x="56" y="48" width="14" height="3" rx="1" fill="#c084fc"/>
                <rect x="24" y="56" width="18" height="3" rx="1" fill="#6ee7b7"/>
                <rect x="44" y="56" width="12" height="3" rx="1" fill="#fbbf24"/>
                <rect x="40" y="76" width="20" height="6" rx="1" fill="#059669"/>
                <rect x="30" y="82" width="40" height="4" rx="2" fill="#10b981"/>
                <circle cx="80" cy="14" r="3" fill="#fbbf24"/>
              </svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-display font-bold text-slate-900 mb-3">{t('coop.card3.title')}</h3>
              <p className="text-base text-slate-500 mb-6 pb-6 border-b border-emerald-200/50 dashed font-medium">{t('coop.card3.subtitle')}</p>
              <ul className="space-y-5">
                {[
                  t('coop.card3.item1'),
                  t('coop.card3.item2'),
                  t('coop.card3.item3'),
                  t('coop.card3.item4')
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-base text-slate-600 leading-relaxed font-medium">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Check className="w-4 h-4 text-emerald-600" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Card 4: Community */}
          <motion.div 
            variants={cardVariants}
            className="group relative bg-gradient-to-br from-pink-50 to-purple-50 p-12 pt-20 rounded-[2.5rem] shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 cursor-pointer border border-white/50"
          >
            <div className="absolute top-[-60px] right-2 w-32 h-32 z-20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
                <defs>
                  <radialGradient id="commGrad" cx="50%" cy="40%">
                    <stop offset="0%" stopColor="#e9d5ff"/>
                    <stop offset="100%" stopColor="#a855f7"/>
                  </radialGradient>
                  <linearGradient id="commGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f0abfc"/>
                    <stop offset="100%" stopColor="#c026d3"/>
                  </linearGradient>
                </defs>
                <ellipse cx="50" cy="92" rx="30" ry="3" fill="rgba(168, 85, 247, 0.2)"/>
                <line x1="50" y1="50" x2="22" y2="28" stroke="#c084fc" strokeWidth="1.5" opacity="0.6"/>
                <line x1="50" y1="50" x2="78" y2="28" stroke="#c084fc" strokeWidth="1.5" opacity="0.6"/>
                <line x1="50" y1="50" x2="20" y2="70" stroke="#c084fc" strokeWidth="1.5" opacity="0.6"/>
                <line x1="50" y1="50" x2="80" y2="70" stroke="#c084fc" strokeWidth="1.5" opacity="0.6"/>
                <circle cx="50" cy="50" r="16" fill="url(#commGrad)"/>
                <circle cx="46" cy="46" r="5" fill="#fbcfe8" opacity="0.7"/>
                <circle cx="22" cy="28" r="8" fill="url(#commGrad2)"/>
                <circle cx="20" cy="26" r="2.5" fill="#fbcfe8" opacity="0.8"/>
                <circle cx="78" cy="28" r="8" fill="#ec4899"/>
                <circle cx="76" cy="26" r="2.5" fill="#fbcfe8" opacity="0.8"/>
                <circle cx="20" cy="70" r="7" fill="#a855f7"/>
                <circle cx="18" cy="68" r="2" fill="#e9d5ff" opacity="0.8"/>
                <circle cx="80" cy="70" r="9" fill="url(#commGrad2)"/>
                <circle cx="78" cy="68" r="2.5" fill="#fbcfe8" opacity="0.8"/>
                <circle cx="50" cy="22" r="2.5" fill="#fbbf24"/>
              </svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-display font-bold text-slate-900 mb-3">{t('coop.card4.title')}</h3>
              <p className="text-base text-slate-500 mb-6 pb-6 border-b border-pink-200/50 dashed font-medium">{t('coop.card4.subtitle')}</p>
              <ul className="space-y-5">
                {[
                  t('coop.card4.item1'),
                  t('coop.card4.item2'),
                  t('coop.card4.item3')
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-base text-slate-600 leading-relaxed font-medium">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Check className="w-4 h-4 text-purple-600" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Hint Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex justify-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-x-16 gap-y-8 px-12 py-8 bg-white/70 backdrop-blur-xl border border-blue-500/15 rounded-[100px] shadow-xl text-base">
            <div className="flex items-center gap-3 text-slate-600">
              <User className="w-5 h-5 text-blue-600" />
              <span>{t('coop.contact')}：<span className="font-bold text-slate-900">{t('coop.partner')}</span></span>
            </div>
            
            <div className="hidden md:block w-px h-6 bg-blue-500/15" />
            
            <div className="flex items-center gap-3 text-slate-600 group">
              <Mail className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
              <a href="mailto:lvye@gpulink.cc" className="font-bold text-slate-900 hover:text-blue-600 transition-colors">lvye@gpulink.cc</a>
            </div>

            <div className="hidden md:block w-px h-6 bg-blue-500/15" />

            <div className="flex items-center gap-3 text-slate-600 group">
              <Phone className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">133-8902-1782</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
