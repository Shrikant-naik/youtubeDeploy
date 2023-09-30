import axios from "axios";

export const makeRequest = axios.create({
    baseURL:"https://backendyoutube.onrender.com/api/",
    withCredentials:true
});
