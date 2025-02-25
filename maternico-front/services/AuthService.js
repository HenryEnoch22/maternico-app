import { getToken, setToken } from "./TokenService";
import axios from "../utils/axios";

export async function login(credentials) {
    const { data } = await axios.post("/login", credentials);
    await setToken(data.token);
    return data;
}

export async function loadUser() {
    const token = await getToken();

    const { data: user } = await axios.get("/user", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    console.log("Usuario desde API:", user);
    return user;
}

export async function register(userData) {
    const {data} = await axios.post("/register", userData);
    await setToken(data.token);
    return data.user;
}

export async function logout() {
    const token = await getToken();

    await axios.post("/logout", {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    await setToken(null);
}