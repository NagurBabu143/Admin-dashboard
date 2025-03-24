

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Application</h1>
      <p>Please choose an option to proceed:</p>
      <div className="home-buttons">
        <Link to="/signin">
          <button className="home-btn">Sign In</button>
        </Link>
        <Link to="/signup">
          <button className="home-btn">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
