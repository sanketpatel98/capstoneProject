import styles from "./style";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CircleButton } from "../../components/CircleButton";
import back from "../../assets/image/left.png";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { userSignIn } from "../../backendCalls/user";

export default function LoginScreen({ route, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const [loginError, setLoginError] = useState("");

  const onLoginButtonPressed = () => {
    setLoadingButton(true);
    userSignIn(email.toLowerCase(), password.toLowerCase())
      .then((userRef) => {
        if (userRef.data.response) {
          navigation.goBack();
        } else {
          console.log(userRef.data.code);
          if (userRef.data.code == "auth/wrong-password") {
            setLoginError("Please check your password");
            setLoadingButton(false);
          } else if (userRef.data.code == "auth/user-not-found") {
            setLoginError("Email not registered")
            setLoadingButton(false);
          } else if (userRef.data.code == "auth/invalid-email") {
            setLoginError("Email not valid")
            setLoadingButton(false);
          }
        }
      })
      .catch((err) => {});
  };

  return (
    <View style={styles.container}>
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
          <TouchableOpacity>
            <Text style={{ fontWeight: "bold" }}> Create new one</Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
