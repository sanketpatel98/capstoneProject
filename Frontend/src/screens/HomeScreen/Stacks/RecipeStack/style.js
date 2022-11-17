import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { COLORS, SIZES } from "../../../../styles/commonStyles";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  recipeImageBackground: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.45,
  },
  recipeImageView: {
    flex: 2,
    backgroundColor: COLORS.black,
  },
  recipeDescriptionView: {
    flex: 3,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    // marginTop: -120,
    backgroundColor: COLORS.primary,
  },
  recipeDescriptionTitleView: {
    backgroundColor: COLORS.primary,
    width: Dimensions.get("window").width,
    paddingHorizontal: 40,
    marginTop: -50,
    paddingTop: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    minHeight: 100,
  },
  recipeDescriptionTitleText: {
    color: COLORS.black,
    fontSize: SIZES.large + 3,
    fontWeight: "bold",
  },
  floatButton: {
    alignContent: "space-between",
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: -130,
    width: 0,
    maxHeight: 0,
    borderRadius: SIZES.extraLarge,
    borderBottomLeftRadius: SIZES.extraLarge,
    position: "absolute",
    top: Dimensions.get("window").height * 0.22,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  likeButton: {
    position: "absolute",
    left: Dimensions.get("window").width - 70,
  },
  backButton: {
    position: "absolute",
    left: 30,
  },
  preprationTimeText: {
    color: COLORS.gray,
  },
  ingredientContainer: {
    marginEnd: 10,
  },
  ingredientImage: {
    height: 140,
    width: 140,
  },
  ingredientDescriptionContainer: {
    alignItems: "center",
  },
  ingredientContainerList: {
    marginTop: 30,
    paddingHorizontal: 25,
    alignItems: "center",
  },
  ingredientContainerListTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listContainer: {
    marginEnd: -30,
    marginStart: -30,
    paddingStart: 30,
    paddingRight: 30,
  },
  instructionView: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: COLORS.lightGreen,
    borderRadius: 40,
    marginHorizontal: 25,
    padding: 30,
    flex: 1,
  },
  instructionAndSummaryTitleContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 15
  },
  instructionViewTitle: {
    color: COLORS.darkGreen,
    fontSize: SIZES.large,
    fontWeight: "bold",
  },
  stepsScrollView: {
    maxHeight: 300,
    marginTop: 10,
  },
  stepsText: {
    marginBottom: 10,
    color: COLORS.darkGreen,
  },
  summaryText:{
    color: COLORS.darkGreen,
  }
});

export default styles;
