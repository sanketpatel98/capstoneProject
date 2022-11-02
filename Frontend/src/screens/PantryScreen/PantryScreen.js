import styles from "./style";
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { add, remove } from "../../Redux/pantrySlice";
import { ingredients } from "../../assets/static/Ingredients";
import { Snackbar } from "react-native-paper";

export default function PantryScreen() {
  const [emptyImageDisabled, setEmptyImageDisabled] = useState(true);
  const [ingredientSuggestionList, setIngredientSuggestionList] =
    useState(ingredients);
  const [snackBarEnabled, setSnackBarEnabled] = useState(false);
  const [recentIngredient, setRecentIngredient] = useState("");
  const [userInputIngredient, setUserInputIngredient] = useState("");

  const dispatch = useDispatch();
  const pantry = useSelector((state) => state.pantry.list);
  useEffect(() => {
    console.log(pantry.length);
  }, []);

  // useEffect(()=>{
  //   // setUserInputIngredient(pantry)
  // }, pantry)

  const addIngredientToPantry = (ingredient) => {
    console.log(ingredient);
    console.log("-------");
    if (!pantry.includes(ingredient)) {
      dispatch(add(ingredient));
      setEmptyImageDisabled(true);
      setUserInputIngredient("");
      setRecentIngredient(ingredient[0]);
      setSnackBarEnabled(true);
    }
  };

  const deleteIngredientFromPantry = (item) => {
    console.log(item);
    dispatch(remove(item[1]))
  }

  const onTextChange = (text) => {
    setUserInputIngredient(text);
    if (text) {
      setEmptyImageDisabled(false);
      setIngredientSuggestionList(
        ingredients.filter((ingredient) =>
          ingredient[0].toLowerCase().includes(text.toLowerCase())
        )
      );
    } else {
      setEmptyImageDisabled(true);
    }
  };

  const renderIngredientSuggestions = ({ item }) => (
    // <TouchableOpacity onPress={() => {}}>
    <View style={styles.suggestedIngredientContainer}>
      <TouchableOpacity
        onPress={() => {
          addIngredientToPantry(item);
        }}
      >
        <MaterialCommunityIcons name="plus" size={22} color={"green"} />
      </TouchableOpacity>

      <Text style={styles.suggestedIngredientText}>{item[0]}</Text>
    </View>
    // </TouchableOpacity>
  );

  const renderPantry = ({ item }) => (
    <View style={styles.addedIngredientContainer}>
      
      <Text style={styles.addedIngredientText}>{item[0]}</Text>
      <TouchableOpacity onPress={()=>{
        deleteIngredientFromPantry(item)
      }}>
        <MaterialCommunityIcons name="delete-outline" size={22} color={"red"} />
      </TouchableOpacity>
    </View>
  );

  const onDismissSnackBar = () => {
    setSnackBarEnabled(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.titleContainer}>
        <View style={styles.titleBarContainer}>
          <MaterialCommunityIcons name="magnify" size={25} />
          <TextInput
            style={styles.serchIngredientTextInput}
            placeholder="Add ingredient in pantry"
            placeholderTextColor={"white"}
            underlineColorAndroid="transparent"
            onChangeText={onTextChange}
            value={userInputIngredient}
            // onBlur={textInputOnBlured}
          ></TextInput>
        </View>
      </View>
      <View style={styles.listContainer}>
        {pantry.length == 0 && emptyImageDisabled && (
          <Image
            source={require("../../assets/image/Empty.png")}
            style={styles.emptyImage}
            resizeMode="contain"
          />
        )}
        {!emptyImageDisabled && (
          <FlatList
            data={ingredientSuggestionList.slice(0, 15)}
            renderItem={renderIngredientSuggestions}
            keyExtractor={(item) => item[1]}
            style={styles.ingredientListContainer}
            showsHorizontalScrollIndicator={false}
          />
        )}
        {pantry.length > 0 && emptyImageDisabled && (
          <FlatList
            data={pantry}
            renderItem={renderPantry}
            keyExtractor={(item) => item[1]}
            style={styles.ingredientListContainer}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
      <StatusBar style="auto" />
      <Snackbar
        visible={snackBarEnabled}
        onDismiss={onDismissSnackBar}
        action={{
          label: "OK",
          onPress: () => {
            // Do something
            setSnackBarEnabled(false);
          },
        }}
      >
        {recentIngredient} added!
      </Snackbar>
    </SafeAreaView>
  );
}
