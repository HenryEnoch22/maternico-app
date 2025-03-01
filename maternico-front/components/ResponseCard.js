import {StyleSheet, Text, View} from "react-native";
import {ChatBubbleLeftEllipsisIcon, ChevronRightIcon} from "react-native-heroicons/solid";

const ResponseCard = () => {
    const responseStyles = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        iconContainer: {
            padding: 8,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: "#f392be",
            borderStyle: "solid",
            color: "#f392be",
            backgroundColor: "#f392be50",
        },
        info: {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 4,
            marginTop: 12
        },
        infoTitle: {
            fontSize: 14,
            fontWeight: "500",
            color: "#343434"
        },
        infoText: {
            backgroundColor: "#f4d18aa0",
            paddingHorizontal: 12,
            paddingVertical: 4,
            fontSize: 12,
            borderRadius: 4,
            color: "#343434",
            fontWeight: "400"
        },
    })
    return (
        <View style={responseStyles.container}>
            <View style={responseStyles.iconContainer}>
                <ChatBubbleLeftEllipsisIcon color="#f283b5" size="32" />
            </View>

            <View style={responseStyles.info}>
                <Text style={responseStyles.infoTitle}>Alguien hizo un comentario en tu foro</Text>
                <View style={responseStyles.infoContainer}>
                    <Text style={responseStyles.infoText}>
                        1 comentario nuevo
                    </Text>
                </View>
            </View>

            <ChevronRightIcon color="#f392be" size="20" />
        </View>
    )
}

export default ResponseCard;