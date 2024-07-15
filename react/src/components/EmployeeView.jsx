import React from 'react';

function EmployeeView({ employee }) {
    return (
        <div>
            <div>
                <strong>Phone Number: </strong>{formattedPhoneNumber(employee.phone)}
            </div>
            <div>
                <strong>Work Location: </strong>{employee.location}
            </div>
            <div>
                <strong>Salary: </strong>{formattedSalary(employee.salary)}
            </div>
            {/* Additional employee-specific details */}
        </div>
    );
}

export default EmployeeView;
