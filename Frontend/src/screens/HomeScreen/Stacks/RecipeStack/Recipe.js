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
import styles from "./style";

export default function Recipe({ route, navigation }) {
  const [recipe, setRecipe] = useState({});
  const [recipeInstructions, setRecipeInstructions] = useState([]);
  const [readyInMinutes, setReadyInMinutes] = useState();
  const [instructionOrSummaryEnabled, setInstructionOrSummaryEnabled] =
    useState(true);
  const [requireIngredients, setRequireIngredients] = useState([]);
  const [snackBarEnabled, setSnackBarEnabled] = useState(false);
  const [recentIngredient, setRecentIngredient] = useState("");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.list);

  useEffect(() => {
    // getting recipe(for readyInMinutes)
    setIngredientAvailability();
    getRecipeById(route.params.item.id)
      .then((res) => {
        setReadyInMinutes(res.readyInMinutes);
        setRecipe(res);
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
  }, [cart]);

  const baseUrl = "https://spoonacular.com/cdn/ingredients_500x500/";
  const addIngredientToCart = (item) => {
    if (!cart.includes(item)) {
      dispatch(addToCart(item));
      setRecentIngredient(item.name);
      setSnackBarEnabled(true);
    }
  };
  const RenderItems = ({ item }) => (
    <View style={styles.ingredientContainer}>
      <View style={styles.ingredientDescriptionContainer}>
        <Image
          source={{ uri: item.image }}
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
            {cart.includes(item) ? (
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
    var updatedUsedIngredient = route.params.item.usedIngredients.map(
      (element) => {
        var updatedElement = element;
        updatedElement["available"] = true;
        return updatedElement;
      }
    );
    var updatedmissedIngredient = route.params.item.missedIngredients.map(
      (element) => {
        var updatedElement = element;
        updatedElement["isAddedToCart"] = true;
        // console.log("this: "+ updatedElement.isAddedToCart);
        // if (cart.includes(element)) {
        //   updatedElement.isAddedToCart = true;
        //   // console.log(`comes here when ${element.name}`);
        //   console.log(updatedElement);
        //   console.log("Came here");
        // } else {
        //   updatedElement["isAddedToCart"] = false
        // }
        updatedElement["available"] = false;

        return updatedElement;
      }
    );
    // console.log('--------------------------------------------------');
    // console.log(updatedUsedIngredient.concat(updatedmissedIngredient));
    // console.log('--------------------------------------------------');
    setRequireIngredients(
      updatedUsedIngredient.concat(updatedmissedIngredient)
    );
  };

  const onDismissSnackBar = () => {
    setSnackBarEnabled(false);
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
                handlePress={() =>
                  navigation.navigate("Login")
                }
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
    </>
  );
}
