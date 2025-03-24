import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [userData] = useState([
    { name: "Jan", users: 400 },
    { name: "Feb", users: 800 },
    { name: "Mar", users: 600 },
    { name: "Apr", users: 1200 },
  ]);

  const [recentUsers, setRecentUsers] = useState([]);
  const [pieData, setPieData] = useState([
    { name: "Active Users", value: 0, color: "#4caf50" },
    { name: "Inactive Users", value: 0, color: "#f44336" },
  ]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setRecentUsers(storedUsers);
    updatePieData(storedUsers);
  }, []);

  const updatePieData = (users) => {
    const activeCount = users.filter((u) => u.status === "Active").length;
    const inactiveCount = users.length - activeCount;
    setPieData([
      { name: "Active Users", value: activeCount, color: "#4caf50" },
      { name: "Inactive Users", value: inactiveCount, color: "#f44336" },
    ]);
  };

  const addNewUser = () => {
    const newUser = {
      id: recentUsers.length + 1,
      name: `User ${recentUsers.length + 1}`,
      email: `user${recentUsers.length + 1}@example.com`,
      status: "Active",
    };

    const updatedUsers = [newUser, ...recentUsers];
    setRecentUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    updatePieData(updatedUsers);
  };

  const changeUserStatus = (id, newStatus) => {
    const updatedUsers = recentUsers.map((user) =>
      user.id === id ? { ...user, status: newStatus } : user
    );
    setRecentUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    updatePieData(updatedUsers);
  };

  return (
    <div className="dashboard-container">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" className="dashboard-title">Dashboard</Typography>
      </motion.div>

      <Grid container spacing={3}>
        {[
          { title: "Total Users", value: recentUsers.length, color: "#ff4d4d" },
          { title: "Active Users", value: pieData[0].value, color: "#4caf50" },
          { title: "Inactive Users", value: pieData[1].value, color: "#f44336" },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: index * 0.2 }}>
              <Card className="dashboard-card" style={{ backgroundColor: item.color, color: "#fff" }}>
                <CardContent>
                  <Typography variant="h6" className="card-title">{item.title}</Typography>
                  <Typography variant="h8" className="card-value">{item.value}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <div className="dashboard-chart">
        <Typography variant="h6">User Growth</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="dashboard-chart">
        <Typography variant="h6">User Distribution</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="dashboard-actions">
        <Button variant="contained" color="primary" className="dashboard-btn" onClick={() => window.location.href = "/users"}>Manage Users</Button>
        <Button variant="contained" color="secondary" className="dashboard-btn" onClick={() => window.location.href = "/reports"}>View Reports</Button>
        <Button variant="contained" className="dashboard-btn dashboard-btn-green" onClick={addNewUser}>Add New User</Button>
      </div>

      <div className="dashboard-table">
        <Typography variant="h6">Recently Added Users</Typography>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.length > 0 ? recentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Select value={user.status} onChange={(e) => changeUserStatus(user.id, e.target.value)} className="user-status-select">
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="4" style={{ textAlign: "center" }}>No users found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
