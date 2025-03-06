import { View, StyleSheet, Platform, Pressable, Text, Image } from "react-native";
import FormTextField from "../components/FormTextField";
import { useState, useContext } from "react";
import { login, loadUser } from "../services/AuthService";
import AuthContext from "../contexts/AuthContext";
import PrimaryButton from "../components/PrimaryButton";
import logo from "../assets/logo/MaternicoLogo.png";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { setUser } = useContext(AuthContext);
    const navigation = useNavigation();

    const validateForm = () => {
        let isValid = true;
        let newErrors = {};

        if (!email.trim()) {
            newErrors.email = ["El correo electrónico es obligatorio"];
            isValid = false;
        }

        if (!password.trim()) {
            newErrors.password = ["La contraseña es obligatoria"];
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleLogin = async () => {
        setFormSubmitted(true);

        if (!validateForm()) {
            return;
        }

        try {
            await login({
                email,
                password,
                device_name: `${Platform.OS} ${Platform.Version}`
            });

            const user = await loadUser();
            setUser(user);
        } catch (e) {
            if (e.response?.status === 422) {
                setErrors(e.response.data.errors);
            }
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.topSection}>
                <Text style={styles.greet}>Hola!</Text>
                <Text style={styles.greetFoot}>Bienvenida a MaterniCo</Text>
            </View>

            <View style={styles.bottomSection}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={logo}
                    />
                </View>

                <Text style={styles.title}>Iniciar sesión</Text>

                <View style={styles.formContainer}>
                    <FormTextField
                        label="Correo Electrónico"
                        placeholder="ejemplo@correo.com"
                        value={email}
                        onChangeText={(t) => {
                            setEmail(t);
                            if (formSubmitted) {
                                const newErrors = {...errors};
                                if (!t.trim()) {
                                    newErrors.email = ["El correo electrónico es obligatorio"];
                                } else {
                                    delete newErrors.email;
                                }
                                setErrors(newErrors);
                            }
                        }}
                        keyboardType="email-address"
                        errors={errors.email || []}
                        style={styles.customInput}
                    />

                    <FormTextField
                        label="Contraseña"
                        placeholder="********"
                        value={password}
                        onChangeText={(t) => {
                            setPassword(t);
                            if (formSubmitted) {
                                const newErrors = {...errors};
                                if (!t.trim()) {
                                    newErrors.password = ["La contraseña es obligatoria"];
                                } else {
                                    delete newErrors.password;
                                }
                                setErrors(newErrors);
                            }
                        }}
                        secureTextEntry
                        errors={errors.password || []}
                        style={styles.customInput}
                    />

                    <Pressable onPress={() => alert("Este servicio no está disponible por el momento, intenta mas tarde.")}>
                        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
                    </Pressable>

                    <PrimaryButton onPress={handleLogin} text='Iniciar sesión' />

                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>¿No tienes una cuenta? </Text>
                        <Pressable onPress={() => navigation.navigate("Register")}>
                            <Text style={styles.registerLink}>Regístrate!</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#F283B5",
    },
    topSection: {
        height: "40%",
        paddingHorizontal: 30,
        paddingTop: 60,
        position: "relative",
    },
    greet: {
        color: "white",
        fontWeight: "bold",
        fontSize: 52,
        marginBottom: 4,
    },
    greetFoot: {
        color: "white",
        fontSize: 24,
        marginBottom: 20,
    },
    logoContainer: {
        position: "absolute",
        right: 30,
        top: -40,
        zIndex: 10000,
    },
    logo: {
        width: 90,
        height: 90,
        zIndex: 10000,
        objectFit: "scale-down",
    },
    bottomSection: {
        flex: 1,
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingTop: 40,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 24,
    },
    formContainer: {
        paddingTop: 10,
    },
    customInput: {
        padding: 16,
        backgroundColor: "#FFFFFF",
        borderColor: "#E5E5E5",
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 16,
        marginVertical: 8,
    },
    forgotPassword: {
        textAlign: "right",
        color: "#666666",
        marginTop: 4,
        marginBottom: 30,
    },
    button: {
        backgroundColor: "#F283B5",
        borderRadius: 50,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
    },
    registerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
        paddingBottom: 30,
    },
    registerText: {
        color: "#666666",
        fontSize: 15,
    },
    registerLink: {
        color: "#F283B5",
        fontWeight: "bold",
        fontSize: 15,
    }
});