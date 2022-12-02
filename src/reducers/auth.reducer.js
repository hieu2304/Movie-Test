import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    REGISTER_RESET,
    LOGOUT_SUCCESS,
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    VERIFY_SUCCESS,
    VERIFY_FAIL,
} from "../types/auth.type";

const initialState = {
    token: localStorage.getItem("token"),
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    user: localStorage.getItem("user"),
    register: false,
    verify: true,
};

const authenReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case USER_LOADED:
            localStorage.setItem("user", JSON.stringify(action.payload));

            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                register: true,
            };

        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("refreshToken", action.payload.refreshToken);
            return {
                ...state,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
                isAuthenticated: true,
                isLoading: false,
            };

        case VERIFY_FAIL:
            return {
                ...state,
                verify: false,
            };

        case VERIFY_SUCCESS:
            return {
                ...state,
                verify: true,
            };

        case REGISTER_FAIL:
        case REGISTER_RESET:
            return {
                ...state,
                register: false,
            };
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            return {
                ...state,
                token: null,
                refreshToken: null,
                isAuthenticated: false,
                isLoading: false,
                user: null,
                register: false,
            };

        default:
            return state;
    }
};

export default authenReducer;
