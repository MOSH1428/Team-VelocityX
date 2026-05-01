import { useState, useEffect } from 'react';
import { UserCircle, Phone, Mail, Building, Plus, Search, Trash2, X, Check, GraduationCap } from 'lucide-react';

const statusColors = {
  Confirmed: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Invited: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  Declined: "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function PRPortal() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', title: '', department: '', email: '', phone: '', status: 'Pending' });

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pr`);
      const data = await res.json();
      setContacts(data);
    } catch (e) {
      console.error('Error fetching contacts:', e);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.department.toLowerCase().includes(search.toLowerCase())
  );

  const addContact = async () => {
    if (!newContact.name.trim()) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContact),
      });
      const data = await res.json();
      setContacts([data, ...contacts]);
      setNewContact({ name: '', title: '', department: '', email: '', phone: '', status: 'Pending' });
      setShowAdd(false);
    } catch (e) {
      console.error('Error adding contact:', e);
    }
  };

  const deleteContact = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/pr/${id}`, { method: 'DELETE' });
      setContacts(contacts.filter(c => c.id !== id));
    } catch (e) {
      console.error('Error deleting contact:', e);
    }
  };

  const cycleStatus = async (id) => {
    const order = ['Invited', 'Pending', 'Confirmed', 'Declined'];
    const contact = contacts.find(c => c.id === id);
    if (!contact) return;
    
    const idx = order.indexOf(contact.status);
    const newStatus = order[(idx + 1) % order.length];
    
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/pr/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      setContacts(contacts.map(c => c.id === id ? { ...c, status: newStatus } : c));
    } catch (e) {
      console.error('Error cycling status:', e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <GraduationCap className="w-7 h-7 text-[#ef4444]" /> PR Portal
          </h2>
          <p className="text-gray-400 text-sm">{contacts.length} contacts managed</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search contacts..."
              className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#ef4444] transition-all w-56"
            />
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(170,59,255,0.3)]"
          >
            <Plus className="w-4 h-4" /> Add Contact
          </button>
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-[#1e2128] rounded-2xl border border-white/10 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold text-lg">New Contact</h3>
              <button onClick={() => setShowAdd(false)} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              {[
                { key: 'name', placeholder: 'Full Name', icon: <UserCircle className="w-4 h-4" /> },
                { key: 'title', placeholder: 'Title (e.g. Professor)', icon: <GraduationCap className="w-4 h-4" /> },
                { key: 'department', placeholder: 'Department', icon: <Building className="w-4 h-4" /> },
                { key: 'email', placeholder: 'Email', icon: <Mail className="w-4 h-4" /> },
                { key: 'phone', placeholder: 'Phone', icon: <Phone className="w-4 h-4" /> },
              ].map(field => (
                <div key={field.key} className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{field.icon}</span>
                  <input
                    value={newContact[field.key]}
                    onChange={e => setNewContact({ ...newContact, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm outline-none focus:border-[#ef4444] transition-all"
                  />
                </div>
              ))}
              <select
                value={newContact.status}
                onChange={e => setNewContact({ ...newContact, status: e.target.value })}
                className="w-full bg-[#0f1115] border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm outline-none"
              >
                <option>Invited</option>
                <option>Pending</option>
                <option>Confirmed</option>
              </select>
            </div>
            <button onClick={addContact} className="w-full mt-4 bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
              <Check className="w-4 h-4" /> Save Contact
            </button>
          </div>
        </div>
      )}

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(contact => (
          <div key={contact.id} className="bg-[#1e2128] rounded-2xl border border-white/5 p-5 hover:border-white/20 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ef4444]/20 to-blue-500/20 flex items-center justify-center text-lg font-bold text-[#ef4444] border border-[#ef4444]/20">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-white font-bold">{contact.name}</h3>
                  <p className="text-gray-400 text-xs">{contact.title}</p>
                </div>
              </div>
              <button
                onClick={() => cycleStatus(contact.id)}
                className={`text-xs px-2.5 py-1 rounded-full border cursor-pointer transition-all hover:scale-105 ${statusColors[contact.status]}`}
              >
                {contact.status}
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <Building className="w-3.5 h-3.5 text-gray-500" /> {contact.department}
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <Mail className="w-3.5 h-3.5 text-gray-500" /> {contact.email}
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <Phone className="w-3.5 h-3.5 text-gray-500" /> {contact.phone}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => deleteContact(contact.id)}
                className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-all p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
