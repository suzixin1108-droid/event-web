"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { cn } from "@/src/lib/utils"
import { Sparkles, ExternalLink, Play } from "lucide-react"
import Particles from "./Particles"
import { useLanguage } from "../lib/LanguageContext"

interface ACDCEvent {
  id: number;
  edition: string;
  date: string;
  topic: string;
  outcome: string;
  image: string;
  reviewLink?: string;
  speechLink?: string;
}

interface ACDCTimelineProps {
  events: ACDCEvent[]
}

// SVG curved path for the timeline
const timelinePath = `M 100 50
  Q 80 110 120 170
  Q 160 260 100 350
  Q 40 440 120 530
  Q 200 620 100 710
  Q 0 800 100 890
  Q 200 980 100 1080`

export function ACDCTimeline({ events }: ACDCTimelineProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Calculate node positions along the curve
  // We adapt these to match the number of events
  const nodePositions = events.map((_, index) => ({
    x: 100,
    y: 170 + index * 180
  }))

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const sectionHeight = containerRef.current.offsetHeight

    // Calculate scroll progress within this section
    const scrollStart = rect.top
    const totalScrollDistance = sectionHeight - windowHeight

    if (totalScrollDistance <= 0) {
      setScrollProgress(0)
      setActiveIndex(0)
      return
    }

    if (scrollStart > 0) {
      setScrollProgress(0)
      setActiveIndex(0)
    } else if (Math.abs(scrollStart) > totalScrollDistance) {
      setScrollProgress(1)
      setActiveIndex(events.length - 1)
    } else {
      const progress = Math.abs(scrollStart) / totalScrollDistance
      setScrollProgress(Math.min(Math.max(progress, 0), 1))

      // Determine active index based on progress
      const newIndex = Math.min(
        Math.floor(progress * events.length),
        events.length - 1
      )
      setActiveIndex(newIndex)
    }
  }, [events.length])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Calculate dynamic translation to keep active point centered
  const viewCenter = 350
  const startY = 170
  const endY = 1080
  const currentTargetY = startY + (scrollProgress || 0) * (endY - startY)
  const translateY = viewCenter - currentTargetY
  const translateYPercent = ((translateY || 0) / 700) * 100

  return (
    <section
      id="acdc"
      ref={containerRef}
      className="relative min-h-[400vh] bg-gradient-to-b from-[#001A4D] via-[#002E7A] to-[#001A4D] overflow-visible"
    >
      {/* Cosmic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[50%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[80px]" />
      </div>

      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Particles
            particleColors={["#ffffff", "#60a5fa", "#93c5fd"]}
            particleCount={800}
            particleSpread={15}
            speed={0.15}
            particleBaseSize={120}
            moveParticlesOnHover={true}
            particleHoverFactor={1.5}
            alphaParticles={true}
            disableRotation={false}
            sizeRandomness={1.5}
            cameraDistance={20}
            pixelRatio={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
          />
        </div>
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left: Title Section */}
            <div className="lg:col-span-4 relative z-10">
              <span className="text-base font-bold text-blue-300 tracking-[0.4em] uppercase mb-4 block">
                ACDC JOURNEY
              </span>
              <h2 className="text-6xl lg:text-8xl font-display font-black text-white mb-8 leading-[1.1] tracking-tight">
                ACDC
                <br />
                {t('acdc.journey.title')}
              </h2>
              <p className="text-blue-100/70 text-xl lg:text-2xl leading-relaxed max-w-md font-medium">
                {t('acdc.journey.desc')}
              </p>

              {/* Progress indicator */}
              <div className="mt-16 flex items-center gap-6">
                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
                  <span className="text-white font-black text-4xl">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white/30 text-2xl font-light">/</span>
                  <span className="text-white/50 text-2xl font-medium">
                    {String(events.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30">
                  <span className="text-blue-200 text-sm font-bold tracking-[0.2em] uppercase">
                    TIMELINE
                  </span>
                </div>
              </div>
            </div>

            {/* Center: Curved Timeline */}
            <div className="hidden lg:flex lg:col-span-3 justify-center relative">
              <div className="relative h-[700px] w-[200px]">
                {/* SVG Timeline Path */}
                <svg
                  viewBox="0 0 200 1200"
                  className="absolute inset-0 w-full h-full overflow-visible"
                  preserveAspectRatio="xMidYMin slice"
                  style={{
                    transform: `translateY(${translateYPercent}%)`,
                  }}
                >
                  {/* Background path glow */}
                  <path
                    d={timelinePath}
                    fill="none"
                    stroke="url(#pathGlow)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    className="opacity-20 blur-md"
                  />

                  {/* Main path */}
                  <path
                    d={timelinePath}
                    fill="none"
                    stroke="url(#pathGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="12 12"
                    className="opacity-40"
                  />

                  {/* Animated progress path */}
                  <path
                    d={timelinePath}
                    fill="none"
                    stroke="url(#activeGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={1400}
                    strokeDashoffset={1400 - (scrollProgress || 0) * 1400}
                    className="transition-all duration-300"
                  />

                  {/* Nodes along path */}
                  {nodePositions.map((pos, index) => {
                    const isActive = index === activeIndex
                    const isPast = index < activeIndex
                    const [year, month] = events[index].date.split('.')
                    
                    return (
                      <g key={index}>
                        {/* Outer glow for active */}
                        {isActive && (
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={25}
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            className="animate-pulse"
                            opacity={0.4}
                          />
                        )}
                        {/* Node circle */}
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={isActive ? 14 : 10}
                          fill={isActive ? "#3b82f6" : isPast ? "#1d4ed8" : "rgba(255,255,255,0.2)"}
                          className="transition-all duration-500 shadow-xl"
                        />
                        {/* Inner dot */}
                        {isActive && (
                          <circle cx={pos.x} cy={pos.y} r={6} fill="white" />
                        )}
                        {/* Year label */}
                        <text
                          x={pos.x + 45}
                          y={pos.y + 7}
                          fill={isActive ? "#60a5fa" : "rgba(255,255,255,0.3)"}
                          fontSize={isActive ? 32 : 22}
                          fontWeight={isActive ? 900 : 600}
                          className={cn(
                            "transition-all duration-500 font-mono select-none",
                            isActive && "drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] scale-110"
                          )}
                          style={{
                            transformOrigin: `${pos.x + 45}px ${pos.y + 7}px`,
                            transform: isActive ? 'scale(1.1)' : 'scale(1)'
                          }}
                        >
                          {year}
                        </text>
                      </g>
                    )
                  })}

                  {/* Future 2026 Milestone Marker */}
                  <g>
                    <circle
                      cx={100}
                      cy={1080}
                      r={scrollProgress > 0.9 ? 12 : 6}
                      fill={scrollProgress > 0.9 ? "#3b82f6" : "rgba(255,255,255,0.1)"}
                      stroke={scrollProgress > 0.9 ? "white" : "none"}
                      strokeWidth="2"
                      className="transition-all duration-700"
                    />
                    <text
                      x={100}
                      y={1140}
                      textAnchor="middle"
                      fill={scrollProgress > 0.9 ? "#60a5fa" : "rgba(255,255,255,0.2)"}
                      fontSize={scrollProgress > 0.9 ? 32 : 24}
                      fontWeight={900}
                      className={cn(
                        "transition-all duration-700 select-none",
                        scrollProgress > 0.9 && "drop-shadow-[0_0_12px_rgba(96,165,250,0.6)]"
                      )}
                    >
                      {t('acdc.future')}
                    </text>
                  </g>

                  {/* Gradients */}
                  <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#93c5fd" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1e3a8a" />
                    </linearGradient>
                    <linearGradient id="activeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                    <linearGradient id="pathGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Mobile Timeline indicator */}
            <div className="flex lg:hidden justify-center gap-4 mb-8">
              {events.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "flex flex-col items-center gap-3 transition-all duration-300",
                    activeIndex === index ? "scale-110" : "opacity-40"
                  )}
                >
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full transition-all duration-300",
                      activeIndex === index
                        ? "bg-blue-500 shadow-lg shadow-blue-500/50"
                        : "bg-white/30"
                    )}
                  />
                  <span
                    className={cn(
                      "text-xs font-bold tracking-wider",
                      activeIndex === index ? "text-white" : "text-white/60"
                    )}
                  >
                    {item.date.split('.')[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* Right: Content Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-[600px] lg:h-[650px]">
                {events.map((item, index) => {
                  const isActive = index === activeIndex
                  const offset = index - activeIndex
                  const [year, month] = item.date.split('.')

                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "absolute inset-0 transition-all duration-700 ease-out",
                        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                      )}
                      style={{
                        transform: `translateY(${offset * 100}px) scale(${isActive ? 1 : 0.9})`,
                        pointerEvents: isActive ? "auto" : "none",
                      }}
                    >
                      <div
                        className={cn(
                          "bg-white rounded-[2.5rem] overflow-hidden",
                          "shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border border-white/20",
                          "h-full flex flex-col"
                        )}
                      >
                        {/* Card Header with Event Image */}
                        <div className="relative h-72 lg:h-96 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.topic} 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-blue-900/10 pointer-events-none" />
                          
                          {/* Edition Badge */}
                          <div className="absolute top-6 left-6 z-10">
                            <span className="px-5 py-2 rounded-full bg-blue-600 text-white text-lg font-black shadow-2xl backdrop-blur-md border border-white/20 uppercase tracking-widest">
                              {item.edition}
                            </span>
                          </div>

                          {/* Year Watermark */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-10">
                            <span className="text-[120px] lg:text-[180px] font-black text-white pointer-events-none">
                              {year}
                            </span>
                          </div>

                          {/* Date badge */}
                          <div className="absolute bottom-6 right-6 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/20">
                            <span className="text-white text-xl font-black font-mono">
                              {item.date}
                            </span>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="flex-1 p-8 lg:p-10 flex flex-col">
                          <h3 className="text-3xl lg:text-4xl font-display font-black text-slate-900 mb-8 leading-tight tracking-tight">
                            {item.topic}
                          </h3>

                          {/* Achievements / Outcome */}
                          <div className="space-y-4 flex-1">
                            <div className="flex items-start gap-4 p-5 rounded-2xl bg-blue-50/50 border border-blue-100">
                             <Sparkles className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                             <div>
                               <p className="text-blue-900 font-bold text-xl mb-2">{t('acdc.outcome')}</p>
                               <p className="text-blue-800/70 text-lg font-medium leading-relaxed">
                                 {item.outcome}
                               </p>
                             </div>
                            </div>
                          </div>

                          {/* CTA Actions */}
                          <div className="mt-8 flex gap-3">
                            {item.reviewLink && (
                              <button 
                                onClick={() => window.open(item.reviewLink, '_blank')}
                                className="flex-1 py-4 px-6 rounded-2xl bg-blue-600 text-white font-black text-xl transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/20 flex items-center justify-center gap-3"
                              >
                                <span>{t('acdc.review')}</span>
                                <ExternalLink size={20} />
                              </button>
                            )}
                            {item.speechLink && (
                              <button 
                                onClick={() => window.open(item.speechLink, '_blank')}
                                className="flex-1 py-4 px-6 rounded-2xl bg-slate-900 text-white font-black text-xl transition-all duration-300 hover:bg-black hover:shadow-xl flex items-center justify-center gap-3"
                              >
                                <span>{t('acdc.moments')}</span>
                                <Play size={20} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
