import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Homepage from "../screens/Homepage";
import LoginPage from "../screens/LoginPage";
import Medication from "../screens/Medication";
import AddMedication from "../screens/AddMedication";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Homepage} />
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

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{ title: "Home" }}
        />
        <Tab.Screen name="Login" component={LoginPage} />
        <Tab.Screen name="Medication" component={Medication} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
