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
            <ul style={{ listStyleType: 'none', padding: 0 }}> {/* Inline CSS */}
                {searchResults.map((item) => (
                    <li key={item._id}>
                        <div>
                            <strong>Name: </strong><Link to={`/employee/${item._id}`}>{item.name}</Link> 
                        </div>
                        <div>
                            <strong>Work Location: </strong> {item.work_location}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;