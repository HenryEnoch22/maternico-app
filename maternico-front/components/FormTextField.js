import { View, Text, TextInput, StyleSheet } from "react-native";

export default function FormTextField({ label, ...props}) {
    return (
        <View>
            {label && (
                <Text style={styles.label}>
                        {label}
                </Text>
            )}
            <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({  
    label: {
        color: "#334155",
        fontWeight: 500,
    },
    textInput: {
        padding: 10,
        backgroundColor: "#f1f5f9",
        borderColor: "#cbd5e1",
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 4,
    },
});