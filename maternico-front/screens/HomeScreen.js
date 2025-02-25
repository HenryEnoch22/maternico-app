import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { logout } from "../services/AuthService";

export default function HomeScreen() {
    const { user, setUser } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await logout();
            setUser(null);
        } catch (e) {
            console.error("Error al cerrar sesión:", e);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido {user?.name}</Text>

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Text style={styles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        marginBottom: 30
    },
    logoutButton: {
        backgroundColor: '#ff4444',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        elevation: 3
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    }
});