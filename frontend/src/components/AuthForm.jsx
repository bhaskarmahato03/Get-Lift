import { useEffect, useRef, useState } from 'react'

const controlClass = 'mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100'
const invalidControlClass = 'border-rose-500 focus:border-rose-600 focus:ring-rose-100'

function InputField({ id, name, label, type = 'text', placeholder, autoComplete, error, hint, required = true }) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined

  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-slate-800">{label}{required && <span aria-hidden="true" className="text-rose-600"> *</span>}</label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        className={`${controlClass} ${error ? invalidControlClass : ''}`}
      />
      {hint && <p id={hintId} className="mt-1.5 text-xs leading-5 text-slate-500">{hint}</p>}
      {error && <p id={errorId} className="mt-1.5 text-sm font-medium text-rose-700">{error}</p>}
    </div>
  )
}

function PasswordField({ id, name, label, autoComplete, error, hint }) {
  const [visible, setVisible] = useState(false)
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined

  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-slate-800">{label}<span aria-hidden="true" className="text-rose-600"> *</span></label>
      <div className="relative mt-2">
        <input
          id={id}
          name={name}
          type={visible ? 'text' : 'password'}
          required
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
          className={`${controlClass} ${error ? invalidControlClass : ''} pr-20`}
        />
        <button
          type="button"
          aria-label={`${visible ? 'Hide' : 'Show'} ${label.toLowerCase()}`}
          aria-pressed={visible}
          onClick={() => setVisible((current) => !current)}
          className="absolute inset-y-0 right-2 my-auto rounded-lg px-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      </div>
      {hint && <p id={hintId} className="mt-1.5 text-xs leading-5 text-slate-500">{hint}</p>}
      {error && <p id={errorId} className="mt-1.5 text-sm font-medium text-rose-700">{error}</p>}
    </div>
  )
}

