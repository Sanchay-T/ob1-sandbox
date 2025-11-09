import { useState } from 'react'
import './Navbar.css'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        <div className="navbar-brand">
          <a href="/" className="navbar-logo">
            OB1
          </a>
        </div>

        <button
          className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <a href="/" className="navbar-link">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="navbar-link">
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="navbar-link">
              Contact
            </a>
          </li>
          <li>
            <a href="/login" className="navbar-link navbar-link-button">
              Sign In
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
