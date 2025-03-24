import React from "react";
import "./Analytics.css";

const Analytics = () => {
  return (
    <div className="analytics">
      <h2>📈 Analytics </h2>

      
      <div className="analytics-kpis">
        <div className="kpi-card">
          <h3>Total Sales</h3>
          <p>Rs.120,000</p>
        </div>
        <div className="kpi-card">
          <h3>New Customers</h3>
          <p>350</p>
        </div>
        <div className="kpi-card">
          <h3>Active Users</h3>
          <p>1,200</p>
        </div>
        <div className="kpi-card">
          <h3>Orders Completed</h3>
          <p>850</p>
        </div>
      </div>

      
      <div className="analytics-charts">
        <div className="chart">
          <h3>Sales Over Time</h3>
          <div className="chart-placeholder">[Chart Placeholder]</div>
        </div>
        <div className="chart">
          <h3>User Growth</h3>
          <div className="chart-placeholder">[Chart Placeholder]</div>
        </div>
      </div>

      
      <div className="analytics-reports">
        <h3>Recent Reports</h3>
        <ul>
          <li>📅 Weekly Sales Report - <span>March 18, 2025</span></li>
          <li>📊 Monthly Performance Report - <span>March 1, 2025</span></li>
          <li>📈 Customer Engagement Insights - <span>Feb 25, 2025</span></li>
        </ul>
      </div>
    </div>
  );
};

export default Analytics;
