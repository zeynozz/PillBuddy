import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, View, Text, Image } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { db } from "./database/firebaseConfig";
import { MedicationProvider } from "./context/MedicationContext";

export default function App() {
    useEffect(() => {
        console.log("Firestore initialized:", db);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Global Header */}
            <View style={styles.headerContainer}>
                <Image
                    source={require("./assets/user.png")}
                    style={styles.userIcon}
                />
                <Text style={styles.headerText}>Guest</Text>
            </View>

            {/* Main Navigation */}
            <MedicationProvider>
                <AppNavigator />
            </MedicationProvider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    userIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
});
