import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Fragment, useEffect, useState } from 'react';
import { NavigationContainer, useNavigation, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


export default function JokeShow() {
  const route: RouteProp<any> = useRoute();
  const navigation : any =useNavigation();

  let grap2=route.params?.grap;

    const SaveJoke=()=>{
        navigation.navigate("ratings",{grap2});
    }
  
  return (
    <Fragment>
        <Text>{route.params?.grap}</Text>
        <Button title='Save Joke' onPress={SaveJoke}/>
    </Fragment>
  );
}