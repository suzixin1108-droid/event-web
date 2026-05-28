"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { TicketCard, type EventData } from "./TicketCard"
import { cn } from "@/src/lib/utils"

interface EventsCarouselProps {
  events: EventData[]
}

export function EventsCarousel({ events }: EventsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1))
  }

  return (
    <div className="relative group max-w-[1600px] mx-auto px-4 md:px-12">
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2 z-20">
        <button 
          onClick={prevSlide}
          className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center border border-slate-100 transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95 group-hover:opacity-100"
        >
          <ChevronLeft className="w-6 h-6 text-slate-800" />
        </button>
      </div>

      <div className="absolute top-1/2 -right-4 md:-right-8 -translate-y-1/2 z-20">
        <button 
          onClick={nextSlide}
          className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center border border-slate-100 transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95 group-hover:opacity-100"
        >
          <ChevronRight className="w-6 h-6 text-slate-800" />
        </button>
      </div>

      {/* Slide Container */}
      <div className="overflow-hidden py-12">
        <div 
          className="flex transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {events.map((event) => (
            <div key={event.id} className="w-full flex-shrink-0 px-2 lg:px-4">
              <TicketCard event={event} />
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-3 mt-4">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "h-2.5 rounded-full transition-all duration-500",
              index === currentIndex 
                ? "bg-blue-600 w-10 shadow-lg shadow-blue-500/20" 
                : "bg-slate-200 w-2.5 hover:bg-slate-300"
            )}
          />
        ))}
      </div>
    </div>
  )
}
