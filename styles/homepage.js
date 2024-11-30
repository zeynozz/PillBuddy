import { StyleSheet } from "react-native";
import { colors } from "./styles";

const homepageStyles = StyleSheet.create({
    calendarWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        paddingHorizontal: 20,
    },
    arrowButton: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    arrowText: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.textPrimary,
    },
    calendarContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    dayWrapper: {
        alignItems: "center",
        marginHorizontal: 10,
    },
    dayContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightgray",
    },
    currentDayContainer: {
        backgroundColor: colors.primary,
        borderWidth: 3,
        borderColor: "black",
        width: 80,
        height: 80,
    },
    dayText: {
        fontSize: 16,
        color: "#333",
    },
    currentDayText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
    },
    dateText: {
        fontSize: 14,
        color: "#666",
    },
    currentDateText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
    },

    groupedMedications: {
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    timeLabel: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.textPrimary,
        marginBottom: 10,
        marginLeft: 30,
    },
    medicationItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 40,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        elevation: 1,
        alignSelf: "center",
        width: "90%",
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    pillIcon: {
        width: 40,
        height: 40,
        marginRight: 30,
    },
    medicationName: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.textPrimary,
    },
    alertIcon: {
        width: 40,
        height: 40,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "90%",
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
        justifyContent: "space-around",
        width: "100%",
        marginTop: 20,
    },
    actionButton: {
        alignItems: "center",
        justifyContent: "center",
    },
    skipButton: {
        padding: 10,
        borderRadius: 8,
    },
    confirmButton: {
        padding: 10,
        borderRadius: 8,
    },
    planButton: {
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 5,
    },
    modalIcon: {
        width: 30,
        height: 30,
    },
    medicationDetails: {
        fontSize: 18,
        color: "FFFFFF",
        marginTop: 10,
    },
});

export default homepageStyles;
