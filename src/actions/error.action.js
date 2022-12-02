import { CLEAR_ERROR, GET_ERRORS } from "../types/error.type";

export const getError = (msg, status, id) => (dispatch) => {
    dispatch({
        type: GET_ERRORS,
        payload: { msg, status, id },
    });
};
export const clearError = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR,
    });
};
