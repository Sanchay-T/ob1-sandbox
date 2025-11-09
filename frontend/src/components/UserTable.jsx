import { useState, useEffect } from 'react';
import './UserTable.css';

function UserTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setUsers([
        {
          id: 1,
          name: 'Sarah Johnson',
          email: 'sarah.j@example.com',
          status: 'active',
          role: 'Admin',
          lastActive: '2 min ago',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        },
        {
          id: 2,
          name: 'Michael Chen',
          email: 'michael.c@example.com',
          status: 'active',
          role: 'User',
          lastActive: '5 min ago',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
        },
        {
          id: 3,
          name: 'Emma Williams',
          email: 'emma.w@example.com',
          status: 'inactive',
          role: 'User',
          lastActive: '2 days ago',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
        },
        {
          id: 4,
          name: 'James Rodriguez',
          email: 'james.r@example.com',
          status: 'active',
          role: 'Manager',
          lastActive: '1 hour ago',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
        },
        {
          id: 5,
          name: 'Olivia Martinez',
          email: 'olivia.m@example.com',
          status: 'active',
          role: 'User',
          lastActive: '10 min ago',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia',
        },
        {
          id: 6,
          name: 'David Kim',
          email: 'david.k@example.com',
          status: 'pending',
          role: 'User',
          lastActive: 'Never',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
        },
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="user-table-container">
      <div className="table-header">
        <div>
          <h2>User Management</h2>
          <p className="table-subtitle">Manage your team members and their account permissions</p>
        </div>
        <button className="btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add User
        </button>
      </div>

      <div className="table-controls">
        <div className="search-box">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="search"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="status-filter">Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="table-loading">
          <div className="loading-spinner-small"></div>
          <p>Loading users...</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-results">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <p>No users found</p>
                    <span>Try adjusting your search or filter criteria</span>
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-cell">
                        <img src={user.avatar} alt={user.name} className="user-avatar" />
                        <div className="user-info">
                          <div className="user-name">{user.name}</div>
                          <div className="user-email">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="role-badge">{user.role}</span>
                    </td>
                    <td>
                      <span className={`status-badge status-${user.status}`}>
                        <span className="status-dot"></span>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="last-active">{user.lastActive}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn" title="Edit user">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button className="action-btn" title="More options">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="12" cy="5" r="1"></circle>
                            <circle cx="12" cy="19" r="1"></circle>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserTable;
