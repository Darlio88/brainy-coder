function getAccessToken() {
    const token = localStorage.getItem('token');
    return token;
}

export default getAccessToken;
