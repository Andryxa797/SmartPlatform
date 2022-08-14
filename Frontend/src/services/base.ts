import axios from "axios";
import { AuthService } from "./auth/auth";

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: { 'Authorization': 'Bearer ' }
});

API.interceptors.request.use((config) => {
    config.headers = { 'Authorization': `Bearer ${localStorage.getItem("_access")}` }
    return config
})

API.interceptors.response.use((config) => {
    return config
}, async (error) => {
    try {
        const originRequest = error.config;
        if (error.response.status === 401 && localStorage.getItem("_refresh")) {
            AuthService.refresh()
                .then(() => {API.request(originRequest)})
                .catch(() => { })
        }
    } catch (e) {
        console.log(e)
    }

})

export { API }