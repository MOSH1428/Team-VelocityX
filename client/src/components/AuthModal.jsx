import { useState, useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import { LogIn, UserPlus, Mail, Lock, User, Hash, Briefcase, AlertCircle, X } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    idNumber: '',
    role: '',
    department: 'Tech'
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isLogin ? 'login' : 'register';
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          localStorage.setItem('velocity_token', data.token);
          login(data.member);
          onClose();
        } else {
          setIsLogin(true);
          setError('Account created! Please login.');
        }
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch {
      setError('Connection to server failed');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-lg bg-[#1e2128] rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-[#ef4444]/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-[#ef4444]/20">
              {isLogin ? <LogIn className="text-[#ef4444] w-6 h-6" /> : <UserPlus className="text-[#ef4444] w-6 h-6" />}
            </div>
            <h2 className="text-2xl font-bold text-white">{isLogin ? 'Member Login' : 'Join the Team'}</h2>
            <p className="text-gray-400 text-sm">{isLogin ? 'Welcome back to Velocity X' : 'Create your professional profile'}</p>
          </div>

          {error && (
            <div className={`mb-6 p-3 rounded-lg flex items-center gap-3 text-sm ${error.includes('created') ? 'bg-emerald-400/10 border border-emerald-400/20 text-emerald-400' : 'bg-red-400/10 border border-red-400/20 text-red-400'}`}>
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-widest mb-1 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input name="name" type="text" required onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm focus:border-[#ef4444] outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-widest mb-1 ml-1">ID Number</label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input name="idNumber" type="text" required onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm focus:border-[#ef4444] outline-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-widest mb-1 ml-1">Role</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input name="role" type="text" required onChange={handleChange} placeholder="e.g. Developer" className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm focus:border-[#ef4444] outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-widest mb-1 ml-1">Department</label>
                    <select name="department" onChange={handleChange} className="w-full bg-[#1e2128] border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm focus:border-[#ef4444] outline-none">
                      <option value="Tech">Tech</option>
                      <option value="Media">Media</option>
                      <option value="PR">PR</option>
                      <option value="HR">HR</option>
                      <option value="Speaking">Speaking</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-widest mb-1 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input name="email" type="email" required onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm focus:border-[#ef4444] outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-widest mb-1 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input name="password" type="password" required onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm focus:border-[#ef4444] outline-none" />
              </div>
            </div>

            <button type="submit" className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] mt-4">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-400 text-xs hover:text-[#ef4444] transition-colors"
            >
              {isLogin ? "Don't have an account? Join the team" : "Already a member? Sign in instead"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
