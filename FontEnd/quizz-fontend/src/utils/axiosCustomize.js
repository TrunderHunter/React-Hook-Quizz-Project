import axios from "axios";
import NProgress from "nprogress";

const instance = axios.create({
  baseURL: "http://localhost:8081/",
});

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 40,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    NProgress.start();
    // Do something before request is sent
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    NProgress.done();
    // Do something with response data
    // if (response.data.token) {
    //   localStorage.setItem("token", response.data.token);
    // }
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Do something with response error
    // if (error.response.status === 401) {
    //   localStorage.removeItem("token");
    //   window.location.href = "/login";
    // }

    return error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
