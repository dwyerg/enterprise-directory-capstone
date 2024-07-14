import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function SearchResults() {

    const searchResults = useSelector(state => state.search.searchResults);
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
                            <strong>Name:</strong> {item.name}
                        </div>
                        <div>
                            <strong>Work Location:</strong> {item.work_location}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;