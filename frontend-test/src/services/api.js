import axios from "axios";

 const api = axios.create({baseURL: "https://backend-vcodes-test.herokuapp.com"});

 export default api;