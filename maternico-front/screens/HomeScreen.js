import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, ScrollView} from "react-native";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { logout } from "../services/AuthService";
import {
    CalendarDaysIcon,
    ChevronRightIcon,
    BellIcon, UserCircleIcon, ChatBubbleLeftEllipsisIcon
} from "react-native-heroicons/solid"

const EventCard = ({text, days}) => {

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
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            // Sombra para Android
            elevation: 3,
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
            backgroundColor: "#F4D18A",
            borderRadius: 4,
            paddingHorizontal: 4
        }
    })

    return (
        <View style={eventStyles.container}>
            <View style={eventStyles.header}>
                <View style={eventStyles.iconContainer}>
                    <CalendarDaysIcon color="#fefefe" size="24" />
                </View>
                <Text style={{color: "#f392be", fontWeight: "bold", fontSize: 16}}>{text}</Text>
            </View>
            <View style={eventStyles.footer}>
                <Text style={{color: "#fefefe"}}>{`${days} días restantes`}</Text>
            </View>
        </View>
    )
}

const ResponseCard = () => {
    const responseStyles = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        iconContainer: {
            justifyContent: "center",
            alignItems: "center",
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
            fontWeight: "bold",
        },
        infoText: {
            backgroundColor: "#f4d18a",
            paddingHorizontal: 12,
            paddingVertical: 4,
            fontSize: 12,
            borderRadius: 4,
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
            elevation: 3,
        },
        header: {
            flexDirection: "row",
            gap: 12,
            alignItems: "center",
            marginBottom: 12,
        },
        infoContainer: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 12,
        },
        data: {
            flexDirection: "column",
            gap: 8,
        },
        dataText: {
            backgroundColor: "#f4d18a",
            color: "#fefefe",
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
                <Text style={{fontSize: 18, fontWeight: "bold"}}>Moisés</Text>
            </View>
            <View style={babyStyles.infoContainer}>
                <View style={babyStyles.data}>
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>Edad</Text>
                    <Text style={babyStyles.dataText}>8 meses</Text>
                </View>
                <View style={babyStyles.data}>
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>Próxima vacuna</Text>
                    <Text style={babyStyles.dataText}>Lopiteramida</Text>
                </View>
            </View>
        </View>
    )
}

const data = [
    {
        id: 1,
        name: "Cita médica",
        leftDays: 6,
        icon: CalendarDaysIcon,
    },
    {
        id: 2,
        name: "Cita médica",
        leftDays: 8,
        icon: CalendarDaysIcon,
    },
    {
        id: 3,
        name: "Cita médica",
        leftDays: 11,
        icon: CalendarDaysIcon,
    },
]

export default function HomeScreen() {
    const { user, setUser } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await logout();
            setUser(null);
        } catch (e) {
            console.error("Error al cerrar sesión:", e);
        }
    };

    return (
        // TODO: Layout para incluir navbar
        <ScrollView>
            <View style={styles.topView}> {/*TOP VIEW */}
                <View style={styles.iconsContainer}>
                    <BellIcon size="32" color="#fefefe" />
                    <UserCircleIcon size="32" color="#fefefe" />
                </View>
                <View style={styles.greetContainer}>
                    <Text style={styles.greetTitle}>Hola, <Text style={{fontWeight: "bold"}}>Usuaria!</Text></Text>
                    <Text style={styles.greetFoot}>Bienvenida</Text>
                </View>
            </View>

            <View style={styles.bottomView}> {/*BottomView*/}
                <View style={styles.eventsContainer}>
                    <Text style={styles.sectionTitle}>Proximos Eventos</Text>
                    <View style={styles.events}>
                        <FlatList
                            data={data}
                            horizontal={true} // Hace que la lista sea horizontal
                            showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal
                            renderItem={({item}) => <EventCard text={item.name} days={item.leftDays} />}
                            keyExtractor={item => item.id.toString()} />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Respuestas</Text>
                    <ResponseCard />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tu bebé</Text>
                    <BabyCard />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    topView: {
        backgroundColor: "#f283b5",
        color: "#fefefe",
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        height: "30%",
        justifyContent: "flex-end",
        marginBottom: 30,
    },
    iconsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
    },
    greetContainer: {
        flexDirection: "column",
    },
    greetTitle: {
        fontSize: 32,
        color: "#fefefe",
    },
    greetFoot: {
        fontSize: 20,
        fontWeight: "200",
        color: "#fefefe",
    },
    bottomView: {
        justifyContent: "space-evenly",
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    eventsContainer: {
        gap: 12,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
    },
    events: {
        marginBottom: 40,
    },
    section: {
        marginBottom: 40,
    }
})