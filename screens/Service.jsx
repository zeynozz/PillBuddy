/**
 * Service Component
 * Priority: 2
 * This component provides users with access to emergency help or support options.
 * Planned Features:
 * - Link to Shop Apotheke for convenient access to pharmacy services.
 * - Emergency contact integration.
 *
 * This is a placeholder component and will be expanded as part of a later development phase.
 */

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Service = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Service</Text>
            <Text style={styles.text}>Get help with emergencies or contact support here!</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Contact Support</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#198679",
    },
    text: {
        fontSize: 16,
        textAlign: "center",
        color: "gray",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#198679",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Service;
