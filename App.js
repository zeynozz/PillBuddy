import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { db } from "./database/firebaseConfig";
import {MedicationProvider} from "./context/MedicationContext";

export default function App() {
  useEffect(() => {
    console.log("Firestore initialized:", db);
  }, []);

  return (
      <SafeAreaView style={styles.container}>

        <MedicationProvider>
          <AppNavigator />
        </MedicationProvider>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
