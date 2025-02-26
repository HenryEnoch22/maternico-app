import {StyleSheet, Text, View} from "react-native";
import {UserCircleIcon} from "react-native-heroicons/solid";

const BabyCard = () => {
    const babyStyles = StyleSheet.create({
        container: {
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            borderRadius: 6,
            backgroundColor: "#fefefe",
            paddingHorizontal: 16,
            paddingVertical: 8,
            // Sombra para iOS
            shadowColor: "#f392be",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            // Sombra para Android
            elevation: 10,
            borderLeftColor: "#f392be",
            borderLeftWidth: 4,
            borderStyle: "solid",
        },
        header: {
            flexDirection: "row",
            gap: 12,
            alignItems: "center",
            marginBottom: 12,
        },
        infoContainer: {
            flexDirection: "row",
            gap: 12,
        },
        data: {
            flexDirection: "column",
            gap: 8,
        },
        dataText: {
            backgroundColor: "#f4d18aa0",
            color: "#343434",
            fontWeight: "600",
            fontSize: 12,
            borderRadius: 4,
            paddingHorizontal: 12,
            paddingVertical: 4,
        }
    })

    return (
        <View style={babyStyles.container}>
            <View style={babyStyles.header}>
                <UserCircleIcon size="30" color="#f392be" />
                <Text style={{fontSize: 18, fontWeight: "bold", color: "#343434"}}>Moisés</Text>
            </View>
            <View style={babyStyles.infoContainer}>
                <View style={babyStyles.data}>
                    <Text style={{fontSize: 20, fontWeight: "bold", color: "#343434"}}>Edad</Text>
                    <Text style={babyStyles.dataText}>8 meses</Text>
                </View>
                <View style={babyStyles.data}>
                    <Text style={{fontSize: 20, fontWeight: "bold", color: "#343434"}}>Próxima vacuna</Text>
                    <Text style={babyStyles.dataText}>Lopiteramida</Text>
                </View>
            </View>
        </View>
    )
}

export default BabyCard;