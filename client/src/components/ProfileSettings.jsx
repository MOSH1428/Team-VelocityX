import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Briefcase, Building, Check, X, Camera } from 'lucide-react';

export default function ProfileSettings({ isOpen, onClose }) {
  const { user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    department: user?.department || 'Tech',
  });
  const [success, setSuccess] = useState(false);

  if (!isOpen || !user) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Simulate API update
    const updatedUser = { ...user, ...formData };
    login(updatedUser); // Update context and localStorage
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg bg-[#1e2128] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0f1115]/50">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-[#ef4444]" /> Profile Settings
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center mb-8">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ef4444]/20 to-blue-500/20 flex items-center justify-center text-3xl font-bold text-[#ef4444] border-2 border-[#ef4444]/30 mb-2">
                {user.name.charAt(0)}
              </div>
              <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-gray-400 text-xs">Click to change avatar</p>
          </div>

          {success && (
            <div className="mb-6 p-3 bg-emerald-400/10 border border-emerald-400/20 rounded-xl flex items-center gap-3 text-emerald-400 text-sm">
              <Check className="w-4 h-4 shrink-0" />
              Profile updated successfully!
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-widest mb-1 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm outline-none focus:border-[#ef4444]" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-widest mb-1 ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input name="email" value={formData.email} onChange={handleChange} readOnly className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-gray-400 text-sm outline-none cursor-not-allowed opacity-70" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-widest mb-1 ml-1">Role</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input name="role" value={formData.role} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm outline-none focus:border-[#ef4444]" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-widest mb-1 ml-1">Department</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <select name="department" value={formData.department} onChange={handleChange} className="w-full bg-[#1e2128] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm outline-none focus:border-[#ef4444] appearance-none">
                    <option>Tech</option>
                    <option>Media</option>
                    <option>PR</option>
                    <option>HR</option>
                    <option>Speaking</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-white/5 flex justify-end gap-3">
              <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                Cancel
              </button>
              <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-[#ef4444] hover:bg-[#dc2626] transition-all shadow-[0_0_15px_rgba(170,59,255,0.3)]">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
