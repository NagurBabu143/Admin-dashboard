import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import TopBar from "./components/TopBar/TopBar";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import Reports from "./pages/Reports/Reports";
import Notifications from "./components/Notifications/Notification";
import Messages from "./components/Messages/Messages";
import Analytics from "./components/Analytics/Analytics";
import Account from "./components/Account/Account";
import Profile from "./components/Profile/Profile";


function Path() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(prev => !prev);
  };

  return (
    <Router>
      <div className={darkTheme ? 'app-container dark' : 'app-container light'}>
        <TopBar 
          setShowNotifications={setShowNotifications} 
          toggleTheme={toggleTheme} 
          darkTheme={darkTheme} 
        />
        <div className="content">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/account" element={<Account />} />
              
            </Routes>
            {showNotifications && <Notifications />}
          </main>
        </div>
      </div>
    </Router>
  );
}

export default Path;
