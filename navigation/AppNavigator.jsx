import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Image } from "react-native";

import LoginPage from "../screens/LoginPage";
import Homepage from "../screens/Homepage";
import Medication from "../screens/Medication";
import AddMedication from "../screens/AddMedication";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabNavigator = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
                const icons = {
                    Home: require("../assets/navigation/home.png"),
                    Medications: require("../assets/navigation/drugs.png"),
                    Discover: require("../assets/navigation/book.png"),
                    Service: require("../assets/navigation/emergency-kit.png"),
                };

                return (
                    <Image
                        source={icons[route.name]}
                        style={{
                            width: 24,
                            height: 24,
                        }}
                    />
                );
            },
            tabBarActiveTintColor: "#198679",
            tabBarInactiveTintColor: "gray",
        })}
    >
        <Tab.Screen
            name="Home"
            component={HomeStackNavigator}
            options={{ title: "Home" }}
        />
        <Tab.Screen
            name="Medications"
            component={MedicationsStackNavigator}
            options={{ title: "Medications" }}
        />
        <Tab.Screen
            name="Discover"
            component={Medication}
            options={{ title: "Discover" }}
        />
        <Tab.Screen
            name="Service"
            component={Medication}
            options={{ title: "Service" }}
        />
    </Tab.Navigator>
);

const HomeStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={Homepage}
            options={{ title: "Home" }}
        />
        <Stack.Screen
            name="AddMedication"
            component={AddMedication}
            options={{
                title: "Add Medication",
                headerStyle: { backgroundColor: "#fff" },
                headerTintColor: "#000000",
                headerTitleStyle: { fontWeight: "bold" },
            }}
        />
    </Stack.Navigator>
);

const MedicationsStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="MedicationsList"
            component={Medication}
            options={{ title: "Medications" }}
        />
        <Stack.Screen
            name="AddMedication"
            component={AddMedication}
            options={{
                title: "Add Medication",
                headerStyle: { backgroundColor: "#fff" },
                headerTintColor: "#000000",
                headerTitleStyle: { fontWeight: "bold" },
            }}
        />
    </Stack.Navigator>
);

const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={LoginPage}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Main"
                component={MainTabNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;
