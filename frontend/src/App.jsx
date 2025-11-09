import './App.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <main className="login-shell">
      <section className="login-panel" aria-label="Team login">
        <header>
          <p className="eyebrow">OB1 Sandbox</p>
          <h1>Sign in</h1>
          <p className="muted">Access the dashboard with your workspace credentials.</p>
        </header>

        <form className="login-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </label>

          <div className="form-row">
            <label className="remember">
              <input type="checkbox" name="remember" defaultChecked />
              Remember me
            </label>
            <a href="#" className="link">
              Forgot password?
            </a>
          </div>

          <button type="submit">Continue</button>
        </form>
      </section>
    </main>
    </>
  )
}

export default App
