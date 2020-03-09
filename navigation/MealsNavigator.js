import { createStackNavigator,defaultNavigationOptions } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoriesMealsScreen from '../screens/CategoriesMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import {Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../constants/Colors';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import React from 'react';
const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
        navigationOptions: {
            headerTitle: 'Meal Categories'
        }
    },
    CategoryMeals: {
        screen: CategoriesMealsScreen
    },
    MealDetail: MealDetailScreen
    
},
{
    mode: 'modal',
    // initialRouteName : 'MealDetail',
    defaultNavigationOptions: {
    
    headerStyle: {
        backgroundColor:Platform.OS === 'android' ? Colors.primaryColor: 'white'
    },
    headerTintColor: Platform.OS === 'android'?'white': Colors.primaryColor
}}

);

const MealFavTabNavigator = createBottomTabNavigator({
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo)=>{
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor}/>
            }
        }
    },
    Favorites: {
        screen: FavoritesScreen,
        navigationOptions: {
            // tabBarLabel: 'Favorites!',
            tabBarIcon: (tabInfo)=>{
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor}/>
            }
        }
    }
},{
    tabBarOptions:{
        activeTintColor: Colors.accentColor
    }
});

export default createAppContainer(MealFavTabNavigator);