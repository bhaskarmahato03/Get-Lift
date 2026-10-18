import MainLayout from '../layouts/MainLayout.jsx'

const steps = [
  { number: '01', title: 'Choose your route', text: 'Find a ride going your way, or share the seats in your car.' },
  { number: '02', title: 'Meet your match', text: 'Compare the details and connect with people headed the same way.' },
  { number: '03', title: 'Enjoy the ride', text: 'Split the journey, share the costs, and arrive together.' },
]

const features = [
  { icon: 'route', title: 'More ways to go', text: 'Make everyday trips and longer journeys easier to plan.' },
  { icon: 'wallet', title: 'Share the cost', text: 'Travel together and make each seat go a little further.' },
  { icon: 'leaf', title: 'A lighter footprint', text: 'Fewer cars on the road means a more thoughtful way to travel.' },
]

function Icon({ name, className = 'size-6' }) {
  const common = { 'aria-hidden': true, viewBox: '0 0 24 24', fill: 'none', className }
  if (name === 'route') return <svg {...common}><path d="M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" strokeWidth="1.7"/><path d="M8 17h4a3 3 0 0 0 3-3V8M16 7H9a3 3 0 0 0-3 3v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
  if (name === 'wallet') return <svg {...common}><rect x="3.5" y="6" width="17" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.7"/><path d="M16 14h4.5v-4H16a2 2 0 0 0 0 4ZM7 6V4.8a1.8 1.8 0 0 1 2-1.8h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 12h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
  if (name === 'leaf') return <svg {...common}><path d="M20 4c-8.5 0-14 3.6-14 10a6 6 0 0 0 6 6c6.4 0 10-5.5 8-16Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M4 21c2.4-5.2 6-8.2 11-11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
  return <svg {...common}><path d="M12 21s7-3.5 7-9V5l-7-2-7 2v7c0 5.5 7 9 7 9Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

function RideAction({ children }) {
  return (
    <button type="button" disabled aria-describedby="coming-soon-note" className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-6 py-3.5 text-sm font-semibold text-slate-500" title="Ride matching is coming soon">
      {children}<span aria-hidden="true">→</span>
      <span className="sr-only">(coming soon)</span>
    </button>
  )
}

function Home() {
  return (
    <MainLayout>
        <section className="relative isolate bg-slate-50" aria-labelledby="hero-title">
          <div className="absolute -right-28 -top-36 -z-10 size-[30rem] rounded-full bg-blue-100/70 blur-3xl" />
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:grid-cols-[1fr_0.9fr] lg:gap-12 lg:py-24">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-emerald-800"><span className="size-2 rounded-full bg-emerald-500" /> Better journeys, together</p>
              <h1 id="hero-title" className="max-w-2xl text-5xl leading-[1.06] font-extrabold tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl">Your next ride is <span className="text-blue-700">going places.</span></h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Get where you’re going with Get-Lift. Find a seat, share your drive, and make the journey count.</p>
              <div id="get-started" className="mt-8 flex flex-col gap-3 sm:flex-row">
                <RideAction>Find a lift</RideAction>
                <RideAction>Offer a lift</RideAction>
              </div>
              <p id="coming-soon-note" className="mt-3 text-sm text-slate-500">Ride matching is coming soon.</p>
              <div className="mt-10 flex items-center gap-3 text-sm text-slate-600"><span className="flex -space-x-2" aria-hidden="true"><span className="grid size-8 place-items-center rounded-full border-2 border-slate-50 bg-blue-100 text-xs font-bold text-blue-800">G</span><span className="grid size-8 place-items-center rounded-full border-2 border-slate-50 bg-emerald-100 text-xs font-bold text-emerald-800">L</span><span className="grid size-8 place-items-center rounded-full border-2 border-slate-50 bg-amber-100 text-xs font-bold text-amber-800">+</span></span><span>Good trips start with a shared ride.</span></div>
            </div>
            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-200/70 via-emerald-100/50 to-transparent blur-2xl" />
              <div className="relative rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/8 sm:p-7">
                <div className="flex items-center justify-between border-b border-slate-100 pb-5"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">A better way forward</p><p className="mt-1 text-lg font-bold text-slate-900">Make room for the road</p></div><span className="grid size-11 place-items-center rounded-2xl bg-blue-50 text-blue-700"><Icon name="route" /></span></div>
                <div className="relative my-7 space-y-8 pl-1 before:absolute before:top-3 before:bottom-3 before:left-[13px] before:border-l-2 before:border-dashed before:border-blue-200">
                  <div className="relative flex items-center gap-4"><span className="z-10 grid size-7 place-items-center rounded-full border-4 border-white bg-blue-700 ring-1 ring-blue-200"><span className="sr-only">Start</span></span><div><p className="text-xs font-medium text-slate-500">YOUR START</p><p className="mt-0.5 font-semibold">Wherever you are</p></div></div>
                  <div className="relative flex items-center gap-4"><span className="z-10 grid size-7 place-items-center rounded-full border-4 border-white bg-emerald-500 ring-1 ring-emerald-200"><span className="sr-only">Destination</span></span><div><p className="text-xs font-medium text-slate-500">YOUR DESTINATION</p><p className="mt-0.5 font-semibold">Somewhere new</p></div></div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 sm:p-5"><div className="flex items-start gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700"><Icon name="leaf" className="size-5" /></span><div><p className="font-semibold">One ride, more possibility</p><p className="mt-1 text-sm leading-6 text-slate-600">Share the seats. Share the journey. Leave a little more room to breathe.</p></div></div></div>
                <div className="mt-5 flex items-center justify-between text-xs font-medium text-slate-500"><span>Find your people along the way</span><span className="flex items-center gap-1 text-emerald-700"><span className="size-1.5 rounded-full bg-emerald-500" /> The road is better shared</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24" aria-labelledby="steps-title">
          <div className="mx-auto max-w-7xl"><div className="mx-auto max-w-2xl text-center"><p className="text-sm font-bold uppercase tracking-[0.15em] text-blue-700">Simple by design</p><h2 id="steps-title" className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Three steps to a better ride</h2><p className="mt-4 leading-7 text-slate-600">A shared journey is easy to imagine. We’re building the tools to make it happen.</p></div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">{steps.map((step) => <article key={step.number} className="rounded-3xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5"><p className="text-sm font-extrabold tracking-widest text-emerald-600">{step.number}</p><h3 className="mt-5 text-xl font-bold text-slate-950">{step.title}</h3><p className="mt-3 leading-7 text-slate-600">{step.text}</p></article>)}</div>
          </div>
        </section>

        <section id="features" className="scroll-mt-24 bg-slate-50 px-5 py-20 sm:px-8 sm:py-24" aria-labelledby="features-title">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><div><p className="text-sm font-bold uppercase tracking-[0.15em] text-blue-700">Made for the way we move</p><h2 id="features-title" className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Good for your plans. Better together.</h2><p className="mt-5 max-w-lg leading-7 text-slate-600">Whether it’s the daily commute or a weekend away, sharing a ride can make the miles feel shorter.</p></div>
            <div className="grid gap-4 sm:grid-cols-3">{features.map((feature) => <article key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-6"><span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700"><Icon name={feature.icon} /></span><h3 className="mt-5 font-bold text-slate-950">{feature.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{feature.text}</p></article>)}</div>
          </div>
        </section>

        <section id="safety" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24" aria-labelledby="safety-title">
          <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[2rem] bg-blue-950 p-8 text-white sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center"><div className="max-w-2xl"><span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-emerald-300"><Icon name="shield" /></span><p className="mt-6 text-sm font-bold uppercase tracking-[0.15em] text-emerald-300">People first, always</p><h2 id="safety-title" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Trust is part of every good journey.</h2><p className="mt-4 leading-7 text-blue-100">Feeling comfortable matters. We’re designing Get-Lift with respect, clear expectations, and safer shared travel at its heart.</p></div><div className="rounded-2xl border border-white/15 bg-white/5 p-5 sm:min-w-64"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-emerald-400/15 text-emerald-300"><Icon name="shield" className="size-5" /></span><div><p className="font-bold">Built around trust</p><p className="mt-1 text-sm text-blue-200">A thoughtful ride starts here</p></div></div></div></div>
        </section>
    </MainLayout>
  )
}

export default Home
