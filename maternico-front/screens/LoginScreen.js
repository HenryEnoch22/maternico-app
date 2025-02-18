import { SafeAreaView, View, StyleSheet, Button } from "react-native";
import FormTextField from "../components/FormTextField";
import { useState } from "react";

export default function LoginScreen() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log("Email:", email);
        console.log("Password:", password);
    }
    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <FormTextField 
                    label="Email address" 
                    value={email} 
                    onChangeText={(t) => setEmail(t)} 
                    keyboardType="email-address"
                    autoCapitalize="none"    
                />
                <FormTextField label="Password" secureTextEntry value={password} onChangeText={(t) => setPassword(t)} />

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