import { SafeAreaView, View, StyleSheet, Button, Platform } from "react-native";
import FormTextField from "../components/FormTextField";
import { useState, useContext } from "react";
import { login, loadUser } from "../services/AuthService";
import AuthContext from "../contexts/AuthContext";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const { setUser } = useContext(AuthContext);

    const handleLogin = async () => {
        setErrors({});

        try {
            await login({
                email,
                password,
                device_name: `${Platform.OS} ${Platform.Version}`
            });

            const user = await loadUser();
            setUser(user);
        } catch (e) {
            console.error("Error:", e);
            if (e.response?.status === 422) {
                setErrors(e.response.data.errors);
            }
        }
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <FormTextField 
                    label="Email address" 
                    value={email} 
                    onChangeText={(t) => setEmail(t)} 
                    keyboardType="email-address"
                    autoCapitalize="none"    
                    errors={errors.email}
                />
                <FormTextField 
                    label="Password" 
                    secureTextEntry 
                    value={password} 
                    onChangeText={(t) => setPassword(t)}
                    errors={errors.password}
                />

                <Button title="Login" onPress={handleLogin} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#fff"
    },
    container: {
        padding: 20,
        rowGap: 16,
    },
});