import { combineReducers } from 'redux';
import searchReducer from './searchReducer'; // Import your specific reducer

// Combine all reducers into a single rootReducer
const rootReducer = combineReducers({
  search: searchReducer, // Assign your reducer to a key in the state
  // Add more reducers as needed
});

export default rootReducer;
