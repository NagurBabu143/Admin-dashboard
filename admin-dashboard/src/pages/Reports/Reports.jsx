import React, { useState, useEffect, useCallback, useRef } from "react";
import "./Reports.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Typography,
} from "@mui/material";

const Reports = () => {
  const [chartData, setChartData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startMonth, setStartMonth] = useState("Jan");
  const [endMonth, setEndMonth] = useState("Jul");

  const chartRef = useRef(null);

  useEffect(() => {
    const storedData = localStorage.getItem("reportsData");

    const defaultData = [
      { month: "Jan", sales: 4000, users: 2400 },
      { month: "Feb", sales: 3000, users: 1398 },
      { month: "Mar", sales: 2000, users: 9800 },
      { month: "Apr", sales: 2780, users: 3908 },
      { month: "May", sales: 1890, users: 4800 },
      { month: "Jun", sales: 2390, users: 3800 },
      { month: "Jul", sales: 3490, users: 4300 },
    ];

    setChartData(storedData ? JSON.parse(storedData) : defaultData);
  }, []);

  const filterData = useCallback(() => {
    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    const startIndex = monthOrder.indexOf(startMonth);
    const endIndex = monthOrder.indexOf(endMonth);

    if (startIndex !== -1 && endIndex !== -1) {
      setFilteredData(chartData.slice(startIndex, endIndex + 1));
    }
  }, [startMonth, endMonth, chartData]);

  useEffect(() => {
    filterData();
  }, [filterData]);

  const handleDownloadChart = () => {
    const svg = chartRef.current.querySelector("svg");
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "report_chart.svg"; 
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleClearData = () => {
    localStorage.removeItem("reportsData");
    setChartData([]);
    setFilteredData([]);
  };

  const handleSaveData = () => {
    localStorage.setItem("reportsData", JSON.stringify(filteredData));
    alert("Filtered data saved successfully!");
  };

  const handleResetFilters = () => {
    setStartMonth("Jan");
    setEndMonth("Jul");
    setFilteredData(chartData);
  };

  const totalSales = filteredData.reduce((acc, item) => acc + item.sales, 0);
  const totalUsers = filteredData.reduce((acc, item) => acc + item.users, 0);

  return (
    <div className="reports">
      <Typography variant="h4" gutterBottom className="title">
        Reports Dashboard
      </Typography>

      <div className="summary">
        <Typography variant="h6">Total Sales: Rs.{totalSales}</Typography>
        <Typography variant="h6">Total Users: {totalUsers}</Typography>
      </div>

      <div className="filters">
        <FormControl className="filter-control">
          <InputLabel>Start Month</InputLabel>
          <Select value={startMonth} onChange={(e) => setStartMonth(e.target.value)}>
            {chartData.map((data) => (
              <MenuItem key={data.month} value={data.month}>
                {data.month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="filter-control">
          <InputLabel>End Month</InputLabel>
          <Select value={endMonth} onChange={(e) => setEndMonth(e.target.value)}>
            {chartData.map((data) => (
              <MenuItem key={data.month} value={data.month}>
                {data.month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="buttons">
        <Button variant="contained" color="primary" onClick={handleDownloadChart}>
          Download Chart
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClearData}>
          Clear Data
        </Button>
        <Button variant="contained" color="success" onClick={handleSaveData}>
          Save Data
        </Button>
        <Button variant="contained" color="warning" onClick={handleResetFilters}>
          Reset Filters
        </Button>
      </div>

      <Paper className="chart-container" ref={chartRef}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={filteredData}>
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
