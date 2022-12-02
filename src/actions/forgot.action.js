import { getErrorResponse, history, useAuthorization } from "../helper";
import {
    FORGOT_SUCCESS,
    FORGOT_FAIL,
    SENDPASSWORD_SUCCESS,
    SENDPASSWORD_FAIL,
    FORGOT_REQUEST,
    SENDPASSWORD_REQUEST,
} from "../types/forgot.type";
import axios from "./../axios";
import { clearError } from "./error.action";

export const recoveryEmail = (email) => (dispatch) => {
    dispatch({
        type: FORGOT_REQUEST,
    });
    axios
        .post(
            "/auth/sendrecoveryemail/",
            { email },
            { headers: useAuthorization() }
        )
        .then((res) => {
            dispatch({
                type: FORGOT_SUCCESS,
                payload: res.data,
            });
            dispatch(clearError());
        })
        .catch((err) => {
            const error = getErrorResponse(err);
            dispatch({
                type: FORGOT_FAIL,
                payload: error,
            });
        });
};
export const forgotPassword = (recoveryCode, password, confirmPassword) => (
    dispatch
) => {
    const body = {
        recoveryCode,
        password,
        confirmPassword,
    };
    dispatch({
        type: SENDPASSWORD_REQUEST,
    });

    axios
        .post("/auth/resetpassword/", body, { headers: useAuthorization() })
        .then((res) => {
            dispatch({
                type: SENDPASSWORD_SUCCESS,
                payload: res.data,
            });
            dispatch(clearError());
        })
        .catch((err) => {
            if (err.response) {
                const error = getErrorResponse(err);
                dispatch({
                    type: SENDPASSWORD_FAIL,
                    payload: error,
                });
            }
            dispatch({
                payload: {
                    msg: "Server error!!!",
                    status: 500,
                    id: SENDPASSWORD_FAIL,
                },
                type: SENDPASSWORD_FAIL,
            });
        });
};
//redirect
export const customRedirect = (to) => {
    history.push(to);
};
