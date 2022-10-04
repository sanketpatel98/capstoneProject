import styles from "./style";
import { Text, View } from 'react-native';
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  