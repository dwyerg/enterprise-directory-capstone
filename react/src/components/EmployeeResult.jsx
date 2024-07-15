// React
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Components
import ManagerView from './ManagerView';
import EmployeeView from './EmployeeView';

function EmployeeResult() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const userRole = useSelector(state => state.user.role); // Example: Getting user role from Redux store
    const userId = useSelector(state => state.user.user._id); // Assuming '_id' is the user ID field in Redux


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
        <div>
            <h2>{employee.name}</h2>

            <div>
                <strong>Phone Number: </strong>{formattedPhoneNumber}
            </div>
            <div>
                <strong>Work Location: </strong>{employee.job_role}
            </div>
            <div>
                <strong>Work Location: </strong>{employee.work_location}
            </div>
            <div>
                <strong>Salary: </strong>{formattedSalary}
            </div>
            {/* {userRole === 'Manager' && <ManagerView employee={employee} />}
            {userRole !== 'Manager' && <EmployeeView employee={employee} />} */}
        </div>
    );
}

export default EmployeeResult;