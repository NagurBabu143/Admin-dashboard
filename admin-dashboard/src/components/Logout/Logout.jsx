
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('user'); 
    navigate('/signin'); 
  }, [navigate]);

  return (
    <div className="logout-container">
      <h2>Logging you out...</h2>
    </div>
  );
};

export default Logout;
