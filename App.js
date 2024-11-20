import React from 'react';
import { StyleSheet } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { MedicationProvider } from './context/MedicationContext'; // Adjust the path to your MedicationContext file

export default function App() {
  return (
      <MedicationProvider>
        <AppNavigator />
      </MedicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redText: {
    color: 'black',
  },
});
