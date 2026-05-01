import { useState } from "react";
import { Plus, MoreHorizontal, CheckCircle2, Clock } from 'lucide-react';

const initialTasks = [
  { id: 1, title: "Design Landing Page", status: "To-Do", priority: "High", assignee: "Mohamed" },
  { id: 2, title: "Database Schema Setup", status: "In Progress", priority: "Medium", assignee: "Mohamed" },
  { id: 3, title: "Content Coordination", status: "Done", priority: "Low", assignee: "Sarah" },
  { id: 4, title: "PR Doctor Outreach", status: "To-Do", priority: "High", assignee: "Khaled" },
];

const KanbanBoard = () => {
  const [tasks] = useState(initialTasks);

  const columns = ["To-Do", "In Progress", "Done"];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "text-red-400 bg-red-400/10 border-red-400/20";
      case "Medium": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "Low": return "text-green-400 bg-green-400/10 border-green-400/20";
      default: return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  return (
    <section className="py-24 bg-[#0f1115] border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 mb-4">
            Collaboration Hub
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Manage assignments and track team progress in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {columns.map((column) => (
            <div key={column} className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{column}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400">
                    {tasks.filter(t => t.status === column).length}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {tasks.filter(t => t.status === column).map((task) => (
                  <div key={task.id} className="bg-[#1e2128] p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <button className="text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                    <h4 className="text-white font-medium mb-3">{task.title}</h4>
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#ef4444] flex items-center justify-center text-[10px] font-bold text-white">
                          {task.assignee.charAt(0)}
                        </div>
                        <span className="text-xs text-gray-400">{task.assignee}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        {column === "Done" ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Clock className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KanbanBoard;
