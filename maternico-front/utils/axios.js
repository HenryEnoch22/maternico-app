import axiosLib from 'axios';

const axios = axiosLib.create({
    baseURL: "http://192.168.1.72:8081",
    headers: {
        Accept: "application/json",
    },
    withCredentials: true,
});

// 148.226.202.142

export default axios;