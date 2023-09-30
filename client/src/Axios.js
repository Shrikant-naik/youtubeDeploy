import axios from "axios";

export const makeRequest = axios.create({
    baseURL:"https://youtube-final-api.vercel.app/api/",
    withCredentials:true
});
