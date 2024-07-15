// React imports
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ViewEmployees() {

    const { user } = useSelector(state => state.user); // Assuming Redux state has user information
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Fetch employees based on the manager's ID
        const fetchEmployees = async () => {
            try {
                const response = await fetch(`http://localhost:3000/employees?managerId=${user._id}`, {
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
            <h3>My Employees</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {employees.map(employee => (
                    <li key={employee._id}>
                        <Link to={`/employee/${employee._id}`}>
                            {employee.name}
                        </Link>
                        <div>{employee.job_role} - {employee.work_location}</div>
                    </li>
                ))}
                <br />
                <br />
            </ul>
        </div>
    );
}

export default ViewEmployees;