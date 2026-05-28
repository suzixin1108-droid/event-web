/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  Calendar, 
  ExternalLink, 
  Mail, 
  MapPin, 
  Users, 
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Info,
  Clock,
  Sparkles,
  RefreshCw,
  Rocket,
  MonitorPlay,
  Handshake,
  MessageSquare,
  User,
  Phone,
  Cpu,
  Zap,
  Hexagon
} from 'lucide-react';
import React, { useState, MouseEvent, useRef, useEffect } from 'react';
import { useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import SpotlightCard from './components/SpotlightCard';
import LogoLoop from './components/LogoLoop';
import { TicketCard, type EventData } from './components/TicketCard';
import { EventsCarousel } from './components/EventsCarousel';
import { ACDCTimeline } from './components/ACDCTimeline';
import { MoreEventsCarousel } from './components/MoreEventsCarousel';
import { CommunityCooperation } from './components/CommunityCooperation';
import { MinimalCommunityBento } from './components/MinimalCommunityBento';
import HeroParallaxDemo from './components/HeroParallaxDemo';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { useLanguage } from './lib/LanguageContext';

// --- Types ---

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

interface OtherEvent {
  title: string;
  date: string;
  link: string;
  image: string;
  category: string;
  description?: string;
}

interface RegistrationEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  link: string;
  image: string;
  description: string;
  status: 'active' | 'ended';
}

// --- Data ---

const REGISTRATION_EVENTS: RegistrationEvent[] = [
  {
    id: 'opclink-2026',
    title: 'OPCLink 技术沙龙',
    date: '2026.04.18',
    location: '中国 上海',
    link: '#',
    image: 'https://r2.image-upload.app/ptImg/YAeUBWSK.png',
    description: '连接开发者，共筑大模型生态',
    status: 'active'
  },
  {
    id: 'acdc-2026-v5',
    title: 'ACDC开发者大会',
    date: '2026.01.17',
    location: '中国 北京',
    link: 'https://www.huodongxing.com/event/6837198424900?qd=1139540375758',
    image: 'https://r2.image-upload.app/ptImg/dOrLRDdv.png',
    description: '生态 · 扶持 · 国产 · 风向',
    status: 'ended'
  }
];

const ACDC_TIMELINE: ACDCEvent[] = [
  {
    id: 1,
    edition: '第一届',
    date: '2023.10',
    topic: '大模型(AIGC)如何与具体行业场景结合落地',
    outcome: '推动AI Agent落地提供技术前沿落地分享和交流。',
    image: 'https://r2.image-upload.app/ptImg/MNCt1RI9.png',
  },
  {
    id: 2,
    edition: '第二届',
    date: '2024.01',
    topic: '2023年大模型发展总结及2024年趋势预测',
    outcome: '发布2024年大模型发展十大预测',
    image: 'https://r2.image-upload.app/ptImg/GLJQbizF.png',
    reviewLink: 'https://mp.weixin.qq.com/s/GE7Sz0fkceDhtm9Pmp5PHQ',
  },
  {
    id: 3,
    edition: '第三届',
    date: '2024.05',
    topic: '多模态与具身智能引领蓝领替代的新时代',
    outcome: '发布AI Agent商业落地应用案例',
    image: 'https://r2.image-upload.app/ptImg/iUrkkuaU.jpg',
    reviewLink: 'https://mp.weixin.qq.com/s/d4yJSV6S3MCIjUnSOPravA',
    speechLink: 'https://mp.weixin.qq.com/s/2zLnXLPS-i7NwcH2A5UyqQ',
  },
  {
    id: 4,
    edition: '第四届',
    date: '2025.01',
    topic: 'AI产业落地商业化实践及AI出海全球化',
    outcome: '发布AI Agent商业落地应用案例',
    image: 'https://r2.image-upload.app/ptImg/4wKsvs2C.png',
    reviewLink: 'https://mp.weixin.qq.com/s/HHHB2f1lhzxHuWCoeiSzxw',
  },
  {
    id: 5,
    edition: '第五届',
    date: '2026.01',
    topic: '2025年AI Infra及垂类AI解决方案的大爆发',
    outcome: '发布AI Infra、AI行业解决方案、芯片应用场景适配联盟、AI应用&垂直小模型双百计划',
    image: 'https://r2.image-upload.app/ptImg/dOrLRDdv.png',
    reviewLink: 'https://mp.weixin.qq.com/s/EkEX_NNeRnIdArDekvVpxg',
  }
];

