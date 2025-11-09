import { useState } from 'react';
import './TopNav.css';

function TopNav({ toggleSidebar }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications] = useState([
    { id: 1, text: 'New user registration', time: '2 min ago', unread: true },
    { id: 2, text: 'Server maintenance scheduled', time: '1 hour ago', unread: true },
    { id: 3, text: 'Payment received from client', time: '3 hours ago', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <nav className="top-nav">
      <div className="nav-left">
        <button className="menu-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div className="nav-brand">
          <div className="brand-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="4" fill="url(#gradient)" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="brand-text">AdminPro</span>
        </div>
      </div>

      <div className="nav-right">
        <div className="nav-search">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input type="search" placeholder="Search..." />
        </div>

        <div className="nav-actions">
          <div className="notification-wrapper">
            <button
              className="nav-icon-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </button>

            {showNotifications && (
              <div className="dropdown-menu notifications-dropdown">
                <div className="dropdown-header">
                  <h3>Notifications</h3>
                  <button className="text-link">Mark all read</button>
                </div>
                <div className="notifications-list">
                  {notifications.map(notif => (
                    <div key={notif.id} className={`notification-item ${notif.unread ? 'unread' : ''}`}>
                      <div className="notification-content">
                        <p>{notif.text}</p>
                        <span className="notification-time">{notif.time}</span>
                      </div>
                      {notif.unread && <span className="unread-dot"></span>}
                    </div>
                  ))}
                </div>
                <div className="dropdown-footer">
                  <button className="text-link">View all notifications</button>
                </div>
              </div>
            )}
          </div>

          <div className="profile-wrapper">
            <button
              className="profile-btn"
              onClick={() => setShowProfile(!showProfile)}
              aria-label="User profile"
            >
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                alt="User avatar"
                className="profile-avatar"
              />
              <span className="profile-name">Admin User</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {showProfile && (
              <div className="dropdown-menu profile-dropdown">
                <div className="profile-info">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                    alt="User avatar"
                    className="profile-avatar-large"
                  />
                  <div>
                    <p className="profile-info-name">Admin User</p>
                    <p className="profile-info-email">admin@example.com</p>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Profile
                </button>
                <button className="dropdown-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 1v6m0 6v6"></path>
                    <path d="m4.93 4.93 4.24 4.24m5.66 5.66 4.24 4.24"></path>
                    <path d="M1 12h6m6 0h6"></path>
                    <path d="m4.93 19.07 4.24-4.24m5.66-5.66 4.24-4.24"></path>
                  </svg>
                  Settings
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
