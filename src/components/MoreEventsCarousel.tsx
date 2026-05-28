"use client"

import { useState } from "react"
import { cn } from "../lib/utils"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useLanguage } from "../lib/LanguageContext"

interface OtherEvent {
  title: string;
  date: string;
  link: string;
  image: string;
  category: string;
  description?: string;
}

interface MoreEventsCarouselProps {
  events: OtherEvent[];
}

export function MoreEventsCarousel({ events }: MoreEventsCarouselProps) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!events || events.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? events.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === events.length - 1 ? 0 : prev + 1
    )
  }

  // Coverflow configuration
  const CONFIG = {
    gap: 400,           // 卡片间距
    sideScale: 0.8,     // 两侧卡片缩放
    sideOpacity: 0.4,   // 两侧透明度
    rotateY: 35,        // Y轴旋转角度
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1] as any // ease-out-expo
  };

  return (
    <section id="more-events" className="py-24 px-6 bg-slate-50 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-24 lg:mb-32">
          <p className="text-sm font-bold text-brand tracking-[0.4em] uppercase mb-4">
            MORE EVENTS
          </p>
          <h2 className="text-4xl lg:text-6xl font-display font-black text-slate-900 tracking-tight">
            {t('more.title')}
          </h2>
        </div>

        {/* Carousel Stage */}
        <div className="relative h-[550px] [perspective:1400px] flex items-center justify-center">
          {/* Container for preserve-3d */}
          <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
            {events.map((event, i) => {
              // Calculate relative position with wrapping support
              let offset = i - currentIndex;
              
              // Handle wrap-around for a circular feel
              if (offset > Math.floor(events.length / 2)) offset -= events.length;
              if (offset < -Math.floor(events.length / 2)) offset += events.length;
              
              const abs = Math.abs(offset);
              const isActive = abs === 0;
              
              // Only render visible or close cards for performance
              if (abs > 2) return null;

              return (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{
                    x: offset * CONFIG.gap,
                    scale: isActive ? 1 : CONFIG.sideScale,
                    rotateY: offset === 0 ? 0 : offset > 0 ? -CONFIG.rotateY : CONFIG.rotateY,
                    opacity: isActive ? 1 : abs === 1 ? CONFIG.sideOpacity : 0,
                    zIndex: 20 - abs,
                  }}
                  transition={{
                    duration: CONFIG.duration,
                    ease: CONFIG.ease
                  }}
                  style={{
                    position: "absolute",
                    transformStyle: "preserve-3d",
                  }}
                  className={cn(
                    "w-full max-w-[85%] md:max-w-2xl lg:max-w-[750px] transition-shadow duration-700",
                    isActive ? "shadow-2xl shadow-slate-900/10" : "shadow-lg shadow-slate-900/5"
                  )}
                >
                  <EventCard 
                    event={event} 
                    isActive={isActive} 
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          {events.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className={cn(
                  "absolute left-2 lg:left-8 top-1/2 -translate-y-1/2 z-40",
                  "w-12 h-12 rounded-full bg-white border border-slate-200 shadow-xl",
                  "flex items-center justify-center text-slate-600",
                  "hover:bg-brand hover:text-white hover:border-brand transition-all duration-300",
                  "cursor-pointer active:scale-90"
                )}
                aria-label="上一个活动"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className={cn(
                  "absolute right-2 lg:right-8 top-1/2 -translate-y-1/2 z-40",
                  "w-12 h-12 rounded-full bg-white border border-slate-200 shadow-xl",
                  "flex items-center justify-center text-slate-600",
                  "hover:bg-brand hover:text-white hover:border-brand transition-all duration-300",
                  "cursor-pointer active:scale-90"
                )}
                aria-label="下一个活动"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Dots Indicator */}
        {events.length > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500 cursor-pointer",
                  index === currentIndex
                    ? "w-10 bg-brand"
                    : "w-4 bg-slate-300 hover:bg-slate-400"
                )}
                aria-label={`跳转到第 ${index + 1} 个活动`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function EventCard({
  event,
  isActive = false,
  isPreview = false,
}: {
  event: OtherEvent
  isActive?: boolean
  isPreview?: boolean
}) {
  const { t } = useLanguage();
  return (
    <div
      className={cn(
        "bg-white rounded-2xl overflow-hidden border border-slate-100",
        "transition-shadow duration-300",
        isActive && "shadow-xl shadow-slate-200/50",
        !isPreview && "hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/50"
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative overflow-hidden bg-slate-100",
          isActive ? "aspect-video" : "aspect-[4/3]"
        )}
      >
        {event.image ? (
          <img 
            src={event.image} 
            alt={event.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-blue-600/30" />
        )}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-4xl font-bold text-white/20 select-none">
            {event.date}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={cn("p-6", isActive && "p-10")}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-lg font-medium text-brand">
            {event.date}
          </span>
          {event.category && (
            <>
              <span className="text-slate-300">|</span>
              <span className="text-lg font-medium text-slate-500 uppercase tracking-wider">
                {event.category}
              </span>
            </>
          )}
        </div>

        <h3
          className={cn(
            "font-display font-bold text-slate-900 mb-4 line-clamp-2",
            isActive ? "text-3xl" : "text-xl"
          )}
        >
          {event.title}
        </h3>

        {isActive && (
          <>
            {event.description && (
              <p className="text-slate-500 text-lg mb-6 line-clamp-2">
                {event.description}
              </p>
            )}
            {event.link && (
              <a 
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-brand text-white text-lg font-semibold hover:bg-brand/90 transition-all hover:shadow-xl hover:shadow-brand/20 active:scale-95"
              >
                {t('more.detail')}
                <ArrowRight className="w-5 h-5" />
              </a>
            )}
          </>
        )}
      </div>
    </div>
  )
}
