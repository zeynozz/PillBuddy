import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MedicationContext } from "../context/MedicationContext";
import medications from "./medication.json"; // Adjust the path as necessary

const AddMedication = () => {
    const [searchText, setSearchText] = useState("");
    const [filteredMedications, setFilteredMedications] = useState([]);
    const { addMedication } = useContext(MedicationContext);
    const navigation = useNavigation();

    const searchMedications = (text) => {
        setSearchText(text);
        if (text) {
            const filtered = medications.filter((med) =>
                med.name.toLowerCase().includes(text.toLowerCase()) ||
                med.brandNames.some((brand) =>
                    brand.toLowerCase().includes(text.toLowerCase())
                )
            );
            setFilteredMedications(filtered);
        } else {
            setFilteredMedications([]);
        }
    };

    const selectMedication = (medication) => {
        addMedication(medication);
        navigation.navigate("Home"); // Redirect to Homepage
    };

    const renderMedication = ({ item }) => (
        <TouchableOpacity
            style={styles.medicationItem}
            onPress={() => selectMedication(item)}
        >
            <Text style={styles.medicationName}>{item.name}</Text>
            <Text style={styles.medicationBrands}>
                {item.brandNames.join(", ")}
            </Text>
            <Text style={styles.medicationDescription}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="Enter medication name"
                value={searchText}
                onChangeText={searchMedications}
            />
            <FlatList
                data={filteredMedications}
                renderItem={renderMedication}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    textInput: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        paddingLeft: 8,
        marginBottom: 20,
    },
    medicationItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    medicationName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    medicationBrands: {
        fontSize: 16,
        color: "#555",
    },
    medicationDescription: {
        fontSize: 14,
        color: "#777",
    },
});

export default AddMedication;
