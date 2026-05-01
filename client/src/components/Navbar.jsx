import { useContext, useState } from "react";
import { Menu, X, Terminal, Users, Layers, LogIn, LogOut, User, MessageCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <nav className="fixed w-full z-50 bg-[#0f1115]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer">
              <Terminal className="text-[#ef4444] w-8 h-8" />
              <span className="text-white font-bold text-xl tracking-tight">Velocity X</span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-6">
                <a href="#team" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2">
                  <Users className="w-4 h-4" /> Team
                </a>
                <a href="#projects" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2">
                  <Layers className="w-4 h-4" /> Projects
                </a>
                <a href="#contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Contact
                </a>
                
                {user ? (
                  <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#ef4444]/20 flex items-center justify-center border border-[#ef4444]/30">
                        <User className="w-4 h-4 text-[#ef4444]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white text-xs font-bold leading-none">{user.name}</span>
                        <span className="text-gray-500 text-[10px] uppercase tracking-tighter">{user.role}</span>
                      </div>
                    </div>
                    <button 
                      onClick={logout}
                      className="text-gray-400 hover:text-red-400 transition-colors p-2"
                      title="Logout"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsAuthOpen(true)}
                    className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(170,59,255,0.4)]"
                  >
                    <LogIn className="w-4 h-4" /> Member Area
                  </button>
                )}
              </div>
            </div>
            
            <div className="-mr-2 flex md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-400 hover:text-white focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-[#1e2128] border-b border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#team" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>
              <a href="#projects" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>
              {user ? (
                <button 
                  onClick={logout}
                  className="text-red-400 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout ({user.name})
                </button>
              ) : (
                <button 
                  onClick={() => { setIsAuthOpen(true); setIsOpen(false); }}
                  className="text-[#ef4444] block px-3 py-2 rounded-md text-base font-medium"
                >
                  Member Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

export default Navbar;
