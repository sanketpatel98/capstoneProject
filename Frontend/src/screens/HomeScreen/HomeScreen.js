import styles from "./style";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { recipeByPantry } from "../../assets/static/recipe";

export default function HomeScreen({ navigation }) {
  const renderItems = ({ item }) => (
    <TouchableOpacity onPress={()=>{
      navigation.navigate("Recipe",{
          item:item
      });
  }}>
      {/* <TouchableOpacity onPress={()=>{
            navigation.navigate("Description",{
                item:item
            });
        }}> */}
      <View style={styles.recipeContainer}>
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.recipeImageBackground}
          imageStyle={{ borderRadius: 14 }}
          resizeMode="cover"
        ></ImageBackground>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            {item.title.length >= 25
              ? item.title.substring(0, 22) + "..."
              : item.title}
          </Text>
          <Text></Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const listFooterItem = () => (
    <TouchableOpacity style={styles.footerContainer}>
      {/* <TouchableOpacity onPress={()=>{
            navigation.navigate("Description",{
                item:item
            });
        }}> */}
      <ImageBackground
        source={require("../../assets/image/add.png")}
        style={styles.footerImageBackground}
        imageStyle={{ borderRadius: 5 }}
        resizeMode="contain"
      ></ImageBackground>
      <View style={styles.footerDescriptionContainer}>
        <Text style={styles.descriptionText}>More Recipes</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.titleContainer}> */}
      {/* <Text style={styles.titleText}>Hello User, Lets make Something!</Text> */}
      {/* </View> */}
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <Image
            source={require("../../assets/image/topIcon.png")}
            style={styles.topIcon}
          />
          <TouchableOpacity>
            <Image
              source={require("../../assets/image/settings-black.png")}
              style={styles.topIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.greetingsContainer}>
          <Text style={styles.titleText}>Let's Find</Text>
          <Text style={styles.titleText}>Your Recipe! </Text>
        </View>

        <Text style={styles.listTitle}>Recipes using Pantry</Text>
        <FlatList
          data={recipeByPantry}
          renderItem={renderItems}
          keyExtractor={(item) => item.id}
          horizontal={true}
          ListFooterComponent={listFooterItem}
          style={styles.listContainer}
          showsHorizontalScrollIndicator={false}
        />

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
