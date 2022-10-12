import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'
import { COLORS, SIZES } from '../../../../styles/commonStyles'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeImageBackground: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.45,
  },
  recipeImageView: {
    flex: 2,
    backgroundColor: COLORS.black
  },
  recipeDescriptionView: {
    flex: 3,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    // marginTop: -120,
    backgroundColor: COLORS.white,
  },
  recipeDescriptionTitleView: {
    backgroundColor: COLORS.white,
    width: Dimensions.get('window').width,
    paddingHorizontal: 50,
    // marginTop: -50,
    paddingTop: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    minHeight: 100,
  },
  recipeDescriptionTitleText: {
    color: COLORS.black,
    fontSize: SIZES.large,
    fontWeight: 'bold',
  },
  floatButton: {
    alignContent: 'space-between',
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: -130,
    width: 0,
    maxHeight: 0,
    borderRadius: SIZES.extraLarge,
    borderBottomLeftRadius: SIZES.extraLarge,
    position: 'absolute', top: Dimensions.get('window').height * 0.22, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
  },
  likeButton:{
    position: 'absolute', left: Dimensions.get('window').width - 70
  },
  backButton:{
    position: 'absolute', left: 30
  }
})

export default styles
