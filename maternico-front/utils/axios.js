import axiosLib from 'axios';

const axios = axiosLib.create({
    baseURL: "http:///148.226.203.212:8081/api",
    headers: {
        Accept: "application/json",
    }
});

// 148.226.202.142

export default axios;