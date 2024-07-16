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
import Navigation from "./components/Navigation";
import LoginForm from "./components/LoginForm";
import WelcomePage from "./components/WelcomePage";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";
import EmployeeResult from "./components/EmployeeResult";
import ViewEmployees from "./components/ViewEmployees"
import ViewAllEmployees from "./components/ViewAllEmployees";
import PredictForm from "./components/Predict";

import './App.css'

function App() {

  return (
    <Provider store={store}>
      <Router>
      <div className="container">
        
        <Navigation />
          <Routes>
            <Route 
              exact path="/" 
              element={<LoginForm />} />

            <Route 
              path="/welcome-page" 
              element={<WelcomePage />} />

            <Route 
              path="/view-employees" 
              element={<ViewEmployees />} />
            
            <Route 
              path="/view-all-employees" 
              element={<ViewAllEmployees />} />
                
            <Route 
              path="/predict" 
              element={<PredictForm />} />

            <Route 
              path="/search" 
              element={<Search />} />

            <Route 
              path="/search-results" 
              element={<SearchResults />} />

            <Route 
              path="/employee/:id" 
              element={<EmployeeResult />} />
            
            </Routes>
        
        </div>
      </Router>
    </Provider>
  )
}

export default App;