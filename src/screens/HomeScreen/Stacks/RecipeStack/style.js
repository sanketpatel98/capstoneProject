import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { COLORS, SIZES } from "../../../../styles/commonStyles";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  recipeImageBackground: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.40,
  },
  recipeImageView: {
    flex: 2,
  },
  recipeDescriptionView: {
    flex: 3,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: COLORS.primary,
  },
  recipeDescriptionTitleView: {
    backgroundColor: COLORS.primary,
    width: Dimensions.get("window").width,
    paddingHorizontal: 50,
    marginTop: -50,
    paddingTop: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    minHeight: 100
  },
  recipeDescriptionTitleText: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: 'bold'
  },
});

export default styles;
