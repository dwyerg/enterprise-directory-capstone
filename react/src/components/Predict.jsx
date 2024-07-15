import React, { useState } from 'react';

const PredictForm = () => {
    const [role, setRole] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/jobs', {
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
            console.log('Salary Predicted:', data);
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
        </div>
    );
};

export default PredictForm;
