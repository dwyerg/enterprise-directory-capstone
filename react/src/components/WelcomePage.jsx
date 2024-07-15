// React
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

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
    </div>
  );
};

export default WelcomePage;