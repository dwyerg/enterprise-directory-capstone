// Define action types
const SET_USER = 'SET_USER';
const LOGOUT_USER = 'LOGOUT_USER';

// Initial state
const initialState = {
    user: null,
    isLoggedIn: false,
};

// Check localStorage for previously logged-in user
const storedUser = JSON.parse(localStorage.getItem('user'));

if (storedUser) {
    initialState.user = storedUser;
    initialState.isLoggedIn = true;
}

// Reducer function
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            localStorage.setItem('user', JSON.stringify(action.payload));
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true,
            };
        case LOGOUT_USER:
            localStorage.removeItem('user');
            return {
                ...state,
                user: null,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};

// Action creators
export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

export const logoutUser = () => ({
    type: LOGOUT_USER,
});

export default userReducer;