const OTHER_EVENTS: OtherEvent[] = [
  {
    title: 'OPCLink 百校行 · 北京联合大学站',
    date: '2026.03',
    link: 'https://mp.weixin.qq.com/s/BeplwdaS831aKEXV6UEMxA',
    image: 'https://img.heliar.top/file/1779069994778_OPCLink.jpg',
    category: 'OPCLink',
    description: '首个高校OPC实训基地诞生，带学生近距离且专业了解技术热点，在安全前提下激发深度探索，以利未来更好应用。'
  },
  {
    title: '全球开发者先锋大会 | AIGC开发者专场',
    date: '2025.12',
    link: '',
    image: 'https://r2.image-upload.app/ptImg/6YhpPIG1.png',
    category: '线下沙龙',
    description: ''
  }
];

const PARTNER_LOGOS = [
  { name: '开放社区', logo: 'https://r2.image-upload.app/ptImg/14d2JHIdH.png' },
  { name: 'AI TOP 100', logo: 'https://r2.image-upload.app/ptImg/10GxzkJXV.png' },
  { name: 'Atomgit', logo: 'https://r2.image-upload.app/ptImg/quI2joni.png' },
  { name: 'chatu', logo: 'https://r2.image-upload.app/ptImg/19vIAHqqh.png' },
  { name: 'csdn', logo: 'https://r2.image-upload.app/ptImg/V3jeWkWo.png' },
  { name: '浩屿智云', logo: 'https://r2.image-upload.app/ptImg/1egrvl2xf.png' },
  { name: 'langgpt', logo: 'https://r2.image-upload.app/ptImg/ovNbd0N4.png' },
  { name: 'gitee', logo: 'https://r2.image-upload.app/ptImg/n7kqNLSM.png' },
  { name: 'meta', logo: 'https://r2.image-upload.app/ptImg/1bmWZe6pe.png' },
  { name: 'metagpt', logo: 'https://r2.image-upload.app/ptImg/0QVJSMdp.png' },
  { name: 'minimax', logo: 'https://r2.image-upload.app/ptImg/zJ0ZZMyd.png' },
  { name: 'oschina', logo: 'https://r2.image-upload.app/ptImg/1heaY6pET.png' },
  { name: '盛派', logo: 'https://r2.image-upload.app/ptImg/hWwd7TIe.png' },
  { name: 'waytoagi', logo: 'https://r2.image-upload.app/ptImg/w06NXidt.png' },
  { name: '百川', logo: 'https://r2.image-upload.app/ptImg/7VWOW0nX.png' },
  { name: '火山', logo: 'https://r2.image-upload.app/ptImg/39E9ip0o.png' },
  { name: '猎聘', logo: 'https://r2.image-upload.app/ptImg/1aRJyDHGM.png' },
  { name: 'AI山脉', logo: 'https://r2.image-upload.app/ptImg/pQKmGNOj.png' },
  { name: '软积木', logo: 'https://r2.image-upload.app/ptImg/3oPbi3HT.png' },
  { name: '深度财经', logo: 'https://r2.image-upload.app/ptImg/14QjwsGbW.png' },
  { name: '芯动科技', logo: 'https://r2.image-upload.app/ptImg/v4cEnkj6.png' },
  { name: '中文技术社区', logo: 'https://r2.image-upload.app/ptImg/LnaImAlv.png' },
];

const MEDIA_LOGOS = [
  { name: '中新网', logo: 'https://r2.image-upload.app/ptImg/1rbmxlRj.png' },
  { name: '凤凰网', logo: 'https://r2.image-upload.app/ptImg/k4IMlAAU.png' },
  { name: '财联社', logo: 'https://r2.image-upload.app/ptImg/vnhDrS2C.png' },
  { name: '网易科技', logo: 'https://r2.image-upload.app/ptImg/1fHBwumxw.png' },
  { name: '量子位', logo: 'https://r2.image-upload.app/ptImg/l5WndVm3.png' },
  { name: '央视新闻', logo: 'https://r2.image-upload.app/ptImg/kkjY2eAF.png' },
  { name: '人民网', logo: 'https://r2.image-upload.app/ptImg/15uHrMUBM.png' },
  { name: '新闻网', logo: 'https://r2.image-upload.app/ptImg/AHEilvoR.png' },
  { name: '央视网', logo: 'https://r2.image-upload.app/ptImg/ukKMWhtP.png' },
  { name: '光明网', logo: 'https://r2.image-upload.app/ptImg/U2j2KgXG.png' },
  { name: '第一财经', logo: 'https://r2.image-upload.app/ptImg/fNNq13DZ.png' },
  { name: '科技日报', logo: 'https://r2.image-upload.app/ptImg/YoY6rVy4.png' },
  { name: '新京报', logo: 'https://r2.image-upload.app/ptImg/pkX4uc6J.png' },
  { name: '36kr', logo: 'https://r2.image-upload.app/ptImg/UoQICHxe.png' },
  { name: '北京日报', logo: 'https://r2.image-upload.app/ptImg/N2uaHDb4.png' },
  { name: '新浪科技', logo: 'https://r2.image-upload.app/ptImg/s3XSS98L.png' },
];

