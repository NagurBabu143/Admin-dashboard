import React, { useState } from "react";
import "./TopBar.css";
import Notification from "../Notifications/Notification";

const TopBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="topbar">
      <h2>Admin Panel</h2>

      <nav className="topbar-nav">
        <a href="/"> Dashboard</a>
        <a href="/users"> Users</a>
        <a href="/sales"> Sales</a>
        <a href="/reports">Reports</a>
        <a href="/analytics">Analytics</a>
        <a href="/messages">Messages</a>
        <a href="/account"> Settings</a>
      </nav>

      <div className="topbar-icons">
        <div className="notification-icon" onClick={() => setShowNotifications(!showNotifications)}>
          <span title="Notifications">🔔</span>
          {showNotifications && <Notification />}
        </div>

        <div className="profile-dropdown">
          <span title="Profile" onClick={() => setDropdownOpen(!dropdownOpen)}>👤</span>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <a href="/profile"> View Profile</a>
              <a href="/account"> Account Settings</a>
              <a href="/logout"> Logout</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
