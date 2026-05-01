import { Mail, MapPin, Phone, Instagram, Send, Sparkles } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-[#0a0b0e] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ef4444]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ef4444]/10 text-[#ef4444] text-sm font-medium border border-[#ef4444]/20 mb-4">
            <Sparkles className="w-4 h-4" /> Let's Connect
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get in Touch with <span className="text-[#ef4444]">Velocity X</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Have a project in mind or want to join our team? Drop us a message, and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-[#1e2128] p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ef4444]/10 rounded-full blur-[40px] group-hover:bg-[#ef4444]/20 transition-all"></div>
              
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#ef4444] shrink-0 border border-white/10">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Email Us</p>
                    <a href="mailto:hello@velocityx.com" className="text-white font-medium hover:text-[#ef4444] transition-colors text-lg">hello@velocityx.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#ef4444] shrink-0 border border-white/10">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Our Location</p>
                    <p className="text-white font-medium text-lg">Tech Hub, Cairo, Egypt</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#ef4444] shrink-0 border border-white/10">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Call Us</p>
                    <p className="text-white font-medium text-lg">+20 123 456 7890</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5">
                <p className="text-white font-medium mb-4">Follow our journey</p>
                <div className="flex gap-3">
                  <a href="https://www.instagram.com/velocityx67?igsh=d25xZ2o1Ymg0cWJi" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-white/5 hover:bg-[#ef4444] flex items-center justify-center text-white border border-white/10 transition-all hover:scale-110 shadow-lg">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://www.tiktok.com/@velocity.x1?_r=1&_t=ZS-95yomKI6cnR" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-white/5 hover:bg-[#ef4444] flex items-center justify-center text-white border border-white/10 transition-all hover:scale-110 shadow-lg">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.04.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.8-5.46-.4-2.51.69-5.21 2.7-6.77 1.05-.8 2.34-1.31 3.65-1.43v4.06c-.82.16-1.61.56-2.19 1.17-.98.99-1.17 2.68-.43 3.88.58.91 1.66 1.49 2.75 1.51 1.17.02 2.34-.44 3.16-1.25.75-.72 1.15-1.74 1.15-2.8l-.04-16.82Z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#1e2128] p-8 rounded-3xl border border-white/5">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-400">Your Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ef4444] transition-colors" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-400">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ef4444] transition-colors" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-400">Subject</label>
                <input type="text" placeholder="How can we help?" className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ef4444] transition-colors" />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-400">Message</label>
                <textarea rows="4" placeholder="Tell us about your project..." className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ef4444] transition-colors resize-none"></textarea>
              </div>

              <button type="submit" className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] flex items-center justify-center gap-2 mt-4">
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
