import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Image } from "react-native";

import Homepage from "../screens/Homepage";
import LoginPage from "../screens/LoginPage";
import Medication from "../screens/Medication";
import AddMedication from "../screens/AddMedication";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Home
const HomeStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Homepage}
                options={{ headerShown: false }} // Hide header for Home
            />
            <Stack.Screen
                name="AddMedication"
                component={AddMedication}
                options={{
                    title: "Add Medication",
                    headerStyle: { backgroundColor: "#007BFF" },
                    headerTintColor: "#fff",
                    headerTitleStyle: { fontWeight: "bold" },
                }}
            />
        </Stack.Navigator>
    );
};

// Stack Navigator for Medication
const MedicationStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Medication"
                component={Medication}
                options={{ headerShown: false }} // Hide header for Medication
            />
            <Stack.Screen
                name="AddMedication"
                component={AddMedication}
                options={{
                    title: "Add Medication",
                    headerStyle: { backgroundColor: "#007BFF" },
                    headerTintColor: "#fff",
                    headerTitleStyle: { fontWeight: "bold" },
                }}
            />
        </Stack.Navigator>
    );
};

// Main Tab Navigator
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        let iconName;

                        if (route.name === "Home") {
                            iconName = require("../assets/navigation/home.png");
                        } else if (route.name === "Login") {
                            iconName = require("../assets/navigation/drugs.png");
                        } else if (route.name === "Medication") {
                            iconName = require("../assets/navigation/drugs.png");
                        }

                        return (
                            <Image
                                source={iconName}
                                style={{
                                    width: 24,
                                    height: 24,
                                    tintColor: focused ? "#007BFF" : "gray",
                                }}
                            />
                        );
                    },
                    tabBarActiveTintColor: "#007BFF",
                    tabBarInactiveTintColor: "gray",
                })}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeStackNavigator}
                    options={{ title: "Home" }}
                />
                <Tab.Screen name="Login" component={LoginPage} />
                <Tab.Screen
                    name="Medication"
                    component={MedicationStackNavigator}
                    options={{ title: "Medication" }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
