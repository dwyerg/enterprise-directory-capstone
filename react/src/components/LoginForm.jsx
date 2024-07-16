// React imports
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Reducer imports
import { setUser } from '../reducers/userReducer';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const user = await response.json();
            dispatch(setUser(user)); // Dispatch setUser action with user object from backend
            console.log(username, password);
            navigate('/welcome-page');
        } catch (error) {
            console.error('Login error:', error);
            // Handle login error (e.g., show error message to user)
        }
    };

    return (
        <div className="container">
            <nav className="navbar">
                <h1 className="navbar-brand">ENTERPRISE DIRECTORY</h1>
            </nav>
            <br />
            <br />

            <form onSubmit={handleLogin} className="mt-5">
                <div className="form-group">
                    <label htmlFor="username"></label>
                    <input
                        type="text"
                        className="form-control rounded-lg py-2 px-3"
                        id="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password"></label>
                    <input
                        type="password"
                        className="form-control rounded-lg py-2 px-3"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;