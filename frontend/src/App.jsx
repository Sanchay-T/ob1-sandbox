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
  const [touched, setTouched] = useState({})

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

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))

    if (field === 'email') {
      const error = validateEmail(formData.email)
      setErrors(prev => ({ ...prev, email: error }))
    } else if (field === 'password') {
      const error = validatePassword(formData.password)
      setErrors(prev => ({ ...prev, password: error }))
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value

    setFormData(prev => ({ ...prev, [name]: newValue }))

    // Clear submit error when user starts typing
    if (submitError) setSubmitError('')

    // Validate on change if field has been touched
    if (touched[name]) {
      if (name === 'email') {
        const error = validateEmail(value)
        setErrors(prev => ({ ...prev, email: error }))
      } else if (name === 'password') {
        const error = validatePassword(value)
        setErrors(prev => ({ ...prev, password: error }))
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    // Validate all fields
    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError
      })
      setTouched({ email: true, password: true })
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Simulate success - in a real app, this would call an API
      console.log('Login successful:', {
        email: formData.email,
        remember: formData.remember
      })

      // Here you would typically redirect or update app state
      alert('Login successful! In a real app, you would be redirected.')
    } catch (error) {
      setSubmitError('Unable to sign in. Please check your credentials and try again.')
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
            <div className="error-banner" role="alert">
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
              onBlur={() => handleBlur('email')}
              placeholder="you@example.com"
              autoComplete="email"
              className={errors.email && touched.email ? 'input-error' : ''}
              disabled={isLoading}
              aria-invalid={errors.email && touched.email ? 'true' : 'false'}
              aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
            />
            {errors.email && touched.email && (
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
              onChange={handleChange}
              onBlur={() => handleBlur('password')}
              placeholder="••••••••"
              autoComplete="current-password"
              className={errors.password && touched.password ? 'input-error' : ''}
              disabled={isLoading}
              aria-invalid={errors.password && touched.password ? 'true' : 'false'}
              aria-describedby={errors.password && touched.password ? 'password-error' : undefined}
            />
            {errors.password && touched.password && (
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
                onChange={handleChange}
                disabled={isLoading}
              />
              Remember me
            </label>
            <a href="#" className="link" onClick={(e) => { e.preventDefault(); alert('Password reset would be handled here.'); }}>
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
