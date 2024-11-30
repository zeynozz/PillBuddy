/**
 * Homepage Component
 * Displays the user's medication schedule, allows them to confirm, skip, or edit medications.
 */

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
    Alert,
} from "react-native";
import moment from "moment";
import { globalStyles } from "../styles/styles";
import homepageStyles from "../styles/homepage";
import {
    fetchMedications,
    saveMedicationLog,
    fetchMedicationLogsByDate,
} from "../database/storage";

const Homepage = ({ navigation }) => {
    const [days, setDays] = useState([]);
    const [currentDayIndex, setCurrentDayIndex] = useState(1);
    const flatListRef = useRef(null);
    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMedication, setSelectedMedication] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isDayComplete, setIsDayComplete] = useState(false);

    // Generate days for the calendar
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
                    fullDate: day.format("YYYY-MM-DD"),
                    isToday: i === 0,
                });
            }
            setDays(tempDays);
            const todayIndex = tempDays.findIndex((d) => d.isToday);
            setCurrentDayIndex(todayIndex);

            setTimeout(() => {
                flatListRef.current?.scrollToIndex({ index: todayIndex, animated: true });
            }, 100);
        };

        generateDays();
    }, []);

    // Load medications and logs
    useEffect(() => {
        const loadMedicationsAndLogs = async () => {
            setLoading(true);
            try {
                const fetchedMedications = await fetchMedications();
                const selectedDate =
                    days[currentDayIndex]?.fullDate || moment().format("YYYY-MM-DD");
                const fetchedLogs = await fetchMedicationLogsByDate(selectedDate);

                const updatedMedications = fetchedMedications.map((med) => {
                    const log = fetchedLogs.find((log) => log.medicationId === med.id);
                    return {
                        ...med,
                        confirmed: log ? log.confirmed : false,
                        skipped: log ? log.skipped : false,
                        actionTime: log ? log.actionTime : null,
                    };
                });

                setMedications([...updatedMedications]);
                checkDayCompletion(updatedMedications);
            } catch (error) {
                console.error("Error loading medications or logs:", error);
            } finally {
                setLoading(false);
            }
        };

        loadMedicationsAndLogs();
    }, [currentDayIndex, days]);

    // Check if all medications for the day are complete
    const checkDayCompletion = (medications) => {
        const allComplete = medications.every(
            (med) => med.confirmed || med.skipped
        );
        setIsDayComplete(allComplete);
    };

    // Handle user actions (confirm/skip)
    const handleMedicationAction = async (medication, action) => {
        const selectedDate =
            days[currentDayIndex]?.fullDate || moment().format("YYYY-MM-DD");
        const currentTime = moment().format("HH:mm");

        try {
            await saveMedicationLog({
                medicationId: medication.id,
                date: selectedDate,
                actionTime: currentTime,
                confirmed: action === "confirm",
                skipped: action === "skip",
            });

            const updatedMedications = medications.map((med) =>
                med.id === medication.id
                    ? {
                        ...med,
                        confirmed: action === "confirm",
                        skipped: action === "skip",
                        actionTime: currentTime,
                    }
                    : med
            );

            setMedications([...updatedMedications]);
            checkDayCompletion(updatedMedications);
            setModalVisible(false);
            Alert.alert(
                action === "confirm" ? "Confirmed" : "Skipped",
                `${medication.medicationName} was ${action}.`
            );
        } catch (error) {
            console.error(`Error saving ${action} log:`, error);
            Alert.alert("Error", `Failed to save ${action} log.`);
        }
    };

    // Group medications by time
    const groupMedicationsByTime = () => {
        const grouped = {};
        medications.forEach((med) => {
            const time = med.dosageTime || `${String(med.dosageTimeHour).padStart(2, "0")}:${String(med.dosageTimeMinute).padStart(2, "0")}`;
            if (!grouped[time]) {
                grouped[time] = [];
            }
            grouped[time].push(med);
        });

        return Object.keys(grouped)
            .sort()
            .map((time) => ({ time, medications: grouped[time] }));
    };

    // Render a calendar day
    const renderDay = ({ item, index }) => {
        let iconSource = null;

        if (index === currentDayIndex) {
            iconSource = isDayComplete
                ? require("../assets/check.png")
                : require("../assets/question.png");
        }

        return (
            <View style={homepageStyles.dayWrapper}>
                <Text
                    style={[
                        homepageStyles.dayText,
                        index === currentDayIndex ? homepageStyles.currentDayText : null,
                    ]}
                >
                    {item.day}
                </Text>
                <Text
                    style={[
                        homepageStyles.dateText,
                        index === currentDayIndex ? homepageStyles.currentDateText : null,
                    ]}
                >
                    {item.date}
                </Text>
                <View
                    style={[
                        homepageStyles.dayContainer,
                        index === currentDayIndex
                            ? homepageStyles.currentDayContainer
                            : null,
                    ]}
                >
                    {iconSource && (
                        <Image
                            source={iconSource}
                            style={{ width: 50, height: 50, resizeMode: "contain" }}
                        />
                    )}
                </View>
            </View>
        );
    };

    // Render a medication item
    const renderMedication = ({ item }) => {
        let iconSource = require("../assets/alert.png");
        let actionText = "No action recorded";

        if (item.skipped) {
            iconSource = require("../assets/cancel.png");
            actionText = item.actionTime
                ? `Skipped at ${item.actionTime}`
                : "Skipped, no time available";
        } else if (item.confirmed) {
            iconSource = require("../assets/accept.png");
            actionText = item.actionTime
                ? `Taken at ${item.actionTime}`
                : "Confirmed, no time available";
        }

        return (
            <View
                style={homepageStyles.medicationItem}
                key={`${item.id}-${item.actionTime}`}
            >
                <View style={homepageStyles.leftSection}>
                    <Image
                        source={require("../assets/fancyPill.png")}
                        style={homepageStyles.pillIcon}
                    />
                    <View>
                        <Text style={homepageStyles.medicationName}>
                            {item.medicationName}
                        </Text>
                        <Text style={homepageStyles.medicationDetails}>
                            {actionText}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        setSelectedMedication(item);
                        setModalVisible(true);
                    }}
                >
                    <Image source={iconSource} style={homepageStyles.alertIcon} />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={globalStyles.container}>
            {/* Calendar */}
            <View style={homepageStyles.calendarWrapper}>
                <TouchableOpacity
                    style={homepageStyles.arrowButton}
                    onPress={() => {
                        if (currentDayIndex > 0) {
                            setCurrentDayIndex((prev) => prev - 1);
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
                    extraData={currentDayIndex}
                    showsHorizontalScrollIndicator={false}
                />

                <TouchableOpacity
                    style={homepageStyles.arrowButton}
                    onPress={() => {
                        if (currentDayIndex < days.length - 1) {
                            setCurrentDayIndex((prev) => prev + 1);
                        }
                    }}
                >
                    <Text style={homepageStyles.arrowText}>{">"}</Text>
                </TouchableOpacity>
            </View>

            {/* Medication List */}
            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList
                    data={groupMedicationsByTime()}
                    keyExtractor={(item, index) => `${item.time}-${index}`}
                    extraData={medications}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={homepageStyles.timeLabel}>{item.time}</Text>
                            {item.medications.map((med) => renderMedication({ item: med }))}
                        </View>
                    )}
                />
            )}

            {/* Medication Modal */}
            {selectedMedication && (
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={homepageStyles.modalContainer}>
                        <View style={homepageStyles.modalContent}>
                            <TouchableOpacity
                                style={homepageStyles.closeButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={homepageStyles.closeButtonText}>✕</Text>
                            </TouchableOpacity>
                            <Image
                                source={require("../assets/fancyPill.png")}
                                style={homepageStyles.modalPillIcon}
                            />
                            <Text style={homepageStyles.modalHeaderText}>
                                {selectedMedication.medicationName}
                            </Text>
                            <Text style={homepageStyles.modalDetailsText}>
                                Planned for {selectedMedication.dosageTime}, today
                            </Text>
                            <View style={homepageStyles.actionButtonsContainer}>
                                <TouchableOpacity
                                    style={[homepageStyles.actionButton, homepageStyles.skipButton]}
                                    onPress={() => handleMedicationAction(selectedMedication, "skip")}
                                >
                                    <Image
                                        source={require("../assets/cancel.png")}
                                        style={homepageStyles.modalIcon}
                                    />
                                    <Text style={homepageStyles.actionButtonText}>Skip</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[homepageStyles.actionButton, homepageStyles.confirmButton]}
                                    onPress={() => handleMedicationAction(selectedMedication, "confirm")}
                                >
                                    <Image
                                        source={require("../assets/accept.png")}
                                        style={homepageStyles.modalIcon}
                                    />
                                    <Text style={homepageStyles.actionButtonText}>Confirm</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[homepageStyles.actionButton, homepageStyles.planButton]}
                                    onPress={() => {
                                        setModalVisible(false);
                                        navigation.navigate("AddMedication", {
                                            medication: selectedMedication,
                                        });
                                    }}
                                >
                                    <Image
                                        source={require("../assets/clock.png")}
                                        style={homepageStyles.modalIcon}
                                    />
                                    <Text style={homepageStyles.actionButtonText}>Plan new</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default Homepage;
