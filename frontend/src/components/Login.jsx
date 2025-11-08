import { useState } from 'react';
import './Login.css';

/**
 * Validates email format
 * @param {string} email
 * @returns {string|null} Error message or null if valid
 */
const validateEmail = (email) => {
  if (!email) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return null;
};

/**
 * Validates password
 * @param {string} password
 * @returns {string|null} Error message or null if valid
 */
const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (touched.email) {
      setEmailError(validateEmail(value));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (touched.password) {
      setPasswordError(validatePassword(value));
    }
  };

  const handleEmailBlur = () => {
    setTouched(prev => ({ ...prev, email: true }));
    setEmailError(validateEmail(email));
  };

  const handlePasswordBlur = () => {
    setTouched(prev => ({ ...prev, password: true }));
    setPasswordError(validatePassword(password));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setTouched({ email: true, password: true });

    // If there are errors, don't submit
    if (emailErr || passwordErr) {
      return;
    }

    // Simulate login process
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Login successful!\nEmail: ${email}`);
      // Reset form
      setEmail('');
      setPassword('');
      setTouched({ email: false, password: false });
    }, 1500);
  };

  const isFormValid = !validateEmail(email) && !validatePassword(password);

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              className={`form-input ${emailError && touched.email ? 'input-error' : ''} ${email && !emailError ? 'input-success' : ''}`}
              placeholder="you@example.com"
              disabled={isSubmitting}
              autoComplete="email"
            />
            {emailError && touched.email && (
              <div className="error-message">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 0C3.13438 0 0 3.13438 0 7C0 10.8656 3.13438 14 7 14C10.8656 14 14 10.8656 14 7C14 3.13438 10.8656 0 7 0ZM7 10.5C6.65313 10.5 6.375 10.2219 6.375 9.875C6.375 9.52813 6.65313 9.25 7 9.25C7.34687 9.25 7.625 9.52813 7.625 9.875C7.625 10.2219 7.34687 10.5 7 10.5ZM7.625 7.625C7.625 7.97187 7.34687 8.25 7 8.25C6.65313 8.25 6.375 7.97187 6.375 7.625V3.5C6.375 3.15313 6.65313 2.875 7 2.875C7.34687 2.875 7.625 3.15313 7.625 3.5V7.625Z" fill="currentColor"/>
                </svg>
                <span>{emailError}</span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              className={`form-input ${passwordError && touched.password ? 'input-error' : ''} ${password && !passwordError ? 'input-success' : ''}`}
              placeholder="Enter your password"
              disabled={isSubmitting}
              autoComplete="current-password"
            />
            {passwordError && touched.password && (
              <div className="error-message">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 0C3.13438 0 0 3.13438 0 7C0 10.8656 3.13438 14 7 14C10.8656 14 14 10.8656 14 7C14 3.13438 10.8656 0 7 0ZM7 10.5C6.65313 10.5 6.375 10.2219 6.375 9.875C6.375 9.52813 6.65313 9.25 7 9.25C7.34687 9.25 7.625 9.52813 7.625 9.875C7.625 10.2219 7.34687 10.5 7 10.5ZM7.625 7.625C7.625 7.97187 7.34687 8.25 7 8.25C6.65313 8.25 6.375 7.97187 6.375 7.625V3.5C6.375 3.15313 6.65313 2.875 7 2.875C7.34687 2.875 7.625 3.15313 7.625 3.5V7.625Z" fill="currentColor"/>
                </svg>
                <span>{passwordError}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting || !email || !password}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="login-footer">
          <a href="#" className="forgot-link">Forgot password?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
