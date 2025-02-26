import axiosLib from 'axios';

const axios = axiosLib.create({
    baseURL: "http://148.226.202.142:8081/api",
    headers: {
        Accept: "application/json",
    }
});

export default axios;