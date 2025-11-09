import { useState, useEffect } from 'react';
import './Dashboard.css';
import TopNav from './TopNav';
import Sidebar from './Sidebar';
import MetricsCards from './MetricsCards';
import UserTable from './UserTable';
import Charts from './Charts';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <TopNav toggleSidebar={toggleSidebar} />
      <div className="dashboard-body">
        <Sidebar
          isOpen={isSidebarOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <main className={`dashboard-main ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
          <div className="dashboard-content">
            <div className="content-header">
              <h1>Dashboard Overview</h1>
              <p className="content-subtitle">Welcome back! Here's what's happening today.</p>
            </div>

            <MetricsCards />
            <Charts />
            <UserTable />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
