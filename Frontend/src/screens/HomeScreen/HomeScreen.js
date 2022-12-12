import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  // Button,
} from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import {
  getRecipebyPantry,
  getRecipeByCuisine,
} from "../../backendCalls/recipeData";
import { getCustomRecipeById } from "../../backendCalls/customRecipes";
import styles from "./style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function HomeScreen({ navigation }) {
  const [recipeByPantry, setRecipeByPantry] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [recipesByCuisine, setRecipesByCuisine] = useState([]);
  const pantry = useSelector((state) => state.pantry.list);
  const deeplinkId = useSelector((state) => state.deeplink.id);
  const [appReady, setAppReady] = useState(false);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannerEnabled, setScannerEnabled] = useState(false);

  useEffect(() => {
    console.log("Log from home screen");
    console.log(deeplinkId);

    if (deeplinkId.length > 10) {
      getCustomRecipeById(deeplinkId).then((res) => {
        navigation.navigate("Recipe", {
          item: res,
        });
      });
    }
  }, [deeplinkId]);

  useEffect(() => {
    // pantry.toString()

    getRecipebyPantry(pantry)
      .then((response) => {
        setRecipeByPantry(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pantry]);

  useEffect(() => {
    getRecipebyPantry([
      ["lasagna noodles", 10620420],
      ["pizza crust", 93770],
      ["pizza mix", 98924],
    ])
      .then((response) => {
        setPopularRecipes(response);
        setAppReady(true);
      })
      .catch((err) => {
        console.log(err);
      });

    const cuisines = ["Indian", "Chinese", "Mexican", "Greek", "Thai"];
    var cuisinePromises = [];
    cuisines.forEach((cuisine) => {
      cuisinePromises.push(
        getRecipeByCuisine(cuisine).then((response) => {
          return response;
        })
      );
    });
    Promise.all(cuisinePromises)
      .then((values) => {
        setRecipesByCuisine(
          values.map((value) => {
            return { results: value.recipes.results, cuisine: value.cuisine };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderItems = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Recipe", {
          item: item,
        });
      }}
    >
      <View style={styles.recipeContainer}>
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.recipeImageBackground}
          imageStyle={{ borderRadius: 14 }}
          resizeMode="cover"
        ></ImageBackground>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            {item.title.length >= 25
              ? item.title.substring(0, 22) + "..."
              : item.title}
          </Text>
          <Text></Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const listFooterItem = () => (
    <TouchableOpacity style={styles.footerContainer}>
      <ImageBackground
        source={require("../../assets/image/add.png")}
        style={styles.footerImageBackground}
        imageStyle={{ borderRadius: 5 }}
        resizeMode="contain"
      ></ImageBackground>
      <View style={styles.footerDescriptionContainer}>
        <Text style={styles.descriptionText}>More Recipes</Text>
      </View>
    </TouchableOpacity>
  );

  const getBarCodeScannerPermissions = async () => {
    if (!hasPermission) {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannerEnabled(false);
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    console.log(data);
    // const queryParamArr = data.split('?',2)
    // const id = queryParamArr[1].split('=',2)[1]
    if (data) {
      if (data.toString().length > 10) {
        getCustomRecipeById(data).then((res) => {
          setScanned(false);
          navigation.navigate("Recipe", {
            item: res,
          });
        });
      } else if (data.toString().length < 10) {
        navigation.navigate("Recipe", {
          item: {id:data},
        });
      }
    }
    setScanned(false);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  return (
    <View style={styles.container}>
      {appReady &&
        (scannerEnabled ? (
          <View style={styles.absoluteFillObject}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.barcodeScanner}
            />
            <Button
              mode="contained"
              onPress={() => {
                setScannerEnabled(false);
                setScanned(false);
              }}
            >
              Back
            </Button>
          </View>
        ) : (
          <ScrollView
            style={styles.mainContainer}
            showsVerticalScrollIndicator={false}
          >
            {scannerEnabled ? <></> : <></>}
            <View style={styles.topContainer}>
              <TouchableOpacity
                onPress={() => {
                  setScannerEnabled(true);
                  getBarCodeScannerPermissions();
                  // navigation.navigate("Favourite");
                }}
                style={{ marginTop: 3 }}
              >
                {/* <Image
                source={require("../../assets/image/heart.png")}
                style={styles.topIcon}
              /> */}
                <MaterialCommunityIcons name="qrcode-scan" size={29} color={'black'} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Favourite");
                }}
              >
                <Image
                  source={require("../../assets/image/heart.png")}
                  style={styles.topIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.greetingsContainer}>
              <Text style={styles.titleText}>Chef de cuisine</Text>
              {/* <Text style={styles.titleText}>Your Recipe! </Text> */}
            </View>

            {recipeByPantry.length > 0 && (
              <>
                <Text style={styles.listTitle}>Recipes using Pantry</Text>
                <FlatList
                  data={recipeByPantry}
                  renderItem={renderItems}
                  keyExtractor={(item) => item.id}
                  horizontal={true}
                  ListFooterComponent={listFooterItem}
                  style={styles.listContainer}
                  showsHorizontalScrollIndicator={false}
                />
              </>
            )}

            <Text style={styles.listTitle}>Popular recipes</Text>
            <FlatList
              data={popularRecipes}
              renderItem={renderItems}
              keyExtractor={(item) => item.id}
              horizontal={true}
              ListFooterComponent={listFooterItem}
              style={styles.listContainer}
              showsHorizontalScrollIndicator={false}
            />

            {recipesByCuisine.length > 0 ? (
              recipesByCuisine.map((cuisineRecipes, index) => (
                <View key={index}>
                  <Text style={styles.listTitle}>{cuisineRecipes.cuisine} recipes</Text>
                  <FlatList
                    data={cuisineRecipes.results}
                    renderItem={renderItems}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    ListFooterComponent={listFooterItem}
                    style={styles.listContainer}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              ))
            ) : (
              <Text></Text>
            )}

            <StatusBar style="auto" />
          </ScrollView>
        ))}
    </View>
  );
}
