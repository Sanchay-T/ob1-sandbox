import { useState } from 'react'
import './Navbar.css'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        <div className="navbar-brand">
          <a href="/" className="navbar-logo" onClick={closeMenu}>
            OB1 Sandbox
          </a>
        </div>

        <button
          className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="navbar-toggle-icon"></span>
          <span className="navbar-toggle-icon"></span>
          <span className="navbar-toggle-icon"></span>
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-nav">
            <li className="navbar-item">
              <a href="/" className="navbar-link" onClick={closeMenu}>
                Home
              </a>
            </li>
            <li className="navbar-item">
              <a href="#dashboard" className="navbar-link" onClick={closeMenu}>
                Dashboard
              </a>
            </li>
            <li className="navbar-item">
              <a href="#features" className="navbar-link" onClick={closeMenu}>
                Features
              </a>
            </li>
            <li className="navbar-item">
              <a href="#about" className="navbar-link" onClick={closeMenu}>
                About
              </a>
            </li>
            <li className="navbar-item">
              <a href="#contact" className="navbar-link" onClick={closeMenu}>
                Contact
              </a>
            </li>
          </ul>

          <div className="navbar-actions">
            <a href="#signin" className="navbar-btn navbar-btn-secondary" onClick={closeMenu}>
              Sign In
            </a>
            <a href="#signup" className="navbar-btn navbar-btn-primary" onClick={closeMenu}>
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
