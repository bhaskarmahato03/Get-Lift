import { useState } from 'react'
import { DashboardShell, LabeledField, SectionCard, TripCard, inputClass } from '../components/DashboardLayout.jsx'

const today = new Date().toISOString().slice(0, 10)
const mockTrips = [
  { origin: 'Pune', destination: 'Mumbai', date: '2026-11-02', time: '08:30', seats: 2, notes: 'One stop for coffee' },
  { origin: 'Pune', destination: 'Lonavala', date: '2026-11-06', time: '10:00', seats: 3, notes: '' },
]
const mockRequests = [
  { name: 'Aarav M.', route: 'Pune → Mumbai', seats: 1 },
  { name: 'Nisha K.', route: 'Pune → Lonavala', seats: 1 },
]

function ProviderDashboard({ onNavigate }) {
  const [trips, setTrips] = useState(mockTrips)
  const [message, setMessage] = useState('')

  function publishTrip(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const values = new FormData(form)
    const tripDate = String(values.get('date'))
    const seats = Number(values.get('seats'))
    if (tripDate < today) {
      setMessage('Choose today or a future date for your trip.')
      return
    }
    if (!Number.isInteger(seats) || seats < 1 || seats > 8) {
      setMessage('Available seats must be between 1 and 8.')
      return
    }
    setTrips((current) => [{
      origin: String(values.get('origin')).trim(), destination: String(values.get('destination')).trim(),
      date: tripDate, time: String(values.get('time')), seats, notes: String(values.get('notes')).trim(),
    }, ...current])
    form.reset()
    setMessage('Demo trip added to this page for now. It was not published or saved online.')
  }

  return (
    <DashboardShell onNavigate={onNavigate} role="Lift Provider" eyebrow="Your provider workspace" title="Lift Provider Dashboard" description="Manage a demo vehicle profile, add a sample trip, and review example lift requests.">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionCard title="Vehicle summary" eyebrow="Mock profile">
          <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
            <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blue-100 text-2xl">🚗</span>
            <div><p className="font-bold text-slate-950">Maruti Swift · Mock vehicle</p><p className="mt-1 text-sm text-slate-600">Hatchback · 3 passenger seats</p></div>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-500">Vehicle details shown here are examples. No personal vehicle information is stored.</p>
        </SectionCard>

        <SectionCard title="Create a trip" eyebrow="Local preview only">
          <form onSubmit={publishTrip} className="grid gap-4 sm:grid-cols-2">
            <LabeledField id="trip-origin" label="Origin"><input id="trip-origin" name="origin" required maxLength="80" placeholder="e.g. Pune" className={inputClass} /></LabeledField>
            <LabeledField id="trip-destination" label="Destination"><input id="trip-destination" name="destination" required maxLength="80" placeholder="e.g. Mumbai" className={inputClass} /></LabeledField>
            <LabeledField id="trip-date" label="Date"><input id="trip-date" name="date" type="date" min={today} required className={inputClass} /></LabeledField>
            <LabeledField id="trip-time" label="Departure time"><input id="trip-time" name="time" type="time" required className={inputClass} /></LabeledField>
            <LabeledField id="trip-seats" label="Available seats" hint="Choose from 1 to 8 seats."><input id="trip-seats" name="seats" type="number" min="1" max="8" step="1" required defaultValue="1" className={inputClass} /></LabeledField>
            <div className="sm:col-span-2"><label htmlFor="trip-notes" className="text-sm font-semibold text-slate-800">Notes <span className="font-normal text-slate-500">(optional)</span></label><textarea id="trip-notes" name="notes" maxLength="240" rows="3" placeholder="Add a note about the trip" className={inputClass} /></div>
            <div className="sm:col-span-2"><button type="submit" className="rounded-full bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">Add demo trip</button></div>
          </form>
          {message && <p role="status" aria-live="polite" className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900">{message}</p>}
        </SectionCard>

        <SectionCard title="Published trips" eyebrow="Sample trips · local state only" className="lg:col-span-2">
          <div className="grid gap-3 md:grid-cols-2">{trips.map((trip, index) => <TripCard key={`${trip.origin}-${trip.destination}-${trip.date}-${index}`} trip={trip} status={index < mockTrips.length ? 'Sample' : 'Demo only'} />)}</div>
        </SectionCard>

        <SectionCard title="Incoming requests" eyebrow="Mock requests" className="lg:col-span-2">
          <div className="grid gap-3 md:grid-cols-2">{mockRequests.map((request) => <article key={request.name} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 p-4"><div><h3 className="font-bold text-slate-950">{request.name} <span className="font-medium text-slate-500">· sample person</span></h3><p className="mt-1 text-sm text-slate-600">{request.route} · {request.seats} seat requested</p></div><span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-900">Mock request</span></article>)}</div>
        </SectionCard>
      </div>
    </DashboardShell>
  )
}

export default ProviderDashboard
