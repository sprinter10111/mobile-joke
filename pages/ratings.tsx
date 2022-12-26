import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Fragment, useEffect, useState } from 'react';
import { NavigationContainer, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function JokeShow() {
  const route: RouteProp<any> = useRoute();
  const navigation : any =useNavigation();


  
  return (
    <Fragment>
        <Text>{route.params?.grap2}</Text>
    </Fragment>
  );
}