// --- Components ---

function ExplorerButton({ 
  children, 
  href, 
  onClick, 
  className = "", 
  target, 
  rel 
}: { 
  children: React.ReactNode; 
  href?: string; 
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
}) {
  const content = (
    <>
      <span className="button__icon-wrapper">
        <svg
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="button__icon-svg"
          width="10"
        >
          <path
            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            fill="currentColor"
          ></path>
        </svg>

        <svg
          viewBox="0 0 14 15"
          fill="none"
          width="10"
          xmlns="http://www.w3.org/2000/svg"
          className="button__icon-svg button__icon-svg--copy"
        >
          <path
            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            fill="currentColor"
          ></path>
        </svg>
      </span>
      {children}
    </>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={`btn-primary ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`btn-primary ${className}`}>
      {content}
    </button>
  );
}

function SectionHeader({ title, className = "" }: { title: string; className?: string }) {
  return (
    <div className={`mb-24 ${className}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-[36px] md:text-[48px] lg:text-7xl font-display font-black text-slate-900 text-center tracking-tighter"
      >
        {title}
      </motion.h2>
    </div>
  );
}

function EventCard({ event, index }: { event: RegistrationEvent; index: number; key?: string | number }) {
  const { t } = useLanguage();
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-0 bottom-0 top-[220px] flex items-center justify-center p-4 md:p-12"
    >
      <div className="image-ticket-card">
        {/* Left Section (Branding & Main Info) */}
        <div className="ticket-left">
          {/* Status Badge */}
          <div className="status-badge-img mb-6">
            <div className="status-dot-img"></div>
            {event.status === 'active' ? t('event.ongoing') : t('event.ended')}
          </div>

          {/* Main Content: Image 4:3 and Title below */}
          <div className="relative z-10 flex flex-col flex-1 justify-center">
             <div className="relative w-[560px] aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl mb-10 bg-slate-100 border border-slate-200/50">
               <img 
                 src={event.image} 
                 alt={event.title} 
                 className="w-full h-full object-cover" 
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
             </div>

             <div className="relative max-w-2xl">
               <h3 className="text-[48px] md:text-8xl font-display font-black text-slate-900 leading-[1.1] mb-5 tracking-tighter">
                 {event.title}
               </h3>
               <p className="text-slate-400 text-[20px] md:text-3xl font-medium tracking-tight leading-[1.7] max-w-xl">
                 {event.description}
               </p>
               <div className="w-24 h-2 bg-brand rounded-full mt-8 opacity-90" />
             </div>
          </div>

          {/* Dotted Tech Grid Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3A9DF6 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          
          {/* Tech Corner Accents */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-brand/20 rounded-tl-lg pointer-events-none" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-brand/20 rounded-br-lg pointer-events-none" />
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-20 w-[600px] h-[600px] pointer-events-none">
             <div className="w-full h-full bg-brand/5 blur-[120px] rounded-full" />
             <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Hexagon className="absolute w-[420px] h-[420px] text-brand blur-[1px] rotate-15" strokeWidth={0.5} />
                  <Cpu className="absolute w-64 h-64 text-brand blur-[0.5px]" strokeWidth={1} />
                </div>
             </div>
          </div>
        </div>

        {/* Right Section (Ticket Stub) */}
        <div className="ticket-right">
          {/* Notch Overlays */}
          <div className="notch-container">
             <div className="side-notch-v side-notch-v-top"></div>
             <div className="side-notch-v side-notch-v-bottom"></div>
          </div>

          {/* Stub Content */}
          <div className="relative z-10 flex flex-col h-full pt-10">
            <div className="mb-8 mt-2">
               <h4 className="text-7xl font-black text-slate-900 tracking-tighter mb-1 uppercase">{t('event.ticket')}</h4>
            </div>

            <div className="w-full border-t-2 border-slate-200 border-dotted mb-12 opacity-50" />

          <div className="space-y-8 mb-auto">
               <div className="flex items-center gap-7 group">
                  <div className="w-14 h-14 bg-brand/5 rounded-2xl flex items-center justify-center text-brand shadow-sm group-hover:scale-110 transition-transform">
                    <Calendar size={28} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] uppercase font-black text-slate-400 tracking-[0.2em] leading-none mb-1.5">{t('event.date')}</span>
                    <span className="text-4xl font-black text-slate-800 tracking-tight">{event.date}</span>
                  </div>
               </div>
               <div className="flex items-center gap-7 group">
                  <div className="w-14 h-14 bg-brand/5 rounded-2xl flex items-center justify-center text-brand shadow-sm group-hover:scale-110 transition-transform">
                    <MapPin size={28} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] uppercase font-black text-slate-400 tracking-[0.2em] leading-none mb-1.5">{t('event.location')}</span>
                    <span className="text-4xl font-black text-slate-800 tracking-tight">{event.location}</span>
                  </div>
               </div>
               <div className="flex items-center gap-7 group">
                  <div className="w-14 h-14 bg-brand/5 rounded-2xl flex items-center justify-center text-brand shadow-sm group-hover:scale-110 transition-transform">
                    <Users size={28} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] uppercase font-black text-slate-400 tracking-[0.2em] leading-none mb-1.5">{t('event.scale')}</span>
                    <span className="text-4xl font-black text-slate-800 tracking-tight">3000+ {t('event.scale.unit')}</span>
                  </div>
               </div>
            </div>

            <a 
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="launch-button group"
            >
              <svg
                height="32"
                width="32"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-all duration-500"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                  fill="currentColor"
                ></path>
              </svg>
              <span>{t('event.getTicket')}</span>
            </a>
          </div>

          {/* Vertical Barcode precisely as seen in image */}
          <div className="vertical-barcode">
             <div className="barcode-stripes-v"></div>
             <div className="barcode-text-v">AIGCLINK-20260418-0001</div>
          </div>

          {/* Background ID Number */}
          <div className="bg-number-large">1</div>
        </div>
      </div>
    </motion.div>
  );
}

