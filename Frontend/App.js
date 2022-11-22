import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import Recipe from "./src/screens/HomeScreen/Stacks/RecipeStack/Recipe";
import SearchScreen from "./src/screens/SearchScreen/SearchScreen";
import SettingScreen from "./src/screens/SettingsScreen/SettingsScreen";
import PantryScreen from "./src/screens/PantryScreen/PantryScreen";
import ShoppingCartScreen from "./src/screens/ShoppingCartScreen/ShoppingCartScreen";
import { store } from './src/Redux/store'
import { Provider } from 'react-redux'
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default AppWrapper = () => {
  // const store = createStore(rootReducer);

  return (
    <Provider store={store}> 
      <App /> 
    </Provider>
  )
}

function App() {

  const cart = useSelector((state) => state.cart.list);
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "red",
    },
  };

  const HomeStack = createNativeStackNavigator();

  function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Recipe"
          component={Recipe}
          options={{ headerShown: false }} 
        />
      </HomeStack.Navigator>
    );
  } 

  return (
    // <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator>
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
            name="Search"
            component={SearchScreen}
            options={{
              headerShown: false,
              tabBarLabel: "Search",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="magnify"
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

{cart.length > 0 ? (<Tab.Screen
            name="Shoppingcart"
            component={ShoppingCartScreen}
            options={{
              headerShown: false,
              tabBarLabel: "cart",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="cart" color={color} size={size} />
              ),
              tabBarBadge: cart.length
            }}
          />) : (<Tab.Screen
            name="Shoppingcart"
            component={ShoppingCartScreen}
            options={{
              headerShown: false,
              tabBarLabel: "cart",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="cart" color={color} size={size} />
              ),
            }}
          />) }
          

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
