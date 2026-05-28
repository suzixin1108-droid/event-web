"use client"

import { cn } from "@/src/lib/utils"
import { CalendarDays, MapPin, Users } from "lucide-react"
import { useLanguage } from "../lib/LanguageContext"

export interface EventData {
  id: string
  title: string
  subtitle: string
  date: string
  location: string
  scale: string
  ticketNumber: string
  posterImage: string
  status: "ongoing" | "ended"
  link?: string
}

interface TicketCardProps {
  event: EventData
  className?: string
}

export function TicketCard({ event, className }: TicketCardProps) {
  const { t } = useLanguage();
  const isOngoing = event.status === "ongoing"

  const handleAction = () => {
    if (event.link) {
      window.open(event.link, '_blank')
    }
  }

  return (
    <div className={cn(
      "relative bg-white rounded-[20px] shadow-lg shadow-black/5",
      "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
      "overflow-hidden", className
    )}>
      <div className="flex flex-col lg:flex-row">
        {/* Left Side - Event Poster */}
        <div className="relative lg:w-[65%] aspect-[16/9] lg:aspect-auto lg:min-h-[550px] overflow-hidden">
          <img 
            src={event.posterImage} 
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Status Tag */}
          <div className="absolute top-8 left-8">
            <span className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-base font-semibold backdrop-blur-md",
              isOngoing ? "bg-emerald-500/90 text-white" : "bg-gray-800/80 text-white"
            )}>
              <span className={cn("w-2.5 h-2.5 rounded-full", isOngoing ? "bg-white animate-pulse" : "bg-white/60")} />
              {isOngoing ? t('event.ongoingBadge') : t('event.endedBadge')}
            </span>
          </div>

          {/* Event Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-10 lg:p-12">
            <h3 className="text-5xl lg:text-7xl font-display font-bold text-white mb-4 tracking-tight leading-tight">{event.title}</h3>
            <p className="text-white/90 text-2xl line-clamp-2 font-medium max-w-4xl">{event.subtitle}</p>
          </div>
        </div>

        {/* Perforated Line Separator (Hidden on mobile) */}
        <div className="relative hidden lg:flex flex-col items-center justify-center w-0 z-10">
          <div className="absolute -top-4 w-8 h-8 bg-[#F3F2FA] rounded-full lg:-translate-x-[1px]" />
          <div className="h-full border-l-2 border-dashed border-gray-200" />
          <div className="absolute -bottom-4 w-8 h-8 bg-[#F3F2FA] rounded-full lg:-translate-x-[1px]" />
        </div>

        {/* Right Side - Ticket Stub */}
        <div className="lg:w-[35%] p-10 lg:p-12 flex flex-col justify-between bg-[#FCFCFD] relative overflow-hidden">
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-[100px] -mr-16 -mt-16 z-0" />
          
          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-12">
              <div className="w-10 h-10 rounded-xl bg-blue-600 shadow-lg shadow-blue-200 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M15 5V7M15 11V13M15 17V19M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V5ZM5 10.5C5.82843 10.5 6.5 9.82843 6.5 9V7.5C6.5 6.67157 5.82843 6 5 6V10.5ZM5 18C5.82843 18 6.5 17.3284 6.5 16.5V15C6.5 14.1716 5.82843 13.5 5 13.5V18ZM19 10.5C18.1716 10.5 17.5 9.82843 17.5 9V7.5C17.5 6.67157 18.1716 6 19 6V10.5ZM19 18C18.1716 18 17.5 17.3284 17.5 16.5V15C17.5 14.1716 18.1716 13.5 19 13.5V18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4 className="text-2xl font-display font-black text-slate-900 tracking-tight leading-none">
                  {t('event.ticket')}
                </h4>
                <p className="text-[10px] font-bold text-blue-600 tracking-[0.3em] uppercase mt-2 opacity-70">
                  Access Pass
                </p>
              </div>
            </div>

            <div className="flex justify-between items-stretch gap-8">
              <div className="space-y-10 flex-1">
                <div className="flex items-center gap-6 group/item">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0 transition-all duration-300 group-hover/item:border-blue-200 group-hover/item:shadow-md">
                    <CalendarDays className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] mb-1">{t('event.date')}</p>
                    <p className="text-xl font-bold text-slate-900 line-clamp-1">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group/item">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0 transition-all duration-300 group-hover/item:border-blue-200 group-hover/item:shadow-md">
                    <MapPin className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] mb-1">{t('event.location')}</p>
                    <p className="text-xl font-bold text-slate-900 line-clamp-1">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group/item">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0 transition-all duration-300 group-hover/item:border-blue-200 group-hover/item:shadow-md">
                    <Users className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] mb-1">{t('event.scale')}</p>
                    <p className="text-xl font-bold text-slate-900 line-clamp-1">{event.scale}</p>
                  </div>
                </div>
              </div>

              {/* Vertical Barcode */}
              <div className="flex gap-4 shrink-0 py-2">
                <div 
                  className="w-10 bg-slate-900/10 min-h-[220px]" 
                  style={{ 
                    maskImage: `repeating-linear-gradient(
                      0deg,
                      #000 0,
                      #000 1px,
                      transparent 1px,
                      transparent 2px,
                      #000 2px,
                      #000 4px,
                      transparent 4px,
                      transparent 5px
                    )`,
                    WebkitMaskImage: `repeating-linear-gradient(
                      0deg,
                      #000 0,
                      #000 1px,
                      transparent 1px,
                      transparent 2px,
                      #000 2px,
                      #000 4px,
                      transparent 4px,
                      transparent 5px
                    )`
                  }} 
                />
                <div className="flex flex-col justify-center">
                  <p className="text-[10px] text-slate-300 font-mono tracking-[0.3em] uppercase [writing-mode:vertical-lr] rotate-180">
                    #{event.ticketNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-10 pt-10 border-t border-dashed border-gray-200 relative z-10">
            <button 
              onClick={handleAction}
              disabled={isOngoing && !event.link}
              className={cn(
                "group/ticket-btn relative flex items-center justify-center w-full py-5 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform active:scale-95 overflow-hidden",
                isOngoing 
                  ? "bg-slate-900 text-white hover:shadow-2xl hover:shadow-blue-500/20" 
                  : (event.link 
                      ? "bg-slate-100 text-slate-900 hover:bg-slate-200 cursor-pointer" 
                      : "bg-slate-50 text-slate-300 cursor-default")
              )}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isOngoing ? t('event.registerNow') : (event.link ? t('event.viewReview') : t('event.endedBadge'))}
              </span>
              {isOngoing && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover/ticket-btn:opacity-100 transition-opacity duration-300 z-0" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
