import axios  from "axios";


const API = axios.create({
    baseURL: "https://localhost:7129/api"
})

export default API;