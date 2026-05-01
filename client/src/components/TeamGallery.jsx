import { useState, useEffect } from "react";
import { departmentColors } from '../data/team';

const TeamGallery = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/team`)
      .then(res => res.json())
      .then(data => setTeamMembers(data))
      .catch(err => console.error('Error fetching team:', err));
  }, []);
  
  const departments = ['All', ...new Set(teamMembers.map(member => member.department || member.dept))];
  
  const filteredTeam = filter === 'All' 
    ? teamMembers 
    : teamMembers.filter(member => (member.department || member.dept) === filter);

  return (
    <section id="team" className="py-24 bg-[#0f1115] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ef4444] to-blue-500 mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            The brilliant minds driving Velocity X forward. We are divided into specialized departments to ensure maximum efficiency and quality.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setFilter(dept)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === dept 
                  ? 'bg-[#ef4444] text-white shadow-[0_0_15px_rgba(170,59,255,0.4)]' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTeam.map((member) => {
            const deptName = member.department || member.dept || "Tech";
            const colorClass = departmentColors[deptName] || "border-gray-500 text-gray-400 bg-gray-900/30";
            
            return (
              <div 
                key={member.id} 
                className={`bg-[#1e2128] p-6 rounded-2xl border border-white/5 shadow-lg transform hover:-translate-y-2 transition-all duration-300 hover:border-white/20 group`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`font-mono font-bold text-lg px-2 py-1 rounded bg-black/30 border-l-2 ${colorClass.split(' ')[0]}`}>
                    #{member.idNumber || member.id}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full border ${colorClass}`}>
                    {deptName}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#ef4444] transition-colors">{member.name}</h3>
                <p className="text-gray-400 text-sm">{member.role}</p>
                
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamGallery;
