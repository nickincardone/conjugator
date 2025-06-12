import axios from "axios";

const instance = axios.create({
  // Using cors anywhere for CORS support
  baseURL: "http://localhost:3001/",
});

export default instance;
