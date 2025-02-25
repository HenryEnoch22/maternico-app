import axiosLib from 'axios';

const axios = axiosLib.create({
    baseURL: "http://192.168.100.6:8081/api",
    headers: {
        Accept: "application/json",
    }
});

export default axios;