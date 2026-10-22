import MainLayout from '../layouts/MainLayout.jsx'
import AuthForm from '../components/AuthForm.jsx'

function Login({ onNavigate }) {
  return (
    <MainLayout onNavigate={onNavigate}>
      <section className="bg-slate-50 px-5 py-12 sm:px-8 sm:py-16" aria-labelledby="login-title">
        <div className="mx-auto max-w-xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-9">
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-blue-700">Welcome back</p>
            <h1 id="login-title" className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">Log in to Get-Lift</h1>
            <p className="mt-2 mb-7 text-sm leading-6 text-slate-600">Choose your role and enter your details to preview the login form.</p>
            <AuthForm mode="login" onNavigate={onNavigate} />
            <p className="mt-7 text-center text-sm text-slate-600">New to Get-Lift?{' '}
              <a href="#/signup" onClick={(event) => { event.preventDefault(); onNavigate('signup') }} className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-4 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">Create an account</a>
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default Login
