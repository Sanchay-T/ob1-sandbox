import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    return password.length >= 8
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Clear previous errors
    setErrors({})
    setSubmitError('')

    // Validate inputs
    const newErrors = {}

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    // If there are validation errors, display them
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Simulate API call
    setIsSubmitting(true)

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Simulate authentication logic
      // In a real app, this would be an API call
      if (email === 'demo@example.com' && password === 'password123') {
        alert('Login successful! Welcome back.')
        // In a real app, you would redirect or update app state here
      } else {
        setSubmitError('Invalid email or password. Please try again.')
      }
    } catch {
      setSubmitError('An error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    // Clear email error when user starts typing
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }))
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    // Clear password error when user starts typing
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: '' }))
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

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {submitError && (
            <div className="error-banner" role="alert">
              {submitError}
            </div>
          )}

          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
              className={errors.email ? 'input-error' : ''}
              disabled={isSubmitting}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span className="error-message" id="email-error" role="alert">
                {errors.email}
              </span>
            )}
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              className={errors.password ? 'input-error' : ''}
              disabled={isSubmitting}
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {errors.password && (
              <span className="error-message" id="password-error" role="alert">
                {errors.password}
              </span>
            )}
          </label>

          <div className="form-row">
            <label className="remember">
              <input
                type="checkbox"
                name="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                disabled={isSubmitting}
              />
              Remember me
            </label>
            <a href="#" className="link" tabIndex={isSubmitting ? -1 : 0}>
              Forgot password?
            </a>
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Continue'}
          </button>
        </form>

        <p className="demo-hint">
          Demo: demo@example.com / password123
        </p>
      </section>
    </main>
  )
}

export default App
