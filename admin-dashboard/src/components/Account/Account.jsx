import React, { useState } from 'react';
import './Account.css';

const Account = () => {
  const [formData, setFormData] = useState({
    username: 'ShaikNagurbabu',
    email: 'shaiknagurbabu@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    firstName: 'Shaik',
    lastName: 'Nagurbabu',
    bio: 'Frontend Developer | React Enthusiast | Open Source Contributor',
    location: 'Hyderabad, India',
    website: 'https://shaiknagurbabu.dev',
    company: 'Tech Solutions Inc.',
    jobTitle: 'Senior Frontend Developer',
    notifications: {
      email: true,
      push: false,
      newsletter: true,
      productUpdates: true
    },
    privacy: {
      profileVisibility: 'public',
      activityStatus: true,
      searchVisibility: true
    },
    linkedAccounts: {
      linkedin: 'https://www.linkedin.com/in/shaiknagurbabu',
      github: 'https://github.com/shaiknagurbabu',
      twitter: 'https://twitter.com/shaiknagurbabu'
    },
    twoFactorAuth: false,
    securityQuestions: [
      { question: 'What was your first pet\'s name?', answer: 'Fluffy' },
      { question: 'In what city were you born?', answer: 'Hyderabad' }
    ]
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [showSecurityQuestions, setShowSecurityQuestions] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    
    if (name.startsWith('notifications.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        notifications: {
          ...formData.notifications,
          [field]: checked
        }
      });
    } else if (name.startsWith('privacy.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        privacy: {
          ...formData.privacy,
          [field]: type === 'checkbox' ? checked : value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleLinkedAccountChange = (platform, value) => {
    setFormData({
      ...formData,
      linkedAccounts: {
        ...formData.linkedAccounts,
        [platform]: value
      }
    });
  };

  const handleSecurityQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.securityQuestions];
    updatedQuestions[index][field] = value;
    setFormData({
      ...formData,
      securityQuestions: updatedQuestions
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Account settings saved:', formData);
    
  };

  return (
    <div className="account-container">
      <header className="account-header">
        <h2>Account Settings</h2>
        <p>Manage your profile, security, and privacy settings</p>
      </header>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <i className="fas fa-user"></i> Profile
        </button>
        <button
          className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <i className="fas fa-shield-alt"></i> Security
        </button>
        <button
          className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          <i className="fas fa-bell"></i> Notifications
        </button>
        <button
          className={`tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
          onClick={() => setActiveTab('privacy')}
        >
          <i className="fas fa-lock"></i> Privacy
        </button>
        <button
          className={`tab-btn ${activeTab === 'social' ? 'active' : ''}`}
          onClick={() => setActiveTab('social')}
        >
          <i className="fas fa-share-alt"></i> Social
        </button>
      </div>

      <form onSubmit={handleSave} className="account-form">
        {activeTab === 'profile' && (
          <div className="tab-content">
            <section className="form-section">
              <h3>Basic Information</h3>
              <div className="form-row">
                <label>
                  First Name
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Last Name
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Username
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </section>

            <section className="form-section">
              <h3>Professional Information</h3>
              <label>
                Job Title
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                />
              </label>
              <label>
                Company
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </label>
            </section>

            <section className="form-section">
              <h3>About You</h3>
              <label>
                Bio
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                />
              </label>
              <div className="form-row">
                <label>
                  Location
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Website
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="tab-content">
            <section className="form-section">
              <h3>Password Settings</h3>
              <label>
                Current Password
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter current password"
                />
              </label>
              <div className="form-row">
                <label>
                  New Password
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                  />
                </label>
                <label>
                  Confirm Password
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                  />
                </label>
              </div>
              <div className="password-strength">
                <div className="strength-meter"></div>
                <span>Password Strength: Medium</span>
              </div>
            </section>

            <section className="form-section">
              <h3>Two-Factor Authentication</h3>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="twoFactorAuth"
                  checked={formData.twoFactorAuth}
                  onChange={handleChange}
                />
                <span className="slider"></span>
                <span className="toggle-label">
                  {formData.twoFactorAuth ? 'Enabled' : 'Disabled'}
                </span>
              </label>
              {formData.twoFactorAuth && (
                <div className="two-factor-info">
                  <p>Two-factor authentication is currently enabled on your account.</p>
                  <button type="button" className="secondary-btn">
                    Change Authentication Method
                  </button>
                </div>
              )}
            </section>

            <section className="form-section">
              <div className="section-header">
                <h3>Security Questions</h3>
                <button
                  type="button"
                  className="text-btn"
                  onClick={() => setShowSecurityQuestions(!showSecurityQuestions)}
                >
                  {showSecurityQuestions ? 'Hide' : 'Edit'}
                </button>
              </div>
              {showSecurityQuestions ? (
                <div className="security-questions">
                  {formData.securityQuestions.map((question, index) => (
                    <div key={index} className="question-group">
                      <label>
                        Question {index + 1}
                        <input
                          type="text"
                          value={question.question}
                          onChange={(e) => handleSecurityQuestionChange(index, 'question', e.target.value)}
                        />
                      </label>
                      <label>
                        Answer
                        <input
                          type="password"
                          value={question.answer}
                          onChange={(e) => handleSecurityQuestionChange(index, 'answer', e.target.value)}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Security questions are set up for account recovery.</p>
              )}
            </section>

            <section className="form-section">
              <h3>Recent Activity</h3>
              <div className="activity-log">
                <div className="activity-item">
                  <div className="activity-icon">
                    <i className="fas fa-laptop"></i>
                  </div>
                  <div className="activity-details">
                    <p>Logged in from Chrome on Windows</p>
                    <small>Today at 10:30 AM • Hyderabad, IN</small>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <div className="activity-details">
                    <p>Logged in from Safari on iPhone</p>
                    <small>Yesterday at 8:15 PM • Hyderabad, IN</small>
                  </div>
                </div>
              </div>
              <button type="button" className="secondary-btn">
                View All Activity
              </button>
            </section>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="tab-content">
            <section className="form-section">
              <h3>Email Notifications</h3>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="notifications.email"
                  checked={formData.notifications.email}
                  onChange={handleChange}
                />
                <span>Account and security notifications</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="notifications.newsletter"
                  checked={formData.notifications.newsletter}
                  onChange={handleChange}
                />
                <span>Monthly newsletter</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="notifications.productUpdates"
                  checked={formData.notifications.productUpdates}
                  onChange={handleChange}
                />
                <span>Product updates and announcements</span>
              </label>
            </section>

            <section className="form-section">
              <h3>Push Notifications</h3>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="notifications.push"
                  checked={formData.notifications.push}
                  onChange={handleChange}
                />
                <span>Enable push notifications</span>
              </label>
              <div className="notification-settings">
                <h4>Notification Preferences</h4>
                <div className="form-row">
                  <label className="checkbox-label">
                    <input type="checkbox" checked={true} onChange={() => {}} />
                    <span>Messages</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" checked={true} onChange={() => {}} />
                    <span>Mentions</span>
                  </label>
                </div>
                <div className="form-row">
                  <label className="checkbox-label">
                    <input type="checkbox" checked={false} onChange={() => {}} />
                    <span>Comments</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" checked={true} onChange={() => {}} />
                    <span>Follows</span>
                  </label>
                </div>
              </div>
            </section>

            <section className="form-section">
              <h3>Scheduled Digest</h3>
              <div className="form-row">
                <label>
                  Frequency
                  <select defaultValue="weekly">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </label>
                <label>
                  Day of Week
                  <select defaultValue="monday" disabled={false}>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                  </select>
                </label>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="tab-content">
            <section className="form-section">
              <h3>Profile Visibility</h3>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="privacy.profileVisibility"
                    value="public"
                    checked={formData.privacy.profileVisibility === 'public'}
                    onChange={handleChange}
                  />
                  <span>Public - Anyone can see your profile</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="privacy.profileVisibility"
                    value="connections"
                    checked={formData.privacy.profileVisibility === 'connections'}
                    onChange={handleChange}
                  />
                  <span>Connections Only - Only your connections can see your profile</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="privacy.profileVisibility"
                    value="private"
                    checked={formData.privacy.profileVisibility === 'private'}
                    onChange={handleChange}
                  />
                  <span>Private - Only you can see your profile</span>
                </label>
              </div>
            </section>

            <section className="form-section">
              <h3>Activity Status</h3>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="privacy.activityStatus"
                  checked={formData.privacy.activityStatus}
                  onChange={handleChange}
                />
                <span>Show when I'm active</span>
              </label>
              <p className="hint-text">
                When enabled, other users will see when you were last active on the platform.
              </p>
            </section>

            <section className="form-section">
              <h3>Search Visibility</h3>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="privacy.searchVisibility"
                  checked={formData.privacy.searchVisibility}
                  onChange={handleChange}
                />
                <span>Include my profile in search results</span>
              </label>
              <p className="hint-text">
                When enabled, your profile may appear in search engine results.
              </p>
            </section>

            <section className="form-section">
              <h3>Data Privacy</h3>
              <div className="privacy-actions">
                <button type="button" className="secondary-btn">
                  Download Your Data
                </button>
                <button type="button" className="secondary-btn">
                  Request Data Deletion
                </button>
              </div>
              <p className="hint-text">
                You can download a copy of your data or request to delete your account data.
              </p>
            </section>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="tab-content">
            <section className="form-section">
              <h3>Linked Accounts</h3>
              <div className="social-accounts">
                <div className="social-account">
                  <div className="social-icon linkedin">
                    <i className="fab fa-linkedin"></i>
                  </div>
                  <input
                    type="text"
                    value={formData.linkedAccounts.linkedin}
                    onChange={(e) => handleLinkedAccountChange('linkedin', e.target.value)}
                    placeholder="LinkedIn URL"
                  />
                </div>
                <div className="social-account">
                  <div className="social-icon github">
                    <i className="fab fa-github"></i>
                  </div>
                  <input
                    type="text"
                    value={formData.linkedAccounts.github}
                    onChange={(e) => handleLinkedAccountChange('github', e.target.value)}
                    placeholder="GitHub URL"
                  />
                </div>
                <div className="social-account">
                  <div className="social-icon twitter">
                    <i className="fab fa-twitter"></i>
                  </div>
                  <input
                    type="text"
                    value={formData.linkedAccounts.twitter}
                    onChange={(e) => handleLinkedAccountChange('twitter', e.target.value)}
                    placeholder="Twitter URL"
                  />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h3>Social Sharing</h3>
              <label className="checkbox-label">
                <input type="checkbox" checked={true} onChange={() => {}} />
                <span>Allow sharing my activity to connected social networks</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" checked={false} onChange={() => {}} />
                <span>Show social media buttons on my profile</span>
              </label>
            </section>

            <section className="form-section">
              <h3>Connected Apps</h3>
              <div className="connected-apps">
                <div className="app-card">
                  <div className="app-icon">
                    <i className="fab fa-google"></i>
                  </div>
                  <div className="app-info">
                    <h4>Google</h4>
                    <small>Connected for authentication</small>
                  </div>
                  <button type="button" className="text-btn danger">
                    Disconnect
                  </button>
                </div>
                <div className="app-card">
                  <div className="app-icon">
                    <i className="fab fa-slack"></i>
                  </div>
                  <div className="app-info">
                    <h4>Slack</h4>
                    <small>Not connected</small>
                  </div>
                  <button type="button" className="text-btn">
                    Connect
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="secondary-btn">
            Cancel
          </button>
          <button type="submit" className="primary-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Account;