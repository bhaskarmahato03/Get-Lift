import { useEffect, useState } from 'react'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ProviderDashboard from './pages/ProviderDashboard.jsx'
import SeekerDashboard from './pages/SeekerDashboard.jsx'

function routeFromHash() {
  const [path, query = ''] = window.location.hash.replace(/^#\/?/, '').split('?')
  const params = new URLSearchParams(query)
  if (path === 'login') return { page: 'login' }
  if (path === 'provider-dashboard') return { page: 'provider-dashboard' }
  if (path === 'seeker-dashboard') return { page: 'seeker-dashboard' }
  if (path === 'signup') {
    const requestedRole = params.get('role')
    return { page: 'signup', initialRole: ['provider', 'seeker'].includes(requestedRole) ? requestedRole : '' }
  }
  return { page: 'home' }
}

function App() {
  const [route, setRoute] = useState(routeFromHash)

  useEffect(() => {
    const syncRoute = () => setRoute(routeFromHash())
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  const navigate = (page, role) => {
    const nextHash = page === 'home'
      ? '#/'
      : `#/${page}${role ? `?role=${encodeURIComponent(role)}` : ''}`
    if (window.location.hash === nextHash) setRoute(routeFromHash())
    else window.location.hash = nextHash
  }

  if (route.page === 'login') return <Login onNavigate={navigate} />
  if (route.page === 'signup') return <Signup onNavigate={navigate} initialRole={route.initialRole} />
  if (route.page === 'provider-dashboard') return <ProviderDashboard onNavigate={navigate} />
  if (route.page === 'seeker-dashboard') return <SeekerDashboard onNavigate={navigate} />
  return <Home onNavigate={navigate} />
}

export default App
