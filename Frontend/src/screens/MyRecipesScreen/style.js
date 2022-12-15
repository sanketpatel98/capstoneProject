import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { COLORS, SIZES } from '../../styles/commonStyles';


const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    workingImage:{
      width: 300
    },
    container: {
      paddingTop:10,
      flex: 1,
      backgroundColor: "#9AB8BA",
      alignItems: 'center',
      justifyContent: 'center',
    },
    descriptionContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    recipeImage:{
      width: 60,
      height: 60,
      marginRight: 5,
      borderRadius: 10
    },
    iconContainer:{
      alignItems: 'center',
      justifyContent: 'center'
    },
    recipeContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20
      // width: "70%"
    },
    buttonContainer:{
      flexDirection: 'row'
    },
    headerText:{
      marginTop: 20,
      fontSize: SIZES.large
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
    listContainer: {
      flex: 5,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: '#DDF7F8',
      width: Dimensions.get('window').width,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      
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
    },
    addNewRecipeButtonContainer:{
      marginBottom: 10
    }
  });

export default styles;