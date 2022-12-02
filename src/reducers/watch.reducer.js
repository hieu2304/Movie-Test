import { OPEN_WATCH, CLOSE_WATCH } from "../types/watch.type";

const initialState = {
    isWatch: false,
};

const watchReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_WATCH:
            return {
                isWatch: true,
            };
        case CLOSE_WATCH:
            return {
                isWatch: false,
            };

        default:
            return state;
    }
};

export default watchReducer;
