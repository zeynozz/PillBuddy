import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles/styles";

const Medication = () => {
  const navigation = useNavigation();

  return (
      <View style={globalStyles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Medication Page</Text>
        </View>

        {/* Add Medication Button */}
        <View style={styles.addButtonContainer}>
          <TouchableOpacity
              style={globalStyles.addMedicationButton}
              onPress={() => navigation.navigate("AddMedication")}
          >
            <Text style={globalStyles.addMedicationButtonText}>
              Add Medication
            </Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  addButtonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});

export default Medication;
