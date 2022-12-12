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
    paddingStart: 25,
  },
  qrcodeScannerIcon:{
    height: 20,
    width: 20
  },
  absoluteFillObject: {
    height: "100%",
    width: "100%",
  },
  barcodeScanner:{
    width: '100%',
    height: '90%'
  },
  greetingsContainer: {
    marginBottom: 30,
  },
  titleContainer: {
    alignItems: "flex-start",
  },
  titleText: {
    fontSize: SIZES.extraLarge + SIZES.small,
    color: '#2d3b24',
    fontWeight: "bold",
    fontStyle: "italic",
  },
  container: {
    
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.mainThemeColor,
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
  footerContainer: {
    marginEnd: 60,
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
    color: COLORS.mainTextColor,
    marginBottom: 10,
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
    color: COLORS.mainDescColor,
    fontSize: SIZES.small,
  },
});

export default styles;
