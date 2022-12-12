import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../styles/commonStyles";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // alignItems: "center",
    // justifyContent: "center",
  },
  loginTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30
  },
  loginText:{
    fontSize: SIZES.extraLarge + SIZES.base
  },
  userInputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    ...SHADOWS.dark
  },
  userInputText: {
    marginLeft: 10,
    width: Dimensions.get('window').width - 130,
    fontSize: SIZES.medium
  },
  iconContainer:{
    justifyContent: 'center'
  },
  imageContainer: {
    // flex:0.80,
    height: '25%',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'    
  },
  workingImage: {
    width: 250,
  },
  likeButton: {
    position: "absolute",
    top: 53,
    left: 30,
    zIndex:1
  },
  loginErrorContainer: {
    marginTop:5,
    justifyContent: 'center',
    alignItems:'center'
  },
  loginErrorText: {
    color: 'red'
  },
  loginFormContainer: {
    marginVertical: -10,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green'
  },
  createNewAccountContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;
