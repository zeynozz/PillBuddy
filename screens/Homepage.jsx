import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import moment from "moment";
import { globalStyles } from "../styles/styles";
import homepageStyles from "../styles/homepage";

const Homepage = ({ navigation }) => { // Add navigation prop here
    const [days, setDays] = useState([]);
    const [currentDayIndex, setCurrentDayIndex] = useState(1);
    const flatListRef = useRef(null);

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

    return (
        <View style={globalStyles.container}>
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
                    getItemLayout={(data, index) => ({
                        length: 120,
                        offset: 120 * index,
                        index,
                    })}
                    onScrollToIndexFailed={(info) => {
                        flatListRef.current.scrollToOffset({
                            offset: info.averageItemLength * info.index,
                            animated: true,
                        });
                    }}
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
                    onPress={() => navigation.navigate("AddMedication")} // Use navigation here
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
