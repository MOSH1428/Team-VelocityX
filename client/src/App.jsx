import { useContext } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TeamGallery from './components/TeamGallery'
import ProjectShowcase from './components/ProjectShowcase'
import KanbanBoard from './components/KanbanBoard'
import ResourceLibrary from './components/ResourceLibrary'
import AutomationDashboard from './components/AutomationDashboard'
import Dashboard from './components/Dashboard'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import { AuthContext } from './context/AuthContext'

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-[#0f1115] text-white flex flex-col">
      <Navbar />
      
      {user ? (
        <Dashboard />
      ) : (
        <>
          <Hero />
          <TeamGallery />
          <ProjectShowcase />
          <KanbanBoard />
          <ResourceLibrary />
          <AutomationDashboard />
          <ContactSection />
          <Footer />
        </>
      )}
    </div>
  )
}

export default App
