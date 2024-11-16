import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { globalStyles, colors } from "../styles/styles";


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
        <View style={globalStyles.dayItem}>
            <Text style={globalStyles.dayText}>{item.day}</Text>
            <Text style={globalStyles.dateText}>{item.date}</Text>
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
                <TouchableOpacity>
                    <Text style={globalStyles.addButton}>➕</Text>
                </TouchableOpacity>
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
            </View>
        </View>
    );
};

export default Homepage;
