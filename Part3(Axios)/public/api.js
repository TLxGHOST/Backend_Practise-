import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm";

const api = axios.create({
  baseURL: "http://localhost:5500"
});

export default api;
