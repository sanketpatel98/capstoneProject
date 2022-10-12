import styles from './style'
import { Text, View, ImageBackground } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { CircleButton } from '../../../../components/CircleButton'
import heart from '../../../../assets/image/heart.png'
import back from '../../../../assets/image/left.png'

export default function Recipe({ route, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.recipeImageView}>
        <ImageBackground
          source={{ uri: route.params.item.image }}
          style={styles.recipeImageBackground}
          resizeMode="cover"
        />
      </View>
      <View style={styles.floatButton}>
        <View style={styles.likeButton}>
          <CircleButton imgUrl={heart}></CircleButton>
        </View>
        <View style={styles.backButton}>
          <CircleButton imgUrl={back} handlePress={() => navigation.goBack()}></CircleButton>
        </View>
      </View>
      <View style={styles.recipeDescriptionView}>
        <View style={styles.recipeDescriptionTitleView}>
          <Text numberOfLines={2} style={styles.recipeDescriptionTitleText}>
            {route.params.item.title}
          </Text>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  )
}
