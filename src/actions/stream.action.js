import {
    GET_VIDEO,
    GET_VIDEO_FAIL,
    GET_VIDEO_REQUEST,
} from "./../types/stream.type";
import axios from "./../axios";
export const getMovieVideo = (id) => (dispatch) => {
    dispatch({
        type: GET_VIDEO_REQUEST,
    });
    axios
        .get(`/media/stream/${id}`)
        .then((res) => {
            dispatch({
                type: GET_VIDEO,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: GET_VIDEO_FAIL,
                payload: { msg: "Video link not found" },
            });
        });
};
export const getTvideo = (id, season, episode) => (dispatch) => {
    dispatch({
        type: GET_VIDEO_REQUEST,
    });
    axios
        .get(`/media/stream/${id}?season=${season}&episode=${episode}`)
        .then((res) => {
            dispatch({
                type: GET_VIDEO,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: GET_VIDEO_FAIL,
                payload: { msg: "Video link not found" },
            });
        });
};
export const getSeasonInfo = (id, season) => (dispatch) => {
    axios
        .get(`/media/details/${id}/season/${season}`)
        .then((res) => {
            dispatch({
                type: GET_VIDEO,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: GET_VIDEO_FAIL,
                payload: { msg: "Video link not found" },
            });
        });
};
