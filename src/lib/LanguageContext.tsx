import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  zh: {
    // Navbar
    'nav.home': '首页',
    'nav.activity': '精选活动',
    'nav.opclink': 'OPCLink',
    'nav.ranking': 'AI排行榜',
    'nav.solution': 'AI方案库',
    'nav.developer': 'AIGC开发者大会',
    'nav.contest': '朝阳OPC大赛',
    'nav.join': '加入社区',
    'nav.about': '关于我们',
    'nav.cooperation': '社区共建',
    
    // Hero
    'hero.title': '连接 AI 开发者与创意',
    'hero.subtitle': '构建最活跃的 AI 技术社区，让灵感在交流中碰撞，让技术在实践中成长。',
    'hero.join': '加入社区',
    
    // Bento
    'bento.title': '社区活动类型',
    'bento.offline.title': '线下技术沙龙 & 城市见面会',
    'bento.offline.desc': '定期举办线下。围绕大模型应用、提示工程、行业落地等主题。',
    'bento.offline.item1': '邀请一线开发者、开源项目作者分享',
    'bento.offline.item2': '技术到商业化全链路实战经验',
    'bento.offline.item3': '0 到 1 搭建企业级 RAG / Agent',
    'bento.offline.item4': '从 Demo 到上线的生产环境踩坑记',
    'bento.live.title': '线上直播分享',
    'bento.live.desc': '通过 B 站、YouTube、X 等平台直播技术主题，产品解析、出海经验分享。',
    'bento.closed.title': '闭门研讨与对接',
    'bento.closed.desc': '不定期邀请小规模交流，面向组建或准备落地的团队，聚焦具体挑战。',
    'bento.joint.title': '联合赛事与共创',
    'bento.joint.desc': '参与 AI 视听大赛、Prompt Engineer Conf、提示工程大会等行业重磅共创项目。',
    
    // Cooperation
    'coop.title': '社区共建 · 期待同行',
    'coop.subtitle': '我们致力于打造一个开放、包容、进步的 AI 社区。',
    'coop.button': '立即合作',

    // PhotoWall
    'photo.title': '回顾过往 精彩瞬间',
    'photo.subtitle': '记录社区每一场活动的欢笑与汗水，汇聚开发者们的智慧与激情。从北京到上海，从线上到线下，我们共同见证了 AI 时代的飞速发展。',
    'partners.title': '生态共建者',

    // Events
    'event.ongoing': '报名中',
    'event.ended': '已结束',
    'event.ticket': '参会门票',
    'event.date': '活动日期',
    'event.location': '活动地点',
    'event.scale': '预计规模',
    'event.getTicket': '获取参会门票',
    'event.scale.unit': '人',
    'event.registerNow': '立即报名',
    'event.viewReview': '查看回顾',
    'event.endedBadge': '已结束',
    'event.ongoingBadge': '报名中',

    // Cooperation
    'coop.card1.title': '活动场地共建',
    'coop.card1.subtitle': '让活动空间连接更多开发者',
    'coop.card1.item1': 'AI 核心圈层开发者到场',
    'coop.card1.item2': '多渠道宣发:公众号、视频号、B 站、小红书',
    'coop.card1.item3': '专题文章长期收录场地信息',
    
    'coop.card2.title': '成为社区讲师',
    'coop.card2.subtitle': '把你的技术分享给同频的人',
    'coop.card2.item1': '触达国内核心 AI 开发者社区',
    'coop.card2.item2': '演讲内容多平台二次传播',
    'coop.card2.item3': '与一线 AI 项目作者深度连接',
    'coop.card2.item4': '媒体平台同步直播覆盖',

    'coop.card3.title': '项目现场展示',
    'coop.card3.subtitle': '让你的开源项目被目标用户看见',
    'coop.card3.item1': '活动现场 Demo 展示',
    'coop.card3.item2': '优质项目获得社区官方推荐',
    'coop.card3.item3': '项目纳入 AIGCLink 官网项目库',
    'coop.card3.item4': '对接潜在用户、合作方、投资人',

    'coop.card4.title': '社区资源共享',
    'coop.card4.subtitle': '互相赋能，共建 AI 开发者生态',
    'coop.card4.item1': '双方活动互相宣发，人群互通',
    'coop.card4.item2': '联合主题沙龙、黑客松、大会',
    'coop.card4.item3': '跨社区联动',

    'coop.contact': '联系人',
    'coop.partner': '吕叶',
    'coop.eco': '生态合作',

    // Footer
    'footer.slogan': '链接 AI 开发者 推动产业创新',
    'footer.qrcode': '二维码占位',
    'footer.nav': '导航',
    'footer.contact': '联系',
    'footer.follow': '关注我们',
    'footer.founder': '创始人',
    'footer.content': '内容合作',
    'footer.links': '友情链接',
    'footer.privacy': '隐私政策',
    'footer.terms': '服务条款',
    'footer.official': '公众号',
    'footer.xhs': '小红书',
    'footer.bilibili': 'B站',
    'footer.douyin': '抖音',
    'footer.zhihu': '知乎',
    'partners.org': '合作机构',
    'partners.media': '合作媒体',
    'contact.title': '活动合作',
    'contact.email': '邮箱',
    'contact.phone': '电话',
    'acdc.journey.title': '大会历程',
    'acdc.journey.desc': '从 2023 年首届开始，ACDC 大会持续引领中国 AIGC 开发者生态的发展与创新，见证行业里程碑时刻。',
    'acdc.future': '2026+ 未来已来',
    'acdc.outcome': '核心成果',
    'acdc.review': '回顾详情',
    'acdc.moments': '精彩瞬间',
    'more.title': '更多精彩活动',
    'more.detail': '详情回顾',

    // PhotoWall Titles
    'photo.beijing': '北京站技术沙龙',
    'photo.moments': '开发者大会精彩瞬间',
    'photo.keynote': '嘉宾主题演讲',
    'photo.roundtable': '开发者圆桌论坛',
    'photo.gathering': 'AIGCLink 社区聚会',
    'photo.cmo': 'CMO 数字化转型分享',
    'photo.expo': 'AIGC 应用实践展',
    'photo.interaction': '开发者互动环节',
    'photo.gala': 'AIGCLink 年度盛典',
    'photo.awards': '合作伙伴颁奖礼',
    'photo.mvp': 'MVP 开发者颁奖',
    'photo.infra': 'AI 基础设施探讨',
    'photo.shanghai': '上海站技术分享',
    'photo.workshop': '大模型落地研讨会',
    'photo.lunch': '极客午餐交流',
    'photo.dev_workshop': '开发者工作坊',
    'photo.future': '未来科技展区',
    'photo.acdc_review': 'ACDC 开发者大会回顾',
    'photo.ecosystem': '社区生态共创',

    // Detailed Event Data
    'event.opclink2026.title': 'OPCLink 技术沙龙',
    'event.opclink2026.subtitle': '连接开发者，共筑大模型生态。深度探讨国产大模型发展动态。',
    'event.opclink2026.desc': '连接开发者，共筑大模型生态',
    
    'event.acdc2026.title': 'ACDC 第五届开发者大会',
    'event.acdc2026.subtitle': '2025年AI Infra及垂类AI解决方案的大爆发。生态 · 扶持 · 国产 · 风向。',
    'event.acdc2026.desc': '生态 · 扶持 · 国产 · 风向',

    'event.acdc2025.title': 'ACDC 第四届开发者大会',
    'event.acdc2025.subtitle': 'AI产业落地商业化实践及AI出海全球化。发布AI Agent商业落地应用案例。',

    'event.acdc.v1.edition': '第一届',
    'event.acdc.v1.topic': '大模型(AIGC)如何与具体行业场景结合落地',
    'event.acdc.v1.outcome': '推动AI Agent落地提供技术前沿落地分享和交流。',

    'event.acdc.v2.edition': '第二届',
    'event.acdc.v2.topic': '2023年大模型发展总结及2024年趋势预测',
    'event.acdc.v2.outcome': '发布2024年大模型发展十大预测',

    'event.acdc.v3.edition': '第三届',
    'event.acdc.v3.topic': '多模态与具身智能引领蓝领替代的新时代',
    'event.acdc.v3.outcome': '发布AI Agent商业落地应用案例',

    'event.acdc.v4.edition': '第四届',
    'event.acdc.v4.topic': 'AI产业落地商业化实践及AI出海全球化',
    'event.acdc.v4.outcome': '发布AI Agent商业落地应用案例',

    'event.acdc.v5.edition': '第五届',
    'event.acdc.v5.topic': '2025年AI Infra及垂类AI解决方案的大爆发',
    'event.acdc.v5.outcome': '发布AI Infra、AI行业解决方案、芯片应用场景适配联盟、AI应用&垂直小模型双百计划',

    'event.other.联大.title': 'OPCLink 百校行 · 北京联合大学站',
    'event.other.联大.desc': '首个高校OPC实训基地诞生，带学生近距离且专业了解技术热点，在安全前提下激发深度探索，以利未来更好应用。',
    'event.other.gdbc.title': '全球开发者先锋大会 | AIGC开发者专场',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.activity': 'Featured Events',
    'nav.opclink': 'OPCLink',
    'nav.ranking': 'AI Ranking',
    'nav.solution': 'AI Solution',
    'nav.developer': 'AIGC Dev Conf',
    'nav.contest': 'OPC Contest',
    'nav.join': 'Join Us',
    'nav.about': 'About Us',
    'nav.cooperation': 'Cooperation',
    
    // Hero
    'hero.title': 'Connecting AI Developers',
    'hero.subtitle': 'Building the most active AI technical community where ideas collide and technology grows in practice.',
    'hero.join': 'Join Us',
    
    // Bento
    'bento.title': 'Community Activities',
    'bento.offline.title': 'Offline Salons & City Meetups',
    'bento.offline.desc': 'Regular offline events focusing on LLM applications, prompt engineering, and industry implementation.',
    'bento.offline.item1': 'Sharing by frontline developers and open source authors',
    'bento.offline.item2': 'Full-stack experience from tech to commercialization',
    'bento.offline.item3': '0 to 1 enterprise-level RAG / Agent building',
    'bento.offline.item4': 'Practical tips for moving from Demo to Production',
    'bento.live.title': 'Online Live Streaming',
    'bento.live.desc': 'Live technical sessions, product breakdowns, and global expansion experience sharing.',
    'bento.closed.title': 'Closed-door Workshops',
    'bento.closed.desc': 'Small-scale, invitation-only discussions for teams starting or scaling projects.',
    'bento.joint.title': 'Joint Events & Co-creation',
    'bento.joint.desc': 'Participate in AI Visual-Audio Contests, Prompt Engineer Conf, and other heavy-weight projects.',
    
    // Cooperation
    'coop.title': 'Build Together · Join Us',
    'coop.subtitle': 'We are committed to building an open, inclusive, and progressive AI community.',
    'coop.button': 'Partner with Us',

    // PhotoWall
    'photo.title': 'Memorable Moments',
    'photo.subtitle': 'Recording the laughter and sweat of every community event, gathering the wisdom and passion of developers. From Beijing to Shanghai, online to offline, we witness the rapid development of the AI era together.',
    'partners.title': 'Ecosystem Partners',

    // Events
    'event.ongoing': 'Ongoing',
    'event.ended': 'Ended',
    'event.ticket': 'Entry Ticket',
    'event.date': 'Date',
    'event.location': 'Location',
    'event.scale': 'Estimated Size',
    'event.getTicket': 'Get Your Ticket',
    'event.scale.unit': 'People',
    'event.registerNow': 'Register Now',
    'event.viewReview': 'View Review',
    'event.endedBadge': 'Ended',
    'event.ongoingBadge': 'Ongoing',

    // Cooperation
    'coop.card1.title': 'Venue Cooperation',
    'coop.card1.subtitle': 'Connecting spaces with developers',
    'coop.card1.item1': 'AI core circle developers attendance',
    'coop.card1.item2': 'Multi-channel promotion: WeChat, Video, Bilibili, XHS',
    'coop.card1.item3': 'Venue info featured in long-term articles',
    
    'coop.card2.title': 'Be a Community Speaker',
    'coop.card2.subtitle': 'Share tech with like-minded peers',
    'coop.card2.item1': 'Reach domestic core AI developer communities',
    'coop.card2.item2': 'Multi-platform content distribution',
    'coop.card2.item3': 'Deep connection with lead AI project authors',
    'coop.card2.item4': 'Simultaneous live coverage across media',

    'coop.card3.title': 'Project Showcase',
    'coop.card3.subtitle': 'Get your open-source project noticed',
    'coop.card3.item1': 'Live Demo sessions at events',
    'coop.card3.item2': 'Official community recommendations',
    'coop.card3.item3': 'Featured in AIGCLink project library',
    'coop.card3.item4': 'Connect with users, partners, and investors',

    'coop.card4.title': 'Resource Sharing',
    'coop.card4.subtitle': 'Empowering the AI developer ecosystem',
    'coop.card4.item1': 'Cross-promotion and audience sharing',
    'coop.card4.item2': 'Joint salons, hackathons, and conferences',
    'coop.card4.item3': 'Cross-community linkage',

    'coop.contact': 'Contact',
    'coop.partner': 'Lü Ye',
    'coop.eco': 'Ecosystem',

    // Footer
    'footer.slogan': 'Connecting AI Developers, Driving Industry Innovation',
    'footer.qrcode': 'QR Code Placeholder',
    'footer.nav': 'Navigation',
    'footer.contact': 'Contact',
    'footer.follow': 'Follow Us',
    'footer.founder': 'Founder',
    'footer.content': 'Content',
    'footer.links': 'Links',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.official': 'WeChat',
    'footer.xhs': 'XHS',
    'footer.bilibili': 'Bilibili',
    'footer.douyin': 'Douyin',
    'footer.zhihu': 'Zhihu',
    'partners.org': 'Partners',
    'partners.media': 'Media',
    'contact.title': 'Event Cooperation',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'acdc.journey.title': 'Conference Journey',
    'acdc.journey.desc': 'Since its inception in 2023, ACDC conference has continued to lead the development and innovation of China\'s AIGC developer ecosystem.',
    'acdc.future': '2026+ The Future is Here',
    'acdc.outcome': 'Core Outcomes',
    'acdc.review': 'Review Details',
    'acdc.moments': 'Memorable Moments',
    'more.title': 'More Events',
    'more.detail': 'View Details',

    // PhotoWall Titles
    'photo.beijing': 'Beijing Tech Salon',
    'photo.moments': 'Conference Moments',
    'photo.keynote': 'Keynote Speech',
    'photo.roundtable': 'Developer Roundtable',
    'photo.gathering': 'AIGCLink Gathering',
    'photo.cmo': 'CMO Digital Transformation',
    'photo.expo': 'AIGC Practice Exhibition',
    'photo.interaction': 'Developer Interaction',
    'photo.gala': 'AIGCLink Annual Gala',
    'photo.awards': 'Partner Awards',
    'photo.mvp': 'MVP Developer Awards',
    'photo.infra': 'AI Infra Discussion',
    'photo.shanghai': 'Shanghai Tech Sharing',
    'photo.workshop': 'LLM Workshop',
    'photo.lunch': 'Geek Lunch Networking',
    'photo.dev_workshop': 'Dev Workshop',
    'photo.future': 'Future Tech Zone',
    'photo.acdc_review': 'ACDC Conf Review',
    'photo.ecosystem': 'Community Co-creation',

    // Detailed Event Data
    'event.opclink2026.title': 'OPCLink Tech Salon',
    'event.opclink2026.subtitle': 'Connecting developers, building LLM ecosystem. Exploring domestic AI trends.',
    'event.opclink2026.desc': 'Connect developers, build LLM ecosystem',
    
    'event.acdc2026.title': 'ACDC 5th Dev Conf',
    'event.acdc2026.subtitle': 'AI Infra and vertical AI explosion in 2025. Ecosystem · Support · Domestic · Trend.',
    'event.acdc2026.desc': 'Ecosystem · Support · Domestic · Trend',

    'event.acdc2025.title': 'ACDC 4th Dev Conf',
    'event.acdc2025.subtitle': 'AI commercialization practice and global expansion. AI Agent case study release.',

    'event.acdc.v1.edition': '1st Edition',
    'event.acdc.v1.topic': 'How LLM (AIGC) integrates with specific industry scenarios',
    'event.acdc.v1.outcome': 'Promoted AI Agent implementation with technical sharing.',

    'event.acdc.v2.edition': '2nd Edition',
    'event.acdc.v2.topic': '2023 LLM Development Summary and 2024 Trend Prediction',
    'event.acdc.v2.outcome': 'Released top 10 trends for 2024 LLM development',

    'event.acdc.v3.edition': '3rd Edition',
    'event.acdc.v3.topic': 'Multimodal and Embodied AI Leading a New Era of Blue-Collar Replacement',
    'event.acdc.v3.outcome': 'Released AI Agent commercial implementation cases',

    'event.acdc.v4.edition': '4th Edition',
    'event.acdc.v4.topic': 'AI Industry Commercialization and Global Expansion',
    'event.acdc.v4.outcome': 'Released AI Agent commercial implementation cases',

    'event.acdc.v5.edition': '5th Edition',
    'event.acdc.v5.topic': 'Explosion of AI Infra and Vertical AI Solutions in 2025',
    'event.acdc.v5.outcome': 'Released AI Infra, Industry Solutions, and Alliance plans',

    'event.other.联大.title': 'OPCLink Campus · BUU Station',
    'event.other.联大.desc': 'First college OPC实训基地 born. Bringing students professional understanding of tech hotspots.',
    'event.other.gdbc.title': 'Global Developer Pioneers Conference | AIGC Session',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['zh']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
