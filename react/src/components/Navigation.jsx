import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../reducers/userReducer" // Import logout action creator


function Navigation() {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const { user } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleLogout = () => {
        navigate('/'); // Navigate to the login page
        dispatch(logoutUser());
      };

    if (!isLoggedIn) {
        return null; // Return null if user is not logged in
    }

    return (
        <nav className="navbar">
            <h1 className="navbar-brand">ENTERPRISE DIRECTORY</h1>
            <ul>
                <li><Link to="/welcome-page">Home</Link></li>
                <li><Link to="/predict">Salary Predictor</Link></li>
                {user.roles === 'manager' && (
                    <li>
                        <Link to="/view-employees">View Your Employees</Link>
                    </li>
                )}
                {user.roles === 'hr' && (
                    <li>
                        <Link to="/view-all-employees">View All Employees</Link>
                    </li>
                )}
                <li><button className="nav-button" onClick={handleLogout}>Logout</button></li>
                {/* Add more links as needed */}
            </ul>
        </nav>
    );
    }
 
export default Navigation;