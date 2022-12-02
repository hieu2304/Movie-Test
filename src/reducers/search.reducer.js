/* eslint-disable no-case-declarations */
import { GET_SEARCH, FILTER, CHANGE_SEARCH_KEY } from "./../types/search.type";

const initialState = {
    data: [],
    filter: [],
    isFilter: false,
    searchKey: "",
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_SEARCH_KEY:
            return {
                ...state,
                searchKey: action.payload,
            };
        case GET_SEARCH:
            return {
                ...state,
                data: action.payload,
                searchKey: action.payload.searchKey,
            };
        case FILTER:
            let filter =
                action.payload.cat !== "all" && state.data.results
                    ? state.data.results.filter((item) =>
                          item.genres.some(
                              (item) =>
                                  item.toLowerCase() === action.payload.cat
                          )
                      )
                    : [];

            return {
                ...state,
                filter: {
                    results: filter,
                },
                isFilter: action.payload.cat !== "all" ? true : false,
            };
        default:
            return state;
    }
};
export default searchReducer;
