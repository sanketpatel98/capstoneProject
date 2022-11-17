import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../styles/commonStyles";

const styles = StyleSheet.create({
  mainContainer: {
    margin: 10,
  },
  topIcon: {
    width: 35,
    height: 35,
  },
  topContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20,
  },
  listContainer: {
    marginRight: -30,
    marginStart: -30,
    paddingStart: 25
  },
  greetingsContainer: {
    marginBottom: 30,
  },
  titleContainer: {
    alignItems: "flex-start",
  },
  titleText: {
    fontSize: SIZES.extraLarge,
    color: COLORS.black,
    fontWeight: "bold",
    fontStyle: 'italic'
  },
  container: {
    paddingTop: 10,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#DDF7F8",
  },
  recipeContainer: {
    borderColor: COLORS.black,
    // borderWidth: 2,
    borderRadius: 10,
    margin: 6,
  },
  recipeImageBackground: {
    width: 150,
    height: 100,
  },
  footerContainer:{
    marginEnd: 60
  },
  footerImageBackground: {
    width: 100,
    height: 100,
    marginTop: 5,
    marginStart: 4,
  },
  listTitle: {
    fontWeight: "bold",
    fontSize: SIZES.extraLarge,
    color: COLORS.black,
    marginBottom:10
  },
  descriptionContainer: {
    // alignItems: "center",
    marginTop: 10,
  },
  footerDescriptionContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  descriptionText: {
    color: COLORS.black,
    fontSize: SIZES.small,
  },
});

export default styles;
