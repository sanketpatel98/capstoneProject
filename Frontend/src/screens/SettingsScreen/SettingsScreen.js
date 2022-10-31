import styles from "./style";
import { Text, View } from 'react-native';
import { StatusBar } from "expo-status-bar";

export default function SettingScreen() {
    return (
      <View style={styles.container}>
        <Text>Setting Screen</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  