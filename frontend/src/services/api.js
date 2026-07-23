import axios from "axios";

const api = axios.create({
  baseURL:  "https://agriconnect-7z6l.onrender.com/api",
});

export default api;