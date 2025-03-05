import { View, StyleSheet, Modal, Text, Pressable } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarModal = ({ title, visible, onClose, onDateSelect, selectedDate }) => {
    const getMaxDate = () => {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 18);
        return date.toISOString().split('T')[0];
    };

    const getMinDate = () => {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 50);
        return date.toISOString().split('T')[0];
    };

    const handleDateSelect = (day) => {
        onDateSelect(day.dateString);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
        >
            <View style={styles.modalContainer}>
                <View style={styles.calendarContainer}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    
                    <Calendar
                        onDayPress={handleDateSelect}
                        maxDate={getMaxDate()}
                        minDate={getMinDate()}
                        initialDate={getMaxDate()}
                        markedDates={{
                            [selectedDate]: { selected: true, selectedColor: '#F283B5' }
                        }}
                        theme={{
                            selectedDayBackgroundColor: '#F283B5',
                            todayTextColor: '#3BC1C1',
                            arrowColor: '#F283B5',
                            monthTextColor: '#1089A7',
                            textDayFontSize: 16,
                            textMonthFontSize: 16,
                            textDayHeaderFontSize: 14
                        }}
                    />
                    
                    <View style={styles.modalButtonContainer}>
                        <Pressable 
                            style={[styles.modalButton, styles.cancelButton]} 
                            onPress={onClose}
                        >
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
    calendarContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '100%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#1089A7',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    modalButton: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginHorizontal: 10,
    },
    cancelButton: {
        backgroundColor: '#F4D18A',
    },
    cancelButtonText: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default CalendarModal;