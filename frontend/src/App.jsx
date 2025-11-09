import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: true,
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return 'Email is required'
    if (!emailRegex.test(email)) return 'Please enter a valid email address'
    return ''
  }

  const validatePassword = (password) => {
    if (!password) return 'Password is required'
    if (password.length < 6) return 'Password must be at least 6 characters'
    return ''
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const fieldValue = type === 'checkbox' ? checked : value

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }))

    // Clear submit error when user starts typing
    if (submitError) setSubmitError('')

    // Validate on change if field was already touched
    if (touched[name]) {
      let error = ''
      if (name === 'email') error = validateEmail(value)
      if (name === 'password') error = validatePassword(value)

      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))

    // Validate on blur
    let error = ''
    if (name === 'email') error = validateEmail(value)
    if (name === 'password') error = validatePassword(value)

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate all fields
    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      })
      setTouched({
        email: true,
        password: true,
      })
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful login
      console.log('Login successful:', {
        email: formData.email,
        remember: formData.remember,
      })

      // In a real app, you would handle navigation or state update here
      alert(`Welcome! Logged in as ${formData.email}`)

    } catch (error) {
      setSubmitError('Unable to sign in. Please check your credentials and try again.')
    } finally {
      setIsSubmitting(false)
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

          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@example.com"
              autoComplete="email"
              className={errors.email && touched.email ? 'input-error' : ''}
              aria-invalid={errors.email && touched.email ? 'true' : 'false'}
              aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
            />
            {errors.email && touched.email && (
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
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="••••••••"
              autoComplete="current-password"
              className={errors.password && touched.password ? 'input-error' : ''}
              aria-invalid={errors.password && touched.password ? 'true' : 'false'}
              aria-describedby={errors.password && touched.password ? 'password-error' : undefined}
            />
            {errors.password && touched.password && (
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
                onChange={handleChange}
              />
              Remember me
            </label>
            <a href="#" className="link" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </a>
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Continue'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default App
