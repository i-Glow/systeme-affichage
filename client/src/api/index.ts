import axios from "axios";
const instance = axios.create({
    baseURL: 'https://api.example.com/api'
  });
  export default instance;