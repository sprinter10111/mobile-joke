import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Fragment, useEffect, useState } from 'react';
import { NavigationContainer, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from 'expo-speech';

let allegrappen : string[]=[];

const fetchAllItems = async () => {  
      const keys = await AsyncStorage.getAllKeys()      
      const items = await AsyncStorage.multiGet(keys)
      
      for(let i=0;i<keys.length;i++){              
          allegrappen[i]=await (items[i][1])||"";            
      }
      
}


export default function  JokeShow() {
  const route: RouteProp<any> = useRoute();
  const navigation : any =useNavigation();   

  
  const speak = (degrap: string) => {
    
    Speech.speak(degrap);
  };
  
  fetchAllItems();
  
  
  return (
    <>
    <Text>lijst met grappen</Text>
    
    <ol>{allegrappen.map((grap) => <li>{grap} <Button title="Press to hear some words" onPress={speak(grap)} /> </li>)}</ol>
    
     
    </>
  );
}