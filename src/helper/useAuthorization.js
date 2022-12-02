const useAuthorization = () => {
    const headers = {};
    if (localStorage.token) {
        headers.Authorization = `Bearer ${localStorage.token}`;
    }
    return headers
}
export { useAuthorization }