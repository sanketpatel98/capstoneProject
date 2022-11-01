import { useEffect, useState } from 'react'
import {
  FlatList, ImageBackground, ScrollView,
  StatusBar, Text, TouchableOpacity, View
} from 'react-native'
import heart from '../../../../assets/image/heart.png'
import back from '../../../../assets/image/left.png'
import { getRecipeById, getRecipeInstructionById } from '../../../../backendCalls/recipeData'
import { CircleButton } from '../../../../components/CircleButton'
import styles from './style'

export default function Recipe({ route, navigation }) {

  const [recipe, setRecipe] = useState([])
  const [recipeInstructions, setRecipeInstructions] = useState([])
  const [readyInMinutes, setReadyInMinutes] = useState()

  useEffect(()=>{

    // getting recipe(for readyInMinutes)
    getRecipeById(route.params.item.id)
    .then((res) => {
      console.log("getRecipeById RESPONSE SUCCESS");
      setReadyInMinutes(res.readyInMinutes)
    })
    .catch((error) => {
      console.log(error);
    });

    // getting instructions 
    getRecipeInstructionById(route.params.item.id)
      .then((res) => {
        console.log("getRecipeInstructionById RESPONSE SUCCESS");
        setRecipeInstructions(res)
      })
      .catch((error) => {
        console.log(error);
      });
  },[])

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
          source={{ uri: item.image }}
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


  // return (<View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
  //   <Text>Hello</Text>
  // </View>)
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
              Time to prepare: {readyInMinutes} Minutes
            </Text>
          </View>
          <View style={styles.ingredientContainerList}>
            <Text style={styles.ingredientContainerListTitle}>
              Required Ingredients
            </Text>
            <FlatList
              data={route.params.item.usedIngredients.concat(route.params.item.missedIngredients)}
              renderItem={renderItems}
              keyExtractor={(item) => item.id}
              horizontal={true}
              style={styles.listContainer}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          { recipeInstructions.length != 0 && <View style={styles.instructionView}>
            <Text style={styles.instructionViewTitle}>INSTRUCTIONS</Text>
            <ScrollView style={styles.stepsScrollView} nestedScrollEnabled = {true} showsVerticalScrollIndicator={false}>
              {recipeInstructions[0].steps.map((step) => (
                <Text style={styles.stepsText} key={step.number}>{step.number}) {step.step}</Text>
              ))}
            </ScrollView>
          </View> }
          
        </View>

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  )
}
