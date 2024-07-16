// React Imports
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Components
import Search from './Search';
import Navigation from './Navigation';

function WelcomePage() {

  const { user } = useSelector(state => state.user);
  console.log(user);


  return (
    <div>
        <h3>Welcome <i>{user.username}</i></h3>
        <Search />
        <br />
    </div>
  );
};

export default WelcomePage;