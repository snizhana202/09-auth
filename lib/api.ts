import axios from "axios";

const api = axios.create({
  baseURL: "https://notehub-api.goit.study/api",
  withCredentials: true,
});

export default api;