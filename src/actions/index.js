import * as actionTypes from "./types";

/* User Actions */
export const setUser = user => {
    return {
        types: actionTypes.SET_USER,
        payload: {
            currentUser: user
        }
    };
};

export const clearUser = () => {
    return {
        type: actionTypes.CLEAR_USER
    };
};