import styles from './style'
import {
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StatusBar
} from 'react-native'
// import { StatusBar } from 'expo-status-bar'
import { CircleButton } from '../../../../components/CircleButton'
import heart from '../../../../assets/image/heart.png'
import back from '../../../../assets/image/left.png'

export default function Recipe({ route, navigation }) {
  const baseUrl = 'https://spoonacular.com/cdn/ingredients_500x500/'
  const renderItems = ({ item }) => (
    <TouchableOpacity
    // onPress={() => {
    //   navigation.navigate('Recipe', {
    //     item: item,
    //   })
    // }}
    >

      <View style={styles.ingredientContainer}>
        <ImageBackground
          source={{ uri: baseUrl + item.image }}
          style={styles.ingredientImage}
          imageStyle={{ borderRadius: 14 }}
          resizeMode="cover"
        ></ImageBackground>
        <View style={styles.ingredientDescriptionContainer}>
          <Text style={styles.descriptionText}>
            {item.name.length >= 20
              ? item.name.substring(0, 19) + '...'
              : item.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <ScrollView style={styles.container} nestedScrollEnabled = {true}>
      <StatusBar hidden />
      <View>
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
            <CircleButton
              imgUrl={back}
              handlePress={() => navigation.goBack()}
            ></CircleButton>
          </View>
        </View>
        <View style={styles.recipeDescriptionView}>
          <View style={styles.recipeDescriptionTitleView}>
            <Text numberOfLines={3} style={styles.recipeDescriptionTitleText}>
              {route.params.item.title}
            </Text>
            <Text style={styles.preprationTimeText}>
              Time to prepare: {route.params.item.readyInMinutes} Minutes
            </Text>
          </View>
          <View style={styles.ingredientContainerList}>
            <Text style={styles.ingredientContainerListTitle}>
              Required Ingredients
            </Text>
            <FlatList
              data={route.params.item.extendedIngredients}
              renderItem={renderItems}
              keyExtractor={(item) => item.id}
              horizontal={true}
              style={styles.listContainer}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={styles.instructionView}>
            <Text style={styles.instructionViewTitle}>INSTRUCTIONS</Text>
            <ScrollView style={styles.stepsScrollView} nestedScrollEnabled = {true} showsVerticalScrollIndicator={false}>
              {route.params.item.analyzedInstructions[0].steps.map((step) => (
                <Text style={styles.stepsText} key={step.number}>{step.number}) {step.step}</Text>
              ))}
            </ScrollView>
          </View>
        </View>

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  )
}
