import React from "react";
import { StyleSheet, View } from "react-native";


const FlexBoxDemo = () => {
    return (
        <View style={styles.containerView}>
            <View style={[styles.box, styles.box1]} />
            <View style={[styles.box, styles.box2]} />
            <View style={[styles.box, styles.box3]} />
        </View>
    );
};

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    box: {
        width: 100,
        height: 100,
    },
    box1: {
        backgroundColor: 'red',
    },
    box2: {
        backgroundColor: 'orange',
        alignSelf: 'flex-start',
    },
    box3: {
        backgroundColor: 'blue',
    },
});

export default FlexBoxDemo;
