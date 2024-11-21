import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Modal,
    StyleSheet,
} from "react-native";
import moment from "moment";
import { globalStyles } from "../styles/styles";
import homepageStyles from "../styles/homepage";
import { fetchMedications } from "../database/storage";
import { useFocusEffect } from "@react-navigation/native";

const Homepage = ({ navigation }) => {
    const [days, setDays] = useState([]);
    const [currentDayIndex, setCurrentDayIndex] = useState(1);
    const flatListRef = useRef(null);
    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showWelcome, setShowWelcome] = useState(true);

    // State for modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedMedication, setSelectedMedication] = useState(null);

    useEffect(() => {
        const generateDays = () => {
            const today = moment();
            const tempDays = [];

            for (let i = -1; i <= 1; i++) {
                const day = today.clone().add(i, "days");
                tempDays.push({
                    id: i + 1,
                    day: day.format("dd."),
                    date: day.format("DD.MM"),
                    isToday: i === 0,
                });
            }
            setDays(tempDays);
        };

        generateDays();
    }, []);

    const loadMedications = async () => {
        try {
            setLoading(true);
            const fetchedMedications = await fetchMedications();
            setMedications(fetchedMedications);
        } catch (error) {
            console.error("Error fetching medications:", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadMedications();
        }, [])
    );

    const groupMedicationsByTime = () => {
        const grouped = {};
        medications.forEach((med) => {
            const time = med.dosageTime || `${med.dosageTimeHour.padStart(2, "0")}:${med.dosageTimeMinute.padStart(2, "0")}`;
            if (!grouped[time]) {
                grouped[time] = [];
            }
            grouped[time].push(med);
        });

        return Object.keys(grouped)
            .sort((a, b) => (a > b ? 1 : -1))
            .map((time) => ({ time, medications: grouped[time] }));
    };

    const handleAddMedication = () => {
        setShowWelcome(false);
        navigation.navigate("AddMedication");
    };

    const handleAlertClick = (medication) => {
        setSelectedMedication(medication);
        setIsModalVisible(true);
    };

    const renderDay = ({ item }) => (
        <View style={homepageStyles.dayWrapper}>
            <Text
                style={[
                    homepageStyles.dayText,
                    item.isToday ? homepageStyles.currentDayText : null,
                ]}
            >
                {item.day}
            </Text>
            <Text
                style={[
                    homepageStyles.dateText,
                    item.isToday ? homepageStyles.currentDateText : null,
                ]}
            >
                {item.date}
            </Text>
            <View
                style={[
                    homepageStyles.dayContainer,
                    item.isToday ? homepageStyles.currentDayContainer : null,
                ]}
            />
        </View>
    );

    const renderMedication = ({ item }) => (
        <View style={homepageStyles.medicationItem} key={item.id}>
            <View style={homepageStyles.leftSection}>
                <Image
                    source={require("../assets/fancyPill.png")}
                    style={homepageStyles.pillIcon}
                />
                <View>
                    <Text style={homepageStyles.medicationName}>{item.medicationName}</Text>
                    <Text style={homepageStyles.medicationDetails}>
                        {item.dosageFrequency || "N/A"} {item.medicationForm || ""} @ {item.dosageTime}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => handleAlertClick(item)}
            >
                <Image
                    source={require("../assets/alert.png")}
                    style={homepageStyles.alertIcon}
                />
            </TouchableOpacity>
        </View>
    );

    const renderGroupedMedications = ({ item }) => (
        <View style={homepageStyles.groupedMedications} key={item.time}>
            <Text style={homepageStyles.timeLabel}>{item.time}</Text>
            {item.medications.map((med) => renderMedication({ item: med }))}
        </View>
    );

    return (
        <View style={globalStyles.container}>
            {/* Modal for Medication */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setIsModalVisible(false)}
                        >
                            <Text style={styles.closeText}>X</Text>
                        </TouchableOpacity>
                        {selectedMedication && (
                            <>
                                <Image
                                    source={require("../assets/fancyPill.png")}
                                    style={styles.modalPillIcon}
                                />
                                <Text style={styles.modalMedicationName}>
                                    {selectedMedication.medicationName}
                                </Text>
                                <Text style={styles.modalDetails}>
                                    Planned for {selectedMedication.dosageTime}, today
                                </Text>
                                <Text style={styles.modalDetails}>
                                    {selectedMedication.dosageFrequency}
                                </Text>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            {/* Calendar */}
            <View style={homepageStyles.calendarWrapper}>
                <TouchableOpacity
                    style={homepageStyles.arrowButton}
                    onPress={() => {
                        if (flatListRef.current && currentDayIndex > 0) {
                            const newIndex = Math.max(0, currentDayIndex - 1);
                            flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
                            setCurrentDayIndex(newIndex);
                        }
                    }}
                >
                    <Text style={homepageStyles.arrowText}>{"<"}</Text>
                </TouchableOpacity>

                <FlatList
                    ref={flatListRef}
                    data={days}
                    horizontal
                    renderItem={renderDay}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={homepageStyles.calendarContainer}
                    showsHorizontalScrollIndicator={false}
                    initialScrollIndex={currentDayIndex}
                />

                <TouchableOpacity
                    style={homepageStyles.arrowButton}
                    onPress={() => {
                        if (flatListRef.current && currentDayIndex < days.length - 1) {
                            const newIndex = Math.min(days.length - 1, currentDayIndex + 1);
                            flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
                            setCurrentDayIndex(newIndex);
                        }
                    }}
                >
                    <Text style={homepageStyles.arrowText}>{">"}</Text>
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={globalStyles.centerContent}>
                {loading ? (
                    <ActivityIndicator size="large" color="#198679" />
                ) : showWelcome && medications.length === 0 ? (
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
                            onPress={handleAddMedication}
                        >
                            <Text style={globalStyles.addMedicationButtonText}>
                                Add Medication
                            </Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <FlatList
                        data={groupMedicationsByTime()}
                        renderItem={renderGroupedMedications}
                        keyExtractor={(item) => item.time}
                        contentContainerStyle={homepageStyles.medicationListContainer}
                    />
                )}
            </View>
        </View>
    );
};

export default Homepage;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    closeButton: {
        alignSelf: "flex-end",
        marginBottom: 10,
    },
    closeText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    modalPillIcon: {
        width: 50,
        height: 50,
    },
    modalMedicationName: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
    },
    modalDetails: {
        fontSize: 16,
        marginVertical: 5,
    },
});
