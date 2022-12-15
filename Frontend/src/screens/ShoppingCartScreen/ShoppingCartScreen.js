import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  FlatList, Image,
  SafeAreaView, Text, TextInput, TouchableOpacity, View
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../Redux/cartSlice";
import styles from "./style";

export default function ShoppingCartScreen({ navigation }) {
  const cart = useSelector((state) => state.cart.list);
  const dispatch = useDispatch();
  useEffect(() => {
  }, [cart]);

  const deleteIngredientFromCart = (item) => {
    dispatch(removeFromCart(item.name));
  };

  const renderPantry = ({ item }) => (
    <View style={styles.addedIngredientContainer}>
      <Text style={styles.addedIngredientText}>
        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NearByGroceryStore",{
              ingredient: item
            });
          }}
        >
          <MaterialCommunityIcons
            name="magnify"
            size={25}
            color={"green"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            deleteIngredientFromCart(item);
          }}
        >
          <MaterialCommunityIcons
            name="cart-remove"
            size={25}
            color={"red"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.titleContainer}>
        {/* <View style={styles.titleBarContainer}>
          <MaterialCommunityIcons name="magnify" size={25} />
          <TextInput
            style={styles.serchIngredientTextInput}
            placeholder="Add ingredient to Cart"
            placeholderTextColor={"white"}
            underlineColorAndroid="transparent"
            // onChangeText={onTextChange}
            // value={userInputIngredient}
          ></TextInput>
        </View> */}
        <Text style={styles.headerText}>Shopping Cart</Text>
      </View>
      <View style={styles.listContainer}>
        {cart.length == 0 ? (
          <Image
            source={require("../../assets/image/emptyCart.png")}
            style={styles.emptyImage}
            resizeMode="contain"
          />
        ) : (
          <FlatList
            data={cart}
            renderItem={renderPantry}
            keyExtractor={(item) => item.name}
            style={styles.ingredientListContainer}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
