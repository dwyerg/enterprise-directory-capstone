import { configureStore } from '@reduxjs/toolkit';

import searchReducer from './reducers/searchReducer'
import userReducer from './reducers/userReducer';

// Middleware array (if needed)

// Create Redux store with combined reducers and optional middleware
const store = configureStore({
    reducer: {
        search: searchReducer,
        user: userReducer,

    }
});

export default store;
