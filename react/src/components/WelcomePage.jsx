// React Imports
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Components
import Search from './Search';

function WelcomePage() {

  const { user } = useSelector(state => state.user);
  console.log(user);


  return (
    <div> 
        <h2>Welcome {user.username}</h2>
        <Search />
        <br />
        {user.roles === 'manager' && (
        <Link to="/view-employees">View Your Employees</Link>
      )}
    </div>
  );
};

export default WelcomePage;