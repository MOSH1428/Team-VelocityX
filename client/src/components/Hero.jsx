import { ArrowRight, Code2, Rocket, Database } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f1115] pt-16">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ef4444] rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-[#ef4444]"></span>
          <span className="text-sm font-medium text-gray-300">Welcome to the future of collaboration</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8">
          We are <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ef4444] to-blue-500">Velocity X</span>
        </h1>
        
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 mb-12">
          An elite collective of Full-Stack Developers, AI Enthusiasts, and Hardware Engineers pushing the boundaries of what's possible.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <a href="#projects" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white bg-[#ef4444] hover:bg-[#dc2626] rounded-lg transition-all shadow-[0_0_20px_rgba(170,59,255,0.4)] hover:shadow-[0_0_30px_rgba(170,59,255,0.6)]">
            Explore Our Work
            <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#team" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all backdrop-blur-sm">
            Meet the Team
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: <Code2 className="w-6 h-6 text-[#ef4444]" />, title: 'Full-Stack Web', desc: 'React, Node.js, Next.js' },
            { icon: <Rocket className="w-6 h-6 text-blue-400" />, title: 'AI & Automation', desc: 'Python, n8n, Data Science' },
            { icon: <Database className="w-6 h-6 text-emerald-400" />, title: 'System Architecture', desc: 'PostgreSQL, MongoDB, Cloud' }
          ].map((feature, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 text-left">{feature.title}</h3>
              <p className="text-gray-400 text-left">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
