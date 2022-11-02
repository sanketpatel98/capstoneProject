import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { COLORS, SIZES } from '../../styles/commonStyles';

const styles = StyleSheet.create({
    container: {
      paddingTop:10,
      flex: 1,
      backgroundColor: "#9AB8BA",
      alignItems: 'center',
      justifyContent: 'center',
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
      paddingVertical: 5,
      borderBottomWidth: 1
    },
    suggestedIngredientText: {
      fontSize: SIZES.large,
      marginStart: 5
    }
  });

export default styles;