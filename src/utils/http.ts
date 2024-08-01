import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:3333/api",
  timeout: 60000,
});

http.interceptors.request.use((config) => {
  if (config.url === "/article/upload") {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    if (config.method === "post") {
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
  }
  config.headers["Authorization"] = localStorage.getItem("__token__") || "";
  return config;
});

http.interceptors.response.use(
  (response) => {
    if (response.data.code === 200) {
      return Promise.resolve(response.data.data);
    } else {
      return Promise.reject(response.data.message);
    }
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);

export default http;
