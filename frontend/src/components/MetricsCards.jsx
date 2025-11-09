import { useState, useEffect } from 'react';
import './MetricsCards.css';

function MetricsCards() {
  const [metrics, setMetrics] = useState([
    { id: 1, title: 'Total Users', value: '0', trend: '+12.5%', isPositive: true, loading: true },
    { id: 2, title: 'Active Sessions', value: '0', trend: '+8.2%', isPositive: true, loading: true },
    { id: 3, title: 'Revenue', value: '$0', trend: '+23.1%', isPositive: true, loading: true },
    { id: 4, title: 'Growth', value: '0%', trend: '-2.4%', isPositive: false, loading: true },
  ]);

  useEffect(() => {
    // Simulate loading metrics data
    const timer = setTimeout(() => {
      setMetrics([
        {
          id: 1,
          title: 'Total Users',
          value: '24,563',
          trend: '+12.5%',
          isPositive: true,
          loading: false,
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          ),
        },
        {
          id: 2,
          title: 'Active Sessions',
          value: '1,842',
          trend: '+8.2%',
          isPositive: true,
          loading: false,
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          ),
        },
        {
          id: 3,
          title: 'Revenue',
          value: '$45,234',
          trend: '+23.1%',
          isPositive: true,
          loading: false,
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          ),
        },
        {
          id: 4,
          title: 'Growth',
          value: '18.4%',
          trend: '-2.4%',
          isPositive: false,
          loading: false,
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          ),
        },
      ]);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="metrics-grid">
      {metrics.map(metric => (
        <div key={metric.id} className="metric-card">
          <div className="metric-header">
            <span className="metric-title">{metric.title}</span>
            <div className="metric-icon">
              {metric.icon}
            </div>
          </div>

          {metric.loading ? (
            <div className="metric-skeleton">
              <div className="skeleton-value"></div>
              <div className="skeleton-trend"></div>
            </div>
          ) : (
            <>
              <div className="metric-value">{metric.value}</div>
              <div className="metric-footer">
                <span className={`metric-trend ${metric.isPositive ? 'positive' : 'negative'}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {metric.isPositive ? (
                      <polyline points="18 15 12 9 6 15"></polyline>
                    ) : (
                      <polyline points="6 9 12 15 18 9"></polyline>
                    )}
                  </svg>
                  {metric.trend}
                </span>
                <span className="metric-period">vs last month</span>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default MetricsCards;
