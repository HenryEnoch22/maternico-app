import { View, StyleSheet, Platform, Pressable, Text, Image, ScrollView, Alert } from "react-native";
import FormTextField from "../components/FormTextField";
import { useState, useContext } from "react";
import { register, loadUser } from "../services/AuthService";
import AuthContext from "../contexts/AuthContext";
import PrimaryButton from "../components/PrimaryButton";
import logo from "../assets/logo/MaternicoLogo.png";
import { useNavigation } from "@react-navigation/native";
import CalendarModal from "../components/CalendarModal";

export default function RegisterScreen() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [motherLastName, setMotherLastName] = useState("");
    const [birthDate, setBirthDate] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [selectedDate, setSelectedDate] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);

    const { setUser } = useContext(AuthContext);
    const navigation = useNavigation();

    const formatDateForDisplay = (dateString) => {
        if (!dateString) return "";
        
        const date = new Date(dateString);
        const months = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        
        return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
    };

    const handleDateSelect = (dateString) => {
        setBirthDate(dateString);
        setSelectedDate(formatDateForDisplay(dateString));
    };

    const handleRegister = async () => {
        setErrors({});

        const newErrors = {};
        if (!name) newErrors.name = ["Por favor ingresa tu nombre"];
        if (!lastName) newErrors.last_name = ["Por favor ingresa tu apellido paterno"];
        if (!email) newErrors.email = ["Por favor ingresa tu correo electrónico"];
        if (!password) newErrors.password = ["Por favor crea una contraseña"];
        if (password !== confirmPassword) {
            newErrors.password_confirmation = ["Las contraseñas no coinciden"];
        }
        if (!birthDate) newErrors.birth_date = ["Por favor ingresa tu fecha de nacimiento"];

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await register({
                name,
                last_name: lastName,
                mother_last_name: motherLastName,
                birth_date: birthDate,
                email,
                password,
                password_confirmation: confirmPassword,
                device_name: `${Platform.OS} ${Platform.Version}`
            });

            const user = await loadUser();
            setUser(user);
            
            Alert.alert("¡Bienvenida a MaterniCo!", "Tu cuenta ha sido creada con éxito.");
            
        } catch (e) {
            if (e.response?.status === 422) {
                setErrors(e.response.data.errors);
            } else {
                Alert.alert(
                    "Error de registro",
                    "Hubo un problema al crear tu cuenta. Por favor intenta más tarde."
                );
            }
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.topSection}>
                <Text style={styles.greet}>¡Únete!</Text>
                <Text style={styles.greetFoot}>Crea tu cuenta en MaterniCo</Text>
            </View>

            <View style={styles.bottomSection}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={logo}
                    />
                </View>

                <Text style={styles.title}>Regístrate</Text>

                <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
                    <FormTextField
                        label="Nombre"
                        value={name}
                        onChangeText={(t) => setName(t)}
                        errors={errors.name || []}
                        style={styles.customInput}
                        placeholder="Maria Isabel"
                    />

                    <FormTextField
                        label="Apellido Paterno"
                        value={lastName}
                        onChangeText={(t) => setLastName(t)}
                        errors={errors.last_name || []}
                        style={styles.customInput}
                        placeholder="Garcia"
                    />

                    <FormTextField
                        label="Apellido Materno"
                        value={motherLastName}
                        onChangeText={(t) => setMotherLastName(t)}
                        errors={errors.mother_last_name || []}
                        style={styles.customInput}
                        placeholder="Jimenez"
                    />

                    <View style={styles.datePickerContainer}>
                        <Text style={styles.labelText}>Fecha de Nacimiento</Text>
                        <Pressable 
                            style={styles.customInput} 
                            onPress={() => setShowCalendar(true)}
                        >
                            <Text style={selectedDate ? styles.inputText : styles.placeholderText}>
                                {selectedDate || "Selecciona tu fecha de nacimiento"}
                            </Text>
                        </Pressable>
                        {errors.birth_date && errors.birth_date.map((error, index) => (
                            <Text key={index} style={styles.errorText}>{error}</Text>
                        ))}
                    </View>

                    <FormTextField
                        label="Correo Electrónico"
                        value={email}
                        onChangeText={(t) => setEmail(t)}
                        keyboardType="email-address"
                        errors={errors.email || []}
                        style={styles.customInput}
                        placeholder="ejemplo@correo.com"
                    />

                    <FormTextField
                        label="Contraseña"
                        value={password}
                        onChangeText={(t) => setPassword(t)}
                        secureTextEntry
                        errors={errors.password || []}
                        style={styles.customInput}
                        placeholder="Crea una contraseña segura"
                    />

                    <FormTextField
                        label="Confirmar Contraseña"
                        value={confirmPassword}
                        onChangeText={(t) => setConfirmPassword(t)}
                        secureTextEntry
                        errors={errors.password_confirmation || []}
                        style={styles.customInput}
                        placeholder="Vuelve a escribir tu contraseña"
                    />

                    <Text style={styles.passwordTip}>
                        Usa una contraseña de al menos 8 caracteres que incluya letras y números.
                    </Text>

                    <PrimaryButton 
                        onPress={handleRegister} 
                        text='Crear cuenta' 
                    />

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
                        <Pressable onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.loginLink}>¡Inicia sesión!</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>

            <CalendarModal 
                title="Selecciona tu fecha de nacimiento"
                visible={showCalendar}
                onClose={() => setShowCalendar(false)}
                onDateSelect={handleDateSelect}
                selectedDate={birthDate}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#F283B5",
    },
    topSection: {
        height: "25%",
        paddingHorizontal: 30,
        paddingTop: 50,
        position: "relative",
    },
    greet: {
        color: "white",
        fontWeight: "bold",
        fontSize: 48,
        marginBottom: 4,
    },
    greetFoot: {
        color: "white",
        fontSize: 22,
        marginBottom: 20,
    },
    logoContainer: {
        position: "absolute",
        right: 30,
        top: -40,
        zIndex: 10,
    },
    logo: {
        width: 90,
        height: 90,
        zIndex: 10,
        objectFit: "scale-down",
    },
    bottomSection: {
        flex: 1,
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingTop: 30,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    formContainer: {
        flex: 1,
        paddingTop: 5,
        paddingBottom: 20,
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
    datePickerContainer: {
        marginVertical: 8,
    },
    labelText: {
        fontSize: 16,
        color: "#333333",
        marginBottom: 5,
    },
    inputText: {
        fontSize: 16,
        color: "#333333",
    },
    placeholderText: {
        fontSize: 16,
        color: "#AAAAAA",
    },
    errorText: {
        color: "#FF3B30",
        fontSize: 12,
        marginTop: 4,
    },
    passwordTip: {
        fontSize: 14,
        color: "#666666",
        marginTop: 4,
        marginBottom: 24,
    },
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
        paddingBottom: 30,
    },
    loginText: {
        color: "#666666",
        fontSize: 16,
    },
    loginLink: {
        color: "#F283B5",
        fontWeight: "bold",
        fontSize: 16,
    },
});