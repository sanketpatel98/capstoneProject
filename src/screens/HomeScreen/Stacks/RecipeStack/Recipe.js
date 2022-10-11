import styles from "./style";
import { Text, View, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Recipe({ route, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.recipeImageView}>
        <ImageBackground
          source={{ uri: route.params.item.image }}
          style={styles.recipeImageBackground}
          // imageStyle={{ borderBottomLeftRadius:20 }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.recipeDescriptionView}>
        <View style={styles.recipeDescriptionTitleView}>
          <Text numberOfLines={2} style={styles.recipeDescriptionTitleText}>{route.params.item.title}</Text>
        </View>
        <View>
          
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
