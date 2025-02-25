import {useContext, useState} from "react";
import {SafeAreaView, View, StyleSheet, Button, Platform} from "react-native";
import FormTextField from "../components/FormTextField";
import AuthContext from "../contexts/AuthContext";

export default function RegisterScreen() {

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [secondLastName, setSecondLastName] = useState("");
    const [birthDate, setBirthDate] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const { setUser } = useContext(AuthContext);

    const handleRegister = async () => {
        try {
            const user = await register({
                name,
                last_name: lastName,
                second_last_name: secondLastName,
                birth_date: birthDate,
                email: email,
                password,
                password_confirmation: confirmPassword,
                device_name: `${Platform.OS} ${Platform.Version}`
            });
            setUser(user);
        } catch (e) {
            console.log(e.message)
        }
    };

    return(
        <SafeAreaView style={styles.wrapper}>
                    <View style={styles.container}>
                        <FormTextField 
                            label="Nombre(s)" 
                            value={name} 
                            onChangeText={(t) => setName(t)} 
                            keyboardType="default"
                            autoCapitalize="none"    
                            errors={errors.name}
                        />
                        <FormTextField 
                            label="Apellido paterno" 
                            value={lastName} 
                            onChangeText={(t) => setLastName(t)} 
                            keyboardType="default"
                            autoCapitalize="none"    
                            errors={errors.lastName}
                        />
                        <FormTextField 
                            label="Apellido materno" 
                            value={secondLastName}
                            onChangeText={(t) => setSecondLastName(t)} 
                            keyboardType="default"
                            autoCapitalize="none"    
                            errors={errors.secondLastName}
                        />
                        <FormTextField 
                            label="Fecha de nacimiento"
                            value={birthDate}
                            onChangeText={(t) => setBirthDate(t)} 
                            keyboardType="birthdate-full"
                            autoCapitalize="none"    
                            errors={errors.birthDate}
                        />
                        <FormTextField 
                            label="Contraseña" 
                            secureTextEntry 
                            value={password} 
                            onChangeText={(t) => setPassword(t)}
                            errors={errors.password}
                        />
                        <FormTextField 
                            label="Confirmar contraseña" 
                            secureTextEntry 
                            value={confirmPassword} 
                            onChangeText={(t) => setConfirmPassword(t)}
                            errors={errors.confirmPassword}
                        />
        
                        <Button title="Login" onPress={() => alert('Registrao hermano')} />
                    </View>
                </SafeAreaView>
    )
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