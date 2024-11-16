import { StyleSheet, Platform } from "react-native";

export const colors = {
    primary: "#99D7D4",
    textPrimary: "#000000",
    textSecondary: "#FFFFFF",
    background: "#FFFFFF",
    accent: "#198679",
    border: "#D9D9D9",
};

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    centerContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
        fontFamily: Platform.select({
            ios: "Poppins_700Bold",
            android: "Poppins_700Bold",
            default: "Arial",
        }),
    },
    addButton: {
        fontSize: 24,
        color: colors.accent,
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
        fontFamily: Platform.select({
            ios: "Poppins_700Bold",
            android: "Poppins_700Bold",
            default: "Arial",
        }),
    },
    dateText: {
        fontSize: 14,
        color: "#555",
        fontFamily: Platform.select({
            ios: "Poppins_400Regular",
            android: "Poppins_400Regular",
            default: "Arial",
        }),
    },

    mascot: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },

    addMedicationButton: {
        backgroundColor: colors.accent,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    addMedicationButtonText: {
        color: colors.textSecondary,
        fontWeight: "bold",
        fontFamily: Platform.select({
            ios: "Poppins_700Bold",
            android: "Poppins_700Bold",
            default: "Arial",
        }),
    },

    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: Platform.select({
            ios: "Poppins_700Bold",
            android: "Poppins_700Bold",
            default: "Arial",
        }),
        textAlign: "center",
        marginBottom: 10,
    },
    normalText: {
        fontSize: 16,
        color: colors.textPrimary,
        textAlign: "center",
        lineHeight: 24,
        fontFamily: Platform.select({
            ios: "Poppins_400Regular",
            android: "Poppins_400Regular",
            default: "Arial",
        }),
        marginBottom: 20,
    },
});
