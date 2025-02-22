import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faGlobe } from '@fortawesome/free-solid-svg-icons';

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
            
            <form id="form" onSubmit={handleSubmit}>
            <h2>Predict Salary</h2>
                <div><FontAwesomeIcon icon={faIdCard} />
                    <input
                        className="form-control rounded-lg py-2 px-3"
                        type="text"
                        value={role}
                        placeholder='Role'
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />
                </div>
                <div><FontAwesomeIcon icon={faGlobe} />
                    <input
                        className="form-control rounded-lg py-2 px-3"
                        type="text"
                        value={location}
                        placeholder='Location'
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <button className="form-submit" type="submit">Generate</button>
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
