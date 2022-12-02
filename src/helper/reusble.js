import axios from "../axios";
import { useAuthorization } from "./useAuthorization";

export const getImageList = (id, type) => {
    let query = `https://api.themoviedb.org/3/movie/{/${id}/images?api_key=9a1fc638397541056dd18c70ea21b96b&language=en-US`;
    if (type === "tv") {
        query = `https://api.themoviedb.org/3/tv/{/${id}/images?api_key=9a1fc638397541056dd18c70ea21b96b&language=en-US&page=1`;
    }
    return new Promise((resolve, reject) => {
        axios
            .get(query, { headers: useAuthorization() })
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};

export const getPopular = () => {
    return new Promise((resolve, reject) => {
        axios
            .get("https://api.themoviedb.org/3/movie/popular?api_key=9a1fc638397541056dd18c70ea21b96b&language=en-US&page=1")
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};

