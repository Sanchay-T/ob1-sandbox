import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: true
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return 'Email is required'
    if (!emailRegex.test(email)) return 'Please enter a valid email address'
    return ''
  }

  const validatePassword = (password) => {
    if (!password) return 'Password is required'
    if (password.length < 8) return 'Password must be at least 8 characters'
    return ''
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    const inputValue = type === 'checkbox' ? checked : value

    setFormData(prev => ({
      ...prev,
      [name]: inputValue
    }))

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }

    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError('')
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    let error = ''

    if (name === 'email') {
      error = validateEmail(value)
    } else if (name === 'password') {
      error = validatePassword(value)
    }

    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Reset states
    setSubmitError('')
    setSubmitSuccess(false)

    // Validate all fields
    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError
      })
      return
    }

    // Simulate API call
    setIsLoading(true)

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Simulate authentication (in production, this would be an API call)
      if (formData.email === 'demo@example.com' && formData.password === 'password123') {
        setSubmitSuccess(true)
        // In production: redirect to dashboard or save auth token
      } else {
        setSubmitError('Invalid email or password. Please try again.')
      }
    } catch (error) {
      setSubmitError('Something went wrong. Please try again later.')
    } finally {
      setIsLoading(false)
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
            <div className="alert alert-error" role="alert">
              {submitError}
            </div>
          )}

          {submitSuccess && (
            <div className="alert alert-success" role="alert">
              Login successful! Redirecting to dashboard...
            </div>
          )}

          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={errors.email ? 'error' : ''}
              disabled={isLoading}
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
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={errors.password ? 'error' : ''}
              disabled={isLoading}
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
                checked={formData.remember}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              Remember me
            </label>
            <a href="#" className="link" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </a>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Continue'}
          </button>
        </form>

        <div className="demo-hint">
          <p>Demo credentials:</p>
          <p><strong>demo@example.com</strong> / <strong>password123</strong></p>
        </div>
      </section>
    </main>
  )
}

export default App
