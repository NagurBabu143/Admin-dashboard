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

function App() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <TopBar setShowNotifications={setShowNotifications} />
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

export default App;
