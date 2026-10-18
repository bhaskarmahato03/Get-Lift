import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function MainLayout({ children }) {
  return (
    <div id="home" className="min-h-screen overflow-hidden bg-white text-slate-900">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
