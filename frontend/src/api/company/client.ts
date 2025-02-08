import axios from "axios";


const baseURL = import.meta.env.DEV ?
    '/company' : import.meta.env.VITE_COMPANY_SERVICE_BASE_URL

const client = axios.create({
    baseURL: baseURL,
    timeout: 1000,
});
  
export default client;