import {
    GET_EPISODE,
    GET_COMMENT,
    LOAD_COMMENT,
    GET_MOVIE,
    GET_TVSHOW,
    GET_WATCHLATER,
    DELETE_REQUEST,
    DELETE_REQUEST_FAIL,
    DELETE_REQUEST_SUCCESS,
} from "../types/film.type";

const initialState = {
    movie: [],
    tv: [],
    watchLater: [],
    episode: [],
    comment: [],

    isDeleting: false,
    isDeleted: false,
    deleteError: null,
};

const filmReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_COMMENT:
            return {
                ...state,
                comment: [...action.payload],
            };
        case GET_COMMENT:
            var newComments = [...state.comment, ...action.payload];
            return {
                ...state,
                comment: newComments.filter(
                    (v, i, a) => a.findIndex((t) => t.id === v.id) === i
                ),
            };
        case GET_TVSHOW:
            return {
                ...state,
                tv: action.payload,
            };
        case GET_MOVIE:
            return {
                ...state,
                movie: action.payload,
            };
        case GET_WATCHLATER:
            return {
                ...state,
                watchLater: action.payload,
            };
        case GET_EPISODE:
            return {
                ...state,
                episode: action.payload,
            };
        //▼ Delete ▼
        case DELETE_REQUEST:
            return {
                ...state,
                isDeleting: true,
                isDeleted: false,
                deleteError: null,
            };
        case DELETE_REQUEST_FAIL:
            return {
                ...state,
                isDeleting: false,
                isDeleted: true,
                deleteError: action.payload,
            };
        case DELETE_REQUEST_SUCCESS:
            return {
                ...state,
                isDeleting: false,
                isDeleted: true,
                deleteError: null,
            };
        //▲ Delete ▲
        default:
            return state;
    }
};

export default filmReducer;
