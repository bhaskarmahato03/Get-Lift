import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function MainLayout({ children, onNavigate }) {
  return (
    <div id="home" className="min-h-screen overflow-hidden bg-white text-slate-900">
      <Navbar onNavigate={onNavigate} />
      <main>{children}</main>
      <Footer onNavigate={onNavigate} />
    </div>
  )
}

export default MainLayout
