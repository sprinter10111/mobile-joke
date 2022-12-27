import { setStatusBarTranslucent, StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Fragment, useEffect, useState } from 'react';
import { NavigationContainer, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GrapId } from '../interfaces/interfaces';


export default function JokeShow() {
  const route: RouteProp<any> = useRoute();
  const navigation : any =useNavigation();
  
 
  
  const SaveJoke=async()  =>{      
       await AsyncStorage.setItem(JSON.stringify(route.params?.grapId.Id), JSON.stringify(route.params?.grapId.grap)); 
      navigation.navigate("ratings"); 
    }
  
  return (
    <Fragment>
        <Text>{route.params?.grapId.grap}</Text>
        <Button title='Save Joke' onPress={SaveJoke}/>
    </Fragment>
  );
}