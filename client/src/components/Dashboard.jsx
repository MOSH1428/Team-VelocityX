import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  LayoutDashboard, CheckSquare, Clock, Star, Award,
  Plus, Trash2, ChevronRight, Settings,
  Users, BarChart3, Bell, Search, X, Check,
  ImageIcon, Handshake, ShieldAlert
} from 'lucide-react';
import MediaGallery from './MediaGallery';
import PRPortal from './PRPortal';
import ProfileSettings from './ProfileSettings';

const COLUMNS = ["To-Do", "In Progress", "Done"];

const priorityColors = {
  High: "text-red-400 bg-red-400/10 border-red-400/20",
  Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Low: "text-green-400 bg-green-400/10 border-green-400/20",
};

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [addingToCol, setAddingToCol] = useState(null);
  const [notifications] = useState([
    { id: 1, msg: "Khaled completed PR Outreach task", time: "5m ago" },
    { id: 2, msg: "New member Nour joined Social Media dept", time: "1h ago" },
    { id: 3, msg: "Automation workflow triggered successfully", time: "3h ago" },
  ]);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (e) {
      console.error('Error fetching tasks:', e);
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/team`);
      const data = await res.json();
      setMembers(data);
    } catch (e) {
      console.error('Error fetching members:', e);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchMembers();
  }, []);

  if (!user) return null;

  const deleteMember = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/admin/members/${id}`, { method: 'DELETE' });
      setMembers(members.filter(m => m.id !== id));
    } catch (e) {
      console.error('Error deleting member:', e);
    }
  };

  const doneCount = tasks.filter(t => t.status === "Done").length;
  const inProgressCount = tasks.filter(t => t.status === "In Progress").length;
  const todoCount = tasks.filter(t => t.status === "To-Do").length;

  const addTask = async (col) => {
    if (!newTaskTitle.trim()) return;
    const task = {
      title: newTaskTitle,
      status: col,
      priority: newTaskPriority,
      assignee: user.name,
    };
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      setTasks([...tasks, data]);
      setNewTaskTitle('');
      setAddingToCol(null);
    } catch (e) {
      console.error('Error adding task:', e);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(t => t.id !== id));
    } catch (e) {
      console.error('Error deleting task:', e);
    }
  };

  const moveTask = async (id, newStatus) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
    } catch (e) {
      console.error('Error moving task:', e);
    }
  };

  const stats = [
    { label: "Completed", value: doneCount, icon: <CheckSquare className="w-5 h-5 text-emerald-400" />, color: "emerald" },
    { label: "In Progress", value: inProgressCount, icon: <Clock className="w-5 h-5 text-blue-400" />, color: "blue" },
    { label: "To-Do", value: todoCount, icon: <Star className="w-5 h-5 text-yellow-400" />, color: "yellow" },
    { label: "Total Tasks", value: tasks.length, icon: <Award className="w-5 h-5 text-purple-400" />, color: "purple" },
  ];

  const tabs = [
    { key: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { key: 'tasks', label: 'Task Board', icon: <CheckSquare className="w-4 h-4" /> },
    { key: 'team', label: 'My Team', icon: <Users className="w-4 h-4" /> },
    { key: 'media', label: 'Media', icon: <ImageIcon className="w-4 h-4" /> },
    { key: 'pr', label: 'PR Portal', icon: <Handshake className="w-4 h-4" /> },
  ];

  if (user.isAdmin) {
    tabs.push({ key: 'admin', label: 'Admin', icon: <ShieldAlert className="w-4 h-4" /> });
  }

  return (
    <div className="min-h-screen bg-[#0f1115] pt-16">
      {/* Dashboard Header */}
      <div className="border-b border-white/5 bg-[#0f1115]/80 backdrop-blur-md sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Tabs */}
            <div className="flex items-center gap-1">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.key
                      ? 'bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.icon}{tab.label}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setShowNotifs(!showNotifs)}
                  className="relative p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#ef4444] rounded-full"></span>
                </button>
                {showNotifs && (
                  <div className="absolute right-0 top-10 w-80 bg-[#1e2128] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                    <div className="p-4 border-b border-white/5">
                      <h4 className="text-white font-bold text-sm">Notifications</h4>
                    </div>
                    {notifications.map(n => (
                      <div key={n.id} className="p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                        <p className="text-gray-300 text-xs">{n.msg}</p>
                        <span className="text-gray-500 text-[10px]">{n.time}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={logout}
                className="text-xs text-gray-400 hover:text-red-400 border border-white/10 px-3 py-1.5 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="relative bg-gradient-to-br from-[#ef4444]/20 via-[#1e2128] to-blue-500/20 rounded-3xl border border-white/10 p-8 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#ef4444] rounded-full blur-[80px] opacity-20"></div>
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <p className="text-[#ef4444] text-sm font-medium mb-2">Welcome back 👋</p>
                  <h1 className="text-3xl font-bold text-white tracking-tight">{user.name}</h1>
                  <p className="text-gray-400 mt-1">{user.role} · Velocity X Team</p>
                </div>
                <button 
                  onClick={() => setShowProfileSettings(true)}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-xl text-sm transition-all flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" /> Edit Profile
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-[#1e2128] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                  <div className="mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-500 text-xs uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Tasks + Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-[#1e2128] rounded-2xl border border-white/5 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Recent Tasks</h3>
                  <button onClick={() => setActiveTab('tasks')} className="text-xs text-[#ef4444] flex items-center gap-1 hover:gap-2 transition-all">
                    View Board <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="space-y-3">
                  {tasks.slice(0, 4).map(task => (
                    <div key={task.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl group">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${task.status === 'Done' ? 'bg-emerald-400' : task.status === 'In Progress' ? 'bg-blue-400' : 'bg-gray-500'}`}></div>
                        <span className="text-white text-sm">{task.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded border ${priorityColors[task.priority]}`}>{task.priority}</span>
                        <span className="text-gray-500 text-xs">{task.assignee}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#1e2128] rounded-2xl border border-white/5 p-6">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#ef4444]" /> Progress
                </h3>
                <div className="space-y-5">
                  {[
                    { label: "Completed", value: doneCount, max: tasks.length, color: "bg-emerald-400" },
                    { label: "In Progress", value: inProgressCount, max: tasks.length, color: "bg-blue-400" },
                    { label: "To-Do", value: todoCount, max: tasks.length, color: "bg-yellow-400" },
                  ].map((bar, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs text-gray-400 mb-2">
                        <span>{bar.label}</span>
                        <span>{bar.value} / {bar.max}</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2">
                        <div
                          className={`${bar.color} h-full rounded-full transition-all duration-700`}
                          style={{ width: `${tasks.length ? (bar.value / tasks.length) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TASK BOARD TAB */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Task Board</h2>
              <span className="text-gray-400 text-sm">{tasks.length} tasks total</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {COLUMNS.map(col => (
                <div key={col} className="bg-white/5 rounded-2xl p-5 border border-white/10 min-h-[400px] flex flex-col">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${col === 'Done' ? 'bg-emerald-400' : col === 'In Progress' ? 'bg-blue-400' : 'bg-gray-400'}`}></div>
                      <h3 className="text-white font-bold text-sm">{col}</h3>
                      <span className="bg-white/10 text-gray-400 text-xs px-2 py-0.5 rounded-full">
                        {tasks.filter(t => t.status === col).length}
                      </span>
                    </div>
                    <button
                      onClick={() => setAddingToCol(col)}
                      className="w-6 h-6 rounded-md bg-white/10 hover:bg-[#ef4444]/20 flex items-center justify-center text-gray-400 hover:text-[#ef4444] transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add Task Form */}
                  {addingToCol === col && (
                    <div className="mb-4 p-3 bg-[#1e2128] rounded-xl border border-[#ef4444]/30 space-y-2">
                      <input
                        autoFocus
                        value={newTaskTitle}
                        onChange={e => setNewTaskTitle(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addTask(col)}
                        placeholder="Task title..."
                        className="w-full bg-white/5 rounded-lg px-3 py-2 text-white text-sm outline-none border border-white/10 focus:border-[#ef4444] transition-all"
                      />
                      <select
                        value={newTaskPriority}
                        onChange={e => setNewTaskPriority(e.target.value)}
                        className="w-full bg-[#0f1115] rounded-lg px-3 py-2 text-white text-xs outline-none border border-white/10"
                      >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                      <div className="flex gap-2">
                        <button onClick={() => addTask(col)} className="flex-1 bg-[#ef4444] hover:bg-[#dc2626] text-white text-xs py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1">
                          <Check className="w-3 h-3" /> Add
                        </button>
                        <button onClick={() => setAddingToCol(null)} className="px-3 bg-white/5 text-gray-400 text-xs py-1.5 rounded-lg hover:bg-white/10 transition-colors">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Tasks */}
                  <div className="space-y-3 flex-1">
                    {tasks.filter(t => t.status === col).map(task => (
                      <div key={task.id} className="bg-[#1e2128] p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all group">
                        <div className="flex items-start justify-between mb-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded border ${priorityColors[task.priority]}`}>{task.priority}</span>
                          <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-red-400">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-white text-sm font-medium mb-4">{task.title}</p>
                        <div className="flex items-center justify-between">
                          <div className="w-6 h-6 rounded-full bg-[#ef4444]/20 border border-[#ef4444]/30 flex items-center justify-center text-[10px] text-[#ef4444] font-bold">
                            {task.assignee.charAt(0)}
                          </div>
                          {/* Move buttons */}
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {COLUMNS.filter(c => c !== col).map(c => (
                              <button key={c} onClick={() => moveTask(task.id, c)} className="text-[9px] px-2 py-1 rounded bg-white/5 hover:bg-[#ef4444]/20 text-gray-400 hover:text-[#ef4444] transition-all border border-white/10">
                                → {c}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TEAM TAB */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Team Members</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input placeholder="Search members..." className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#ef4444] transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {members.map((m, i) => (
                <div key={i} className="bg-[#1e2128] rounded-2xl border border-white/5 p-5 hover:border-[#ef4444]/30 transition-all group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ef4444]/30 to-blue-500/30 flex items-center justify-center text-xl font-bold text-white border border-white/10">
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-white font-bold group-hover:text-[#ef4444] transition-colors">{m.name}</h3>
                      <p className="text-gray-400 text-xs">{m.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 font-mono">#{m.idNumber || m.id || i}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20">{m.department}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MEDIA TAB */}
        {activeTab === 'media' && <MediaGallery />}

        {/* PR PORTAL TAB */}
        {activeTab === 'pr' && <PRPortal />}

        {/* ADMIN TAB */}
        {activeTab === 'admin' && user.isAdmin && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <ShieldAlert className="w-7 h-7 text-[#ef4444]" /> Super Admin Panel
              </h2>
              <div className="text-gray-400 text-sm">{members.length} Total Registered Members</div>
            </div>

            <div className="bg-[#1e2128] rounded-2xl border border-white/10 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Member</th>
                    <th className="px-6 py-4">Role / Dept</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {members.map((m) => (
                    <tr key={m.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#ef4444]/10 flex items-center justify-center text-[#ef4444] font-bold">
                            {m.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-white font-medium">{m.name}</div>
                            <div className="text-gray-500 text-xs">{m.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white text-sm">{m.role}</div>
                        <div className="text-gray-500 text-xs">{m.department}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${m.isAdmin ? 'bg-[#ef4444]/20 text-[#ef4444]' : 'bg-emerald-400/20 text-emerald-400'}`}>
                          {m.isAdmin ? 'Admin' : 'Member'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => deleteMember(m.id)}
                          className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      <ProfileSettings isOpen={showProfileSettings} onClose={() => setShowProfileSettings(false)} />
    </div>
  );
}
