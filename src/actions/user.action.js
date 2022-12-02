import { history, useAuthorization } from "../helper";
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT_SUCCESS,
    VERIFY_SUCCESS,
    VERIFY_FAIL,
    REGISTER_RESET,
} from "../types/auth.type";
import axios from "./../axios";
import { clearError, getError } from "./error.action";

//login
export const login = (username, password) => (dispatch) => {
    axios
        .post(
            "/auth/login/",
            { username, password },
            { headers: { Authorization: "" } }
        )
        .then((res) => {
            history.push("/");
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    token: res.data.accessToken,
                    refreshToken: res.data.refreshToken,
                },
            });
            dispatch(loadUser());
            dispatch(clearError());
        })
        .catch((err) => {
            if (err.response) {
                dispatch(
                    getError(
                        err.response.data.error || err.response.data.errors,
                        err.response.status,
                        LOGIN_FAIL
                    )
                );
            }
            dispatch({
                payload: {
                    msg: "Server error!!!",
                    status: 500,
                    id: LOGIN_FAIL,
                },
                type: LOGIN_FAIL,
            });
        });
};
//register
export const register = (
    username,
    displayName,
    email,
    password,
    confirmPassword,
    dateOfBirth
) => (dispatch) => {
    const body = {
        username,
        displayName,
        email,
        password,
        confirmPassword,
        dateOfBirth,
    };
    axios
        .post("/auth/register/", body)
        .then((res) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
            // alert("success, please check your mail box");
            dispatch(clearError());
        })
        .catch((err) => {
            if (err.response) {
                dispatch(
                    getError(
                        err.response.data.error || err.response.data.errors,
                        err.response.status,
                        REGISTER_FAIL
                    )
                );
            }
            dispatch({
                payload: {
                    msg: "Server error!!!",
                    status: 500,
                    id: REGISTER_FAIL,
                },
                type: REGISTER_FAIL,
            });
        });
};

//verify Email
export const verifyEmail = (activationCode) => (dispatch) => {
    axios
        .post("/auth/confirmemail/", {
            activationCode,
            headers: useAuthorization(),
        })
        .then((res) => {
            dispatch({
                type: VERIFY_SUCCESS,
                payload: res.data,
            });
            // alert("Email confirmed!");

            dispatch(clearError());

            setTimeout(() => {
                history.push("/login");
                dispatch({
                    type: VERIFY_FAIL,
                    payload: res.data,
                });
            }, 5000);
        })
        .catch((err) => {
            if (err.response) {
                dispatch(
                    getError(
                        err.response.data.error || err.response.data.errors,
                        err.response.status,
                        VERIFY_FAIL
                    )
                );

                //alert("Failed to confirm email!");
            }
            dispatch({
                payload: {
                    msg: "Server error!!!",
                    status: 500,
                    id: VERIFY_FAIL,
                },
                type: VERIFY_FAIL,
            });

            setTimeout(() => {
                history.push("/login");
            }, 2000);
        });
};

//redirect
export const customRedirect = (to) => {
    history.push(to);
};

// token
export const loadUser = () => (dispatch) => {
    const token = localStorage.getItem("token");
    dispatch({
        type: USER_LOADING,
    });
    if (token) {
        axios
            .get("/user", { headers: useAuthorization() })
            .then((res) => {
                dispatch({
                    type: USER_LOADED,
                    payload: res.data,
                });
            })
            .catch((err) => {
                console.log(err);

                // if (err) {
                //     dispatch(
                //         getError((err.response && err.response.data) || "Please login again", err.response.status, AUTH_ERROR)
                //     );
                //     dispatch({
                //         type: AUTH_ERROR,
                //     });
                // }
            });
    } else {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

//logout
export const logout = () => ({
    type: LOGOUT_SUCCESS,
});

//reset register status
export const resetRegister = () => ({
    type: REGISTER_RESET,
});
