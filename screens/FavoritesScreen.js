import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MealList from '../components/MealList';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import {useSelector} from 'react-redux';
import DefaultText from '../components/DefaultText'
const FavoritesScreen = props =>{

    const favoriteMeals = useSelector(state => state.meals.favoriteMeals);
    if(favoriteMeals.length === 0 || !favoriteMeals){
        return (
            <View style={styles.content}>
                <DefaultText>No favorites yet. You can add some!</DefaultText>
            </View>
        )
    }
    return(
        <MealList listData={favoriteMeals} navigation={props.navigation}/>
    )
};
const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

FavoritesScreen.navigationOptions =(navData)=>{
    return{
    headerTitle: 'Your Favorites',
    headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton} >
                    <Item title="Menu" iconName="ios-menu" onPress={()=>{navData.navigation.toggleDrawer()}}/>
                </HeaderButtons>)
}
}

export default FavoritesScreen;