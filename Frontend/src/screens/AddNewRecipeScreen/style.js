import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { COLORS, SIZES } from '../../styles/commonStyles';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#9AB8BA",
      alignItems: 'center',
      justifyContent: 'center',
    },
    workingImage:{
      width: 300
    },
    titleRecipeContainer:{
      marginBottom: 70
    },
    titleRecipeText:{
      fontSize: SIZES.extraLarge
    },
    uploadImageContainer: {
      marginTop: 10,
      marginBottom: 10
    },
    uploadImageButtonsContainer: {
      flexDirection: 'row'
    },
    uploadImageImageContainer: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    AddNewRecipeFormContainer: {
      // flex:1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textInput: {
      height: 40,
      width: Dimensions.get('window').width - 100,
    },
    textInputContainer: {
      marginBottom: 20,
      borderRadius: 10,
      borderColor: 'black',
      borderWidth: 1,
      paddingLeft: 20
    },
    titleContainer: {
      flex:1,
      // flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: "#9AB8BA",
      width: Dimensions.get('window').width,
    },
    titleBarContainer:{
      flexDirection: 'row',
      borderColor: COLORS.black,
      borderWidth: 2,
      paddingVertical: 10,
      borderRadius: 15,
      paddingStart: 15,
      minWidth: Dimensions.get('window').width - 60,
    },
    headerText:{
      marginTop: 20,
      fontSize: SIZES.large
    },
    listContainer: {
      flex: 5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#DDF7F8',
      width: Dimensions.get('window').width,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40
    },
    serchIngredientTextInput:{
      marginStart: 10,
      color: COLORS.white,
      fontSize: SIZES.large
    },
    emptyImage:{
      width: Dimensions.get('window').width - 70
    },
    ingredientListContainer:{
      backgroundColor: "#9AC8BA",
      borderRadius: 30,
      borderColor: COLORS.black,
      margin: 40,
      padding: 20,
      width: "80%"
    },
    suggestedIngredientContainer: {
      flexDirection: 'row',
      borderBottomColor: 'black',
      paddingVertical: 11,
      borderBottomWidth: 1
    },
    addedIngredientContainer: {
      flexDirection: 'row',
      borderBottomColor: 'black',
      paddingVertical: 11,
      borderBottomWidth: 1,
      justifyContent: 'space-between'
    },
    suggestedIngredientText: {
      fontSize: SIZES.large,
      marginStart: 5
    },
    addedIngredientText: {
      fontSize: SIZES.large,
      marginStart: 5
    }
  });

export default styles;