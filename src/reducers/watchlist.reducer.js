import {
    GET_WATCHLIST_REQUEST,
    GET_WATCHLIST_SUCCESS,
    GET_WATCHLIST_FAIL,
    ADD_WATCHLIST_REQUEST,
    ADD_WATCHLIST_SUCCESS,
    ADD_WATCHLIST_FAIL,
    DEL_WATCHLIST_REQUEST,
    DEL_WATCHLIST_SUCCESS,
    DEL_WATCHLIST_FAIL,
    GET_WATCHLIST_RESET,
} from "../types/watchlist.type";

const initialState = {
    isLoading: false,
    data: "",
    isAdding:false,
    isDeleting:false,
    resMessage: null,
    isSendFailed: null,
};
const watchlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WATCHLIST_REQUEST:
        case GET_WATCHLIST_RESET: 
            return {
                ...state,
                resMessage: null,
                isSendFailed: null,
            };       
        case GET_WATCHLIST_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
            };
        case GET_WATCHLIST_FAIL: 
            return {
                ...state,
                isLoading: false,
            };         
        case ADD_WATCHLIST_REQUEST: {
            return {
                ...state,
                isAdding: true,
                resMessage: null,
                isSendFailed: null,
            };
        }
        case ADD_WATCHLIST_SUCCESS:
            return {
                ...state,
                isAddding: true,
                resMessage: action.payload.message,
                isSendFailed: false,
            };
        case ADD_WATCHLIST_FAIL:
            return {
                ...state,
                isAddding: false,
                resMessage: action.payload,
                isSendFailed: true,
            };
        case DEL_WATCHLIST_REQUEST: {
            return {
                ...state,
                isDeleting: false,
            };
        }
        case DEL_WATCHLIST_SUCCESS:
            return {
                ...state,
                isDeleting: true,
            };
        case DEL_WATCHLIST_FAIL:
            return {
                ...state,
                isDeleting: false,
            };
        default:
            return state;
    }
};

export default watchlistReducer;
