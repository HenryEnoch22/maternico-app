import { useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import EventModal from "../components/EventModal";
import { ArrowLongLeftIcon, CalendarIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import CustomCalendarHeader from "../components/CustomCalendarHeader";
import Agenda from "../components/Agenda";

const CalendarScreen = () => {
	const [selectedDate, setSelectedDate] = useState("");
	const [showEvent, setShowEvent] = useState(false);
	const currentDate = new Date().toISOString().split("T")[0];
	const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth() + 1);

	LocaleConfig.locales["es"] = {
		monthNames: [
			"Enero",
			"Febrero",
			"Marzo",
			"Abril",
			"Mayo",
			"Junio",
			"Julio",
			"Agosto",
			"Septiembre",
			"Octubre",
			"Noviembre",
			"Diciembre",
		],
		monthNamesShort: [
			"Ene",
			"Feb",
			"Mar",
			"Abril",
			"Mayo",
			"Jun",
			"Jul",
			"Ago",
			"Sep",
			"Oct",
			"Nov",
			"Dic",
		],
		dayNames: [
			"Domingo",
			"Lunes",
			"Martes",
			"Miercoles",
			"Jueves",
			"Viernes",
			"Sabado",
		],
		dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
		today: "Hoy",
	};

	LocaleConfig.defaultLocale = "es";
	
	const today = new Date();
	const date = today.toLocaleString("es-MX", { timeZone: "America/Mexico_City", timeStyle: "long" });
	console.log(date);

	const exampleEvents = [
		{
			id: 1,
			title: "Vacuna influenza",
			date: "2024-03-15",
			time: "10:00",
			isNotifiable: true,
			isDone: false,
		},
		{
			id: 2,
			title: "Vacuna Hepalitofitus",
			date: "2024-03-20",
			isNotifiable: false,
			isDone: true,
		},
		{
			id: 3,
			title: "Cita con el pediatra",
			date: "2024-03-25",
			time: "16:45",
			isNotifiable: true,
			isDone: false,
		},
		{
			id: 4,
			title: "Revisión de 6 meses",
			date: "2024-04-02",
			time: "09:15",
			isNotifiable: false,
			isDone: false,
		},
		{
			id: 5,
			title: "Cita médica",
			date: "2024-04-10",
			time: "13:00",
			isNotifiable: true,
			isDone: false,
		},
	];

	const mamaEvents = {
		[currentDate]: {
			selected: true,
			marked: true,
			selectedColor: "#F9A8D4",
			description: "Hoy",
		},
		"2025-03-05": {
			marked: true,
			dotColor: "#60A5FA",
			description: "Vacuna del bebé",
		},
		"2025-03-12": {
			marked: true,
			dotColor: "#34D399",
			description: "Control prenatal",
		},
		"2025-03-20": {
			marked: true,
			dotColor: "#F87171",
			description: "Clase prenatal",
		},
	};

	const handleDayPress = (day) => {
		setSelectedDate(day.dateString);

		if (mamaEvents[day.dateString]) {
			setShowEvent(true);
		}
	};

	const navigation = useNavigation();

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<Pressable onPress={() => navigation.goBack()}>
					<ArrowLongLeftIcon size={28} color="#fefefe" />
				</Pressable>
				<Text style={styles.title}>Mi Calendario</Text>
			</View>

			<View style={{ paddingHorizontal: 16 }}>
				<View style={styles.instructionBox}>
					<CalendarIcon size={20} color="#9061F9" />
					<Text style={styles.instructionText}>
						Toca en cualquier día para ver tus citas o agregar un recordatorio
					</Text>
				</View>

				<View style={styles.legendContainer}>
					<View style={styles.legendItem}>
						<View style={[styles.dot, { backgroundColor: "#60A5FA" }]} />
						<Text style={styles.legendText}>Vacunas</Text>
					</View>
					<View style={styles.legendItem}>
						<View style={[styles.dot, { backgroundColor: "#34D399" }]} />
						<Text style={styles.legendText}>Citas medicas</Text>
					</View>
					<View style={styles.legendItem}>
						<View style={[styles.dot, { backgroundColor: "#F87171" }]} />
						<Text style={styles.legendText}>Revisiones</Text>
					</View>
				</View>

				<Calendar
					style={styles.calendar}
					current={currentDate}
					onDayPress={handleDayPress}
					markedDates={mamaEvents}
					theme={styles.calendarTheme}
					onMonthChange={(e) => setCalendarMonth(e.month)}
					customHeader={(props) => {
						const date = new Date(props.month);
						const month = date.toLocaleString("default", { month: "long" });
						const year = date.getFullYear();

						return (
							<CustomCalendarHeader
								month={month}
								year={year}
								onPressLeft={() => props.addMonth(-1)}
								onPressRight={() => props.addMonth(1)}
							/>
						);
					}}
					dayComponent={({ date, state }) => {
						const isSelected =
							date.dateString === "2025-03-05" ||
							date.dateString === "2025-03-10";

						return (
							<View
								style={{
									width: 30,
									height: 30,
									justifyContent: "center",
									alignItems: "center",
									backgroundColor: isSelected ? "#F392BE" : "transparent",
									borderRadius: 5,
								}}
							>
								<Text
									style={{
										color: isSelected
											? "#FEFEFE"
											: state === "disabled"
											? "#CBD5E0"
											: "#343434",
									}}
								>
									{date.day}
								</Text>
							</View>
						);
					}}
				/>

				<PrimaryButton
					style={styles.mainButton}
					onPress={() => {
						alert("evneto");
					}}
					text="Agregar recordatorio"
				>
					<Text style={styles.mainButtonText}>Agregar recordatorio</Text>
				</PrimaryButton>

			</View>

			<EventModal
				visible={showEvent}
				onClose={() => setShowEvent(false)}
				event={selectedDate ? mamaEvents[selectedDate] : null}
				selectedDate={selectedDate}
			/>
			<ScrollView style={{ marginTop: 24 }}>
				<Agenda events={exampleEvents.filter((item) => {
					const date = new Date(item.date);
					return date.getMonth() + 1 === calendarMonth;
				})} />
			</ScrollView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fefefe",
	},
	header: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		gap: 16,
		backgroundColor: "#F392BE",
		marginBottom: 16,
		paddingHorizontal: 20,
		paddingTop: "10%",
		paddingBottom: "5%",
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#fefefe",
	},
	instructionBox: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#F3E8FF",
		padding: 12,
		borderRadius: 8,
		marginBottom: 16,
	},
	instructionText: {
		marginLeft: 8,
		fontSize: 16,
		color: "#4A5568",
	},
	legendContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 16,
	},
	legendItem: {
		flexDirection: "row",
		alignItems: "center",
	},
	dot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		marginRight: 6,
	},
	legendText: {
		fontSize: 14,
		color: "#4A5568",
	},
	calendar: {
		marginBottom: 24,
	},
	calendarTheme: {
		calendarBackground: "#FEFEFE",
		textSectionTitleColor: "#343434",
		selectedDayBackgroundColor: "transparent",
		selectedDayTextColor: "#FEFEFE",
		todayTextColor: "#F392BE",
		dayTextColor: "#343434",
		textDisabledColor: "#CBD5E0",
		dotColor: "#F9A8D4",
		selectedDotColor: "#FEFEFE",
		textMonthFontWeight: "600",
	},
});

export default CalendarScreen;
