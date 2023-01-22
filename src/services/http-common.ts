import axios from "axios";

const authAxios = axios.create({
  baseURL: "https://api.realworld.io/api",
  headers: {
    "Content-type": "application/json",
  },
});
authAxios.interceptors.request.use((config: any) => {
  if (localStorage.getItem("user")) {
    try {
      const user = JSON.parse(localStorage.getItem("user") ?? "");
      config.headers.Authorization = `Bearer ${user.token}`;
    } catch (e) {
      console.log(e);
    }
  }
  return config;
});
export default authAxios;
