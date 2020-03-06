import { createStackNavigator,defaultNavigationOptions } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoriesMealsScreen from '../screens/CategoriesMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import {Platform} from 'react-native';
import Colors from '../constants/Colors';
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

export default createAppContainer(MealsNavigator);