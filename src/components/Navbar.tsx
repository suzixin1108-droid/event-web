import React, { useState, useEffect } from "react";
import { Menu, Globe } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled ? "pt-4 px-4" : "pt-0 px-0"
      }`}
    >
      <nav
        className={`pointer-events-auto backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] border border-white/10 w-full ${
          isScrolled
            ? "bg-blue-600/95 rounded-[32px] max-w-[95%] xl:max-w-6xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "bg-black rounded-none max-w-full shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex justify-between h-16 ${
              isScrolled ? "md:h-16" : "md:h-20"
            } items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`}
          >
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <img
                src="https://free.picui.cn/free/2026/05/13/6a04163528e8c.png"
                alt="AIGCLink"
                className="h-8 object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              <a
                href="#"
                className="font-medium text-white hover:text-spring-green transition-colors whitespace-nowrap"
              >
                {t('nav.home')}
              </a>
              <a
                href="#bento"
                className="font-medium text-white/80 hover:text-white transition-colors whitespace-nowrap"
              >
                {t('nav.activity')}
              </a>
              <a
                href="#"
                className="font-medium text-white/80 hover:text-white transition-colors whitespace-nowrap"
              >
                {t('nav.opclink')}
              </a>
              <a
                href="#"
                className="font-medium text-white/80 hover:text-white transition-colors whitespace-nowrap"
              >
                {t('nav.ranking')}
              </a>
              <a
                href="#"
                className="font-medium text-white/80 hover:text-white transition-colors whitespace-nowrap"
              >
                {t('nav.solution')}
              </a>
              <a
                href="#"
                className="font-medium text-white/80 hover:text-white transition-colors whitespace-nowrap"
              >
                {t('nav.developer')}
              </a>
              <a
                href="#"
                className="text-spring-green font-bold drop-shadow-[0_0_8px_rgba(0,255,125,0.6)] hover:text-green-400 transition-colors relative group whitespace-nowrap"
              >
                {t('nav.contest')}
                <span className="absolute -top-3 -right-6 bg-spring-green text-gulf-blue text-[10px] font-bold px-2 py-0.5 rounded-[12px] shadow-[0_0_12px_rgba(0,255,125,0.8)] animate-pulse">
                  HOT
                </span>
              </a>
            </div>

            {/* Language Switcher & Join Community Button */}
            <div className="hidden lg:flex items-center gap-4 shrink-0">
              <button
                onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-all bg-white/10 hover:bg-white/20 p-2 px-3 rounded-full border border-white/20"
                title="Switch Language"
              >
                <Globe size={16} />
                <span className="text-xs font-bold font-mono">
                  {language === 'zh' ? 'EN' : ' 中'}
                </span>
              </button>

              <button
                className={`magic-btn h-[40px] px-6 ${
                  isScrolled ? "scrolled" : ""
                }`}
              >
                <span className="dots_border"></span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="sparkle"
                >
                  <path
                    d="M10 1L12.5 7.5L19 10L12.5 12.5L10 19L7.5 12.5L1 10L7.5 7.5L10 1Z"
                    className="path"
                  />
                  <path
                    d="M20.5 15L21.5 17.5L24 18.5L21.5 19.5L20.5 22L19.5 19.5L17 18.5L19.5 17.5L20.5 15Z"
                    className="path"
                  />
                  <path
                    d="M19.5 2L20 4.5L22.5 5L20 5.5L19.5 8L19 5.5L16.5 5L19 4.5L19.5 2Z"
                    className="path"
                  />
                </svg>
                <span className="text_button">{t('nav.join')}</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center shrink-0">
              <button className="text-white hover:text-gray-300 transition-colors">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
