import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

const days = [
  { id: 1, day: "Monday", date: "04.04" },
  { id: 2, day: "Tuesday", date: "05.04" },
  { id: 3, day: "Wednesday", date: "06.04" },
  { id: 4, day: "Thursday", date: "07.04" },
  { id: 5, day: "Friday", date: "08.04" },
];

const Homepage = () => {
  const navigation = useNavigation();

  const renderDay = ({ item }) => (
    <View style={styles.dayItem}>
      <Text style={styles.dayText}>{item.day}</Text>
      <Text style={styles.dateText}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
        <Text style={styles.username}>Guest</Text>
        <TouchableOpacity>
          <Text style={styles.addButton}>➕</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Carousel */}
      <FlatList
        data={days}
        horizontal
        renderItem={renderDay}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.calendarContainer}
        showsHorizontalScrollIndicator={false}
      />

      {/* Center Content */}
      <View style={styles.centerContent}>
        <Image
          source={require("../assets/PillBuddyIcon.png")}
          style={styles.mascot}
        />
        <Text style={styles.welcomeText}>Welcome to PillBuddy!</Text>
        <Text style={styles.subtitle}>You are all signed up! Let’s get started!</Text>
        <TouchableOpacity
          style={styles.addMedicationButton}
          onPress={() => navigation.navigate("AddMedication")}
        >
          <Text style={styles.addMedicationButtonText}>Add Medication</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "#f0f0f0",
  },
  profileIcon: {
    fontSize: 24,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    fontSize: 24,
    color: "#007BFF",
  },
  calendarContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  dayItem: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    color: "#555",
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mascot: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  addMedicationButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addMedicationButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Homepage;
