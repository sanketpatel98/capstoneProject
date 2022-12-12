import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "./src/Redux/store";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import Recipe from "./src/screens/HomeScreen/Stacks/RecipeStack/Recipe";
import PantryScreen from "./src/screens/PantryScreen/PantryScreen";
import SearchScreen from "./src/screens/SearchScreen/SearchScreen";
import SettingScreen from "./src/screens/SettingsScreen/SettingsScreen";
import ShoppingCartScreen from "./src/screens/ShoppingCartScreen/ShoppingCartScreen";
import NearByGroceryStoreScreen from "./src/screens/ShoppingCartScreen/Stacks/GroceryStore/NearByGroceryStoreScreen";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen/SignupScreen";
import FavouriteScreen from "./src/screens/FavouriteScreen/FavouriteScreen";
import MyRecipesScreen from "./src/screens/MyRecipesScreen/MyRecipesScreen";
import AddNewRecipeScreen from "./src/screens/AddNewRecipeScreen/AddNewRecipeScreen";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { changeId } from "./src/Redux/deeplinkSlice";
import { COLORS } from "./src/styles/commonStyles";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default AppWrapper = () => {
  // const store = createStore(rootReducer);

  const [data, setData] = useState(null);
  const [id, setId] = useState("");
  const handleDeeplink = (event) => {
    let data = Linking.parse(event.url);
    setData(data);
  };

  useEffect(() => {
    if (data) {
      const param = data.queryParams;
      // console.log(param);
      if (param.id) {
        setId(param.id);
      }
      // console.log();
    } else {
      console.log("App not opened from deep link");
    }
  }, [data]);

  useEffect(() => {
    async function getInitialURL() {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) {
        setData(Linking.parse(initialURL));
      }
    }

    Linking.addEventListener("url", handleDeeplink);
    if (!data) {
      getInitialURL();
    }
    return () => {
      Linking.removeEventListener("url");
    };
  }, []);

  return (
    <Provider store={store}>
      <App id={id} />
    </Provider>
  );
};

function App({ id }) {
  const cart = useSelector((state) => state.cart.list);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("Id has been changed!" + id);
    dispatch(changeId(id));
  }, [id]);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "green",
      background: COLORS.mainThemeColor,
    },
  };

  const Stack = createNativeStackNavigator();

  function HomeStackScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
          //initialParams={{id:id}}
        />
        <Stack.Screen
          name="Recipe"
          component={Recipe}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Favourite"
          component={FavouriteScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  function ShoppingCartStackScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Shoppingcart"
          component={ShoppingCartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NearByGroceryStore"
          component={NearByGroceryStoreScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  function MyRecipesStackScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MyRecipes"
          component={MyRecipesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddNewRecipe"
          component={AddNewRecipeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  return (
    // <Provider store={store}>
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveBackgroundColor: "black",
          tabBarInactiveBackgroundColor: "black",
        }}
      >
        <Tab.Screen
          name="HomeStackScreen"
          component={HomeStackScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="MyRecipesStackScreen"
          component={MyRecipesStackScreen}
          options={{
            headerShown: false,
            tabBarLabel: "My Recipes",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="food-variant"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Pantry"
          component={PantryScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Pantry",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="playlist-edit"
                color={color}
                size={size}
              />
            ),
          }}
        />

        {cart.length > 0 ? (
          <Tab.Screen
            name="ShoppingcartStackScreen"
            component={ShoppingCartStackScreen}
            options={{
              headerShown: false,
              tabBarLabel: "cart",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="cart" color={color} size={size} />
              ),
              tabBarBadge: cart.length,
            }}
          />
        ) : (
          <Tab.Screen
            name="Shoppingcart"
            component={ShoppingCartScreen}
            options={{
              headerShown: false,
              tabBarLabel: "Cart",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="cart" color={color} size={size} />
              ),
            }}
          />
        )}

        <Tab.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    // </Provider>
  );
}
