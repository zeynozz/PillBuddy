import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

const AddMedication = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Which medication would you like to add?</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter medication name"
                />
                <TouchableOpacity style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>🔍</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    header: {
        backgroundColor: "#e0f7fa",
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#a7e0e2",
        borderRadius: 5,
        padding: 10,
        backgroundColor: "#fff",
    },
    textInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        paddingHorizontal: 10,
    },
    searchButton: {
        padding: 10,
        backgroundColor: "#a7e0e2",
        borderRadius: 5,
    },
    searchButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
});

export default AddMedication;
