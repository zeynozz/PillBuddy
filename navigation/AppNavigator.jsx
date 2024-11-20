import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Image } from "react-native";

import Homepage from "../screens/Homepage";
import Medication from "../screens/Medication";
import AddMedication from "../screens/AddMedication";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStackNavigator = () => {
    return (
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
};

const MedicationsStackNavigator = () => {
    return (
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
};

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        let iconName;

                        if (route.name === "Home") {
                            iconName = focused
                                ? require("../assets/navigation/home.png")
                                : require("../assets/navigation/home.png");
                        } else if (route.name === "Medications") {
                            iconName = focused
                                ? require("../assets/navigation/drugs.png")
                                : require("../assets/navigation/drugs.png");
                        } else if (route.name === "Discover") {
                            iconName = focused
                                ? require("../assets/navigation/book.png")
                                : require("../assets/navigation/book.png");
                        } else if (route.name === "Service") {
                            iconName = focused
                                ? require("../assets/navigation/emergency-kit.png")
                                : require("../assets/navigation/emergency-kit.png");
                        }

                        return (
                            <Image
                                source={iconName}
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
        </NavigationContainer>
    );
};

export default AppNavigator;
