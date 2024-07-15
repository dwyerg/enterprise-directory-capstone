import React from 'react';

function ManagerView({ employee }) {
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
            {/* Additional manager-specific details */}
        </div>
    );
}

export default ManagerView;
