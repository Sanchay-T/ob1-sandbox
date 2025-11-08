import { useState, useEffect } from 'react'
import './Login.css'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [touched, setTouched] = useState({
    email: false,
    password: false
  })

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Validation logic
  const validateEmail = (email) => {
    if (!email) {
      return 'Email is required'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address'
    }
    return ''
  }

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required'
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters'
    }
    return ''
  }

  // Validate on change
  useEffect(() => {
    if (touched.email) {
      setErrors(prev => ({
        ...prev,
        email: validateEmail(formData.email)
      }))
    }
  }, [formData.email, touched.email])

  useEffect(() => {
    if (touched.password) {
      setErrors(prev => ({
        ...prev,
        password: validatePassword(formData.password)
      }))
    }
  }, [formData.password, touched.password])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Mark all fields as touched
    setTouched({
      email: true,
      password: true
    })

    // Validate all fields
    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)

    setErrors({
      email: emailError,
      password: passwordError
    })

    // If there are errors, don't submit
    if (emailError || passwordError) {
      return
    }

    // Simulate API call
    setIsSubmitting(true)

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      console.log('Login submitted:', formData)
      setSubmitSuccess(true)

      // Reset form after success
      setTimeout(() => {
        setFormData({ email: '', password: '' })
        setTouched({ email: false, password: false })
        setSubmitSuccess(false)
      }, 2000)
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = !errors.email && !errors.password && formData.email && formData.password

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${touched.email && errors.email ? 'input-error' : ''} ${touched.email && !errors.email && formData.email ? 'input-success' : ''}`}
              placeholder="you@example.com"
              disabled={isSubmitting}
            />
            {touched.email && errors.email && (
              <p className="error-message">
                <span className="error-icon">⚠</span>
                {errors.email}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${touched.password && errors.password ? 'input-error' : ''} ${touched.password && !errors.password && formData.password ? 'input-success' : ''}`}
              placeholder="Enter your password"
              disabled={isSubmitting}
            />
            {touched.password && errors.password && (
              <p className="error-message">
                <span className="error-icon">⚠</span>
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`submit-button ${isSubmitting ? 'button-loading' : ''} ${submitSuccess ? 'button-success' : ''}`}
            disabled={isSubmitting || !isFormValid}
          >
            {submitSuccess ? (
              <>
                <span className="success-icon">✓</span> Success!
              </>
            ) : isSubmitting ? (
              <>
                <span className="spinner"></span> Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <div className="login-footer">
          <a href="#" className="forgot-password">Forgot password?</a>
        </div>
      </div>
    </div>
  )
}

export default Login
