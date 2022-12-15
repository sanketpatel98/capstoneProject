import styles from "./style";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CircleButton } from "../../components/CircleButton";
import back from "../../assets/image/left.png";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { userSignUp } from "../../backendCalls/user";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/userDataSclice";

export default function SignupScreen({ route, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [passwordSecure, setPasswordSecure] = useState(true)

  const dispatch = useDispatch();

  const onSignUpButtonPressed = () => {
    setLoadingButton(true);
    userSignUp(email.toLowerCase(), password)
      .then((userRef) => {
        if (userRef.data.userCred) {
          navigation.navigate("Login", { message: "verify email" });
        } else {
          if (userRef.data.code == "auth/weak-password") {
            setSignUpError("Please enter strong password");
            setLoadingButton(false);
          } else if (userRef.data.code == "auth/invalid-email") {
            setSignUpError("Email not valid");
            setLoadingButton(false);
          } else if (userRef.data.code == "auth/email-already-in-use") {
            setSignUpError("Email already in use");
            setLoadingButton(false);
          }
        }
      })
      .catch((err) => {});
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
          source={require("../../assets/image/SignUp.png")}
          style={styles.workingImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.loginFormContainer}>
        <View style={styles.loginTextContainer}>
          <Text style={styles.loginText}>Sign up</Text>
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
            right={<TextInput.Icon icon="eye" onPress={()=>{setPasswordSecure(!passwordSecure)}}/>}
            value={password}
            onChangeText={(text) => setPassword(text)}
            onBlur={() => {
              if (
                password != "" &&
                confirmPassword != "" &&
                password != confirmPassword
              ) {
                setSignUpError("passwords do not match");
              } else {
                setSignUpError("");
              }
            }}
          />
        </View>
        <View style={styles.userInputContainer}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="lock" size={25} />
          </View>
          <TextInput
            style={styles.userInputText}
            label="Confirm password"
            value={confirmPassword}
            secureTextEntry={passwordSecure}
            right={<TextInput.Icon icon="eye" onPress={()=>{setPasswordSecure(!passwordSecure)}}/>}
            onChangeText={(text) => setConfirmPassword(text)}
            onBlur={() => {
              if (password != confirmPassword) {
                setSignUpError("passwords do not match");
              } else {
                setSignUpError("");
              }
            }}
            onFocus={() => {
              setSignUpError("");
            }}
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
          disabled={
            email == "" ||
            password == "" ||
            confirmPassword == "" ||
            signUpError == "passwords do not match" ||
            password != confirmPassword
          }
          loading={loadingButton}
          onPress={() => {
            onSignUpButtonPressed();
          }}
        >
          Sign up
        </Button>
        <View style={styles.loginErrorContainer}>
          <Text style={styles.loginErrorText}>{signUpError}</Text>
        </View>
        <View style={styles.createNewAccountContainer}>
          <Text style={{ color: "grey" }}>Already Have one?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login", { message: "Lol" });
            }}
          >
            <Text style={{ fontWeight: "bold" }}> Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}
