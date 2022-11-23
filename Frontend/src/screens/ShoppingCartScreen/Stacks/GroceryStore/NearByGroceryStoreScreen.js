import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import styles from "./style";

export default function NearByGroceryStoreScreen({ route, navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ uri: `https://www.google.com/search?q=${route.params.ingredient.name}+near+me` }} />
    </SafeAreaView>
  );
}
