import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, Modal, StyleSheet, Alert } from "react-native";
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
    const [selectedMedication, setSelectedMedication] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isDayComplete, setIsDayComplete] = useState(false);

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
            checkDayCompletion(fetchedMedications);
        } catch (error) {
            console.error("Error fetching medications:", error);
        } finally {
            setLoading(false);
        }
    };

    const checkDayCompletion = (meds) => {
        const todayMeds = meds.filter((med) => med.dosageDate === moment().format("YYYY-MM-DD"));
        const allComplete = todayMeds.length > 0 && todayMeds.every((med) => med.confirmed || med.skipped);

        setIsDayComplete(allComplete);
    };


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


    useFocusEffect(
        React.useCallback(() => {
            loadMedications();
        }, [])
    );

    const handleSkip = (medication) => {
        const currentTime = moment().format("HH:mm");
        setMedications((prevMedications) => {
            const updatedMeds = prevMedications.map((med) =>
                med.id === medication.id
                    ? { ...med, skipped: true, skippedTime: currentTime, confirmed: false }
                    : med
            );
            checkDayCompletion(updatedMeds);
            return updatedMeds;
        });
        setModalVisible(false);
        Alert.alert("Skipped", `${medication.medicationName} was skipped.`);
    };

    const handleConfirm = (medication) => {
        const currentTime = moment().format("HH:mm");
        setMedications((prevMedications) => {
            const updatedMeds = prevMedications.map((med) =>
                med.id === medication.id
                    ? { ...med, confirmed: true, confirmedTime: currentTime, skipped: false }
                    : med
            );
            checkDayCompletion(updatedMeds);
            return updatedMeds;
        });
        setModalVisible(false);
        Alert.alert("Confirmed", `${medication.medicationName} was confirmed.`);
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
            >
                {item.isToday && isDayComplete ? (
                    <Image
                        source={require("../assets/accept.png")} //
                        style={homepageStyles.calendarIcon}
                    />
                ) : null}
            </View>
        </View>
    );

    const renderMedication = ({ item }) => {
        let iconSource = require("../assets/alert.png");
        let actionText = null;

        if (item.skipped) {
            iconSource = require("../assets/cancel.png");
            actionText = `Skipped at ${item.skippedTime}, today`;
        } else if (item.confirmed) {
            iconSource = require("../assets/accept.png");
            actionText = `Taken at ${item.confirmedTime}, today`;
        }

        return (
            <View style={homepageStyles.medicationItem} key={item.id}>
                <View style={homepageStyles.leftSection}>
                    <Image
                        source={require("../assets/fancyPill.png")}
                        style={homepageStyles.pillIcon}
                    />
                    <View>
                        <Text style={homepageStyles.medicationName}>{item.medicationName}</Text>
                        <Text style={homepageStyles.medicationDetails}>
                            {actionText || `${item.dosageFrequency || "N/A"} ${item.medicationForm || ""} @ ${item.dosageTime}`}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        setSelectedMedication(item);
                        setModalVisible(true);
                    }}
                >
                    <Image
                        source={iconSource}
                        style={homepageStyles.alertIcon}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    const renderGroupedMedications = ({ item }) => (
        <View style={homepageStyles.groupedMedications} key={item.time}>
            <Text style={homepageStyles.timeLabel}>{item.time}</Text>
            {item.medications.map((med) => renderMedication({ item: med }))}
        </View>
    );

    return (
        <View style={globalStyles.container}>
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
                ) : (
                    <FlatList
                        data={groupMedicationsByTime()}
                        renderItem={renderGroupedMedications}
                        keyExtractor={(item) => item.time}
                        contentContainerStyle={homepageStyles.medicationListContainer}
                    />
                )}
            </View>

            {/* Modal */}
            {selectedMedication && (
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>✕</Text>
                            </TouchableOpacity>
                            <Image
                                source={require("../assets/fancyPill.png")}
                                style={styles.modalPillIcon}
                            />
                            <Text style={styles.modalHeaderText}>
                                {selectedMedication.medicationName}
                            </Text>
                            <Text style={styles.modalDetailsText}>
                                Planned for {selectedMedication.dosageTime}, today
                            </Text>
                            <Text style={styles.modalDetailsText}>
                                {selectedMedication.dosageFrequency || "N/A"}
                            </Text>
                            <View style={styles.actionButtonsContainer}>
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => handleSkip(selectedMedication)}
                                >
                                    <Image
                                        source={require("../assets/cancel.png")}
                                        style={styles.icon}
                                    />
                                    <Text style={styles.actionButtonText}>Skip</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => handleConfirm(selectedMedication)}
                                >
                                    <Image
                                        source={require("../assets/accept.png")}
                                        style={styles.icon}
                                    />
                                    <Text style={styles.actionButtonText}>Confirm</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => navigation.navigate("AddMedication", { medication: selectedMedication })}
                                >
                                    <Image
                                        source={require("../assets/clock.png")}
                                        style={styles.icon}
                                    />
                                    <Text style={styles.actionButtonText}>Plan New</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    modalPillIcon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    modalHeaderText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalDetailsText: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginBottom: 10,
    },
    actionButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    actionButton: {
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 5,
        alignItems: "center",
    },
    actionButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
});

export default Homepage;
