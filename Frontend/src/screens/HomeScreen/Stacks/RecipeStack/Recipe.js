import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Snackbar } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import heart from "../../../../assets/image/heart.png";
import back from "../../../../assets/image/left.png";
import {
  getRecipeById,
  getRecipeInstructionById,
} from "../../../../backendCalls/recipeData";
import { CircleButton } from "../../../../components/CircleButton";
import { addToCart } from "../../../../Redux/cartSlice";
import { login } from "../../../../Redux/userDataSclice";
import styles from "./style";
import {
  addFavouriteRecipe,
  removeFromFavouriteRecipe,
} from "../../../../backendCalls/favouriteRecipe";
import {
  addToFavourite,
  removeFromFavourite,
} from "../../../../Redux/favouriteRecipesSlice";

export default function Recipe({ route, navigation }) {
  const pantry = useSelector((state) => state.pantry.list);
  const [recipe, setRecipe] = useState({});
  const [recipeInstructions, setRecipeInstructions] = useState([]);
  const [readyInMinutes, setReadyInMinutes] = useState();
  const [instructionOrSummaryEnabled, setInstructionOrSummaryEnabled] =
    useState(true);
  const [requireIngredients, setRequireIngredients] = useState([]);
  const [snackBarEnabled, setSnackBarEnabled] = useState(false);
  const [snackBarForFavourite, setSnackBarForFavourite] = useState(false);
  const [snackBarForLogin, setSnackBarForLogin] = useState(false);
  const [recentIngredient, setRecentIngredient] = useState("");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.list);
  const userState = useSelector((state) => state.user.userRef);
  const favourtieList = useSelector((state) => state.favourite.list);
  const [favouriteStatus, setFavouriteStatus] = useState("");

  useEffect(() => {
    // getting recipe(for readyInMinutes)

    getRecipeById(route.params.item.id)
      .then((res) => {
        setReadyInMinutes(res.readyInMinutes);
        setRecipe(res);
        // setIngredientAvailability();
      })
      .catch((error) => {
        console.log(error);
      });

    // getting instructions
    getRecipeInstructionById(route.params.item.id)
      .then((res) => {
        setRecipeInstructions(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setIngredientAvailability();
    console.log("Cart => ");
    console.log(cart);
  }, [cart]);

  useEffect(() => {
    setIngredientAvailability();
  }, [recipe]);

  useEffect(() => {
    if (route.params) {
      if (route.params.message == "login sucessful") {
        setSnackBarForLogin(true);
      }
    }
  }, [route]);

  const baseUrl = "https://spoonacular.com/cdn/ingredients_500x500/";
  const addIngredientToCart = (item) => {
    if (!cart.includes(item)) {
      console.log("++++++++++++++++++++++++++++++++++++++++++++++++++");
      console.log(item);
      console.log("++++++++++++++++++++++++++++++++++++++++++++++++++");
      dispatch(addToCart({ id: item.id, name: item.name }));
      setRecentIngredient(item.name);
      setSnackBarEnabled(true);
    }
  };
  const RenderItems = ({ item }) => (
    <View style={styles.ingredientContainer}>
      <View style={styles.ingredientDescriptionContainer}>
        <Image
          source={{ uri: baseUrl + item.image }}
          style={styles.ingredientImage}
          // imageStyle={{ borderRadius: 14 }}
          resizeMode="cover"
        ></Image>

        <View style={styles.descriptionTextContainer}>
          <Text style={styles.descriptionText}>
            {item.name.length >= 20
              ? item.name.substring(0, 19).charAt(0).toUpperCase() +
                item.name.substring(0, 19).slice(1) +
                "..."
              : item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </Text>
        </View>
      </View>
      <View style={styles.availabilityContainer}>
        {item.available ? (
          <MaterialCommunityIcons name="check" color={"green"} size={25} />
        ) : (
          <TouchableOpacity
            onPress={() => {
              addIngredientToCart(item);
            }}
          >
            {/* {cart.includes( {id: item.id, name:item.name} ) ? ( */}
            {cart.some(e => e.id === item.id) ? (
              <MaterialCommunityIcons
                name="cart-check"
                color={"green"}
                size={25}
              />
            ) : (
              <MaterialCommunityIcons
                name="cart-plus"
                color={"orange"}
                size={25}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const setIngredientAvailability = () => {
    // var usedIngredientsFiltered = recipe.

    // console.log("Comes here");
    // console.log(recipe);

    if (
      recipe &&
      Object.keys(recipe).length !== 0
      // Object.getPrototypeOf(recipe) === Object.prototype
    ) {
      // }

      // if (recipe) {
      // console.log(recipe.extendedIngredients);
      var requiredIngredients = [];
      recipe.extendedIngredients.forEach((element) => {
        requiredIngredients.push(
          (({ name, image, id }) => ({ name, image, id }))(element)
        );
      });
      // console.log(requireIngredients);
      var usedIngredientsFiltered = requiredIngredients.filter((ingredient) => {
        var tf = false;
        pantry.forEach((item) => {
          if (ingredient.id == item[1]) {
            // console.log("True hurrey");
            tf = true;
          }
        });
        return tf;
      });

      var missedIngredientsFiltered = requiredIngredients.filter(
        (ingredient) => {
          var tf = true;
          pantry.forEach((item) => {
            if (ingredient.id == item[1]) {
              // console.log("True hurrey");
              tf = false;
            }
          });
          return tf;
        }
      );

      var updatedUsedIngredient = usedIngredientsFiltered.map((element) => {
        var updatedElement = element;
        updatedElement["available"] = true;
        return updatedElement;
      });
      var updatedmissedIngredient = missedIngredientsFiltered.map((element) => {
        var updatedElement = element;
        updatedElement["isAddedToCart"] = true;
        updatedElement["available"] = false;

        return updatedElement;
      });
      console.log(
        "||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
      );
      console.log(updatedUsedIngredient);
      console.log(updatedmissedIngredient);
      console.log(
        "||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
      );
      setRequireIngredients(
        updatedUsedIngredient.concat(updatedmissedIngredient)
      );
    }
  };

  const onDismissSnackBar = () => {
    setSnackBarEnabled(false);
  };

  const onDismissSnackBarFavourite = () => {
    setSnackBarForFavourite(false);
  };

  const onDismissSnackBarLogin = () => {
    setSnackBarForLogin(false);
  };

  const favouriteButtonPressed = () => {
    if ("user" in userState) {
      if (favourtieList.includes(route.params.item.id)) {
        removeFromFavouriteRecipe(
          route.params.item.id,
          userState.user.uid
        ).then(() => {
          setFavouriteStatus("deleted from");
          setSnackBarForFavourite(true);
          dispatch(removeFromFavourite(route.params.item.id));
        });
      } else {
        addFavouriteRecipe(route.params.item.id, userState.user.uid)
          .then(() => {
            setFavouriteStatus("added to");
            setSnackBarForFavourite(true);
            dispatch(addToFavourite(route.params.item.id));
          })
          .catch(() => {
            console.log("Not able to add recipe");
          });
      }
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <>
      <ScrollView style={styles.container} nestedScrollEnabled={true}>
        <StatusBar hidden />
        <View>
          <View style={styles.recipeImageView}>
            <ImageBackground
              source={{ uri: route.params.item.image }}
              style={styles.recipeImageBackground}
              resizeMode="cover"
            />
          </View>
          <View style={styles.floatButton}>
            <View style={styles.likeButton}>
              <CircleButton
                imgUrl={heart}
                handlePress={() => {
                  favouriteButtonPressed();
                }}
              ></CircleButton>
            </View>
            <View style={styles.backButton}>
              <CircleButton
                imgUrl={back}
                handlePress={() => navigation.goBack()}
              ></CircleButton>
            </View>
          </View>
          <View style={styles.recipeDescriptionView}>
            <View style={styles.recipeDescriptionTitleView}>
              <Text numberOfLines={3} style={styles.recipeDescriptionTitleText}>
                {route.params.item.title}
              </Text>
              <Text style={styles.preprationTimeText}>
                Time to prepare: {readyInMinutes} Minutes
              </Text>
            </View>
            <View style={styles.ingredientContainerList}>
              <Text style={styles.ingredientContainerListTitle}>
                Required Ingredients
              </Text>
              {requireIngredients.map((item, index) => (
                <RenderItems item={item} style={{ flex: 1 }} key={index} />
              ))}
            </View>
            {recipeInstructions.length != 0 && (
              <View style={styles.instructionView}>
                <View style={styles.instructionAndSummaryTitleContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setInstructionOrSummaryEnabled(true);
                    }}
                  >
                    <Text style={styles.instructionViewTitle}>
                      Instructions
                    </Text>
                  </TouchableOpacity>
                  <Text> | </Text>

                  <TouchableOpacity
                    onPress={() => {
                      setInstructionOrSummaryEnabled(false);
                    }}
                  >
                    <Text style={styles.instructionViewTitle}>Summary</Text>
                  </TouchableOpacity>
                </View>

                {recipe.summary && !instructionOrSummaryEnabled && (
                  <View>
                    <Text style={styles.summaryText}>
                      {recipe.summary.replace(/<[^>]+>/g, "")}
                    </Text>
                  </View>
                )}

                {instructionOrSummaryEnabled && (
                  <ScrollView
                    style={styles.stepsScrollView}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                  >
                    {recipeInstructions[0].steps.map((step) => (
                      <Text style={styles.stepsText} key={step.number}>
                        {step.number}) {step.step}
                      </Text>
                    ))}
                  </ScrollView>
                )}
              </View>
            )}
          </View>

          <StatusBar style="auto" />
        </View>
      </ScrollView>
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
        {recentIngredient.charAt(0).toUpperCase() + recentIngredient.slice(1)}{" "}
        added!
      </Snackbar>
      <Snackbar
        visible={snackBarForFavourite}
        onDismiss={onDismissSnackBarFavourite}
        action={{
          label: "OK",
          onPress: () => {
            // Do something
            setSnackBarForFavourite(false);
          },
        }}
      >
        Recipe {favouriteStatus} Favourite Recipes!
      </Snackbar>
      <Snackbar
        visible={snackBarForLogin}
        onDismiss={onDismissSnackBarLogin}
        action={{
          label: "OK",
          onPress: () => {
            // Do something
            onDismissSnackBarLogin(false);
          },
        }}
      >
        Login successful!
      </Snackbar>
    </>
  );
}
