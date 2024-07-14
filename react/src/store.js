import { configureStore } from '@reduxjs/toolkit';

// import thunk from 'redux-thunk'; // Example of middleware (if needed)
import searchReducer from './reducers/searchReducer'

// Middleware array (if needed)

// Create Redux store with combined reducers and optional middleware
const store = configureStore({
    reducer: {
        search: searchReducer,

    }
});

export default store;
