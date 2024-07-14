// React imports
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import store from './store'; // Ensure store is properly configured


// Components
import LoginForm from "./components/LoginForm";
import WelcomePage from "./components/WelcomePage";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";
import EmployeeResult from "./components/EmployeeResult";


import './App.css'

function App() {

  return (
    <Provider store={store}>
      <Router>
        <>
        <h1>Enterprise Directory</h1>
          
          <Routes>
            <Route 
              exact path="/" 
              element={<LoginForm />} />

            <Route 
              path="/welcome-page" 
              element={<WelcomePage />} />

            <Route 
              path="/search" 
              element={<Search />} />

            <Route 
              path="/search-results" 
              element={<SearchResults />} />

            <Route 
              path="/employee-result" 
              element={<EmployeeResult />} />
            
            </Routes>
        
        </>
      </Router>
    </Provider>
  )
}

export default App
