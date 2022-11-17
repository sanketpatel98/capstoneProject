import styles from "./style";
import { Text, View, Image } from 'react-native';
import { StatusBar } from "expo-status-bar";

export default function SearchScreen() {
    return (
      <View style={styles.container}>
        <Image
            source={require("../../assets/image/working.png")}
            style={styles.workingImage}
            resizeMode='contain'
          />
          <Text>Under progress...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  