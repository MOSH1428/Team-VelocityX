import { ExternalLink, GitBranch, Code2, Cpu, Globe } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "UniApp - University Management",
    description: "A robust Full-Stack application for managing university assignments, grades, and student records.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind"],
    link: "#",
    github: "#",
    type: "Web App"
  },
  {
    id: 2,
    title: "AI Automation System",
    description: "Automated n8n workflows connecting Gmail to Telegram with real-time status triggers.",
    tech: ["Python", "n8n", "AI", "Telegram API"],
    link: "#",
    github: "#",
    type: "Automation"
  },
  {
    id: 3,
    title: "Smart Arduino Controller",
    description: "Hardware integration for controlling lab environments using Arduino and IoT protocols.",
    tech: ["C++", "Arduino", "IoT", "Sensors"],
    link: "#",
    github: "#",
    type: "Hardware"
  }
];

const ProjectShowcase = () => {
  return (
    <section id="projects" className="py-24 bg-[#0f1115] border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#ef4444] mb-4">
            Project Showcase
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A glimpse into the innovative solutions built by the Velocity X team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group relative bg-[#1e2128] rounded-2xl border border-white/5 overflow-hidden hover:border-[#ef4444]/50 transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-[#ef4444]/10 to-blue-500/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                {project.type === "Web App" && <Globe className="w-16 h-16 text-[#ef4444] opacity-50" />}
                {project.type === "Automation" && <Code2 className="w-16 h-16 text-blue-400 opacity-50" />}
                {project.type === "Hardware" && <Cpu className="w-16 h-16 text-emerald-400 opacity-50" />}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/10 uppercase tracking-wider">
                    {project.type}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ef4444] transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <a href={project.link} className="flex items-center gap-2 text-sm text-white hover:text-[#ef4444] transition-colors">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                  <a href={project.github} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                    <GitBranch className="w-4 h-4" /> Source
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
