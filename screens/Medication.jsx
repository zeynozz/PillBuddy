import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { fetchMedications } from "../database/storage";
import { useFocusEffect } from "@react-navigation/native";

const Medication = ({ navigation }) => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMedications = async () => {
    try {
      setLoading(true);
      const fetchedMedications = await fetchMedications();
      setMedications(fetchedMedications);
    } catch (error) {
      console.error("Fehler beim Laden der Medikamente:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
      React.useCallback(() => {
        loadMedications();
      }, [])
  );

  const renderMedication = ({ item }) => (
      <View style={styles.card}>
        <View style={styles.leftSection}>
          <Image
              source={require("../assets/navigation/drugs.png")}
              style={styles.pillIcon}
          />
          <View>
            <Text style={styles.medicationName}>{item.medicationName}</Text>
            <Text style={styles.medicationDetails}>
              {item.refillReminder.currentStock || "N/A"} {item.medicationForm}
            </Text>
          </View>
        </View>
        <TouchableOpacity
            onPress={() => navigation.navigate("AddMedication", { medicationId: item.id })}
        >
          <Image
              source={require("../assets/pen.png")}
              style={styles.editIcon}
          />
        </TouchableOpacity>
      </View>
  );

  return (
      <View style={styles.container}>
        <Text style={styles.header}>Your Medications</Text>
        {medications.length === 0 ? (
            <Text style={styles.noDataText}>No medications found. Please add one!</Text>
        ) : (
            <FlatList
                data={medications}
                renderItem={renderMedication}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        )}
        <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("AddMedication")}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#198679",
    textAlign: "center",
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  list: {
    paddingBottom: 80,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  pillIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  medicationDetails: {
    fontSize: 14,
    color: "#777",
  },
  editIcon: {
    width: 20,
    height: 20,
    tintColor: "#198679",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#198679",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  addButtonText: {
    fontSize: 32,
    color: "#fff",
    lineHeight: 34,
  },
});

export default Medication;
