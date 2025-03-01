import axiosLib from 'axios';

const axios = axiosLib.create({
    baseURL: "http://192.168.1.69:8081/api",
    headers: {
        Accept: "application/json",
    }
});

// 148.226.202.142

export default axios;