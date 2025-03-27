import React, { useState, useEffect } from "react";
import "./TopBar.css";
import Notification from "../Notifications/Notification";

const watchImage = "/images/watch.jpg"; 

const TopBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setNotifications(storedUsers.slice(-5)); 
  }, []);

  return (
    <div className="topbar">
      <h2>Admin Panel</h2>

     

      <div className="topbar-icons">
        <div className="notification-icon" onClick={() => setShowNotifications(!showNotifications)}>
          <span title="Notifications">🔔</span>
          {notifications.length > 0 && <span className="notification-badge">{notifications.length}</span>}
          {showNotifications && <Notification />}
        </div>

        <div className="profile-dropdown">
          <img 
            src={watchImage} 
            alt="Profile" 
            className="profile-image"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            title="Profile"
          />
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
