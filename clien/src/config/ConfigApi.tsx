import axios from 'axios';
// const allCookies = document.cookie;
// const cookieArray = allCookies.split(';');
const accessToken: string | null = localStorage.getItem("token") || null;
// for (const cookie of cookieArray) {
//     const [name, value] = cookie.trim().split('=');
//     if (name === 'token') {
//         accessToken = value;
//         break;
//     }
// }
const BASE_URL = 'http://localhost:8080';
const axiosPublic = axios.create({
    baseURL: BASE_URL,
});
const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
});
export { axiosPrivate, axiosPublic }
