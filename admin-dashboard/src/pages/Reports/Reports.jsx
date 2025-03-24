import React, { useState, useEffect } from "react";
import "./Reports.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Paper } from "@mui/material";

const Reports = () => {
 
  const [chartData, setChartData] = useState([]);


  useEffect(() => {
    const storedData = localStorage.getItem("reportsData");

    if (storedData) {
      setChartData(JSON.parse(storedData));
    } else {
     
      setChartData([
        { month: "Jan", sales: 4000, users: 2400 },
        { month: "Feb", sales: 3000, users: 1398 },
        { month: "Mar", sales: 2000, users: 9800 },
        { month: "Apr", sales: 2780, users: 3908 },
        { month: "May", sales: 1890, users: 4800 },
        { month: "Jun", sales: 2390, users: 3800 },
        { month: "Jul", sales: 3490, users: 4300 },
      ]);
    }
  }, []); 

  return (
    <div className="reports">
      <h2>Reports</h2>
      <Paper className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
            <Bar dataKey="users" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </div>
  );
};

export default Reports;
