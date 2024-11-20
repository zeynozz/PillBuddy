import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles/styles";
import { MedicationContext } from "../context/MedicationContext";

const days = [
    { id: 1, day: "Monday", date: "04.04" },
    { id: 2, day: "Tuesday", date: "05.04" },
    { id: 3, day: "Wednesday", date: "06.04" },
    { id: 4, day: "Thursday", date: "07.04" },
    { id: 5, day: "Friday", date: "08.04" },
];

const Homepage = () => {
    const navigation = useNavigation();
    const { selectedMedications } = useContext(MedicationContext);

    const renderDay = ({ item }) => (
        <View style={globalStyles.dayItem}>
            <Text style={globalStyles.dayText}>{item.day}</Text>
            <Text style={globalStyles.dateText}>{item.date}</Text>
        </View>
    );

    const renderMedication = ({ item }) => (
        <View style={globalStyles.medicationItem}>
            <Text style={globalStyles.medicationName}>{item.name}</Text>
        </View>
    );

    return (
        <View style={globalStyles.container}>
            {/* Top Bar */}
            <View style={globalStyles.topBar}>
                <TouchableOpacity>
                    <Text style={globalStyles.profileIcon}>👤</Text>
                </TouchableOpacity>
                <Text style={globalStyles.username}>Guest</Text>
            </View>

            {/* Calendar Carousel */}
            <FlatList
                data={days}
                horizontal
                renderItem={renderDay}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={globalStyles.calendarContainer}
                showsHorizontalScrollIndicator={false}
            />

            {/* Center Content */}
            <View style={globalStyles.centerContent}>
                {!selectedMedications.length ? (
                    <>
                        <Image
                            source={require("../assets/logo.png")}
                            style={globalStyles.mascot}
                        />
                        <Text style={globalStyles.headerText}>Welcome to PillBuddy!</Text>
                        <Text style={globalStyles.normalText}>
                            You are all signed up! Let’s get started!
                        </Text>
                        <TouchableOpacity
                            style={globalStyles.addMedicationButton}
                            onPress={() => navigation.navigate("AddMedication")}
                        >
                            <Text style={globalStyles.addMedicationButtonText}>
                                Add Medication
                            </Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Text style={globalStyles.medicationHeaderText}>Your Medications:</Text>
                        <FlatList
                            data={selectedMedications}
                            renderItem={renderMedication}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={globalStyles.medicationList}
                        />
                    </>
                )}
            </View>
        </View>
    );
};

export default Homepage;
