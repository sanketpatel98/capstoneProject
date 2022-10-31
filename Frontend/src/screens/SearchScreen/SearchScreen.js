import styles from "./style";
import { Text, View } from 'react-native';
import { StatusBar } from "expo-status-bar";

export default function SearchScreen() {
    return (
      <View style={styles.container}>
        <Text>Search Screen</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  