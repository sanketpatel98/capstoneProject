import styles from "./style";
import { Text, View, TextInput, SafeAreaView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function PantryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden/>
      <View style={styles.titleContainer}>
        <View style={styles.titleBarContainer}>
          <MaterialCommunityIcons name="magnify" size={25}/>
          <TextInput
            style={styles.serchIngredientTextInput}
            placeholder="Add ingredient in pantry"
            placeholderTextColor={"white"}
            underlineColorAndroid="transparent"
          ></TextInput>
        </View>
      </View>
      <View style={styles.listContainer}>
        <Image
              source={require("../../assets/image/Empty.png")}
              style={styles.emptyImage}
              resizeMode='contain'
            />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
