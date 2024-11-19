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
        borderRadius: 40,
        backgroundColor: colors.secondary,
        alignItems: "center",
        justifyContent: "center",
    },
    currentDayContainer: {
        backgroundColor: colors.primary,
        borderWidth: 3,
        borderColor: colors.textPrimary,
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    dayText: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.textPrimary,
        marginBottom: 4,
    },
    currentDayText: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.textPrimary,
        marginBottom: 4,
    },
    dateText: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: 8,
    },
    currentDateText: {
        fontSize: 16,
        color: colors.textPrimary,
        marginBottom: 8,
    },
});

export default homepageStyles;
