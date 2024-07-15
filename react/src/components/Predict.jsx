import React, { useState } from 'react';

const PredictForm = () => {
    const [role, setRole] = useState('');
    const [location, setLocation] = useState('');
    const [predictedSalary, setPredictedSalary] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/api/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role, location }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate salary');
            }

            const data = await response.json();
            console.log('Salary Predicted:', data[0]);
            setPredictedSalary(data[0]);
        } catch (error) {
            console.error('Error creating job:', error);
        }
    };

    return (
        <div>
            <h2>Predict Salary</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Role:</label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Predict Salary</button>
            </form>
            {predictedSalary !== null && (
                <div>
                    <h3>Predicted Salary:</h3>
                    <p>${predictedSalary}</p> {/* Display predicted salary here */}
                </div>
            )}
        </div>
    );
};

export default PredictForm;
