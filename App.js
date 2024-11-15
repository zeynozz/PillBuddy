import { StatusBar } from 'expo-status-bar';
import FlexBoxDemo from "./components/FlexBoxDemo";
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Counter from "./components/Counter";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <FlexBoxDemo />
      <Counter />
    </SafeAreaView>
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
    color: 'red',
  }
});
