import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import LottieView from "lottie-react-native";
import * as LocalAuthentication from "expo-local-authentication";

const LoginPage = ({ navigation }) => {
  const handleGuestLogin = () => {
    navigation.navigate("Main");
  };

  const handleFaceIDLogin = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert("Face ID not available", "Face ID is not set up on this device.");
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Log in with Face ID",
      fallbackLabel: "Use PIN",
    });

    if (result.success) {
      Alert.alert("Success", "You have successfully logged in!");
      navigation.navigate("Main");
    } else {
      Alert.alert("Failed", "Face ID authentication failed. Please try again.");
    }
  };

  return (
      <View style={styles.container}>
        <LottieView
            source={require("../assets/animations/PillScene.json")}
            autoPlay
            loop
            style={styles.animation}
        />

        <Text style={styles.text}>Welcome to PillBuddy!</Text>

        <Image
            source={require("../assets/logo.png")}
            style={styles.image}
        />

        <TouchableOpacity style={styles.button} onPress={handleGuestLogin}>
          <Text style={styles.buttonText}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  animation: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#198679",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#198679",
    padding: 15,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
  },
  faceIDButton: {
    backgroundColor: "#d7999c",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginPage;
