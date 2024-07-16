import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
  } from "react-router-dom";


function SearchResults() {

    const searchResults = useSelector(state => state.search.searchResults);
    const dispatch = useDispatch();

    useEffect(() => {
        // Retrieve search results from local storage
        const storedResults = localStorage.getItem('searchResults');
        if (storedResults) {
            const parsedResults = JSON.parse(storedResults);
            dispatch({ type: 'SET_SEARCH_RESULTS', payload: parsedResults });
        }
    }, [dispatch]);

    console.log([searchResults]);
    if (!searchResults || searchResults.length === 0) {
        return <div>No results found.</div>;
    }

    return (
        <div>
            <h2>Search Results</h2>
            <div className="card-grid">
                {searchResults.map((employee) => (
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
            </div>
        </div>
    );
};

export default SearchResults;