function Logo({ className = "" }: { className?: string }) {
  const [error, setError] = useState(false);

  // Protection against right-click and copying
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  if (error) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className={`w-10 h-10 bg-brand text-white rounded-xl flex items-center justify-center shadow-lg transition-colors`}>
          <Sparkles size={22} className="text-white" />
        </div>
        <div className="flex flex-col">
          <span className="font-display font-black text-4xl tracking-tighter text-slate-900 leading-none uppercase select-none">AIGC<span className="text-brand">Link</span></span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative select-none pointer-events-none cursor-default ${className}`}
      onContextMenu={handleContextMenu}
    >
      <img 
        src="https://r2.image-upload.app/ptImg/ZWUljaWD.png" 
        alt="AIGCLink Logo" 
        className="h-10 md:h-12 w-auto object-contain pointer-events-none"
        referrerPolicy="no-referrer"
        onError={() => setError(true)}
        draggable={false}
      />
    </div>
  );
}

// --- Background Components ---

const floatingIcons = [
  { id: 1, icon: "chip", position: { top: "15%", left: "8%" }, size: 80, delay: 0, animation: "animate-float" },
  { id: 2, icon: "brain", position: { top: "25%", right: "10%" }, size: 90, delay: 0.5, animation: "animate-float-slow" },
  { id: 3, icon: "chat", position: { top: "60%", left: "5%" }, size: 75, delay: 1, animation: "animate-float-reverse" },
  { id: 4, icon: "code", position: { top: "70%", right: "8%" }, size: 85, delay: 1.5, animation: "animate-float" },
  { id: 5, icon: "model", position: { bottom: "20%", left: "15%" }, size: 70, delay: 2, animation: "animate-float-slow" },
  { id: 6, icon: "data", position: { bottom: "25%", right: "15%" }, size: 80, delay: 2.5, animation: "animate-float-reverse" },
  { id: 7, icon: "robot", position: { top: "40%", left: "3%" }, size: 65, delay: 0.8, animation: "animate-float" },
  { id: 8, icon: "gpu", position: { top: "45%", right: "5%" }, size: 75, delay: 1.8, animation: "animate-float-slow" },
];

function IconSvg({ type, className }: { type: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    chip: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="6" y="6" width="12" height="12" rx="2" stroke="url(#iconGrad)" strokeWidth="1.5" />
        <path d="M9 6V4M15 6V4M9 20v-2M15 20v-2M6 9H4M6 15H4M20 9h-2M20 15h-2" stroke="url(#iconGrad)" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="9" y="9" width="6" height="6" rx="1" fill="url(#iconGrad)" opacity="0.5" />
        <defs>
          <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7AAEFD" /><stop offset="100%" stopColor="#D4BFFF" />
          </linearGradient>
        </defs>
      </svg>
    ),
    brain: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M9.5 14.5c.34 1.14 1.4 2 2.5 2s2.16-.86 2.5-2" stroke="url(#iconGrad)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" stroke="url(#iconGrad)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="url(#iconGrad)" opacity="0.5" />
        <defs>
          <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7AAEFD" /><stop offset="100%" stopColor="#D4BFFF" />
          </linearGradient>
        </defs>
      </svg>
    ),
    chat: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="url(#iconGrad)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 9h8M8 13h5" stroke="url(#iconGrad)" strokeWidth="1.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7AAEFD" /><stop offset="100%" stopColor="#D4BFFF" />
          </linearGradient>
        </defs>
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke="url(#iconGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7AAEFD" /><stop offset="100%" stopColor="#D4BFFF" />
          </linearGradient>
        </defs>
      </svg>
    ),
    model: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6l-6 6 6 6 6-6-6-6z" stroke="url(#iconGrad)" strokeWidth="1.5" />
        <defs>
          <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7AAEFD" /><stop offset="100%" stopColor="#D4BFFF" />
          </linearGradient>
        </defs>
      </svg>
    ),
    data: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M4 6h16M4 12h16M4 18h16" stroke="url(#iconGrad)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="6" r="1.5" fill="url(#iconGrad)" opacity="0.5" />
        <circle cx="16" cy="12" r="1.5" fill="url(#iconGrad)" opacity="0.5" />
        <circle cx="8" cy="18" r="1.5" fill="url(#iconGrad)" opacity="0.5" />
        <defs>
          <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7AAEFD" /><stop offset="100%" stopColor="#D4BFFF" />
          </linearGradient>
        </defs>
      </svg>
    ),
    robot: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="5" y="8" width="14" height="11" rx="2" stroke="url(#iconGrad)" strokeWidth="1.5" />
        <path d="M9 13h.01M15 13h.01M12 8V5M9 5h6" stroke="url(#iconGrad)" strokeWidth="1.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7AAEFD" /><stop offset="100%" stopColor="#D4BFFF" />
          </linearGradient>
        </defs>
      </svg>
    ),
    gpu: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="4" y="6" width="16" height="12" rx="2" stroke="url(#iconGrad)" strokeWidth="1.5" />
        <path d="M8 6V4M12 6V4M16 6V4M8 20v-2M12 20v-2M16 20v-2" stroke="url(#iconGrad)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 10h10v4H7z" fill="url(#iconGrad)" opacity="0.3" />
        <defs>
          <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7AAEFD" /><stop offset="100%" stopColor="#D4BFFF" />
          </linearGradient>
        </defs>
      </svg>
    ),
  };
  return icons[type] || null;
}

function SectionBackground() {
  return (
    <>
      {/* 1. 多层渐变背景 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 主背景渐变 */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, #eff6ff, #f8fafc)"
          }}
        />

        {/* 中心径向光晕 */}
        <div
          className="absolute inset-0 animate-pulse-glow"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 55%, rgba(58, 157, 246, 0.05) 0%, rgba(58, 157, 246, 0.02) 40%, transparent 70%)",
            filter: "blur(60px)"
          }}
        />

        {/* 顶部蓝色光晕 */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96"
          style={{
            background: "radial-gradient(circle, rgba(58, 157, 246, 0.05) 0%, transparent 70%)",
            filter: "blur(80px)"
          }}
        />

        {/* 底部蓝色光晕 */}
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96"
          style={{
            background: "radial-gradient(circle, rgba(58, 157, 246, 0.05) 0%, transparent 70%)",
            filter: "blur(80px)"
          }}
        />
      </div>

      {/* 2. SVG 装饰层 */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice">
        {/* 超细白色弧线 */}
        <ellipse cx="50%" cy="70%" rx="45%" ry="25%" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        <ellipse cx="50%" cy="65%" rx="55%" ry="30%" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <ellipse cx="50%" cy="80%" rx="40%" ry="20%" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="5 10" />

        {/* 水平虚线装饰 */}
        <line x1="10%" y1="50%" x2="35%" y2="50%" stroke="rgba(180,180,200,0.1)" strokeWidth="1" strokeDasharray="8 6" />
        <line x1="65%" y1="50%" x2="90%" y2="50%" stroke="rgba(180,180,200,0.1)" strokeWidth="1" strokeDasharray="8 6" />

        {/* 十字准星标记 */}
        <g stroke="rgba(150,150,170,0.2)" strokeWidth="1">
          {/* 左上角 */}
          <line x1="8%" y1="12%" x2="12%" y2="12%" />
          <line x1="10%" y1="10%" x2="10%" y2="14%" />
          {/* 右上角 */}
          <line x1="88%" y1="15%" x2="92%" y2="15%" />
          <line x1="90%" y1="13%" x2="90%" y2="17%" />
          {/* 左下角 */}
          <line x1="12%" y1="85%" x2="16%" y2="85%" />
          <line x1="14%" y1="83%" x2="14%" y2="87%" />
          {/* 右下角 */}
          <line x1="84%" y1="80%" x2="88%" y2="80%" />
          <line x1="86%" y1="78%" x2="86%" y2="82%" />
          {/* 中心区域 */}
          <line x1="48%" y1="25%" x2="52%" y2="25%" />
          <line x1="50%" y1="23%" x2="50%" y2="27%" />
        </g>

        {/* 图标连接线 */}
        <g stroke="rgba(58, 157, 246, 0.1)" strokeWidth="1" strokeDasharray="4 8">
          <line x1="12%" y1="20%" x2="8%" y2="45%" />
          <line x1="88%" y1="30%" x2="90%" y2="72%" />
          <line x1="10%" y1="65%" x2="18%" y2="78%" />
          <line x1="83%" y1="77%" x2="92%" y2="50%" />
          <line x1="8%" y1="45%" x2="10%" y2="65%" />
          <line x1="90%" y1="72%" x2="83%" y2="77%" />
        </g>
      </svg>

      {/* 3. 漂浮图标 */}
      {floatingIcons.map((item) => (
        <div
          key={item.id}
          className={`absolute z-0 group cursor-pointer transition-all duration-300 ease-out hover:scale-110 hover:z-10 ${item.animation}`}
          style={{
            ...item.position,
            width: item.size,
            height: item.size,
            animationDelay: `${item.delay}s`,
          }}
        >
          {/* 玻璃卡片容器 */}
          <div
            className="w-full h-full rounded-3xl bg-white/70 backdrop-blur-md border border-white/60 shadow-lg shadow-blue-200/20 group-hover:shadow-xl group-hover:shadow-blue-300/30 group-hover:bg-white/80 transition-all duration-300 flex items-center justify-center p-4"
            style={{
              boxShadow: "0 8px 32px rgba(58, 157, 246, 0.05), inset 0 1px 0 rgba(255,255,255,0.8)"
            }}
          >
            <IconSvg type={item.icon} className="w-full h-full" />
          </div>
        </div>
      ))}

      {/* 4. 底部渐变过渡 */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent pointer-events-none" />

    </>
  );
}

export default function App() {
  const { t } = useLanguage();

  const REGISTRATION_EVENTS: RegistrationEvent[] = [
    {
      id: 'opclink-2026',
      title: t('event.opclink2026.title'),
      date: '2026.04.18',
      location: t('event.location') + ' · ' + (t('nav.home') === '首页' ? '上海' : 'Shanghai'),
      link: '#',
      image: 'https://r2.image-upload.app/ptImg/YAeUBWSK.png',
      description: t('event.opclink2026.desc'),
      status: 'active'
    },
    {
      id: 'acdc-2026-v5',
      title: t('event.acdc2026.title'),
      date: '2026.01.17',
      location: t('event.location') + ' · ' + (t('nav.home') === '首页' ? '北京' : 'Beijing'),
      link: 'https://www.huodongxing.com/event/6837198424900?qd=1139540375758',
      image: 'https://r2.image-upload.app/ptImg/dOrLRDdv.png',
      description: t('event.acdc2026.desc'),
      status: 'ended'
    }
  ];

  const ACDC_TIMELINE: ACDCEvent[] = [
    {
      id: 1,
      edition: t('event.acdc.v1.edition'),
      date: '2023.10',
      topic: t('event.acdc.v1.topic'),
      outcome: t('event.acdc.v1.outcome'),
      image: 'https://r2.image-upload.app/ptImg/MNCt1RI9.png',
    },
    {
      id: 2,
      edition: t('event.acdc.v2.edition'),
      date: '2024.01',
      topic: t('event.acdc.v2.topic'),
      outcome: t('event.acdc.v2.outcome'),
      image: 'https://r2.image-upload.app/ptImg/GLJQbizF.png',
      reviewLink: 'https://mp.weixin.qq.com/s/GE7Sz0fkceDhtm9Pmp5PHQ',
    },
    {
      id: 3,
      edition: t('event.acdc.v3.edition'),
      date: '2024.05',
      topic: t('event.acdc.v3.topic'),
      outcome: t('event.acdc.v3.outcome'),
      image: 'https://r2.image-upload.app/ptImg/iUrkkuaU.jpg',
      reviewLink: 'https://mp.weixin.qq.com/s/d4yJSV6S3MCIjUnSOPravA',
      speechLink: 'https://mp.weixin.qq.com/s/2zLnXLPS-i7NwcH2A5UyqQ',
    },
    {
      id: 4,
      edition: t('event.acdc.v4.edition'),
      date: '2025.01',
      topic: t('event.acdc.v4.topic'),
      outcome: t('event.acdc.v4.outcome'),
      image: 'https://r2.image-upload.app/ptImg/4wKsvs2C.png',
      reviewLink: 'https://mp.weixin.qq.com/s/HHHB2f1lhzxHuWCoeiSzxw',
    },
    {
      id: 5,
      edition: t('event.acdc.v5.edition'),
      date: '2026.01',
      topic: t('event.acdc.v5.topic'),
      outcome: t('event.acdc.v5.outcome'),
      image: 'https://r2.image-upload.app/ptImg/dOrLRDdv.png',
      reviewLink: 'https://mp.weixin.qq.com/s/EkEX_NNeRnIdArDekvVpxg',
    }
  ];

  const OTHER_EVENTS: OtherEvent[] = [
    {
      title: t('event.other.联大.title'),
      date: '2026.03',
      link: 'https://mp.weixin.qq.com/s/BeplwdaS831aKEXV6UEMxA',
      image: 'https://img.heliar.top/file/1779069994778_OPCLink.jpg',
      category: 'OPCLink',
      description: t('event.other.联大.desc')
    },
    {
      title: t('event.other.gdbc.title'),
      date: '2025.12',
      link: '',
      image: 'https://r2.image-upload.app/ptImg/6YhpPIG1.png',
      category: t('bento.offline.title'),
      description: ''
    }
  ];

  return (
    <div className="min-h-screen text-slate-600">
      {/* Artistic Overlays */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-10] bg-slate-50">
        <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-brand/[0.02] blur-[120px] rounded-full animate-float-slow"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%] bg-brand/[0.02] blur-[120px] rounded-full animate-float-reverse"></div>
      </div>

      <Navbar />

      <main className="relative pt-24">
        {/* --- Registration Section --- */}
        <section id="registration" className="py-24 px-6 relative overflow-hidden">
          <SectionBackground />
          <div className="max-w-[1600px] mx-auto relative z-10">
            {/* Section Header */}
            <div className="text-center mb-24">
              <span className="text-sm font-bold text-blue-600 tracking-[0.4em] uppercase mb-4 block">
                FEATURED COMMUNITY EVENTS
              </span>
              <h2 className="text-4xl lg:text-6xl font-display font-black text-slate-900 tracking-tight">
                {t('nav.activity')}
              </h2>
            </div>

            {/* Carousel Implementation */}
            <EventsCarousel 
              events={[
                {
                  id: 'opclink-2026',
                  title: t('event.opclink2026.title'),
                  subtitle: t('event.opclink2026.subtitle'),
                  date: '2026.04.18',
                  location: (t('nav.home') === '首页' ? '中国 · 上海' : 'China · Shanghai'),
                  scale: '500+ ' + t('event.scale.unit'),
                  ticketNumber: 'AIGCLINK-2026-0418-001',
                  posterImage: 'https://r2.image-upload.app/ptImg/YAeUBWSK.png',
                  status: 'ongoing'
                },
                {
                  id: 'acdc-2026-v5',
                  title: t('event.acdc2026.title'),
                  subtitle: t('event.acdc2026.subtitle'),
                  date: '2026.01.17',
                  location: (t('nav.home') === '首页' ? '中国 · 北京' : 'China · Beijing'),
                  scale: '2000+ ' + t('event.scale.unit'),
                  ticketNumber: 'ACDC-TICKET-V5-2026',
                  posterImage: 'https://r2.image-upload.app/ptImg/dOrLRDdv.png',
                  status: 'ended',
                  link: 'https://mp.weixin.qq.com/s/EkEX_NNeRnIdArDekvVpxg'
                },
                {
                  id: 'acdc-2025-v4',
                  title: t('event.acdc2025.title'),
                  subtitle: t('event.acdc2025.subtitle'),
                  date: '2025.01',
                  location: (t('nav.home') === '首页' ? '中国 · 北京' : 'China · Beijing'),
                  scale: '1500+ ' + t('event.scale.unit'),
                  ticketNumber: 'ACDC-TICKET-V4-2025',
                  posterImage: 'https://r2.image-upload.app/ptImg/4wKsvs2C.png',
                  status: 'ended',
                  link: 'https://mp.weixin.qq.com/s/EkEX_NNeRnIdArDekvVpxg'
                }
              ]} 
            />
          </div>
        </section>

        {/* --- ACDC Timeline Section --- */}
        <ACDCTimeline events={ACDC_TIMELINE} />

        {/* --- Other Events --- */}
        <MoreEventsCarousel events={OTHER_EVENTS} />

      <MinimalCommunityBento />

      <HeroParallaxDemo />

      <CommunityCooperation />

        {/* --- Ecosystem --- */}
        <section id="partners" className="bg-slate-50 py-24 relative overflow-hidden">
          <div className="section-container !py-0 relative z-10">

            <SectionHeader title={t('partners.title')} />
            
            <div className="space-y-24">
              {/* 合作机构 - 滚动展示 */}
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-px w-8 bg-brand/20"></div>
                  <h3 className="text-[22px] md:text-[24px] font-display font-semibold text-slate-900 tracking-widest uppercase">{t('partners.org')}</h3>
                </div>
                <div className="relative glass py-12 md:py-16 overflow-hidden">
                  <LogoLoop 
                    logos={PARTNER_LOGOS.map(p => ({ src: p.logo, alt: p.name }))}
                    speed={80}
                    gap={120}
                    logoHeight={80}
                    fadeOut
                    fadeOutColor="transparent"
                    direction="right"
                    pauseOnHover
                    className="logoloop--individual-grayscale"
                  />
                </div>
              </div>

              {/* 合作媒体 - 滚动展示 */}
              <div className="overflow-hidden">
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-px w-8 bg-brand/20"></div>
                  <h3 className="text-[22px] md:text-[24px] font-display font-semibold text-slate-900 tracking-widest uppercase">{t('partners.media')}</h3>
                </div>
                <div className="relative glass py-12 md:py-16 overflow-hidden">
                  <LogoLoop 
                    logos={MEDIA_LOGOS.map(l => ({ src: l.logo, alt: l.name }))}
                    speed={80}
                    gap={120}
                    logoHeight={80}
                    fadeOut
                    fadeOutColor="transparent"
                    direction="left"
                    pauseOnHover
                    className="logoloop--individual-grayscale"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Contact --- */}
        <section id="contact" className="py-24 relative overflow-hidden bg-slate-50">
          <div className="section-container flex justify-center !py-0">

            {/* Subtle background waves/dots decor to match image feel */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
               <div className="absolute top-1/2 left-0 w-full h-[500px] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand/10 via-transparent to-transparent"></div>
            </div>

            <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-5xl bg-white rounded-[3.5rem] shadow-[0_15px_50px_-15px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden relative"
          >
            <div className="flex flex-col md:flex-row items-stretch min-h-[340px]">
              
              {/* Left Side: Brand Identity & Ripple */}
              <div className="flex-1 p-12 md:p-16 flex items-center justify-center md:justify-start gap-10">
                <div className="relative shrink-0">
                  {/* Concentric Ripples */}
                  <div className="absolute inset-[-40%] border border-brand/5 rounded-full" />
                  <div className="absolute inset-[-25%] border border-brand/10 rounded-full" />
                  <div className="absolute inset-[-10%] border border-brand/20 rounded-full" />
                  
                  {/* Inner Icon Circle */}
                  <div className="w-24 h-24 bg-white rounded-full shadow-2xl shadow-brand/15 flex items-center justify-center relative z-10">
                    <div className="w-16 h-16 bg-brand/5 rounded-full flex items-center justify-center border border-brand/10">
                      <MessageSquare className="text-brand" size={32} />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <h3 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight mb-2">{t('contact.title')}</h3>
                  <p className="text-[16px] font-mono font-bold text-slate-400 tracking-[0.2em] mb-4">LET'S WORK TOGETHER</p>
                  <div className="w-12 h-1 bg-brand rounded-full" />
                </div>
              </div>

              {/* Middle Divider Dot-Line */}
              <div className="hidden md:flex flex-col items-center justify-center py-20 pr-4">
                <div className="w-px h-full bg-slate-100 relative">
                   <div className="absolute top-1/2 -left-[2px] w-1.5 h-1.5 bg-brand rounded-full -translate-y-1/2 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                </div>
              </div>

              {/* Right Side: Contact List */}
              <div className="flex-[0.8] p-12 md:p-16 bg-slate-50/30 flex flex-col justify-center gap-6">
                {[
                  { icon: User, label: t('coop.contact'), value: t('coop.partner') },
                  { icon: Mail, label: t('contact.email'), value: "lvye@gpulink.cc", isLink: true },
                  { icon: Phone, label: t('contact.phone'), value: "133-8902-1782" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 group">
                    <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-brand group-hover:text-white transition-all duration-300">
                      <item.icon size={20} className="text-brand group-hover:text-white" />
                    </div>
                      <div className="flex flex-col">
                        {item.isLink ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-slate-700">{t('contact.email')}：</span>
                            <a 
                              href={`mailto:${item.value}`}
                              className="text-xl font-bold text-brand hover:text-brand-vibrant transition-colors"
                            >
                              {item.value}
                            </a>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-slate-700">{item.label}：</span>
                            <span className="text-xl font-bold text-slate-700">{item.value}</span>
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Right Decoration Dots */}
            <div className="absolute bottom-6 right-6 opacity-[0.08] pointer-events-none">
               <div className="grid grid-cols-5 gap-2">
                 {[...Array(15)].map((_, i) => (
                   <div key={i} className="w-2 h-2 bg-brand rounded-full" />
                 ))}
               </div>
            </div>
          </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
