import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { getMedications, deleteMedication } from "../database/storage";

const MedicationsList = () => {
    const [medications, setMedications] = useState([]);

    useEffect(() => {
        const fetchMedications = async () => {
            const data = await getMedications();
            setMedications(data);
        };

        fetchMedications();
    }, []);

    const handleDelete = async (id) => {
        await deleteMedication(id);
        const updatedMedications = medications.filter((med) => med.id !== id);
        setMedications(updatedMedications);
    };

    return (
        <View style={{ padding: 20 }}>
            <FlatList
                data={medications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View
                        style={{
                            padding: 15,
                            marginBottom: 10,
                            backgroundColor: "#f9f9f9",
                            borderRadius: 5,
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <View>
                            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                            <Text>{item.form}</Text>
                            <Text>{item.frequency}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleDelete(item.id)}>
                            <Text style={{ color: "red" }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

export default MedicationsList;
