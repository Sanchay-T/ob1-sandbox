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
  const [generalError, setGeneralError] = useState('')

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    return newErrors
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }

    // Clear general error when user interacts
    if (generalError) {
      setGeneralError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Simulate API call
    setIsLoading(true)
    setGeneralError('')

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Simulate login logic (this would be replaced with actual API call)
      if (formData.email === 'demo@example.com' && formData.password === 'password123') {
        // Success - in a real app, you'd redirect or update auth state
        alert('Login successful!')
      } else {
        setGeneralError('Invalid email or password. Please try again.')
      }
    } catch (error) {
      setGeneralError('An error occurred. Please try again later.')
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
          {generalError && (
            <div className="error-banner" role="alert">
              {generalError}
            </div>
          )}

          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              autoComplete="email"
              className={errors.email ? 'input-error' : ''}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              disabled={isLoading}
            />
            {errors.email && (
              <span className="error-text" id="email-error" role="alert">
                {errors.email}
              </span>
            )}
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              autoComplete="current-password"
              className={errors.password ? 'input-error' : ''}
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : undefined}
              disabled={isLoading}
            />
            {errors.password && (
              <span className="error-text" id="password-error" role="alert">
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
            <a href="#" className="link" tabIndex={isLoading ? -1 : 0}>
              Forgot password?
            </a>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Continue'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default App
