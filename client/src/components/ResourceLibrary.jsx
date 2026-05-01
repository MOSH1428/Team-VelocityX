import { BookOpen, Search, Download, Code } from 'lucide-react';

const resources = [
  { title: "PEAS Framework", category: "Theory", type: "PDF" },
  { title: "ODESDA Methodology", category: "Theory", type: "PDF" },
  { title: "BFS Algorithm Notes", category: "Algorithms", type: "Doc" },
  { title: "DFS Algorithm Notes", category: "Algorithms", type: "Doc" },
  { title: "React Best Practices", category: "Development", type: "Link" },
];

const ResourceLibrary = () => {
  return (
    <section id="resources" className="py-24 bg-[#0f1115] border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Resource Library
            </h2>
            <p className="text-gray-400 max-w-xl text-lg">
              Knowledge base for university assignments and technical frameworks.
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search resources..." 
              className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#ef4444] transition-all w-full md:w-64"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((res, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-[#1e2128] rounded-xl border border-white/5 hover:border-white/20 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#ef4444]">
                  {res.category === "Algorithms" ? <Code className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">{res.title}</h4>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">{res.category}</span>
                </div>
              </div>
              <button className="p-2 text-gray-500 hover:text-white transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourceLibrary;
