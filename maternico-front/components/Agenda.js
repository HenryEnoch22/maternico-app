import { useMemo } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import {
    BellAlertIcon,
    CalendarDaysIcon,
    CheckCircleIcon,
    ClockIcon,
    DocumentIcon,
} from "react-native-heroicons/solid";

const Agenda = ({ events }) => {
    const groupedEvents = useMemo(() => {
        const eventMap = new Map();

        events.forEach(event => {
            if (!event.date) return;

            if (!eventMap.has(event.date)) {
                eventMap.set(event.date, []);
            }

            eventMap.get(event.date).push(event);
        });

        eventMap.forEach((dateEvents, date) => {
            dateEvents.sort((a, b) => {
                if (!a.time) return -1;
                if (!b.time) return 1;

                return a.time.localeCompare(b.time);
            });
        });

        return Array.from(eventMap.entries())
            .sort((a, b) => new Date(a[0]) - new Date(b[0]));
    }, [events]);

    const renderEvent = ({ item }) => {
        const getEventIcon = () => {
            if (item.isDone) {
                return <CheckCircleIcon color="#8E44AD" size={24} />;
            }
            if (item.isNotifiable) {
                return <ClockIcon color="#3498DB" size={24} />;
            }
            return <DocumentIcon color="#2ECC71" size={24} />;
        };

        return (
            <TouchableOpacity 
                style={styles.eventCard} 
                activeOpacity={0.7}
                key={item.id}
            >
                <View style={styles.eventCardHeader}>
                    <Text style={styles.eventTitle}>{item.title}</Text>
                    {item.isNotifiable && <BellAlertIcon color="#E74C3C" size={20} />}
                </View>

                <View style={styles.eventCardDetails}>
                    <View style={styles.eventDetailRow}>
                        <CalendarDaysIcon color="#8E44AD" size={20} />
                        <Text style={styles.eventDetailText}>Fecha: {item.date}</Text>
                    </View>
                    
                    {item.time && (
                        <View style={styles.eventDetailRow}>
                            <ClockIcon color="#3498DB" size={20} />
                            <Text style={styles.eventDetailText}>Hora: {item.time}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    const renderDateGroup = ({ item }) => {
        const [date, eventsForDate] = item;
        return (
            <View style={styles.dateGroup}>
                <Text style={styles.dateGroupTitle}>{date}</Text>
                {eventsForDate.map((event, index) => renderEvent({ item: event, index }))}
            </View>
        );
    };

    if (!events.length) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>Mi Agenda</Text>
                <Text style={styles.emptyText}>No hay eventos registrados este mes</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.screenTitle}>Mi Agenda</Text>
            <FlatList
                data={groupedEvents}
                renderItem={renderDateGroup}
                keyExtractor={(item) => item[0]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#343434",
        paddingHorizontal: 20,
        paddingTop: 20,
        marginBottom: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F4F4F4",
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#343434",
        marginBottom: 10,
    },
    emptyText: {
        fontSize: 16,
        color: "#343434",
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    dateGroup: {
        marginBottom: 20,
    },
    dateGroupTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#343434",
        marginBottom: 10,
        backgroundColor: "#E0E0E0",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    eventCard: {
        backgroundColor: "#FEFEFE",
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
        marginTop: 10,
        shadowColor: "#343434",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 20,
    },
    eventCardHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    eventTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: "bold",
        color: "#343434",
        marginLeft: 10,
    },
    eventCardDetails: {
        paddingLeft: 20,
    },
    eventDetailRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    eventDetailText: {
        marginLeft: 10,
        fontSize: 14,
        color: "#343434",
    },
});

export default Agenda;