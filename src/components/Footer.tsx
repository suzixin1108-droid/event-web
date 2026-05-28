import React from 'react';
import { useLanguage } from '../lib/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gulf-blue text-zumthor/70 py-16 border-t border-ultramarine">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img src="https://free.picui.cn/free/2026/05/13/6a0416352579e.png" alt="AIGCLink" className="h-10 object-contain" referrerPolicy="no-referrer" />
            </div>
            <p className="text-2xl font-display font-bold text-white mb-6 leading-tight max-w-sm">
              {t('footer.slogan').split(' ').map((word, i) => (
                <React.Fragment key={i}>
                  {word} {(i === 2 || (i === 1 && word.length > 3)) && <br />}
                </React.Fragment>
              ))}
            </p>
            
            <div className="flex items-center gap-4 mt-8">
              <div className="w-24 h-24 bg-ultramarine rounded-xl flex items-center justify-center border border-ultramarine/50">
                <span className="text-xs text-zumthor/50 text-center px-2">{t('footer.qrcode')}</span>
              </div>
              <p className="font-bold text-white">{t('nav.join')}</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider">{t('footer.nav')}</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-electric-purple transition-colors">{t('nav.home')}</a></li>
              <li><a href="#bento" className="hover:text-electric-purple transition-colors">{t('nav.activity')}</a></li>
              <li><a href="#" className="hover:text-electric-purple transition-colors">{t('nav.opclink')}</a></li>
              <li><a href="#" className="hover:text-electric-purple transition-colors">{t('nav.ranking')}</a></li>
              <li><a href="#" className="hover:text-electric-purple transition-colors">{t('nav.solution')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider">{t('footer.contact')}</h4>
            <ul className="space-y-4 mb-4">
              <li>
                <div className="font-bold text-gray-300">占冰强</div>
                <div className="text-sm">{t('footer.founder')}</div>
              </li>
              <li>
                <div className="font-bold text-gray-300">{t('coop.partner')}</div>
                <div className="text-sm">{t('coop.eco')}</div>
              </li>
              <li>
                <div className="font-bold text-gray-300">王晨阳</div>
                <div className="text-sm">{t('footer.content')}</div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider">{t('footer.follow')}</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.official')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.xhs')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">X / Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.bilibili')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.douyin')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.zhihu')}</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-ultramarine flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex gap-6 flex-wrap">
            <span>{t('footer.links')}：</span>
            <a href="#" className="hover:text-white transition-colors">零克云</a>
            <a href="#" className="hover:text-white transition-colors">WaytoAGI</a>
            <a href="#" className="hover:text-white transition-colors">PEC</a>
            <a href="#" className="hover:text-white transition-colors">互联网3.0研究院</a>
          </div>
          <div className="flex gap-6 items-center flex-wrap">
            <span>© 2026 AIGCLink</span>
            <span>京 ICP 备 xxxxxx 号</span>
            <div className="flex gap-4">
               <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
               <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
