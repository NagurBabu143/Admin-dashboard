import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'Shaik Nagurbabu',
    email: 'shaiknagurbabu@example.com',
    phone: '987-654-3210',
    bio: 'Full-Stack Developer passionate about building scalable web applications.',
    address: '123 Main St, City, Country',
    skills: ['JavaScript', 'React', 'Node.js', 'CSS', 'HTML'],
    interests: ['Coding', 'Reading', 'Traveling', 'Photography'],
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/shaiknagurbabu',
      github: 'https://github.com/shaiknagurbabu',
    },
    avatar: '/images/user-avatar.png',
    dashboard: {
      projects: 10,
      followers: 250,
      messages: 5,
      activityLog: [
        'Completed project: E-Commerce Website',
        'Received 5 new followers',
        'Updated profile information',
        'Created a new repository: React Components',
      ],
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      setSelectedFile(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser(formData);
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setUser((prevUser) => ({ ...prevUser, avatar: objectUrl }));
    }
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>

      <div className="profile-card">
        <div className="profile-avatar">
          <img src={user.avatar} alt="User Avatar" />
        </div>

        {!isEditing ? (
          <div className="profile-info">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Bio:</strong> {user.bio}</p>
            <p><strong>Skills:</strong> {user.skills.join(', ')}</p>
            <p><strong>Interests:</strong> {user.interests.join(', ')}</p>
            <p><strong>Social Media:</strong></p>
            <ul>
              <li><a href={user.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href={user.socialMedia.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
            <button className="profile-btn edit-btn" onClick={handleEdit}>Edit Profile</button>
          </div>
        ) : (
          <div className="profile-edit-form">
            <input type="file" name="avatar" accept="image/*" onChange={handleChange} />
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
            <input type="text" name="skills" value={formData.skills.join(', ')} onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(', ') })} placeholder="Skills (comma separated)" />
            <input type="text" name="interests" value={formData.interests.join(', ')} onChange={(e) => setFormData({ ...formData, interests: e.target.value.split(', ') })} placeholder="Interests (comma separated)" />
            <input type="text" name="linkedin" value={formData.socialMedia.linkedin} onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, linkedin: e.target.value } })} placeholder="LinkedIn URL" />
            <input type="text" name="github" value={formData.socialMedia.github} onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, github: e.target.value } })} placeholder="GitHub URL" />
            <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio"></textarea>
            <button className="profile-btn save-btn" onClick={handleSave}>Save Changes</button>
          </div>
        )}
      </div>

      <div className="dashboard-container">
        <h3 className="dashboard-title">Dashboard</h3>
        <div className="dashboard-stats">
          <div className="stat-item">
            <h4>Projects</h4>
            <p>{user.dashboard.projects}</p>
          </div>
          <div className="stat-item">
            <h4>Followers</h4>
            <p>{user.dashboard.followers}</p>
          </div>
          <div className="stat-item">
            <h4>Messages</h4>
            <p>{user.dashboard.messages}</p>
          </div>
        </div>
        <h4>Activity Log</h4>
        <ul className="activity-log">
          {user.dashboard.activityLog.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
