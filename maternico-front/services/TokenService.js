import * as SecureStore from 'expo-secure-store'

// Elimina la variable global token
export async function clearToken() {
    await SecureStore.deleteItemAsync('token');
}

// Actualiza tu setToken para usar esta función
export async function setToken(newToken) {
    if (newToken) {
        await SecureStore.setItemAsync('token', newToken);
    } else {
        await clearToken();
    }
}

export async function getToken() {
    return await SecureStore.getItemAsync('token')
}