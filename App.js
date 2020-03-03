import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

const fetchFonts = ()=>{
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};


export default function App() {

  const [fontLoaded, setfontLoaded] = useState(false);

  if(!fontLoaded){
    return (<AppLoading 
              startAsync={fetchFonts} 
              onFinish={()=> setfontLoaded(true)}
            />)
  }

  return (
    <View style={styles.container}>
      <Text>Hello My Dude!</Text>
    </View>
  );
}

