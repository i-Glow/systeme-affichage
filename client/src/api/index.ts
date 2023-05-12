import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://192.168.144.147:8080/api",
});

export default instance;
