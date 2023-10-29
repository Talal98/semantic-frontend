import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  responseType: "json",
  timeout: 20 * 1000, // 20 seconds
});
