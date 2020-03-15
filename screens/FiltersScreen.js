import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet,Switch, Platform} from 'react-native';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';

import {useDispatch} from 'react-redux';
import {setFilters} from '../store/actions/meals';


const FilterSwitch = props=>{
    return(
        <View style={styles.filterContainer}>
        <Text>{props.label}</Text>
        <Switch 
        trackColor={{true: Colors.primaryColor}}
        thumbColor= {Platform.OS === 'android'?Colors.primaryColor:'white'}
        value={props.state} 
        onValueChange={props.onChange}
        />
        </View>
    )
}


const FiltersScreen = props =>{

    const {navigation} = props;
    const [isGlutenFree, setisGlutenFree] = useState(false)
    const [isLactoseFree, setisLactoseFree] = useState(false)
    const [isVegan, setisVegan] = useState(false)
    const [isVegetarian, setisVegetarian] = useState(false)
    const disptach = useDispatch();
    
    const saveFilters = useCallback(()=>{
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            isVegan: isVegan,
            isVegetarian: isVegetarian
        };
        disptach(setFilters(appliedFilters));
    },[isGlutenFree,isLactoseFree,isVegan,isVegetarian,disptach]);
    useEffect(()=>{
            props.navigation.setParams({
                save: saveFilters()
            });
    },[saveFilters]);

    return(
        <View style={styles.screen}>
            <Text styles={styles.title}>Available Filters</Text>
            <FilterSwitch label="Gluten-free" state={isGlutenFree} onChange={newValue => setisGlutenFree(newValue)}/>
            <FilterSwitch label="Lactose-free" state={isLactoseFree} onChange={newValue => setisLactoseFree(newValue)}/>
            <FilterSwitch label="Vegan" state={isVegan} onChange={newValue => setisVegan(newValue)}/>

            <FilterSwitch label="Vegetartian" state={isVegetarian} onChange={newValue => setisVegetarian(newValue)}/>

            
        </View>
    )
};

FiltersScreen.navigationOptions =(navData)=>{
    return{
    headerTitle: 'Filter Meals',
    headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton} >
                    <Item title="Menu" iconName="ios-menu" onPress={()=>{navData.navigation.toggleDrawer()}}/>
                </HeaderButtons>),
    headerRight: (<HeaderButtons HeaderButtonComponent={HeaderButton} >
        <Item title="Save" iconName="ios-save" 
        onPress={navData.navigation.getParam('save')}
        />
    </HeaderButtons>)
}
}
const styles = StyleSheet.create({
    screen:{
        flex: 1,
        alignItems: 'center'
    },
    title:{
        fontFamily: 'open-sans-bold',
        fontSize: 21,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15

    }
});
export default FiltersScreen;