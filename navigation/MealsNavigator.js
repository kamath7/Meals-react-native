import { createStackNavigator,defaultNavigationOptions } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoriesMealsScreen from '../screens/CategoriesMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import {Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../constants/Colors';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import React from 'react';
import {Text} from 'react-native';

const defaultStackNavOptions = {
    defaultNavigationOptions: {
    
        headerStyle: {
            backgroundColor:Platform.OS === 'android' ? Colors.primaryColor: 'white'
        },
        headerTitleStyle:{
            fontSize: 10
        },
        headerBackTitleStyle:{
           
        },
        headerTintColor: Platform.OS === 'android'?'white': Colors.primaryColor
    }
};
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
    defaultNavigationOptions: defaultStackNavOptions}

);


const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
},{
    defaultNavigationOptions: defaultStackNavOptions } );

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo)=>{
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor}/>
            }
        },
        tabBarColor: Colors.primaryColor
        // tabBarLabel: <Text style={{}}></Text>
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            // tabBarLabel: 'Favorites!',
            tabBarIcon: (tabInfo)=>{
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor}/>
            },
            tabBarColor: Colors.accentColor
        }
    }
};

const MealFavTabNavigator = Platform.OS === 'android'? createMaterialBottomTabNavigator(
    tabScreenConfig,{
        activeColor: 'white',
        shifting: true
    }

) :createBottomTabNavigator(tabScreenConfig
,{
    tabBarOptions:{
        labelStyle: {

        },
        activeTintColor: Colors.accentColor
    }
});

const FilterNavigator = createStackNavigator({
    Filters: FiltersScreen
},  {
    navigationOptions: {
        drawerLabel: 'Filters'
    },
    defaultNavigationOptions: defaultStackNavOptions 
    } 
);
const MainNavigator = createDrawerNavigator({
    MealsFavs: {screen: MealFavTabNavigator, navigationOptions:{drawerLabel: 'Meals'}},
    Filters: FilterNavigator
},{
    contentOptions: {
        activeTintColor: Colors.accentColor
    }
});


export default createAppContainer(MainNavigator);