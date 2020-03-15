import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import MealsNavigator from '../meals-app/navigation/MealsNavigator';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import mealsReducer from './store/reducers/meals';

const fetchFonts = ()=>{
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};
const rootReducer = combineReducers({
  meals: mealsReducer
});
const store = createStore(rootReducer);


export default function App() {

  const [fontLoaded, setfontLoaded] = useState(false);

  if(!fontLoaded){
    return (<AppLoading 
              startAsync={fetchFonts} 
              onFinish={()=> setfontLoaded(true)}
            />)
  }

 return (<Provider store={store}>
            <MealsNavigator/>
        </Provider>);
}

