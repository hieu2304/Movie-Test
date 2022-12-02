import {
    GET_HISTORY_REQUEST,
    GET_HISTORY_SUCCESS,
    GET_HISTORY_FAIL,
    ADD_HISTORY_REQUEST,
    ADD_HISTORY_SUCCESS,
    ADD_HISTORY_FAIL,
} from "../types/history.type";

const initialState = {
    isLoading: false,
    data: "",
};
const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HISTORY_REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case GET_HISTORY_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
            };
        case GET_HISTORY_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        case ADD_HISTORY_REQUEST:
            return {
                ...state,
                isAdding: true,
            };
        case ADD_HISTORY_SUCCESS:
            return {
                ...state,
                isAdding: true,
            };   
        case ADD_HISTORY_FAIL:
            return {
                ...state,
                isAdding: false,
            };
        default:
            return state;
    }
};

export default historyReducer;
