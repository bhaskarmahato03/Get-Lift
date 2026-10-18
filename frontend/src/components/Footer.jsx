function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between">
        <a href="#home" className="w-fit text-lg font-extrabold tracking-tight text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
          get<span className="text-blue-700">-</span>lift
        </a>
        <p>Good journeys are better shared.</p>
        <p>© {new Date().getFullYear()} Get-Lift</p>
      </div>
    </footer>
  )
}

export default Footer
