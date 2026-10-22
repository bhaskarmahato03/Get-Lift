import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

export const inputClass = 'mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100'

export function DashboardShell({ children, title, eyebrow, description, onNavigate, role }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar onNavigate={onNavigate} />
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-blue-700">{eyebrow}</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">{description}</p>
          </div>
          <span className="w-fit rounded-full border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-900">Frontend demo · {role} view</span>
        </div>
        <div className="mb-7 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3.5 text-sm leading-6 text-blue-950">
          <strong>Sample content:</strong> Trips, vehicles, and requests on this page are mock data. Nothing is sent to a server or saved.
        </div>
        {children}
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  )
}

export function SectionCard({ title, eyebrow, children, className = '' }) {
  return (
    <section className={`rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 ${className}`}>
      {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.13em] text-emerald-700">{eyebrow}</p>}
      <h2 className="text-xl font-extrabold tracking-tight text-slate-950">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

export function LabeledField({ id, label, children, hint }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-slate-800">{label} <span aria-hidden="true" className="text-rose-600">*</span></label>
      {children}
      {hint && <p className="mt-1.5 text-xs leading-5 text-slate-500">{hint}</p>}
    </div>
  )
}

export function TripCard({ trip, action, onAction, status }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h3 className="font-bold text-slate-950">{trip.origin} <span className="text-blue-700" aria-hidden="true">→</span> {trip.destination}</h3><p className="mt-1 text-sm text-slate-600">{trip.date} · {trip.time}</p></div>
        {status && <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-900">{status}</span>}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <p className="text-sm text-slate-600">{trip.seats} {trip.seats === 1 ? 'seat' : 'seats'} available <span aria-hidden="true">·</span> {trip.driver || 'Your vehicle'}</p>
        {action && <button type="button" onClick={onAction} className="rounded-full bg-blue-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">{action}</button>}
      </div>
    </article>
  )
}
