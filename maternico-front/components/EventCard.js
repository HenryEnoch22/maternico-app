import {StyleSheet, Text, View} from "react-native";
import {CakeIcon, CalendarDaysIcon} from "react-native-heroicons/solid";
import {ClipboardDocumentCheckIcon} from "react-native-heroicons/outline"

const EventCard = ({text, days, typeEvent}) => {

    let Icon = CalendarDaysIcon;

    if (typeEvent === "birthday") {
        Icon = CakeIcon
    } else if (typeEvent === "vaccine") {
        Icon = ClipboardDocumentCheckIcon
    }

    const eventStyles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            padding: 10,
            borderStyle: "solid",
            borderLeftColor: "#f392be",
            borderLeftWidth: 2,
            marginHorizontal: 4,
            borderRadius: 4,
            width: 170,
            maxWidth: 170,
            minHeight: 72,
            backgroundColor: "#fff"
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            fontSize: 12,
            gap: 8,
            marginBottom: 12,
        },
        iconContainer: {
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f392be",
            padding: 2,
            borderRadius: 4,
            alignContent: "flex-start",
        },
        footer: {
            flexDirection: "row",
            justifyContent: "flex-start",
            backgroundColor: "#F4D18Aa0",
            borderRadius: 4,
            paddingHorizontal: 4
        },
        textStyle: {
            color: "#f392be",
            fontWeight: "bold",
            fontSize: 16
        },
        daysStyles: {
            color: "#343434",
            fontWeight: "600"
        }
    })

    return (
        <View style={eventStyles.container}>
            <View style={eventStyles.header}>
                <View style={eventStyles.iconContainer}>
                    <Icon color="#fefefe" size="24" />
                </View>
                <Text style={eventStyles.textStyle}>{text}</Text>
            </View>
            <View style={eventStyles.footer}>
                <Text style={eventStyles.daysStyles}>{`${days} días restantes`}</Text>
            </View>
        </View>
    )
}

export default EventCard;