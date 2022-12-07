import styles from "./style";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRecipeById } from "../../backendCalls/recipeData";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { removeFromFavourite } from "../../Redux/favouriteRecipesSlice";
import { removeFromFavouriteRecipe } from "../../backendCalls/favouriteRecipe";
import { removeFromCustomRecipe } from "../../backendCalls/customRecipes";
import { removeFromCustom } from "../../Redux/customRecipeSlice";

export default function MyRecipesScreen({ navigation }) {
  const userRef = useSelector((state) => state.user.userRef);
  const custom = useSelector((state) => state.custom.list);
  const dispatch = useDispatch();

  const renderFavourties = ({ item }) => {
    return (
      <View style={styles.recipeContainer}>
        {/* <View style={styles.descriptionContainer}> */}
        <TouchableOpacity
          style={styles.descriptionContainer}
          onPress={() => {
            navigation.navigate("Recipe", {
              item: item,
            });
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.recipeImage}
            resizeMode="cover"
          ></Image>
          {item.title.length > 19 ? (
            <Text numberOfLines={2}> {item.title.slice(0, 20) + "..."} </Text>
          ) : (
            <Text>{item.title}</Text>
          )}
        </TouchableOpacity>
        {/* </View> */}
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => {
              // deleteIngredientFromCart(item);
              removeFromCustomRecipe(item.id, userRef.user.uid)
                .then(() => {
                  dispatch(removeFromCustom(item.id));
                })
                .catch((err) => console.log(err));
            }}
          >
            <MaterialCommunityIcons
              name="delete-outline"
              size={22}
              color={"red"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if ("user" in userRef) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
        <View style={styles.titleContainer}>
          <View style={styles.titleBarContainer}>
            <MaterialCommunityIcons name="magnify" size={25} />
            <TextInput
              style={styles.serchIngredientTextInput}
              placeholder="Search My Recipes"
              placeholderTextColor={"white"}
              underlineColorAndroid="transparent"
            ></TextInput>
          </View>
          <Text style={styles.headerText}>My Recipes</Text>
        </View>
        <View style={styles.listContainer}>
          {custom.length == 0 ? (
          <Image
            source={require("../../assets/image/Favourite.png")}
            style={styles.emptyImage}
            resizeMode="contain"
          />
        ) : (
          <FlatList
            data={custom}
            renderItem={renderFavourties}
            keyExtractor={(item) => item.id}
            style={styles.ingredientListContainer}
            showsHorizontalScrollIndicator={false}
          />
        )}
          <Button
            mode="elevated"
            icon={"plus"}
            onPress={() => {
              navigation.navigate("AddNewRecipe");
            }}
          >
            Add new recipe
          </Button>
        </View>
        <View></View>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  } else {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/image/MyRecipes.png")}
          style={styles.workingImage}
          resizeMode="contain"
        />
        <Button
          mode="elevated"
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          Login to use this feature!
        </Button>
        <StatusBar style="auto" />
      </View>
    );
  }
}
