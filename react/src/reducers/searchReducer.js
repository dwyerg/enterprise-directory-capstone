const initialState = {
  searchResults: [] // Initialize searchResults as an empty array
};

const searchReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    default:
      return state;
  }
};
  
  export default searchReducer;
  