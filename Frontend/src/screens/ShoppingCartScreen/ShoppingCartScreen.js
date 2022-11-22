import styles from "./style";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Snackbar } from "react-native-paper";
import { removeFromCart } from "../../Redux/cartSlice";

export default function ShoppingCartScreen() {
  const cart = useSelector((state) => state.cart.list);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(cart);
  }, [cart]);

  const deleteIngredientFromCart = (item) => {
    dispatch(removeFromCart(item.name))
  }

  const renderPantry = ({ item }) => (
    <View style={styles.addedIngredientContainer}>
      <Text style={styles.addedIngredientText}>
        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
      </Text>
      <TouchableOpacity
        onPress={() => {
          deleteIngredientFromCart(item)
        }}
      >
        <MaterialCommunityIcons name="delete-outline" size={22} color={"red"} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.titleContainer}>
        <View style={styles.titleBarContainer}>
          <MaterialCommunityIcons name="magnify" size={25} />
          <TextInput
            style={styles.serchIngredientTextInput}
            placeholder="Add ingredient in Cart"
            placeholderTextColor={"white"}
            underlineColorAndroid="transparent"
            // onChangeText={onTextChange}
            // value={userInputIngredient}
          ></TextInput>
        </View>
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
