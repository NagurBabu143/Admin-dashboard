import React, { useState, useEffect } from "react";
import "./Notifications.css";

const Notifications = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      setAllUsers(storedUsers);
      setDisplayedUsers(storedUsers.slice(-5));
      setIsLoading(false);
    } catch (err) {
      setError("Failed to load notifications");
      setIsLoading(false);
      console.error("Error loading notifications:", err);
    }
  }, []);

  useEffect(() => {
    if (!cleared) {
      setDisplayedUsers(showAll ? allUsers : allUsers.slice(-5));
    }
  }, [showAll, allUsers, cleared]);

  const toggleShowAll = () => {
    setShowAll(!showAll);
    if (cleared) {
      setCleared(false);
    }
  };

  const clearNotifications = () => {
    if (window.confirm("Are you sure you want to clear all notifications?")) {
      setDisplayedUsers([]);
      setCleared(true); 
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown time";
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  if (isLoading) {
    return <div className="notifications loading">Loading notifications...</div>;
  }

  if (error) {
    return <div className="notifications error">{error}</div>;
  }

  return (
    <div className="notifications">
      <div className="notifications-header">
        <h3>Recent Notifications</h3>
        <div className="notification-actions">
          {allUsers.length > 5 && !cleared && (
            <button onClick={toggleShowAll} className="toggle-button">
              {showAll ? "Show Less" : "Show All"}
            </button>
          )}
          {(displayedUsers.length > 0 || cleared) && (
            <button onClick={clearNotifications} className="clear-button">
              {cleared ? "Reset Notifications" : "Clear Notifications"}
            </button>
          )}
        </div>
      </div>
      
      <ul className="notification-list">
        {!cleared && displayedUsers.length > 0 ? (
          displayedUsers.map((user) => (
            <li key={user.id} className="notification-item">
              <div className="notification-content">
                <strong>{user.name}</strong> ({user.email}) - {user.role}
              </div>
              <div className="notification-time">
                {formatDate(user.timestamp)}
              </div>
            </li>
          ))
        ) : (
          <li className="notification-item empty">
            {cleared ? "Notifications cleared" : "No new users added"}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Notifications;