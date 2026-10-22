const navLinks = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Why Get-Lift', href: '#features' },
  { label: 'Safety', href: '#safety' },
]

function Brand({ onNavigate }) {
  return (
    <a href="#/" onClick={(event) => { event.preventDefault(); onNavigate?.('home') }} className="inline-flex items-center gap-2.5 rounded-lg text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600" aria-label="Get-Lift home">
      <span className="grid size-9 place-items-center rounded-xl bg-blue-700 text-white">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
          <path d="M5 16.5 6.4 10a2 2 0 0 1 2-1.5h7.2a2 2 0 0 1 2 1.5l1.4 6.5M4.5 16.5h15v2a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1h-9v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-2ZM7 13h.01M17 13h.01M7 8.5 8 6h8l1 2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-xl font-extrabold tracking-tight">get<span className="text-blue-700">-</span>lift</span>
    </a>
  )
}

function Navbar({ onNavigate }) {
  const handleNavigate = (event, page) => {
    event.preventDefault()
    onNavigate?.(page)
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" aria-label="Main navigation">
        <Brand onNavigate={onNavigate} />
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-slate-600 transition hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <details className="group relative">
            <summary className="cursor-pointer list-none rounded-full px-3 py-2.5 text-sm font-semibold text-slate-700 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">Dashboards <span aria-hidden="true">⌄</span></summary>
            <div className="absolute right-0 z-40 mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
              <a href="#/provider-dashboard" onClick={(event) => handleNavigate(event, 'provider-dashboard')} className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-800">Lift Provider</a>
              <a href="#/seeker-dashboard" onClick={(event) => handleNavigate(event, 'seeker-dashboard')} className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-800">Lift Seeker</a>
            </div>
          </details>
          <a href="#/login" onClick={(event) => handleNavigate(event, 'login')} className="rounded-full px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:px-4">
            Log in
          </a>
          <a href="#/signup" onClick={(event) => handleNavigate(event, 'signup')} className="rounded-full bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:px-5">
            Sign up
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
