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
    marginBottom: 30
  },
  loginText:{
    fontSize: SIZES.extraLarge + SIZES.base
  },
  userInputContainer: {
    flexDirection: 'row',
    marginBottom: 30,
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
    // flex:0.60,
    height: '25%',
    marginTop: 70,
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
    flex: 1,
    borderColor: COLORS.black,
    marginVertical: -40,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green'
  },
  createNewAccountContainer: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;
