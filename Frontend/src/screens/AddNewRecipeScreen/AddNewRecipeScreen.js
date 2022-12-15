import styles from "./style";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../../firebaseConfig";
import { Button, TextInput } from "react-native-paper";
import { ingredients } from "../../assets/static/Ingredients";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Snackbar } from "react-native-paper";
import { addCustomRecipe } from "../../backendCalls/customRecipes";
import { useSelector, useDispatch } from "react-redux";
import { addToCustom } from "../../Redux/customRecipeSlice";

export default function AddNewRecipeScreen({ navigation }) {
  const [recipeName, setRecipeName] = useState("");
  const [cookingTime, setCookingTime] = useState(0);
  const [recipeInstructions, setRecipeInstructions] = useState("");
  const [recipeSummary, setRecipeSummary] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectingIngredient, setSelectingIngredient] = useState(false);
  const [emptyImageDisabled, setEmptyImageDisabled] = useState(true);
  const [userInputIngredient, setUserInputIngredient] = useState("");
  const [ingredientSuggestionList, setIngredientSuggestionList] =
    useState(ingredients);
  const [pantry, setPantry] = useState([]);
  // const [userInputIngredient, setUserInputIngredient] = useState("");
  const [snackBarEnabled, setSnackBarEnabled] = useState(false);
  const [recentIngredient, setRecentIngredient] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [iconForImage, setIconForImage] = useState("image-move");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const userRef = useSelector((state) => state.user.userRef);
  const dispatch = useDispatch();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
      .then((result) => {
        if (result) {
          const source = { uri: result.assets[0].uri };
          setImage(source);
        }
      })
      .catch(() => {});
  };

  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const fileName = image.uri.substring(image.uri.lastIndexOf("/") + 1);
    var imageRef = firebase.storage().ref().child(fileName);
    imageRef.put(blob).then((snapShot) => {
      snapShot.ref.getDownloadURL().then(function (downloadURL) {
        setUploadedImageUrl(downloadURL);
        setUploading(false);
      });
    });

    try {
      await imageRef;
    } catch (err) {
      console.log(err);
    }
    // Alert.alert
    setIconForImage("check");
    // setImage(null);
  };

  const onSubmitButtonPressed = () => {
    const extendedIngredientsArray = [];
    pantry.forEach((element) => {
      extendedIngredientsArray.push({ name: element[0], id: element[1] });
    });

    const newTime = () => {
      const currentTime = new Date();
      return currentTime.getTime();
    };

    const customRecipe = {
      id: userRef.user.uid + newTime(),
      title: recipeName,
      readyInMinutes: cookingTime,
      extendedIngredients: extendedIngredientsArray,
      summary: recipeSummary,
      instructions: [
        {
          steps: [
            {
              number: 1,
              step: recipeInstructions,
            },
          ],
        },
      ],
      image: uploadedImageUrl,
    };

    addCustomRecipe(customRecipe, userRef.user.uid).then(() => {
      dispatch(addToCustom(customRecipe));
      navigation.goBack();
    });
  };
  var DATA = [];
  useEffect(() => {
    ingredients.forEach((element) => {
      DATA.push({ name: element[0], id: element[1] });
    });
  }, []);

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);

    for (let i = 0; i < selectedItems.length; i++) {
      var tempItem = DATA.find((item) => item.id == selectedItems[i]);
    }
  };

  const onPressSelectIngredients = (val) => {
    setSelectingIngredient(val);
  };

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

  const addIngredientToPantry = (ingredient) => {
    if (!pantry.includes(ingredient)) {
      // dispatch(add(ingredient));
      pantry.push(ingredient);
      setEmptyImageDisabled(true);
      setUserInputIngredient("");
      setRecentIngredient(ingredient[0]);
      setSnackBarEnabled(true);
    }
  };

  const RenderIconForIngredientSuggestions = ({ item }) => {
    if (!pantry.includes(item)) {
      return <MaterialCommunityIcons name="plus" size={22} color={"green"} />;
    } else {
      return <MaterialCommunityIcons name="check" size={22} color={"green"} />;
    }
  };

  const deleteIngredientFromPantry = (item) => {
    for (let index = 0; index < pantry.length; index++) {
      const element = pantry[index];
      if (element[1] == item[1]) {
        setPantry(pantry.splice(index, 1));
        break;
      }
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
        {/* <MaterialCommunityIcons name="plus" size={22} color={"green"} /> */}
        <RenderIconForIngredientSuggestions item={item} />
      </TouchableOpacity>

      <Text style={styles.suggestedIngredientText}>
        {item[0].charAt(0).toUpperCase() + item[0].slice(1)}
      </Text>
    </View>
    // </TouchableOpacity>
  );

  const renderPantry = ({ item }) => (
    <View style={styles.addedIngredientContainer}>
      <Text style={styles.addedIngredientText}>
        {item[0].charAt(0).toUpperCase() + item[0].slice(1)}
      </Text>
      <TouchableOpacity
        onPress={() => {
          deleteIngredientFromPantry(item);
        }}
      >
        <MaterialCommunityIcons name="delete-outline" size={22} color={"red"} />
      </TouchableOpacity>
    </View>
  );

  const onDismissSnackBar = () => {
    setSnackBarEnabled(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {!selectingIngredient ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.AddNewRecipeFormContainer}
          // pointerEvents={() => (selectingIngredient ? "none" : "auto")}
        >
          <View style={styles.titleRecipeContainer}>
            <Text style={styles.titleRecipeText}>My new Recipe</Text>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              label="Recipe name"
              value={recipeName}
              onChangeText={(text) => setRecipeName(text)}
              mode={"outlined"}
            />
            {/* <TextInput
              placeholder="Recipe name"
              placeholderTextColor={"black"}
              value={recipeName}
              onChangeText={(recipeName) => setRecipeName(recipeName)}
              style={styles.textInput}
              mode={"outlined"}
            /> */}
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              label="Recipe cooking time in minutes"
              value={cookingTime}
              onChangeText={(text) => setCookingTime(text)}
              style={styles.textInput}
              keyboardType="numeric"
              mode={"outlined"}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              label="Recipe instructions"
              value={recipeInstructions}
              onChangeText={(text) => setRecipeInstructions(text)}
              style={{ ...styles.textInput, height: 90 }}
              mode={"outlined"}
              numberOfLines={3}
              multiline={true}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              label="Recipe summary"
              value={recipeSummary}
              onChangeText={(text) => setRecipeSummary(text)}
              style={{ ...styles.textInput, height: 90 }}
              mode={"outlined"}
              numberOfLines={3}
              multiline={true}
            />
          </View>

          <Button
            mode="contained"
            onPress={() => {
              onPressSelectIngredients(true);
            }}
          >
            Select Ingredients
          </Button>
          <View style={{ alignItems: "center" }}>
            <Text>
              {pantry.length > 0 && `${pantry.length} ingredients selected`}
            </Text>
          </View>

          <View style={styles.uploadImageContainer}>
            <View style={styles.uploadImageImageContainer}>
              {image && (
                <Image
                  source={{ uri: image.uri }}
                  style={{ width: 100, height: 100 }}
                />
              )}
            </View>
            <View style={styles.uploadImageButtonsContainer}>
              <Button
                mode="contained"
                onPress={() => {
                  pickImage();
                }}
                icon={"image"}
              >
                Pick an image
              </Button>
              <Button
                mode="contained"
                onPress={() => {
                  uploadImage();
                }}
                icon={iconForImage}
                disabled={image == null}
              >
                Upload an image
              </Button>
            </View>
          </View>

          <Button
            mode="contained"
            onPress={() => {
              onSubmitButtonPressed();
            }}
            disabled={
              recipeName == "" ||
              recipeInstructions == "" ||
              recipeSummary == "" ||
              cookingTime == "" ||
              uploadedImageUrl == "" ||
              pantry.length == 0
            }
            loading={uploading}
          >
            Submit
          </Button>
        </ScrollView>
      ) : (
        <View>
          <View style={styles.titleContainer}>
            <View style={styles.titleBarContainer}>
              <MaterialCommunityIcons name="magnify" size={25} />
              <TextInput
                style={styles.serchIngredientTextInput}
                placeholder="Add ingredient"
                placeholderTextColor={"white"}
                underlineColorAndroid="transparent"
                onChangeText={onTextChange}
                value={userInputIngredient}
                // onBlur={textInputOnBlured}
              ></TextInput>
            </View>
            <Text style={styles.headerText}>
              Ingredients required for new recipe
            </Text>
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
          <Button
            mode="contained"
            onPress={() => {
              onPressSelectIngredients(false);
            }}
          >
            Submit ingredients
          </Button>
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
            <Text style={{ color: "white" }}>
              {recentIngredient.charAt(0).toUpperCase() +
                recentIngredient.slice(1)}{" "}
              added!
            </Text>
          </Snackbar>
        </View>
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styleSheet = StyleSheet.create({
  MainContainer: {
    flex: 1,
    padding: 12,
    backgroundColor: "white",
  },

  text: {
    padding: 12,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },
});
