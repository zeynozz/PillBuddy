import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const Counter = () => {
    const [count, setCount] = useState(0);

    const decrement = () => {
        console.log("decrement " + count);
        setCount(count - 1);
    };

    const increment = () => {
        console.log("increment " + count);
        setCount(count + 1);
    };

    const reset = () => {
        setCount(0);
    };

    return (
        <View style={styles.containerView}>
            <TouchableOpacity onPress={decrement} onLongPress={reset}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>-</Text>
                </View>
            </TouchableOpacity>
            <Text style={styles.textView}>{count}</Text>
            <TouchableOpacity onPress={increment}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>+</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    containerView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 80,
        padding: 10,
        width: 200,
    },
    textView: {
        backgroundColor: "lightgrey",
        textAlign: "center",
        fontSize: 24,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        minWidth: 50,
    },
    button: {
        backgroundColor: "darkgrey",
        padding: 15,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 24,
        color: "#fff",
    },
    longPressableButton: {
        backgroundColor: 'darkgrey',
    }
});

export default Counter;
