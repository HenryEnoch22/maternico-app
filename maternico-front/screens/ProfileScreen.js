import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from "react-native";
import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { CameraIcon, EyeIcon } from "react-native-heroicons/outline";
import PrimaryButton from "../components/PrimaryButton";

export default function ProfileScreen() {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();

    const initialData = {
        name: user?.name || "Diana",
        last_name: user?.last_name || "Amaro",
        mother_last_name: user?.mother_last_name || "Amaro",
        email: user?.email || "diana@gmail.com",
        password: "8caractereS",
    };

    const [userData, setUserData] = useState(initialData);


    const [showPassword, setShowPassword] = useState(false);

    const saveChanges = () => {
        navigation.goBack();
    };

    const areThereChanges = JSON.stringify(userData) !== JSON.stringify(initialData);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: "https://randomuser.me/api/portraits/lego/6.jpg" }}
                    style={styles.profileImage}
                />
                <View style={styles.cameraIcon}>
                    <CameraIcon size={16} color="#fff" />
                </View>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.formField}>
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput
                        style={styles.input}
                        value={userData.name}
                        onChangeText={(text) => setUserData({ ...userData, name: text })}
                        placeholder="Escribe tu nombre(s)"
                    />
                </View>

                <View style={styles.formField}>
                    <Text style={styles.label}>Apellido paterno</Text>
                    <TextInput
                        style={styles.input}
                        value={userData.last_name}
                        onChangeText={(text) => setUserData({ ...userData, last_name: text })}
                        placeholder="Escribe tu apellido paterno"
                    />
                </View>

                <View style={styles.formField}>
                    <Text style={styles.label}>Apellido materno</Text>
                    <TextInput
                        style={styles.input}
                        value={userData.mother_last_name}
                        onChangeText={(text) => setUserData({ ...userData, mother_last_name: text })}
                        placeholder="Escribe tu apellido materno"
                    />
                </View>

                <View style={styles.formField}>
                    <Text style={styles.label}>Correo electrónico</Text>
                    <TextInput
                        style={styles.input}
                        value={userData.email}
                        onChangeText={(text) => setUserData({ ...userData, email: text })}
                        placeholder="Escribe tu correo electrónico"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.formField}>
                    <Text style={styles.label}>Contraseña</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            value={userData.password}
                            onChangeText={(text) => setUserData({ ...userData, password: text })}
                            secureTextEntry={!showPassword}
                            placeholder="Escribe tu contraseña"
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <EyeIcon size={20} color="#999" />
                        </TouchableOpacity>
                    </View>
                </View>

                {
                    areThereChanges &&
                    <PrimaryButton text={"Guardar cambios"} onPress={saveChanges} />
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 10,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    saveButton: {
        padding: 8,
    },
    profileSection: {
        alignItems: "center",
        paddingVertical: 20,
        position: "relative",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    cameraIcon: {
        position: "absolute",
        right: "40%",
        bottom: "20%",
        backgroundColor: "#f283b5",
        borderRadius: 15,
        padding: 6,
    },
    formContainer: {
        paddingHorizontal: 16,
        marginTop: 10,
    },
    formField: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 8,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#e1e1e1",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e1e1e1",
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
    },
    passwordInput: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
    },
    eyeIcon: {
        padding: 12,
    },
    phoneContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    countryCode: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e1e1e1",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginRight: 8,
        backgroundColor: "#f9f9f9",
        width: 70,
    },
    dropdownIcon: {
        fontSize: 10,
        color: "#666",
    },
    phoneInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#e1e1e1",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
    },
});