import React, {useEffect, useCallback} from 'react';
import {ScrollView, View, Text, Button, StyleSheet,Image} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import {useSelector, useDispatch} from 'react-redux';
import {toggleFavorite} from '../store/actions/meals';

const ListItem = props=>{
    return(
        <View style={styles.istItem}>
            <Text>{props.children}</Text>
        </View>
    );
};

const MealDetailsScreen = props =>{
    const availableMeals = useSelector(state=> state.meals.meals);
    const mealId = props.navigation.getParam('mealId');
    const currentFavoriteMeals = useSelector(state=> state.meals.favoriteMeals.some(meal => meal.id === mealId));

    const selectedMeal = availableMeals.find(meal=> meal.id === mealId);
    
    const dispatch = useDispatch();
    const toggleFavoriteHandler = useCallback(()=>{
        dispatch(toggleFavorite(mealId));
    },[dispatch,mealId]);
    useEffect(()=>{
        // props.navigation.setParams({mealTitle: selectedMeal.title})
        props.navigation.setParams({toggleFavorite: toggleFavoriteHandler})
    },[toggleFavoriteHandler]);

    useEffect(()=>{
        props.navigation.setParams({isFavorite: currentFavoriteMeals})
    },[currentFavoriteMeals]);
    return(
        <ScrollView>
        <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
        <View style={styles.detail}>
        <DefaultText >{selectedMeal.duration} MINS</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>

   </View>
   <Text style={styles.title}>Ingredients</Text>
    
        {selectedMeal.ingredients.map(ingredient=> (<ListItem key={ingredient}>{ingredient}</ListItem>))}
   <Text style={styles.title}>Steps</Text>
   {selectedMeal.steps.map(step=> (<ListItem key={step}>{step}</ListItem>))}
        
        </ScrollView>
    )
};

MealDetailsScreen.navigationOptions  = (navigationData)=>{

    const mealId = navigationData.navigation.getParam('mealId');
    const toggleFavorite = navigationData.navigation.getParam('toggleFavorite');
    const isFavorite = navigationData.navigation.getParam('isFavorite');
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    // const selectedMeal = MEALS.find(meal=> meal.id === mealId);

    return {
        headerTitle: mealTitle,
        headerTitleStyle: {
            fontSize: 15,
            marginLeft: 20
        },
        headerRight: () =>(
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Favorite"
                   iconName={isFavorite? 'ios-star' : 'ios-star-outline'}
                   onPress={toggleFavorite}
                   />
        </HeaderButtons>
        )
    }; 
};

const styles = StyleSheet.create({
    image:{
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
},
title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
},
listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
}
});
export default MealDetailsScreen;