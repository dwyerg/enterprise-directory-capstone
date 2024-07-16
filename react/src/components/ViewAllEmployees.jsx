// React imports
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ViewAllEmployees() {

    const { user } = useSelector(state => state.user); // Assuming Redux state has user information
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Fetch employees based on the manager's ID
        const fetchEmployees = async () => {
            try {
                const response = await fetch(`http://localhost:3000/all-employees`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any other headers as needed
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch employees');
                }

                const data = await response.json();
                setEmployees(data); // Assuming data is an array of employee objects
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, [user._id]); // Fetch employees when user ID changes

    return (
        <div>
            <h3>All Employees</h3>
            <div className="card-grid">
                {employees.map(employee => (
                    <Link key={employee._id} to={`/employee/${employee._id}`} className="card">
                        <div className="card-content">
                        <img 
                            src='https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=vftMdLhldDx9houN4V-g3C9k0xl6YeBcoB_Rk6Trce0=' 
                            alt="Employee" 
                            className="employee-image"
                        />
                            <div className="employee-details">
                                <h4>{employee.name}</h4>
                                <p>{employee.job_role} - {employee.work_location}</p>
                            </div>
                        </div>
                    </Link>
                ))}
                <br />
                <br />
            </div>
        </div>
    );
}

export default ViewAllEmployees;