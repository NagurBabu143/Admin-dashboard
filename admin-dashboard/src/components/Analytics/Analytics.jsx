import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "./Analytics.css";

const Analytics = () => {

  const salesData = [
    { month: "Jan", sales: 20000 },
    { month: "Feb", sales: 30000 },
    { month: "Mar", sales: 40000 },
    { month: "Apr", sales: 25000 },
    { month: "May", sales: 50000 },
    { month: "Jun", sales: 60000 },
  ];

  const userGrowthData = [
    { month: "Jan", users: 200 },
    { month: "Feb", users: 400 },
    { month: "Mar", users: 600 },
    { month: "Apr", users: 800 },
    { month: "May", users: 1000 },
    { month: "Jun", users: 1200 },
  ];

  return (
    <div className="analytics">
      <h2>📈 Analytics</h2>

     
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
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart">
          <h3>User Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
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
