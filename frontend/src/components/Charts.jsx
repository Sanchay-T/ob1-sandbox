import { useState, useEffect, useRef } from 'react';
import './Charts.css';

function Charts() {
  const [loading, setLoading] = useState(true);
  const [chartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [4200, 5100, 4800, 6200, 7500, 8100, 7800, 9200, 10500, 11200, 10800, 12400],
  });
  const canvasRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && canvasRef.current) {
      drawChart();
    }
  }, [loading, chartData]);

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 20, right: 20, bottom: 40, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Find min and max values
    const maxValue = Math.max(...chartData.values);
    const minValue = Math.min(...chartData.values);
    const valueRange = maxValue - minValue;

    // Draw grid lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Draw y-axis labels
      const value = maxValue - (valueRange / 5) * i;
      ctx.fillStyle = '#64748b';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(value).toLocaleString(), padding.left - 10, y + 4);
    }

    // Draw line chart
    const points = chartData.values.map((value, index) => {
      const x = padding.left + (chartWidth / (chartData.values.length - 1)) * index;
      const y = padding.top + chartHeight - ((value - minValue) / valueRange) * chartHeight;
      return { x, y };
    });

    // Draw gradient fill
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding.bottom);
    points.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
    ctx.closePath();
    ctx.fill();

    // Draw line
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();

    // Draw points
    points.forEach((point) => {
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });

    // Draw x-axis labels
    ctx.fillStyle = '#64748b';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    chartData.labels.forEach((label, index) => {
      const x = padding.left + (chartWidth / (chartData.labels.length - 1)) * index;
      ctx.fillText(label, x, height - padding.bottom + 20);
    });
  };

  return (
    <div className="charts-section">
      <div className="chart-card">
        <div className="chart-header">
          <div>
            <h2>User Growth Over Time</h2>
            <p className="chart-subtitle">Monthly active users throughout the year</p>
          </div>
          <div className="chart-legend">
            <span className="legend-item">
              <span className="legend-dot"></span>
              Active Users
            </span>
          </div>
        </div>

        {loading ? (
          <div className="chart-loading">
            <div className="loading-spinner-small"></div>
            <p>Loading chart data...</p>
          </div>
        ) : (
          <div className="chart-container">
            <canvas ref={canvasRef} className="chart-canvas"></canvas>
          </div>
        )}
      </div>
    </div>
  );
}

export default Charts;
