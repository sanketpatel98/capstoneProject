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
  getIngredientById,
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
  const [qrCodeEnabled, setQrCodeEnabled] = useState(false);
  // useEffect(() => {
  //   // getting recipe(for readyInMinutes)
  //   fetchData();
  // }, []);

  useEffect(() => {
    fetchData();
  }, [route.params]);

  function fetchData() {
    if (route.params.item.id.length > 15) {
      var extendedIngredientsWithImage = [];
      var allPromises = [];
      route.params.item.extendedIngredients.forEach((element) => {
        var result = getIngredientById(element.id)
          .then((res) => {
            extendedIngredientsWithImage.push({
              id: element.id,
              name: element.name,
              image: res.image,
            });
          })
          .catch((err) => {
            console.log(err);
          });
        allPromises.push(result);
      });
      Promise.all(allPromises)
        .then(() => {
          var updatedRecipe = JSON.parse(JSON.stringify(route.params.item));
          updatedRecipe.extendedIngredients = extendedIngredientsWithImage;
          setRecipe(updatedRecipe);
          setReadyInMinutes(route.params.item.readyInMinutes);
          setRecipeInstructions(route.params.item.instructions);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
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
    }
  }

  useEffect(() => {
    setIngredientAvailability();
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
    if (!cart.some((ing) => ing.id === item.id)) {
      dispatch(addToCart(item));
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
            {cart.some((e) => e.id === item.id) ? (
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
    if (recipe && Object.keys(recipe).length !== 0) {
      var requiredIngredients = [];
      recipe.extendedIngredients.forEach((element) => {
        requiredIngredients.push(
          (({ name, image, id }) => ({ name, image, id }))(element)
        );
      });

      var usedIngredientsFiltered = requiredIngredients.filter((ingredient) => {
        var tf = false;
        pantry.forEach((item) => {
          if (ingredient.id == item[1]) {
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
      <ScrollView style={styles.container} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
        <StatusBar hidden />
        <View style={{backgroundColor: 'black'}}>
          <View style={styles.recipeImageView}>
            <ImageBackground
              source={{ uri: recipe.image }} //route.params.item.image
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: 'center'
                }}
              >
                <Text
                  numberOfLines={4}
                  style={styles.recipeDescriptionTitleText}
                >
                  {/* {route.params.item.title} */}
                  {recipe.title}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setQrCodeEnabled(!qrCodeEnabled);
                  }}
                  style={{borderLeftColor: '#D3D3D3', borderLeftWidth: 1, paddingLeft: 10}}
                >
                  <Image
                    source={{
                      uri: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${route.params.item.id}`,
                    }}
                    style={{ width: 25, height: 25 }}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.preprationTimeText}>
                Time to prepare: {readyInMinutes} Minutes
              </Text>
            </View>
            <View style={styles.ingredientContainerList}>
              {qrCodeEnabled && (
                <Image
                  source={{
                    uri: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${route.params.item.id}`,
                  }}
                  style={{ width: 200, height: 200, marginBottom: 50 }}
                />
              )}

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
        <Text style={{ color: "white" }}>
          {recentIngredient.charAt(0).toUpperCase() + recentIngredient.slice(1)}{" "}
          added!
        </Text>
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
        <Text style={{ color: "white" }}>
          Recipe {favouriteStatus} Favourite Recipes!
        </Text>
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
        <Text style={{ color: "white" }}>Login successful!</Text>
      </Snackbar>
    </>
  );
}
