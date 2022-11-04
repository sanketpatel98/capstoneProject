import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRecipebyPantry } from "../../backendCalls/recipeData";
import styles from "./style";
import { useSelector } from "react-redux";

export default function HomeScreen({ navigation }) {
  const [recipeByPantry, setRecipeByPantry] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState([]);
  const pantry = useSelector((state) => state.pantry.list);
  const [appReady, setAppReady] = useState(false);
  useEffect(() => {
    // pantry.toString()

    getRecipebyPantry(pantry)
      .then((response) => {
        setRecipeByPantry(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pantry]);

  useEffect(() => {
    getRecipebyPantry([
      ["acorn squash", 11482],
      ["adobo sauce", 6979],
    ])
      .then((response) => {
        setPopularRecipes(response);
        setAppReady(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderItems = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Recipe", {
          item: item,
        });
      }}
    >
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
      {appReady && (
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

          {recipeByPantry.length > 0 && (
            <>
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
            </>
          )}

          <Text style={styles.listTitle}>Popular recipes</Text>
          <FlatList
            data={popularRecipes}
            renderItem={renderItems}
            keyExtractor={(item) => item.id}
            horizontal={true}
            ListFooterComponent={listFooterItem}
            style={styles.listContainer}
            showsHorizontalScrollIndicator={false}
          />
          <StatusBar style="auto" />
        </View>
      )}
    </SafeAreaView>
  );
}
