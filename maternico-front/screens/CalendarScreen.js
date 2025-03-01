import React, { useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { CheckCircleIcon, CalendarIcon, InformationCircleIcon, XCircleIcon } from "react-native-heroicons/solid";

const CalendarScreen = () => {
    // Estado para manejar la fecha seleccionada
    const [selectedDate, setSelectedDate] = useState('');
    // Estado para el modal de ayuda
    const [showHelp, setShowHelp] = useState(false);
    // Estado para el modal de eventos
    const [showEvent, setShowEvent] = useState(false);
    // Fecha actual para mostrar el mes correcto
    const currentDate = new Date().toISOString().split('T')[0];

    LocaleConfig.locales['es'] = {
        monthNames: [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre'
        ],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abril', 'Mayo', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        today: "Hoy"
    };

    LocaleConfig.defaultLocale = 'es';

    // Eventos importantes para la mamá
    const mamaEvents = {
        // Estos son ejemplos de eventos que podrían ser relevantes
        [currentDate]: { selected: true, marked: true, selectedColor: '#F9A8D4', description: 'Hoy' },
        // Supongamos que estas son fechas de vacunas o controles médicos
        '2025-03-05': { marked: true, dotColor: '#60A5FA', description: 'Vacuna del bebé' },
        '2025-03-12': { marked: true, dotColor: '#34D399', description: 'Control prenatal' },
        '2025-03-20': { marked: true, dotColor: '#F87171', description: 'Clase prenatal' }
    };

    // Función para manejar cuando se selecciona un día
    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);

        // Si el día tiene un evento, mostrar el modal
        if (mamaEvents[day.dateString]) {
            setShowEvent(true);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mi Calendario de Mamá</Text>
                <TouchableOpacity
                    style={styles.helpButton}
                    onPress={() => setShowHelp(true)}
                >
                    <InformationCircleIcon size={24} color="#9061F9" />
                    <Text style={styles.helpText}>Ayuda</Text>
                </TouchableOpacity>
            </View>

            {/* Instrucciones sencillas */}
            <View style={styles.instructionBox}>
                <CalendarIcon size={20} color="#9061F9" />
                <Text style={styles.instructionText}>
                    Toca en cualquier día para ver tus citas o agregar un recordatorio
                </Text>
            </View>

            {/* Leyenda de colores simple */}
            <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                    <View style={[styles.dot, {backgroundColor: '#60A5FA'}]} />
                    <Text style={styles.legendText}>Vacunas</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.dot, {backgroundColor: '#34D399'}]} />
                    <Text style={styles.legendText}>Controles</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.dot, {backgroundColor: '#F87171'}]} />
                    <Text style={styles.legendText}>Clases</Text>
                </View>
            </View>

            {/* Calendario con configuración más amigable */}
            <Calendar
                style={styles.calendar}
                current={currentDate}
                onDayPress={handleDayPress}
                markedDates={mamaEvents}
                // Configuración para un calendario más amigable
                theme={{
                    // Colores más suaves y amigables
                    calendarBackground: '#FFF',
                    textSectionTitleColor: '#9061F9',
                    selectedDayBackgroundColor: '#F9A8D4',
                    selectedDayTextColor: '#FFF',
                    todayTextColor: '#9061F9',
                    dayTextColor: '#2D3748',
                    textDisabledColor: '#CBD5E0',
                    dotColor: '#F9A8D4',
                    selectedDotColor: '#FFF',
                    arrowColor: '#9061F9',
                    monthTextColor: '#9061F9',
                    // Tamaño de texto más grande para mejor legibilidad
                    textDayFontSize: 16,
                    textMonthFontSize: 18,
                    textDayHeaderFontSize: 14
                }}
            />

            {/* Botón de acción principal */}
            <TouchableOpacity
                style={styles.mainButton}
                onPress={() => {
                    // Aquí iría la lógica para agregar un nuevo evento
                    alert("Aquí podrás agregar un recordatorio importante para tu bebé");
                }}
            >
                <Text style={styles.mainButtonText}>Agregar recordatorio</Text>
            </TouchableOpacity>

            {/* Modal de Ayuda */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showHelp}
                onRequestClose={() => setShowHelp(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>¿Cómo usar tu calendario?</Text>

                        <View style={styles.helpItem}>
                            <Text style={styles.helpNumber}>1</Text>
                            <Text style={styles.helpItemText}>
                                Toca en cualquier día para ver eventos o agregar nuevos
                            </Text>
                        </View>

                        <View style={styles.helpItem}>
                            <Text style={styles.helpNumber}>2</Text>
                            <Text style={styles.helpItemText}>
                                Los puntos de colores muestran diferentes tipos de citas
                            </Text>
                        </View>

                        <View style={styles.helpItem}>
                            <Text style={styles.helpNumber}>3</Text>
                            <Text style={styles.helpItemText}>
                                Usa el botón rosa para agregar un recordatorio nuevo
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setShowHelp(false)}
                        >
                            <Text style={styles.closeButtonText}>Entendido</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal de Evento */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showEvent}
                onRequestClose={() => setShowEvent(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.closeIcon}
                            onPress={() => setShowEvent(false)}
                        >
                            <XCircleIcon size={24} color="#9061F9" />
                        </TouchableOpacity>

                        <Text style={styles.modalTitle}>
                            {selectedDate && mamaEvents[selectedDate]
                                ? mamaEvents[selectedDate].description
                                : "Detalle del evento"}
                        </Text>

                        <View style={styles.eventDetails}>
                            <Text style={styles.eventDate}>{selectedDate}</Text>

                            {/* Aquí irían más detalles del evento */}
                            <View style={styles.eventItem}>
                                <CheckCircleIcon size={20} color="#34D399" />
                                <Text style={styles.eventItemText}>
                                    {selectedDate && mamaEvents[selectedDate] && mamaEvents[selectedDate].description === "Vacuna del bebé"
                                        ? "Vacuna contra: Hepatitis B, Polio"
                                        : selectedDate && mamaEvents[selectedDate] && mamaEvents[selectedDate].description === "Control prenatal"
                                            ? "Control mensual: Peso, presión arterial, crecimiento del bebé"
                                            : "Detalles del evento"}
                                </Text>
                            </View>

                            <View style={styles.eventItem}>
                                <CheckCircleIcon size={20} color="#34D399" />
                                <Text style={styles.eventItemText}>
                                    Hora: 10:00 AM
                                </Text>
                            </View>

                            <View style={styles.eventItem}>
                                <CheckCircleIcon size={20} color="#34D399" />
                                <Text style={styles.eventItemText}>
                                    Lugar: Centro de Salud
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => setShowEvent(false)}
                        >
                            <Text style={styles.actionButtonText}>Ver indicaciones</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
        paddingVertical: "10%",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4A5568',
    },
    helpButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    helpText: {
        marginLeft: 4,
        color: '#9061F9',
        fontSize: 16,
    },
    instructionBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3E8FF',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    instructionText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#4A5568',
        flex: 1,
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 6,
    },
    legendText: {
        fontSize: 14,
        color: '#4A5568',
    },
    calendar: {
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        marginBottom: 24,
    },
    mainButton: {
        backgroundColor: '#F9A8D4',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 24,
    },
    mainButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFF',
        width: '85%',
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4A5568',
        marginBottom: 16,
        textAlign: 'center',
    },
    helpItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        width: '100%',
    },
    helpNumber: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#9061F9',
        color: '#FFF',
        textAlign: 'center',
        lineHeight: 28,
        fontWeight: 'bold',
        marginRight: 12,
    },
    helpItemText: {
        fontSize: 16,
        color: '#4A5568',
        flex: 1,
    },
    closeButton: {
        backgroundColor: '#9061F9',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginTop: 8,
    },
    closeButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeIcon: {
        position: 'absolute',
        top: 12,
        right: 12,
    },
    eventDetails: {
        width: '100%',
        marginBottom: 16,
    },
    eventDate: {
        fontSize: 16,
        color: '#718096',
        marginBottom: 12,
        textAlign: 'center',
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    eventItemText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#4A5568',
    },
    actionButton: {
        backgroundColor: '#9061F9',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    actionButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CalendarScreen;