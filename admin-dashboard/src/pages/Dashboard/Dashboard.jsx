import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { CircularProgress } from "@mui/material";
import { Grid } from "@mui/material";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  LinearProgress,
  Chip,
  Divider,
  IconButton,
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
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { motion } from "framer-motion";
import {
  Notifications,
  CalendarToday,
  PersonAdd,
  AttachMoney,
  ShoppingCart,
  TrendingUp,
  ShowChart,
  FilterList,
  Refresh,
  MoreVert,
} from "@mui/icons-material";

const Dashboard = () => {
  
  const [userData] = useState([
    { name: "Jan", users: 400, revenue: 2400 },
    { name: "Feb", users: 800, revenue: 3800 },
    { name: "Mar", users: 600, revenue: 4200 },
    { name: "Apr", users: 1200, revenue: 5800 },
    { name: "May", users: 900, revenue: 5200 },
    { name: "Jun", users: 1500, revenue: 7200 },
  ]);
  const [apiUsers, setApiUsers] = useState([]);
  const [isLoadingApiUsers, setIsLoadingApiUsers] = useState(false);
  const fetchApiUsers = async () => {
    setIsLoadingApiUsers(true);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      setApiUsers(data);
      
    
      setNotifications([
        {
          id: notifications.length + 1,
          text: "Fetched users from API",
          time: "Just now",
          read: false,
        },
        ...notifications,
      ]);
    } catch (error) {
      console.error("Error fetching API users:", error);
      setNotifications([
        {
          id: notifications.length + 1,
          text: "Failed to fetch API users",
          time: "Just now",
          read: false,
        },
        ...notifications,
      ]);
    } finally {
      setIsLoadingApiUsers(false);
    }
  };
  const [recentUsers, setRecentUsers] = useState([]);
  const [pieData, setPieData] = useState([
    { name: "Active Users", value: 0, color: "#4caf50" },
    { name: "Inactive Users", value: 0, color: "#f44336" },
  ]);

  const [salesData, setSalesData] = useState(() => {
    return JSON.parse(localStorage.getItem("sales")) || [];
  });

  const [notifications, setNotifications] = useState([
    { id: 1, text: "New user registered", time: "2 mins ago", read: false },
    { id: 2, text: "Order #12345 shipped", time: "1 hour ago", read: false },
    { id: 3, text: "System update available", time: "3 hours ago", read: true },
  ]);

  const [tasks] = useState([
    { id: 1, title: "Update dashboard design", progress: 75, priority: "high" },
    { id: 2, title: "Fix login page bug", progress: 30, priority: "medium" },
    { id: 3, title: "Prepare monthly report", progress: 10, priority: "low" },
  ]);

  const [searchQuery] = useState("");

 
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (storedUsers.length === 0) {
      const sampleUsers = [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          status: "Active",
          avatar: "JD",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          status: "Active",
          avatar: "JS",
        },
        {
          id: 3,
          name: "Bob Johnson",
          email: "bob@example.com",
          status: "Inactive",
          avatar: "BJ",
        },
      ];
      localStorage.setItem("users", JSON.stringify(sampleUsers));
      setRecentUsers(sampleUsers);
      updatePieData(sampleUsers);
    } else {
      setRecentUsers(storedUsers);
      updatePieData(storedUsers);
    }

    if (salesData.length === 0) {
      const sampleSales = [
        {
          id: 1,
          item: "Premium Plan",
          amount: 4999,
          date: new Date().toLocaleDateString(),
          status: "Completed",
        },
        {
          id: 2,
          item: "Basic Plan",
          amount: 1999,
          date: new Date().toLocaleDateString(),
          status: "Pending",
        },
        {
          id: 3,
          item: "Add-on Service",
          amount: 999,
          date: new Date().toLocaleDateString(),
          status: "Completed",
        },
      ];
      localStorage.setItem("sales", JSON.stringify(sampleSales));
      setSalesData(sampleSales);
    }
  },[salesData.length]);

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
      avatar: `U${recentUsers.length + 1}`,
    };

    const updatedUsers = [newUser, ...recentUsers];
    setRecentUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    updatePieData(updatedUsers);

    
    setNotifications([
      {
        id: notifications.length + 1,
        text: `New user ${newUser.name} added`,
        time: "Just now",
        read: false,
      },
      ...notifications,
    ]);
  };

  const changeUserStatus = (id, newStatus) => {
    const updatedUsers = recentUsers.map((user) =>
      user.id === id ? { ...user, status: newStatus } : user
    );
    setRecentUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    updatePieData(updatedUsers);
  };

  const addNewSale = () => {
    const items = [
      "Premium Plan",
      "Basic Plan",
      "Add-on Service",
      "Custom Package",
      "Consulting",
    ];
    const newSale = {
      id: salesData.length + 1,
      item: items[Math.floor(Math.random() * items.length)],
      amount: Math.floor(Math.random() * 5000) + 1000,
      date: new Date().toLocaleDateString(),
      status: ["Pending", "Completed", "Rejected"][
        Math.floor(Math.random() * 3)
      ],
    };

    const updatedSales = [newSale, ...salesData];
    setSalesData(updatedSales);
    localStorage.setItem("sales", JSON.stringify(updatedSales));

   
    setNotifications([
      {
        id: notifications.length + 1,
        text: `New sale #${newSale.id} (${newSale.item})`,
        time: "Just now",
        read: false,
      },
      ...notifications,
    ]);
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedSales = salesData.map((sale) =>
      sale.id === id ? { ...sale, status: newStatus } : sale
    );
    setSalesData(updatedSales);
    localStorage.setItem("sales", JSON.stringify(updatedSales));
  };

  const markNotificationAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const totalSales = salesData.reduce((acc, sale) => acc + sale.amount, 0);
  const monthlySales = salesData
    .filter((sale) => new Date(sale.date).getMonth() === new Date().getMonth())
    .reduce((acc, sale) => acc + sale.amount, 0);

  const filteredUsers = recentUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSales = salesData.filter(
    (sale) =>
      sale.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.id.toString().includes(searchQuery)
  );

  return (
    <Box sx={{ p: 2 }}>
    
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Dashboard 
          </Typography>
        </motion.div>
      </Box>

      
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 1,
          mb: 3,
        }}
      >
        {[
          {
            title: "Total Users",
            value: recentUsers.length,
            icon: <PersonAdd sx={{ fontSize: 24 }} />,
            color: "#1976d2",
            trend: "up",
            change: "12% from last month",
          },
          {
            title: "Active Users",
            value: pieData[0].value,
            icon: <TrendingUp sx={{ fontSize: 24 }} />,
            color: "#4caf50",
            trend: "up",
            change: "8% from last week",
          },
          {
            title: "Inactive Users",
            value: pieData[1].value,
            icon: <ShowChart sx={{ fontSize: 24 }} />,
            color: "#f44336",
            trend: "down",
            change: "3% from last week",
          },
          {
            title: "Total Sales",
            value: `Rs.${totalSales.toLocaleString()}`,
            icon: <AttachMoney sx={{ fontSize: 24 }} />,
            color: "#ffa000",
            trend: "up",
            change: "22% from last month",
          },
          {
            title: "Monthly Sales",
            value: `Rs.${monthlySales.toLocaleString()}`,
            icon: <ShoppingCart sx={{ fontSize: 24 }} />,
            color: "#9c27b0",
            trend: "up",
            change: "15% from last month",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              sx={{
                p: 1.5,
                borderRadius: 1.5,
                boxShadow: 2,
              }}
            >
              <CardContent sx={{ p: "6px !important" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontSize: "0.75rem", color: "text.secondary" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
                    >
                      {item.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: item.trend === "up" ? "#4caf50" : "#f44336",
                      }}
                    >
                      {item.change}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: `${item.color}20`,
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>

            <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", p: 1, boxShadow: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                User Growth & Revenue
              </Typography>
              <Box>
                <IconButton size="small">
                  <FilterList fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <Refresh fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ height: "250px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userData}>
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#1976d2" />
                  <YAxis yAxisId="right" orientation="right" stroke="#4caf50" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="users"
                    fill="#1976d2"
                    radius={[4, 4, 0, 0]}
                    name="Users"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#4caf50"
                    name="Revenue (Rs.)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", p: 1, boxShadow: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                User Distribution
              </Typography>
              <Box>
                <IconButton size="small">
                  <MoreVert fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ height: "250px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={50}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} users`, ""]} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>
      </Grid>

     
      <Grid container spacing={1} sx={{ mb: 2, p: 2, marginRight: "10px" }}>
        <Grid item xs={12} sx={{marginLeft:"-29px"}}>
          <Grid container spacing={2} sx={{ p: 2, m: 2 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", p: 1, boxShadow: 3 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 1, fontWeight: "bold" }}
                >
                  Weekly Activity
                </Typography>
                <Box sx={{ height: "200px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={userData}>
                      <Area
                        type="monotone"
                        dataKey="users"
                        stroke="#1976d2"
                        fill="#1976d2"
                        fillOpacity={0.2}
                      />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", p: 1, boxShadow: 3 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 1, fontWeight: "bold" }}
                >
                  Revenue Trend
                </Typography>
                <Box sx={{ height: "200px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userData}>
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#4caf50"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", p: 1, boxShadow: 3 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 1, fontWeight: "bold" }}
                >
                  Task Progress
                </Typography>
                <Box sx={{ p: 1 }}>
                  {tasks.map((task) => (
                    <Box key={task.id} sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography variant="body2">{task.title}</Typography>
                        <Chip
                          label={`${task.progress}%`}
                          size="small"
                          color={
                            task.progress > 70
                              ? "success"
                              : task.progress > 30
                              ? "warning"
                              : "error"
                          }
                        />
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={task.progress}
                        color={
                          task.progress > 70
                            ? "success"
                            : task.progress > 30
                            ? "warning"
                            : "error"
                        }
                      />
                    </Box>
                  ))}
                  <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{ mt: 1 }}
                  >
                    View All Tasks
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

     
      <Box sx={{ p: 2, m: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
          Quick Actions
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            justifyContent: "center",
          }}
        >
          {[
            {
              label: "Add User",
              icon: <PersonAdd />,
              action: addNewUser,
              color: "#1976d2",
            },
            {
              label: "Create Sale",
              icon: <AttachMoney />,
              action: addNewSale,
              color: "#4caf50",
            },
            {
              label: "Generate Report",
              icon: <ShowChart />,
              action: () => (window.location.href = "/reports"),
              color: "#ffa000",
            },
            {
              label: "Send Notification",
              icon: <Notifications />,
              action: () => {},
              color: "#9c27b0",
            },
            {
              label: "Schedule Event",
              icon: <CalendarToday />,
              action: () => {},
              color: "#f44336",
            },
            {
              label: "System Settings",
              icon: <MoreVert />,
              action: () => (window.location.href = "/account"),
              color: "#607d8b",
            },
          ].map((action, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                size="small"
                startIcon={action.icon}
                sx={{
                  backgroundColor: action.color,
                  minWidth: 150,
                  textTransform: "none",
                  borderRadius: 2,
                }}
                onClick={action.action}
              >
                {action.label}
              </Button>
            </motion.div>
          ))}
        </Box>
      </Box>

      
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={12}>
          <Card sx={{ height: "100%", boxShadow: 3 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Recent Users
                </Typography>
                <Box>
                  <IconButton size="small" onClick={addNewUser}>
                    <PersonAdd fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              <TableContainer component={Paper} sx={{ maxHeight: "300px" }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow
                      sx={{
                        "& th": {
                          fontWeight: "bold",
                          backgroundColor: "black",
                          color: "white",
                        },
                      }}
                    >
                      <TableCell>User</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.slice(0, 5).map((user) => (
                        <TableRow
                          key={user.id}
                          hover
                          sx={{ "&:hover": { backgroundColor: "#e3f2fd" } }}
                        >
                          <TableCell sx={{ p: 1 }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Avatar
                                sx={{
                                  width: 30,
                                  height: 30,
                                  fontSize: "0.8rem",
                                  bgcolor: "#1976d2",
                                }}
                              >
                                {user.avatar}
                              </Avatar>
                              {user.name}
                            </Box>
                          </TableCell>
                          <TableCell sx={{ p: 1 }}>{user.email}</TableCell>
                          <TableCell sx={{ p: 1 }}>
                            <Chip
                              label={user.status}
                              size="small"
                              color={
                                user.status === "Active" ? "success" : "error"
                              }
                              sx={{ width: 80 }}
                            />
                          </TableCell>
                          <TableCell sx={{ p: 1 }}>
                            <Select
                              value={user.status}
                              onChange={(e) =>
                                changeUserStatus(user.id, e.target.value)
                              }
                              size="small"
                              sx={{ height: "30px", fontSize: "0.8rem" }}
                            >
                              <MenuItem value="Active">Active</MenuItem>
                              <MenuItem value="Inactive">Inactive</MenuItem>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ p: 2 }}>
                          No users found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {filteredUsers.length > 5 && (
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}
                >
                  <Button
                    size="small"
                    onClick={() => (window.location.href = "/users")}
                  >
                    View All Users
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

       
        <Grid item xs={12} md={12}>
          <Card sx={{ height: "100%", boxShadow: 3 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Recent Sales
                </Typography>
                <Box>
                  <IconButton size="small" onClick={addNewSale}>
                    <AttachMoney fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              <TableContainer component={Paper} sx={{ maxHeight: "300px" }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow
                      sx={{
                        "& th": {
                          fontWeight: "bold",
                          backgroundColor: "black",
                          color: "white",
                        },
                      }}
                    >
                      <TableCell>Item</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredSales.length > 0 ? (
                      filteredSales.slice(0, 5).map((sale) => (
                        <TableRow
                          key={sale.id}
                          hover
                          sx={{ "&:hover": { backgroundColor: "#e3f2fd" } }}
                        >
                          <TableCell sx={{ p: 1 }}>{sale.item}</TableCell>
                          <TableCell sx={{ p: 1 }}>
                            Rs.{sale.amount.toLocaleString()}
                          </TableCell>
                          <TableCell sx={{ p: 1 }}>{sale.date}</TableCell>
                          <TableCell sx={{ p: 1 }}>
                            <Select
                              value={sale.status || "Pending"}
                              onChange={(e) =>
                                handleStatusChange(sale.id, e.target.value)
                              }
                              size="small"
                              sx={{
                                height: "30px",
                                fontSize: "0.8rem",
                                backgroundColor:
                                  sale.status === "Completed"
                                    ? "#e8f5e9"
                                    : sale.status === "Rejected"
                                    ? "#ffebee"
                                    : "#fff8e1",
                                color:
                                  sale.status === "Completed"
                                    ? "#2e7d32"
                                    : sale.status === "Rejected"
                                    ? "#c62828"
                                    : "#ff8f00",
                              }}
                            >
                              <MenuItem value="Pending">Pending</MenuItem>
                              <MenuItem value="Completed">Completed</MenuItem>
                              <MenuItem value="Rejected">Rejected</MenuItem>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ p: 2 }}>
                          No sales found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {filteredSales.length > 5 && (
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}
                >
                  <Button
                    size="small"
                    onClick={() => (window.location.href = "/sales")}
                  >
                    View All Sales
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={12} md={12}>
          <Card sx={{ height: "100%", boxShadow: 3 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  API Users 
                </Typography>
                <Box>
                  <IconButton 
                    size="small" 
                    onClick={fetchApiUsers}
                    disabled={isLoadingApiUsers}
                  >
                    <Refresh fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              {isLoadingApiUsers ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : apiUsers.length > 0 ? (
                <>
                  <TableContainer component={Paper} sx={{ maxHeight: "300px" }}>
                    <Table size="small" stickyHeader>
                      <TableHead>
                        <TableRow
                          sx={{
                            "& th": {
                              fontWeight: "bold",
                              backgroundColor: "black",
                              color: "white",
                            },
                          }}
                        >
                          <TableCell>ID</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Username</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Phone</TableCell>
                          <TableCell>Company</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {apiUsers.slice(0, 5).map((user) => (
                          <TableRow
                            key={user.id}
                            hover
                            sx={{ "&:hover": { backgroundColor: "#e3f2fd" } }}
                          >
                            <TableCell sx={{ p: 1 }}>{user.id}</TableCell>
                            <TableCell sx={{ p: 1 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <Avatar
                                  sx={{
                                    width: 30,
                                    height: 30,
                                    fontSize: "0.8rem",
                                    bgcolor: "#9c27b0",
                                  }}
                                >
                                  {user.name.charAt(0)}
                                </Avatar>
                                {user.name}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ p: 1 }}>{user.username}</TableCell>
                            <TableCell sx={{ p: 1 }}>{user.email}</TableCell>
                            <TableCell sx={{ p: 1 }}>{user.phone}</TableCell>
                            <TableCell sx={{ p: 1 }}>{user.company.name}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {apiUsers.length > 5 && (
                    <Box
                      sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}
                    >
                      <Button
                        size="small"
                        onClick={() => alert("View all API users would be implemented here")}
                      >
                        View All API Users
                      </Button>
                    </Box>
                  )}
                </>
              ) : (
                <Box
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    No API users loaded
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<Refresh />}
                    onClick={fetchApiUsers}
                    disabled={isLoadingApiUsers}
                  >
                    {isLoadingApiUsers ? "Loading..." : "Load API Users"}
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        </Grid>

     
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography
                variant="subtitle1"
                sx={{ mb: 1, fontWeight: "bold" }}
              >
                Notifications
              </Typography>
              <Box sx={{ maxHeight: "300px", overflow: "auto" }}>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <Box
                      key={notification.id}
                      sx={{
                        p: 1,
                        mb: 1,
                        backgroundColor: notification.read
                          ? "inherit"
                          : "#e3f2fd",
                        borderRadius: 1,
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#f5f5f5" },
                      }}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2">
                          {notification.text}
                        </Typography>
                        {!notification.read && (
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              backgroundColor: "#1976d2",
                              borderRadius: "50%",
                            }}
                          />
                        )}
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {notification.time}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography
                    variant="body2"
                    sx={{ p: 2, textAlign: "center" }}
                  >
                    No new notifications
                  </Typography>
                )}
              </Box>
              <Button
                fullWidth
                size="small"
                sx={{ mt: 1 }}
                onClick={() =>
                  setNotifications(
                    notifications.map((n) => ({ ...n, read: true }))
                  )
                }
              >
                Mark All as Read
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography
                variant="subtitle1"
                sx={{ mb: 1, fontWeight: "bold" }}
              >
                System Status
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Server Load
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={65}
                  color="warning"
                />
                <Typography variant="caption">65% - Moderate load</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Database
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={90}
                  color="success"
                />
                <Typography variant="caption">90% - Operational</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Storage
                </Typography>
                <LinearProgress variant="determinate" value={45} color="info" />
                <Typography variant="caption">
                  45% - 1.2TB of 2.7TB used
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" sx={{ mb: 1 }}>
                Last System Check
              </Typography>
              <Typography variant="caption">
                {new Date().toLocaleString()}
              </Typography>

              <Button fullWidth variant="contained" size="small" sx={{ mt: 2 }}>
                Run System Diagnostics
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
