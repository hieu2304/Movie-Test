import axios from "axios";
import { history } from "../helper";
const baseURL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
    baseURL: baseURL,
});

axiosInstance.interceptors.response.use(
    (response) => {
        return Promise.resolve(response);
    },
    (error) => {
        const status = error.response ? error.response.status : null;

        if (status !== 401) {
            return Promise.reject(error);
        }
        const refreshToken = localStorage.refreshToken;
        // if don't have refresh token
        if (!refreshToken) {
            history.push("/login");
            return Promise.reject(error);
        }
        const headers = {};
        headers.Authorization = `Bearer ${refreshToken}`;
        const newAxios = axios.create({
            baseURL: baseURL,
            headers,
        });
        return newAxios
            .post(`/auth/refreshtoken`)
            .then((res) => {
                localStorage.setItem("token", res.data.accessToken);
                localStorage.setItem("refreshToken", res.data.accessToken);
                localStorage.refreshToken = res.data.refreshToken;
                error.config.headers[
                    "Authorization"
                ] = `Bearer ${localStorage.token}`;
                error.config.baseURL = baseURL;
                return axiosInstance.request(error.config);
            })
            .catch((err) => {
                const newStatus = err.response ? err.response.status : null;
                if (newStatus !== 401) {
                    return Promise.reject(err);
                }
                history.push("/login");
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                return Promise.reject(err);
            });
    }
);
export default axiosInstance;
