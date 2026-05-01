import { Terminal, Heart, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0b0e] border-t border-white/5 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="text-[#ef4444] w-6 h-6" />
              <span className="text-white font-bold text-lg">Velocity X</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              An elite collective of developers, designers, and innovators building the future together.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Team', 'Projects', 'Resources', 'Contact'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-gray-500 hover:text-[#ef4444] text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Departments</h4>
            <div className="flex flex-wrap gap-2 mb-8">
              {['Tech', 'Media', 'PR', 'HR', 'Speaking', 'Logistics'].map(dept => (
                <span key={dept} className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">
                  {dept}
                </span>
              ))}
            </div>

            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Connect With Us</h4>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/velocityx67?igsh=d25xZ2o1Ymg0cWJi" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#ef4444] hover:bg-[#ef4444]/10 transition-all group">
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.tiktok.com/@velocity.x1?_r=1&_t=ZS-95yomKI6cnR" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#ef4444] hover:bg-[#ef4444]/10 transition-all group relative">
                {/* Custom TikTok SVG */}
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.04.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.8-5.46-.4-2.51.69-5.21 2.7-6.77 1.05-.8 2.34-1.31 3.65-1.43v4.06c-.82.16-1.61.56-2.19 1.17-.98.99-1.17 2.68-.43 3.88.58.91 1.66 1.49 2.75 1.51 1.17.02 2.34-.44 3.16-1.25.75-.72 1.15-1.74 1.15-2.8l-.04-16.82Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © 2026 Velocity X. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-[#ef4444]" /> by Mohamed
          </p>
        </div>
      </div>
    </footer>
  );
}
