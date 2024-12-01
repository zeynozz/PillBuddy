/**
 * Priority: 2
 * Discover Component
 * This module is currently assigned Priority 2, meaning it will be developed and enhanced at a later stage.
 * The focus is currently on higher-priority features. Once the main modules are completed, this component
 * will be revisited and improved.
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Discover = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Discover</Text>
            <Text style={styles.text}>Explore new health tips and features here!</Text>
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
    },
});

export default Discover;
