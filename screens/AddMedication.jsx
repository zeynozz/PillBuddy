import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    Switch,
    Alert,
    FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { saveMedication } from "../database/storage";
import medications from "./medication.json";
import { useNavigation } from "@react-navigation/native";


const AddMedication = () => {
    const navigation = useNavigation();
    const [currentStep, setCurrentStep] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [filteredMedications, setFilteredMedications] = useState([]);
    const [formData, setFormData] = useState({
        medicationName: "",
        medicationForm: "",
        dosageFrequency: "",
        dosageTimeHour: "08",
        dosageTimeMinute: "00",
        additionalInfo: {
            isRequired: false,
            description: "",
        },
        refillReminder: {
            enabled: false,
            currentStock: "",
            threshold: "",
        },
    });

    const steps = [
        {
            question: "Which medication would you like to add?",
            inputType: "text",
            placeholder: "Search for a medication",
            key: "medicationName",
        },
        {
            question: "In what form is the medication?",
            inputType: "options",
            options: ["Pill", "Injection", "Solution (Liquid)", "Drops", "Inhaler", "Powder", "Other"],
            key: "medicationForm",
        },
        {
            question: "How often do you take it?",
            inputType: "options",
            options: ["Once daily", "Twice daily", "More"],
            key: "dosageFrequency",
        },
        {
            question: "When do you need to take the dose?",
            inputType: "time",
            key: "dosageTime",
        },
        {
            question: "Does this medication need to be taken with something additional?",
            inputType: "additional",
            key: "additionalInfo",
        },
        {
            question: "Would you like to be reminded in time for your next refill?",
            inputType: "refill",
            key: "refillReminder",
        },
    ];

    const handleInputChange = (key, value) => {
        if (key === "refillReminder" || key === "additionalInfo") {
            setFormData((prevData) => ({
                ...prevData,
                [key]: { ...prevData[key], ...value },
            }));
        } else {
            setFormData((prevData) => ({ ...prevData, [key]: value }));
        }
    };

    const handleNext = async () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            try {
                const docId = await saveMedication(formData);
                console.log("Daten erfolgreich in Firebase gespeichert mit ID:", docId);
                Alert.alert("Success", "Medication saved successfully!");
                navigation.navigate("Medications");

            } catch (error) {
                console.error("Fehler beim Speichern der Daten:", error);
                Alert.alert("Error", "Failed to save medication. Please try again.");
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const searchMedications = (text) => {
        setSearchText(text);
        if (text) {
            const filtered = medications.filter((med) =>
                med.name.toLowerCase().includes(text.toLowerCase()) ||
                med.brandNames.some((brand) =>
                    brand.toLowerCase().includes(text.toLowerCase())
                )
            );
            setFilteredMedications(filtered);
        } else {
            setFilteredMedications([]);
        }
    };

    const selectMedication = (medication) => {
        setFormData({ ...formData, medicationName: medication.name });
        setFilteredMedications([]);
        setSearchText("");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.header}>
                <Image
                    source={require("../assets/navigation/pills.png")}
                    style={styles.icon}
                />
                <Text style={styles.headerText}>
                    {steps[currentStep].question}
                </Text>
                <Text style={styles.progressText}>{`${currentStep + 1}/${steps.length}`}</Text>
            </View>

            <View style={styles.inputSection}>
                {currentStep === 0 ? (
                    <>
                        <TextInput
                            style={styles.textInput}
                            placeholder={steps[currentStep].placeholder}
                            value={searchText || formData.medicationName}
                            onChangeText={searchMedications}
                        />
                        <FlatList
                            data={filteredMedications}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.medicationItem}
                                    onPress={() => selectMedication(item)}
                                >
                                    <Text style={styles.medicationName}>{item.name}</Text>
                                    <Text style={styles.medicationDetails}>
                                        {item.brandNames.join(", ")}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            style={styles.medicationList}
                        />
                    </>
                ) : currentStep === 3 ? (
                    <View style={styles.timePickerContainer}>
                        <Picker
                            selectedValue={formData.dosageTimeHour}
                            onValueChange={(itemValue) =>
                                handleInputChange("dosageTimeHour", itemValue)
                            }
                            style={{ flex: 1 }}
                        >
                            {[...Array(24)].map((_, hour) => (
                                <Picker.Item
                                    key={hour}
                                    label={hour.toString().padStart(2, "0")}
                                    value={hour.toString().padStart(2, "0")}
                                />
                            ))}
                        </Picker>
                        <Text style={styles.timeSeparator}>:</Text>
                        <Picker
                            selectedValue={formData.dosageTimeMinute}
                            onValueChange={(itemValue) =>
                                handleInputChange("dosageTimeMinute", itemValue)
                            }
                            style={{ flex: 1 }}
                        >
                            {[...Array(60)].map((_, minute) => (
                                <Picker.Item
                                    key={minute}
                                    label={minute.toString().padStart(2, "0")}
                                    value={minute.toString().padStart(2, "0")}
                                />
                            ))}
                        </Picker>
                    </View>
                ) : currentStep === 4 ? (
                    <View>
                        <TouchableOpacity
                            style={styles.radioOptionContainer}
                            onPress={() =>
                                handleInputChange("additionalInfo", { isRequired: true })
                            }
                        >
                            <View style={styles.radioButton}>
                                {formData.additionalInfo.isRequired && (
                                    <View style={styles.radioButtonSelected} />
                                )}
                            </View>
                            <Text style={styles.radioOptionText}>Yes, this medication needs to be taken with something additional.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.radioOptionContainer}
                            onPress={() =>
                                handleInputChange("additionalInfo", { isRequired: false })
                            }
                        >
                            <View style={styles.radioButton}>
                                {!formData.additionalInfo.isRequired && (
                                    <View style={styles.radioButtonSelected} />
                                )}
                            </View>
                            <Text style={styles.radioOptionText}>No, this medication does not need to be taken      with something additional.</Text>
                        </TouchableOpacity>
                        {formData.additionalInfo.isRequired && (
                            <TextInput
                                placeholder="Enter additional details"
                                style={styles.textInput}
                                value={formData.additionalInfo.description}
                                onChangeText={(text) =>
                                    handleInputChange("additionalInfo", { description: text })
                                }
                            />
                        )}
                    </View>
                ) : currentStep === 5 ? (
                        <View style={styles.refillContainer}>
                            <View style={styles.switchRow}>
                                <Text style={styles.switchLabel}>Enable Refill Reminder</Text>
                                <Switch
                                    value={formData.refillReminder.enabled}
                                    onValueChange={(value) =>
                                        handleInputChange("refillReminder", { enabled: value })
                                    }
                                />
                            </View>
                            {formData.refillReminder.enabled && (
                                <View style={styles.refillInputs}>
                                    <View style={styles.inputGroup}>
                                        <Text style={styles.inputLabel}>Current Stock</Text>
                                        <TextInput
                                            placeholder="e.g. 30 tablets"
                                            style={styles.textInput}
                                            value={formData.refillReminder.currentStock}
                                            onChangeText={(text) =>
                                                handleInputChange("refillReminder", { currentStock: text })
                                            }
                                            keyboardType="numeric"
                                        />
                                    </View>
                                    <View style={styles.inputGroup}>
                                        <Text style={styles.inputLabel}>Threshold</Text>
                                        <TextInput
                                            placeholder="e.g. 10 tablets"
                                            style={styles.textInput}
                                            value={formData.refillReminder.threshold}
                                            onChangeText={(text) =>
                                                handleInputChange("refillReminder", { threshold: text })
                                            }
                                            keyboardType="numeric"
                                        />
                                    </View>
                                </View>
                            )}
                        </View>
                    ) : steps[currentStep].inputType === "options" ? (
                    steps[currentStep].options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.radioOptionContainer}
                            onPress={() => handleInputChange(steps[currentStep].key, option)}
                        >
                            <View style={styles.radioButton}>
                                {formData[steps[currentStep].key] === option && (
                                    <View style={styles.radioButtonSelected} />
                                )}
                            </View>
                            <Text style={styles.radioOptionText}>{option}</Text>
                        </TouchableOpacity>
                    ))
                ) : null}
            </View>

            <View style={styles.buttonContainer}>
                {currentStep > 0 && (
                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.buttonText}>
                        {currentStep < steps.length - 1 ? "Next" : "Finish"}
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F8FC",
        padding: 10,
    },
    header: {
        backgroundColor: "#78C9C7",
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#ffffff",
    },
    progressText: {
        fontSize: 16,
        color: "#000",
        fontWeight: "bold",
        position: "absolute",
        top: 15,
        right: 15,
    },
    inputSection: {
        marginVertical: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#B3B3B3",
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
        fontSize: 16,
    },
    medicationList: {
        marginTop: 10,
        maxHeight: 200,
    },
    medicationItem: {
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 5,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 5,
    },
    medicationName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    medicationDetails: {
        fontSize: 14,
        color: "#555",
    },
    radioOptionContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: "#B3B3B3",
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
    },
    radioButton: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#78C9C7",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    radioButtonSelected: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: "#78C9C7",
    },
    radioOptionText: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    backButton: {
        backgroundColor: "#B3B3B3",
        padding: 15,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
    },
    nextButton: {
        backgroundColor: "#5BA09E",
        padding: 15,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
    },
    buttonText: {
        color: "#FFF",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    },
    timePickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
    },
    pickerStyle: {
        flex: 1,
        height: 200,
    },
    timeSeparator: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2D2D2D",
        marginHorizontal: 10,
    },
    refillContainer: {
        padding: 20,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        marginVertical: 10,
    },
    switchRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    switchLabel: {
        fontSize: 16,
        color: "#333333",
        fontWeight: "600",
    },
    inputRow: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 14,
        color: "#555555",
        marginBottom: 5,
    },
});

export default AddMedication;
