import { useState } from 'react'
import { DashboardShell, LabeledField, SectionCard, TripCard, inputClass } from '../components/DashboardLayout.jsx'

const today = new Date().toISOString().slice(0, 10)
const sampleTrips = [
  { origin: 'Pune', destination: 'Mumbai', date: '2026-11-02', time: '08:30', seats: 2, driver: 'Sample provider · Rohan' },
  { origin: 'Pune', destination: 'Lonavala', date: '2026-11-06', time: '10:00', seats: 3, driver: 'Sample provider · Meera' },
  { origin: 'Mumbai', destination: 'Nashik', date: '2026-11-08', time: '07:15', seats: 1, driver: 'Sample provider · Dev' },
]

function SeekerDashboard({ onNavigate }) {
  const [notice, setNotice] = useState('')

  function searchTrips(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const values = new FormData(form)
    const date = String(values.get('search-date'))
    const seats = Number(values.get('search-seats'))
    if (date < today) {
      setNotice('Choose today or a future date to preview available trips.')
      return
    }
    if (!Number.isInteger(seats) || seats < 1 || seats > 8) {
      setNotice('Seats must be a whole number between 1 and 8.')
      return
    }
    setNotice('Search details checked. Trips below are sample cards and are not matched to your search.')
  }

  return (
    <DashboardShell onNavigate={onNavigate} role="Lift Seeker" eyebrow="Your seeker workspace" title="Lift Seeker Dashboard" description="Enter a route to preview the search flow, then explore example trips. Search results are sample content.">
      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <SectionCard title="Search for a lift" eyebrow="Search preview">
          <form onSubmit={searchTrips} className="space-y-4">
            <LabeledField id="search-origin" label="Origin"><input id="search-origin" name="search-origin" required maxLength="80" placeholder="e.g. Pune" className={inputClass} /></LabeledField>
            <LabeledField id="search-destination" label="Destination"><input id="search-destination" name="search-destination" required maxLength="80" placeholder="e.g. Mumbai" className={inputClass} /></LabeledField>
            <LabeledField id="search-date" label="Date"><input id="search-date" name="search-date" type="date" min={today} required className={inputClass} /></LabeledField>
            <LabeledField id="search-seats" label="Seats"><input id="search-seats" name="search-seats" type="number" min="1" max="8" step="1" required defaultValue="1" className={inputClass} /></LabeledField>
            <button type="submit" className="w-full rounded-full bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">Preview search</button>
          </form>
          {notice && <p role="status" aria-live="polite" className="mt-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-950">{notice}</p>}
        </SectionCard>

        <SectionCard title="Available trips" eyebrow="Sample trips · not matched to search">
          <div className="space-y-3">
            {sampleTrips.map((trip) => <TripCard key={`${trip.origin}-${trip.destination}`} trip={trip} action="Request Lift" onAction={() => setNotice('Demo only: this request was not sent. Lift requests are not connected yet.')} />)}
          </div>
        </SectionCard>
      </div>
    </DashboardShell>
  )
}

export default SeekerDashboard
