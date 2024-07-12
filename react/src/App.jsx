// React imports
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import React, { useState, useEffect } from "react";

//  Components
 import LoginForm from "./components/LoginForm";
import WelcomePage from "./components/WelcomePage";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";
import EmployeeResult from "./components/EmployeeResult";


import './App.css'

function App() {

  return (
    <h1>Searchable Enterprise Directory</h1>
  )
}

export default App
