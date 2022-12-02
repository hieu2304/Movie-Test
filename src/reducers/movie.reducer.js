import {
    GET_MOVIE_INFO,
    GET_TV_INFO,
    GET_MOVIE_REQUEST,
    GET_MOVIE_REQUEST_FAIL,
    RESET_ERROR,
} from "./../types/movie.type";

const initialState = {
    isLoading: false,
    isLoaded: true,
    data: {},
    type: "movie",
    error: null,
};

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_ERROR:
            return {
                ...state,
                error: null,
            };
        case GET_MOVIE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isLoaded: false,
                error: null,
            };
        case GET_TV_INFO:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isLoaded: true,
                type: "tv",
                error: null,
            };
        case GET_MOVIE_INFO:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isLoaded: true,
                type: "movie",
                error: null,
            };
        case GET_MOVIE_REQUEST_FAIL:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload,
            };
        default:
            return state;
    }
};
export default movieReducer;
