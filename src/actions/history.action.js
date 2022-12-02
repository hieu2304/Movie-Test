import { getErrorResponse, useAuthorization } from "../helper";
import {
    GET_HISTORY_SUCCESS,
    GET_HISTORY_REQUEST,
    GET_HISTORY_FAIL,
    ADD_HISTORY_SUCCESS,
    ADD_HISTORY_REQUEST,
    ADD_HISTORY_FAIL,
} from "../types/history.type";
import axios from "./../axios";

export const getHistory = (page) => (dispatch) => {
    const token = localStorage.getItem("token");
    dispatch({
        type: GET_HISTORY_REQUEST,
    });
    if (token) {
        axios
            .get(`/history?limit=20?page=${page}`, { headers: useAuthorization() })
            .then((res) => {
                dispatch({
                    type: GET_HISTORY_SUCCESS,
                    payload: res.data,
                });
            })
            .catch((err) => {
                if (err) {
                    const error = getErrorResponse(err);
                    dispatch({
                        type: GET_HISTORY_FAIL,
                        paload: error,
                        status: err.response.status,
                    });
                }
            });
    } else {
        dispatch({
            type: GET_HISTORY_FAIL,
        });
    }
};

export const addHistory = (mediaId) => (dispatch) => {
    const token = localStorage.getItem("token");
    dispatch({
        type: ADD_HISTORY_REQUEST,
    });
    if (token) {
        axios
            .post("/history", {mediaId}, { headers: useAuthorization() })
            .then((res) => {
                dispatch({
                    type: ADD_HISTORY_SUCCESS,
                    payload: res.data,
                });
            })
            .catch((err) => {
                if (err) {
                    const error = getErrorResponse(err);
                    dispatch({
                        type: ADD_HISTORY_FAIL,
                        paload: error,
                        status: err.response.status,
                    });
                }
            });
    } else {
        dispatch({
            type: ADD_HISTORY_FAIL,
        });
    }
};
