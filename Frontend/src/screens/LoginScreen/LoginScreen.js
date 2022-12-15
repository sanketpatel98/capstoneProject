import styles from "./style";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CircleButton } from "../../components/CircleButton";
import back from "../../assets/image/left.png";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, TextInput } from "react-native-paper";
import { useState, useEffect } from "react";
import { userSignIn } from "../../backendCalls/user";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/userDataSclice";
import { Snackbar } from "react-native-paper";
import { getAllFavouriteRecipes } from "../../backendCalls/favouriteRecipe";
import { setFavourite } from "../../Redux/favouriteRecipesSlice";
import { setCustom } from "../../Redux/customRecipeSlice";
import { getAllCustomRecipes } from "../../backendCalls/customRecipes";

export default function LoginScreen({ route, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [snackBarEnabled, setSnackBarEnabled] = useState(false);
  const [passwordSecure, setPasswordSecure] = useState(true);
  const dispatch = useDispatch();

  const onLoginButtonPressed = () => {
    setLoadingButton(true);
    userSignIn(email.toLowerCase(), password)
      .then((userRef) => {
        if (userRef.data.response) {
          if (userRef.data.response.user.emailVerified) {
            getAllFavouriteRecipes(userRef.data.response.user.uid).then(
              (response) => {
                dispatch(setFavourite(response.data.response));
              }
            );
            getAllCustomRecipes(userRef.data.response.user.uid)
              .then((response) => {
                dispatch(setCustom(response))
              })
              .catch((err) => {
                console.log(err);
              });
            dispatch(login(userRef.data.response));
            navigation.goBack();
          } else {
            setLoginError("Please verify your email");
            setLoadingButton(false);
          }
        } else {
          if (userRef.data.code == "auth/wrong-password") {
            setLoginError("Please check your password");
            setLoadingButton(false);
          } else if (userRef.data.code == "auth/user-not-found") {
            setLoginError("Email not registered");
            setLoadingButton(false);
          } else if (userRef.data.code == "auth/invalid-email") {
            setLoginError("Email not valid");
            setLoadingButton(false);
          }
        }
      })
      .catch((err) => {});
  };

  const onDismissSnackBar = () => {
    setSnackBarEnabled(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.likeButton}>
        <CircleButton
          imgUrl={back}
          handlePress={() => navigation.goBack()}
        ></CircleButton>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/image/Login.png")}
          style={styles.workingImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.loginFormContainer}>
        <View style={styles.loginTextContainer}>
          <Text style={styles.loginText}>Sign In</Text>
        </View>
        <View style={styles.userInputContainer}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="email" size={25} />
          </View>
          <TextInput
            style={styles.userInputText}
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.userInputContainer}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="lock" size={25} />
          </View>
          <TextInput
            style={styles.userInputText}
            label="Password"
            secureTextEntry={passwordSecure}
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => {
                  setPasswordSecure(!passwordSecure);
                }}
              />
            }
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        {/* <View>
          <TouchableOpacity>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
         */}
        <Button
          style={{ marginTop: 20 }}
          mode="contained-tonal"
          buttonColor={"#000"}
          textColor={"white"}
          disabled={email == "" || password == ""}
          loading={loadingButton}
          onPress={() => {
            onLoginButtonPressed();
          }}
        >
          Login
        </Button>
        <View style={styles.loginErrorContainer}>
          <Text style={styles.loginErrorText}>{loginError}</Text>
        </View>
        <View style={styles.createNewAccountContainer}>
          <Text style={{ color: "grey" }}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            <Text style={{ fontWeight: "bold" }}> Create new one</Text>
          </TouchableOpacity>
        </View>
      </View>
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
        We've sent an email for varification!
      </Snackbar>
      <StatusBar style="auto" />
    </ScrollView>
  );
}
