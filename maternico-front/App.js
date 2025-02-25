import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import AuthContext from "./contexts/AuthContext";
import { loadUser } from "./services/AuthService";
import { useEffect, useState } from "react";
import RegisterScreen from "./screens/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function App() {

	const [user, setUser] = useState(null);

	useEffect(() => {
		async function runEffect() {
			try {
				const user = await loadUser();
				setUser(user);
			} catch (e) {
				console.error("Error al cargar usuario:", e.response?.data);
			}
		}

		runEffect();
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			<NavigationContainer>
				<Stack.Navigator>
					{user ? (
						<Stack.Screen
							name="Home"
							options={
							{
								headerShown: false,
							}
							}
							component={HomeScreen} />
					) : (
						<>
							<Stack.Screen
								name="Login"
								options={
								{
									headerShown: false,
								}
								}
								component={LoginScreen} />
							<Stack.Screen
								name="Register"
								options={
								{
									headerShown: false,
								}
								}
								component={RegisterScreen} />
						</>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</AuthContext.Provider>
	);
}