function AuthForm({ mode, initialRole = '', onNavigate }) {
  const isSignup = mode === 'signup'
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState('')
  const [role, setRole] = useState(initialRole)
  const errorSummaryRef = useRef(null)
  const prefix = isSignup ? 'signup' : 'login'

  useEffect(() => {
    if (Object.keys(errors).length) errorSummaryRef.current?.focus()
  }, [errors])

  const handleInput = (event) => {
    setNotice('')
    const field = event.target.name
    if (field && errors[field]) {
      setErrors((current) => {
        const next = { ...current }
        delete next[field]
        return next
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const values = new FormData(form)
    const nextErrors = {}
    const value = (name) => String(values.get(name) ?? '').trim()

    if (!value('role')) nextErrors.role = 'Choose whether you are a Lift Seeker or Lift Provider.'

    if (isSignup) {
      if (!value('fullName')) nextErrors.fullName = 'Enter your full name.'
      if (!value('phone')) nextErrors.phone = 'Enter your phone number.'
      else {
        const digits = value('phone').replace(/\D/g, '')
        if (!/^\+?[\d\s().-]+$/.test(value('phone')) || digits.length < 7 || digits.length > 15) {
          nextErrors.phone = 'Enter a valid phone number with 7 to 15 digits.'
        }
      }
    }

    if (!value('email')) nextErrors.email = 'Enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value('email'))) nextErrors.email = 'Enter a valid email address.'

    const password = String(values.get('password') ?? '')
    if (!password) nextErrors.password = 'Enter a password.'
    else if (isSignup && password.length < 8) nextErrors.password = 'Use at least 8 characters for your password.'

    if (isSignup) {
      const confirmPassword = String(values.get('confirmPassword') ?? '')
      if (!confirmPassword) nextErrors.confirmPassword = 'Confirm your password.'
      else if (confirmPassword !== password) nextErrors.confirmPassword = 'Passwords do not match.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setNotice('')
      return
    }

    form.reset()
    setRole('')
    setNotice(isSignup
      ? 'Prototype only: the form passed validation. No details were sent or saved, and no account was created.'
      : 'Prototype only: the form passed validation. No details were sent or saved, and no session was started.')
  }

  return (
    <form noValidate onSubmit={handleSubmit} onInput={handleInput} className="space-y-5" aria-label={isSignup ? 'Create an account' : 'Log in'}>
      <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3.5 text-sm leading-6 text-blue-950">
        <p className="font-bold">Frontend prototype</p>
        <p className="mt-0.5 text-blue-900">Authentication is not connected to a backend. Your form details are not sent or saved.</p>
      </div>

      {Object.keys(errors).length > 0 && (
        <div ref={errorSummaryRef} tabIndex={-1} role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800 focus:outline-2 focus:outline-offset-2 focus:outline-rose-600">
          Please review the highlighted fields and correct the errors below.
        </div>
      )}
      {notice && <div role="status" aria-live="polite" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 font-medium text-emerald-900">{notice}</div>}

      <fieldset aria-describedby={errors.role ? `${prefix}-role-error` : undefined} className="min-w-0">
        <legend className="text-sm font-semibold text-slate-800">I’m a<span aria-hidden="true" className="text-rose-600"> *</span></legend>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {[{ value: 'seeker', label: 'Lift Seeker', detail: 'Looking for a ride' }, { value: 'provider', label: 'Lift Provider', detail: 'Offering a ride' }].map((option) => (
            <label key={option.value} className={`flex cursor-pointer items-start gap-2.5 rounded-xl border p-3.5 transition focus-within:ring-4 focus-within:ring-blue-100 ${role === option.value ? 'border-blue-600 bg-blue-50' : 'border-slate-300 bg-white hover:border-slate-400'}`}>
              <input className="mt-1 size-4 accent-blue-700" type="radio" name="role" value={option.value} checked={role === option.value} onChange={() => { setRole(option.value); setErrors((current) => { const next = { ...current }; delete next.role; return next }) }} />
              <span><span className="block text-sm font-bold text-slate-900">{option.label}</span><span className="mt-0.5 block text-xs leading-5 text-slate-600">{option.detail}</span></span>
            </label>
          ))}
        </div>
        {errors.role && <p id={`${prefix}-role-error`} className="mt-1.5 text-sm font-medium text-rose-700">{errors.role}</p>}
      </fieldset>

      {role && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4" role="group" aria-label="Dashboard preview">
        <p className="text-sm font-bold text-emerald-950">Want to explore the {role === 'provider' ? 'provider' : 'seeker'} dashboard?</p>
        <p className="mt-1 text-xs leading-5 text-emerald-900">This opens a frontend demo. Selecting a role does not sign you in.</p>
        <button type="button" onClick={() => onNavigate?.(`${role}-dashboard`)} className="mt-3 rounded-full bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">Preview {role === 'provider' ? 'Provider' : 'Seeker'} Dashboard</button>
      </div>}

      {isSignup && <InputField id="signup-full-name" name="fullName" label="Full name" autoComplete="name" placeholder="Your name" error={errors.fullName} />}
      <InputField id={`${prefix}-email`} name="email" label="Email address" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email} />
      {isSignup && <InputField id="signup-phone" name="phone" label="Phone number" type="tel" autoComplete="tel" placeholder="+1 555 010 1234" hint="Include your country code if needed." error={errors.phone} />}
      <PasswordField id={`${prefix}-password`} name="password" label="Password" autoComplete={isSignup ? 'new-password' : 'current-password'} hint={isSignup ? 'Use at least 8 characters.' : undefined} error={errors.password} />
      {isSignup && <PasswordField id="signup-confirm-password" name="confirmPassword" label="Confirm password" autoComplete="new-password" error={errors.confirmPassword} />}

      {isSignup && role === 'provider' && (
        <fieldset className="space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 sm:p-5">
          <legend className="px-1 text-sm font-bold text-emerald-950">Vehicle details <span className="font-medium text-emerald-800">(optional)</span></legend>
          <p className="-mt-1 text-xs leading-5 text-emerald-900">You can skip these details for now. No identity documents are requested.</p>
          <div>
            <label htmlFor="signup-vehicle-type" className="text-sm font-semibold text-slate-800">Vehicle type <span className="font-normal text-slate-500">(optional)</span></label>
            <select id="signup-vehicle-type" name="vehicleType" className={controlClass} defaultValue="">
              <option value="">Select a vehicle type</option>
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="van">Van</option>
              <option value="other">Other</option>
            </select>
          </div>
          <InputField id="signup-registration" name="registrationNumber" label="Registration number" required={false} placeholder="Enter registration number" hint="Optional. Do not upload documents." />
        </fieldset>
      )}

      <button type="submit" className="w-full rounded-full bg-blue-700 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
        {isSignup ? 'Create account' : 'Log in'}
      </button>
    </form>
  )
}

export default AuthForm
