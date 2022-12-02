import { OPEN_WATCH, CLOSE_WATCH } from "./../types/watch.type";

export const openWatch = () => (dispatch) => {
    dispatch({
        type: OPEN_WATCH,
    });
};
export const closeWatch = () => (dispatch) => {
    dispatch({
        type: CLOSE_WATCH,
    });
};
