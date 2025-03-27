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
      twitter: 'https://twitter.com/shaiknagurbabu',
      portfolio: 'https://shaiknagurbabu.dev'
    },
    avatar: '/images/user-avatar.png',
    education: [
      {
        institution: 'University of Technology',
        degree: 'Master of Computer Science',
        year: '2018-2020'
      },
      {
        institution: 'State University',
        degree: 'Bachelor of Science in IT',
        year: '2014-2018'
      }
    ],
    experience: [
      {
        company: 'Tech Solutions Inc.',
        position: 'Senior Developer',
        duration: '2020-Present',
        description: 'Leading frontend development team and implementing new features'
      },
      {
        company: 'WebDev Agency',
        position: 'Frontend Developer',
        duration: '2018-2020',
        description: 'Developed responsive web applications using React'
      }
    ],
    projects: [
      {
        name: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with React and Node.js',
        link: 'https://github.com/shaiknagurbabu/ecommerce'
      },
      {
        name: 'Task Management App',
        description: 'Collaborative task management application',
        link: 'https://github.com/shaiknagurbabu/task-manager'
      }
    ],
    dashboard: {
      projects: 10,
      followers: 250,
      messages: 5,
      connections: 120,
      activityLog: [
        { id: 1, type: 'project', text: 'Completed project: E-Commerce Website', date: '2 hours ago' },
        { id: 2, type: 'follow', text: 'Received 5 new followers', date: '1 day ago' },
        { id: 3, type: 'update', text: 'Updated profile information', date: '3 days ago' },
        { id: 4, type: 'project', text: 'Created a new repository: React Components', date: '1 week ago' }
      ]
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  

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
    const updatedUser = { ...formData };
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      updatedUser.avatar = objectUrl;
    }
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...user });
    setIsEditing(false);
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { institution: '', degree: '', year: '' }]
    });
  };

  const removeEducation = (index) => {
    const updatedEducation = [...formData.education];
    updatedEducation.splice(index, 1);
    setFormData({ ...formData, education: updatedEducation });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="profile-title">User Profile</h2>
        {!isEditing && (
          <button className="profile-btn edit-btn" onClick={handleEdit}>
            <i className="fas fa-edit"></i> Edit Profile
          </button>
        )}
      </div>

      {!isEditing ? (
        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-avatar">
              <img src={user.avatar} alt="User Avatar" />
              <div className="profile-name">{user.name}</div>
              <div className="profile-title">{user.experience[0]?.position}</div>
            </div>

            <div className="profile-details">
              <div className="profile-bio">
                <h3>About Me</h3>
                <p>{user.bio}</p>
              </div>

              <div className="profile-contact">
                <h3>Contact Information</h3>
                <p><i className="fas fa-envelope"></i> {user.email}</p>
                <p><i className="fas fa-phone"></i> {user.phone}</p>
                <p><i className="fas fa-map-marker-alt"></i> {user.address}</p>
              </div>

              <div className="profile-skills">
                <h3>Skills</h3>
                <div className="skills-list">
                  {user.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="profile-tabs">
            <button
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveTab('experience')}
            >
              Experience
            </button>
            <button
              className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => setActiveTab('education')}
            >
              Education
            </button>
            <button
              className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </button>
            <button
              className={`tab-btn ${activeTab === 'social' ? 'active' : ''}`}
              onClick={() => setActiveTab('social')}
            >
              Social
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-content">
                <div className="dashboard-stats">
                  <div className="stat-item">
                    <div className="stat-value">{user.dashboard.projects}</div>
                    <div className="stat-label">Projects</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{user.dashboard.followers}</div>
                    <div className="stat-label">Followers</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{user.dashboard.messages}</div>
                    <div className="stat-label">Messages</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{user.dashboard.connections}</div>
                    <div className="stat-label">Connections</div>
                  </div>
                </div>

                <div className="activity-section">
                  <h3>Recent Activity</h3>
                  <ul className="activity-log">
                    {user.dashboard.activityLog.map((activity) => (
                      <li key={activity.id} className={`activity-item ${activity.type}`}>
                        <div className="activity-icon">
                          {activity.type === 'project' && <i className="fas fa-code"></i>}
                          {activity.type === 'follow' && <i className="fas fa-user-plus"></i>}
                          {activity.type === 'update' && <i className="fas fa-pencil-alt"></i>}
                        </div>
                        <div className="activity-content">
                          <p>{activity.text}</p>
                          <small>{activity.date}</small>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="experience-content">
                <h3>Work Experience</h3>
                {user.experience.map((exp, index) => (
                  <div key={index} className="experience-item">
                    <div className="experience-header">
                      <h4>{exp.position}</h4>
                      <span className="experience-duration">{exp.duration}</span>
                    </div>
                    <div className="experience-company">{exp.company}</div>
                    <p className="experience-description">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'education' && (
              <div className="education-content">
                <h3>Education</h3>
                {user.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <div className="education-header">
                      <h4>{edu.degree}</h4>
                      <span className="education-year">{edu.year}</span>
                    </div>
                    <div className="education-institution">{edu.institution}</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="projects-content">
                <h3>Projects</h3>
                <div className="projects-grid">
                  {user.projects.map((project, index) => (
                    <div key={index} className="project-card">
                      <h4>{project.name}</h4>
                      <p>{project.description}</p>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                        View Project <i className="fas fa-external-link-alt"></i>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="social-content">
                <h3>Social Media & Links</h3>
                <div className="social-links">
                  <a href={user.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                    <i className="fab fa-linkedin"></i> LinkedIn
                  </a>
                  <a href={user.socialMedia.github} target="_blank" rel="noopener noreferrer" className="social-link github">
                    <i className="fab fa-github"></i> GitHub
                  </a>
                  <a href={user.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="social-link twitter">
                    <i className="fab fa-twitter"></i> Twitter
                  </a>
                  <a href={user.socialMedia.portfolio} target="_blank" rel="noopener noreferrer" className="social-link portfolio">
                    <i className="fas fa-globe"></i> Portfolio
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="profile-edit-form">
          <div className="edit-section">
            <h3>Profile Picture</h3>
            <div className="avatar-upload">
              <img src={selectedFile ? URL.createObjectURL(selectedFile) : user.avatar} alt="Preview" />
              <input type="file" name="avatar" accept="image/*" onChange={handleChange} />
            </div>
          </div>

          <div className="edit-section">
            <h3>Basic Information</h3>
            <div className="form-row">
              <label>
                Full Name
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </label>
              <label>
                Email
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </label>
            </div>
            <div className="form-row">
              <label>
                Phone
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
              </label>
              <label>
                Address
                <input type="text" name="address" value={formData.address} onChange={handleChange} />
              </label>
            </div>
            <label>
              Bio
              <textarea name="bio" value={formData.bio} onChange={handleChange} rows="4"></textarea>
            </label>
          </div>

          <div className="edit-section">
            <h3>Skills & Interests</h3>
            <label>
              Skills (comma separated)
              <input type="text" name="skills" value={formData.skills.join(', ')} onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(', ') })} />
            </label>
            <label>
              Interests (comma separated)
              <input type="text" name="interests" value={formData.interests.join(', ')} onChange={(e) => setFormData({ ...formData, interests: e.target.value.split(', ') })} />
            </label>
          </div>

          <div className="edit-section">
            <h3>Work Experience</h3>
            {formData.experience.map((exp, index) => (
              <div key={index} className="nested-form">
                <div className="form-row">
                  <label>
                    Position
                    <input type="text" value={exp.position} onChange={(e) => {
                      const updatedExp = [...formData.experience];
                      updatedExp[index].position = e.target.value;
                      setFormData({ ...formData, experience: updatedExp });
                    }} />
                  </label>
                  <label>
                    Company
                    <input type="text" value={exp.company} onChange={(e) => {
                      const updatedExp = [...formData.experience];
                      updatedExp[index].company = e.target.value;
                      setFormData({ ...formData, experience: updatedExp });
                    }} />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Duration
                    <input type="text" value={exp.duration} onChange={(e) => {
                      const updatedExp = [...formData.experience];
                      updatedExp[index].duration = e.target.value;
                      setFormData({ ...formData, experience: updatedExp });
                    }} />
                  </label>
                </div>
                <label>
                  Description
                  <textarea value={exp.description} onChange={(e) => {
                    const updatedExp = [...formData.experience];
                    updatedExp[index].description = e.target.value;
                    setFormData({ ...formData, experience: updatedExp });
                  }} rows="3"></textarea>
                </label>
              </div>
            ))}
          </div>

          <div className="edit-section">
            <h3>Education</h3>
            {formData.education.map((edu, index) => (
              <div key={index} className="nested-form">
                <div className="form-row">
                  <label>
                    Institution
                    <input type="text" value={edu.institution} onChange={(e) => {
                      const updatedEdu = [...formData.education];
                      updatedEdu[index].institution = e.target.value;
                      setFormData({ ...formData, education: updatedEdu });
                    }} />
                  </label>
                  <label>
                    Degree
                    <input type="text" value={edu.degree} onChange={(e) => {
                      const updatedEdu = [...formData.education];
                      updatedEdu[index].degree = e.target.value;
                      setFormData({ ...formData, education: updatedEdu });
                    }} />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Year
                    <input type="text" value={edu.year} onChange={(e) => {
                      const updatedEdu = [...formData.education];
                      updatedEdu[index].year = e.target.value;
                      setFormData({ ...formData, education: updatedEdu });
                    }} />
                  </label>
                </div>
                {formData.education.length > 1 && (
                  <button type="button" className="remove-btn" onClick={() => removeEducation(index)}>
                    Remove Education
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="add-btn" onClick={addEducation}>
              Add Education
            </button>
          </div>

          <div className="edit-section">
            <h3>Social Media</h3>
            <div className="form-row">
              <label>
                LinkedIn
                <input type="text" value={formData.socialMedia.linkedin} onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, linkedin: e.target.value } })} />
              </label>
              <label>
                GitHub
                <input type="text" value={formData.socialMedia.github} onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, github: e.target.value } })} />
              </label>
            </div>
            <div className="form-row">
              <label>
                Twitter
                <input type="text" value={formData.socialMedia.twitter} onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, twitter: e.target.value } })} />
              </label>
              <label>
                Portfolio
                <input type="text" value={formData.socialMedia.portfolio} onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, portfolio: e.target.value } })} />
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button type="button" className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;