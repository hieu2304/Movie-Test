import { getErrorResponse, useAuthorization } from "../helper";
import {
    GET_WATCHLIST_SUCCESS,
    GET_WATCHLIST_REQUEST,
    GET_WATCHLIST_FAIL,
    ADD_WATCHLIST_SUCCESS,
    ADD_WATCHLIST_REQUEST,
    ADD_WATCHLIST_FAIL,
    DEL_WATCHLIST_SUCCESS,
    DEL_WATCHLIST_REQUEST,
    DEL_WATCHLIST_FAIL,
} from "../types/watchlist.type";
import axios from "./../axios";

export const getWatchlist = (page) => (dispatch) => {
    const token = localStorage.getItem("token");
    dispatch({
        type: GET_WATCHLIST_REQUEST,
    });
    if (token) {
        axios
            .get(`/watchlist?limit=20?page=${page}`, { headers: useAuthorization() })
            .then((res) => {
                dispatch({
                    type: GET_WATCHLIST_SUCCESS,
                    payload: res.data,
                });
            })
            .catch((err) => {
                if (err) {
                    const error = getErrorResponse(err);
                    dispatch({
                        type: GET_WATCHLIST_FAIL,
                        paload: error,
                        status: err.response.status,
                    });
                }
            });
    } else {
        dispatch({
            type: GET_WATCHLIST_FAIL,
        });
    }
};

export const addWatchlist = (mediaId) => (dispatch) => {
    const token = localStorage.getItem("token");

  
    dispatch({
        type: ADD_WATCHLIST_REQUEST,
    });
    if (token) {
        axios
            .post('/watchlist', { mediaId }, { headers: useAuthorization() })
            .then((res) => {
                dispatch({
                    type: ADD_WATCHLIST_SUCCESS,
                    payload: res.data,
                });
            })
            .catch((err) => {
                const error = getErrorResponse(err);
                dispatch({
                    type: ADD_WATCHLIST_FAIL, // day laf ADD
                    payload: error,
                });
            });
    } else {
        dispatch({
            type: ADD_WATCHLIST_FAIL,
            payload: "Please try again later!!!",
        });
    }
};
export const delWatchlist = (id) => (dispatch) => {
    const token = localStorage.getItem("token");
    dispatch({
        type: DEL_WATCHLIST_REQUEST,
    });
    if (token) {
        axios
            .delete(`/watchlist/${id}`, { headers: useAuthorization() })
            .then((res) => {
                dispatch({
                    type: DEL_WATCHLIST_SUCCESS,
                    payload: res.data,
                });
            })
            .catch((err) => {
                if (err) {
                    const error = getErrorResponse(err);
                    dispatch({
                        type: DEL_WATCHLIST_FAIL,
                        paload: error,
                        status: err.response.status,
                    });
                }
            });
    } else {
        dispatch({
            type: DEL_WATCHLIST_FAIL,
        });
    }
};

