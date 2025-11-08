import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (value) => {
    if (!value) {
      return 'Email is required'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address'
    }
    return null
  }

  const validatePassword = (value) => {
    if (!value) {
      return 'Password is required'
    }
    if (value.length < 6) {
      return 'Password must be at least 6 characters'
    }
    return null
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)
    
    if (emailError || passwordError) {
      setErrors({
        email: emailError || '',
        password: passwordError || '',
      })
      return
    }

    setErrors({})
    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // In a real app, you would make an API call here
      console.log('Login attempt:', { email, password, remember })
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    if (errors.email) {
      setErrors({ ...errors, email: validateEmail(value) || '' })
    }
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)
    if (errors.password) {
      setErrors({ ...errors, password: validatePassword(value) || '' })
    }
  }

  return (
    <main className="login-shell">
      <section className="login-panel" aria-label="Team login">
        <header>
          <p className="eyebrow">OB1 Sandbox</p>
          <h1>Sign in</h1>
          <p className="muted">Access the dashboard with your workspace credentials.</p>
        </header>

        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="you@example.com"
                autoComplete="email"
                className={errors.email ? 'error' : ''}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
            </label>
            {errors.email && (
              <span id="email-error" className="error-message" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div>
            <label>
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                autoComplete="current-password"
                className={errors.password ? 'error' : ''}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
            </label>
            {errors.password && (
              <span id="password-error" className="error-message" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          <div className="form-row">
            <label className="remember">
              <input
                type="checkbox"
                name="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <a href="#" className="link">
              Forgot password?
            </a>
          </div>

          {errors.submit && (
            <div className="error-message submit-error" role="alert">
              {errors.submit}
            </div>
          )}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Continue'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default App
