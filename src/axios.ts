import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: "https://candidate.neversitup.com/todo",
});

instance.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const accessToken = window.localStorage.getItem("token");
      if (accessToken) {
        config.headers.set("Authorization", `Bearer ${accessToken}`);
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
