// React
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Image from '../assets/placeholderimage.png'

// Components

function EmployeeResult() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const userRole = useSelector(state => state.user.user.roles); // Example: Getting user role from Redux store
    const userId = useSelector(state => state.user.user._id); // Might need to change as DB changes


    function formatPhoneNumber(phoneNumber) {
      // Remove any non-digit characters
      phoneNumber = phoneNumber.replace(/\D/g, '');
  
      // Format the phone number
      const formattedPhoneNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  
      return formattedPhoneNumber;
  }

  function formatSalary(number) {
    // Remove any non-digit characters
    number = String(number).replace(/\D/g, '');

    // Format the number with commas
    const formattedSalary = number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Add a dollar sign at the beginning
    return `$${formattedSalary}`;
}

    useEffect(() => {
        // Fetch employee details based on id
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:3000/employee/${id}`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'UserRole': userRole, // Include user role in headers
                      'UserId': userId, // Include user ID in headers
                  },
                });
                console.log(userRole);
                console.log(userId);
                if (!response.ok) {
                    throw new Error('Failed to fetch employee');
                }
                const data = await response.json();
                setEmployee(data); // Assuming data is the fetched employee object
            } catch (error) {
                console.error('Error fetching employee:', error);
            }
        };

        fetchEmployee();
    }, [id, userRole, userId]);

    if (!employee) {
        return <div>Loading...</div>
    }
  

    const formattedPhoneNumber = formatPhoneNumber(employee.phone);
    const formattedSalary = formatSalary(employee.salary);

    return (
        <div className='employee-div'>
            <h2 style={{ marginBottom: '5px' }}>{employee.name}</h2>
            <div>
                <i>{employee.job_role}</i>
            </div>
            <img 
                src='https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=vftMdLhldDx9houN4V-g3C9k0xl6YeBcoB_Rk6Trce0=' 
                className="result-image"
            />
            <div>
                <strong>Phone: </strong>{formattedPhoneNumber}
            </div>
            <div>
                <strong>Location: </strong>{employee.work_location}
            </div>
            {employee.salary !== undefined && (
            <div>
                <strong>Salary: </strong>{formattedSalary}
            </div>
        )}
        </div>
    );
}

export default EmployeeResult;