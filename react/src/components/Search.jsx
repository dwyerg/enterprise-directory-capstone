import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchTerm }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Save search results to local storage
            localStorage.setItem('searchResults', JSON.stringify(data));

            dispatch({ type: 'SET_SEARCH_RESULTS', payload: data });
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        navigate('/search-results');
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <form id="form" className="d-flex" role="search" onSubmit={handleSubmit}>
            <FontAwesomeIcon icon={faSearch} />
            <input
                className="form-control rounded-lg py-2 px-3"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={handleChange}
            />
            <br></br>
            <button className="form-submit" type="submit">
                Search
            </button>
        </form>
    );
};

export default Search;