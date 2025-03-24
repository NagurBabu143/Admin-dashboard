import React, { useState } from 'react';
import './Account.css';

const Account = () => {
  const [formData, setFormData] = useState({
    username: 'ShaikNagurbabu',
    email: 'shaiknagurbabu@example.com',
    password: '',
    notifications: true,
    linkedAccounts: {
      linkedin: 'https://www.linkedin.com/in/shaiknagurbabu',
      github: 'https://github.com/shaiknagurbabu',
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = () => {
   
    console.log('Account settings saved:', formData);
  };

  return (
    <div className="account-container">
      <h2>Account Settings</h2>
      <p>Manage your account details here.</p>

      <div className="account-form">
        <h3>Personal Information</h3>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </label>

        <h3>Change Password</h3>
        <label>
          New Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
          />
        </label>

        <h3>Notifications</h3>
        <label>
          <input
            type="checkbox"
            name="notifications"
            checked={formData.notifications}
            onChange={handleChange}
          />
          Enable notifications
        </label>

        <h3>Linked Accounts</h3>
        <label>
          LinkedIn:
          <input
            type="text"
            name="linkedin"
            value={formData.linkedAccounts.linkedin}
            onChange={(e) => setFormData({
              ...formData,
              linkedAccounts: { ...formData.linkedAccounts, linkedin: e.target.value }
            })}
            placeholder="LinkedIn URL"
          />
        </label>
        <label>
          GitHub:
          <input
            type="text"
            name="github"
            value={formData.linkedAccounts.github}
            onChange={(e) => setFormData({
              ...formData,
              linkedAccounts: { ...formData.linkedAccounts, github: e.target.value }
            })}
            placeholder="GitHub URL"
          />
        </label>

        <button className="account-btn" onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default Account;
