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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRecipeById } from "../../backendCalls/recipeData";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { removeFromFavourite } from "../../Redux/favouriteRecipesSlice";
import { removeFromFavouriteRecipe } from "../../backendCalls/favouriteRecipe";
import { Button } from 'react-native-paper'

export default function FavouriteScreen({navigation}) {
  const favourite = useSelector((state) => state.favourite.list);
  const userRef = useSelector((state) => state.user.userRef);
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);
  
  const dispatch = useDispatch();
  useEffect(() => {
    var allPromises = [];
    favourite.forEach((item) => {
      allPromises.push(getRecipeById(item));
    });

    Promise.all(allPromises).then((values) => {
      setFavouriteRecipes(values);
      allPromises = [];
    });
  }, [favourite]);

  const renderFavourties = ({ item }) => {
    return (
      <View style={styles.recipeContainer}>
        {/* <View style={styles.descriptionContainer}> */}
          <TouchableOpacity style={styles.descriptionContainer} onPress={()=>{
            navigation.navigate("Recipe", {
              item: item,
            });
          }}>
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
              removeFromFavouriteRecipe(item.id, userRef.user.uid)
                .then(() => {
                  dispatch(removeFromFavourite(item.id));
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.titleContainer}>
        <Text style={styles.headerText}>Favourite Recipes</Text>
      </View>
      <View style={styles.listContainer}>
        {favourite.length == 0 ? (
          <Image
            source={require("../../assets/image/Favourite.png")}
            style={styles.emptyImage}
            resizeMode="contain"
          />
        ) : (
          <FlatList
            data={favouriteRecipes}
            renderItem={renderFavourties}
            keyExtractor={(item) => item.id}
            style={styles.ingredientListContainer}
            showsHorizontalScrollIndicator={false}
          />
        )}
        { "user" in userRef ? (<></>) : <Button
          mode="elevated"
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          Login to use this feature!
        </Button> }
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
