import { Activity, Zap, RefreshCcw } from 'lucide-react';

const workflows = [
  { name: "Gmail to Telegram Trigger", status: "Active", lastRun: "2 mins ago", health: "100%" },
  { name: "Task Expiry Notification", status: "Active", lastRun: "1 hour ago", health: "98%" },
  { name: "Daily Backup Sync", status: "Idle", lastRun: "12 hours ago", health: "100%" },
];

const AutomationDashboard = () => {
  return (
    <section id="automation" className="py-24 bg-[#0f1115] border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-white">Automation Logs</h2>
            <p className="text-gray-400">n8n Workflow status and health metrics.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map((wf, i) => (
            <div key={i} className="bg-[#1e2128] rounded-2xl p-6 border border-white/5 hover:border-[#ef4444]/30 transition-all group">
              <div className="flex items-center justify-between mb-6">
                <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                  wf.status === "Active" ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20" : "bg-gray-400/10 text-gray-400 border border-gray-400/20"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${wf.status === "Active" ? "bg-emerald-400 animate-pulse" : "bg-gray-400"}`}></span>
                  {wf.status}
                </span>
                <button className="text-gray-500 hover:text-white transition-colors">
                  <RefreshCcw className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-white font-bold text-lg mb-4">{wf.name}</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> Health
                  </span>
                  <span className="text-white font-medium">{wf.health}</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5">
                  <div className="bg-[#ef4444] h-full rounded-full transition-all duration-1000" style={{ width: wf.health }}></div>
                </div>
                <div className="flex items-center justify-between text-sm pt-2">
                  <span className="text-gray-500">Last Run</span>
                  <span className="text-gray-400">{wf.lastRun}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AutomationDashboard;
