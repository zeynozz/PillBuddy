/**
 * Medication Component
 * A feature-rich component for managing medications. It allows users to:
 * - View their medications in a visually appealing card format.
 * - Swipe to delete medications with a confirmation dialog.
 * - Edit medications by navigating to the "AddMedication" screen.
 * - Add new medications using a floating action button.
 *
 */

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import { fetchMedications, deleteMedication } from "../database/storage";
import { useFocusEffect } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";

const Medication = ({ navigation }) => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMedications = async () => {
    try {
      setLoading(true);
      const fetchedMedications = await fetchMedications();
      setMedications(fetchedMedications);
    } catch (error) {
      console.error("Error loading medications:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
      React.useCallback(() => {
        loadMedications();
      }, [])
  );

  const handleDelete = async (id) => {
    try {
      await deleteMedication(id);
      setMedications((prev) => prev.filter((med) => med.id !== id));
      Alert.alert("Success", "Medication deleted successfully.");
    } catch (error) {
      console.error("Error deleting medication:", error);
      Alert.alert("Error", "Failed to delete medication.");
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
        "Delete Medication",
        "Are you sure you want to delete this medication?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Delete", style: "destructive", onPress: () => handleDelete(id) },
        ]
    );
  };

  const renderRightActions = () => (
      <View style={styles.deleteBackground}>
        <Text style={styles.deleteText}>Swipe to Delete</Text>
      </View>
  );

  const renderMedication = ({ item }) => (
      <Swipeable
          renderRightActions={renderRightActions}
          onSwipeableRightOpen={() => confirmDelete(item.id)}
      >
        <View style={styles.card}>
          <View style={styles.leftSection}>
            <Image
                source={require("../assets/fancyPill.png")}
                style={styles.pillIcon}
            />
            <View>
              <Text style={styles.medicationName}>{item.medicationName}</Text>
              <Text style={styles.medicationDetails}>
                {item.dosageFrequency || "N/A"} {item.medicationForm || ""}
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
      </Swipeable>
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
    marginTop: 20,
    marginBottom: 40,
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
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    elevation: 1,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  pillIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  medicationDetails: {
    fontSize: 16,
    color: "#777",
  },
  editIcon: {
    width: 24,
    height: 24,
    tintColor: "#198679",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#198679",
    width: 80,
    height: 80,
    borderRadius: 40,
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
  deleteBackground: {
    flex: 1,
    backgroundColor: "#ff4d4f",
    justifyContent: "center",
    alignItems: "flex-end",
    borderRadius: 10,
    marginBottom: 10,
    paddingRight: 20,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Medication;
