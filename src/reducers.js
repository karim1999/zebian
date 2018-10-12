const initialState = {
    loggedIn: false,
    user: {},
};
export const currentUser= (state = initialState, action) => {
    switch (action.type){
        case "SET_USER":
            return { ...state, user: action.user, loggedIn: true };
        case "REMOVE_USER":
            return { ...state, user: {}, loggedIn: false };
        default:
            return state;
    }
};
export const setUser = (user) => ({
    type: 'SET_USER',
    user
});
export const removeUser = () => ({
    type: 'REMOVE_USER'
});