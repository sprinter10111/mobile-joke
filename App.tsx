import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Fragment, useEffect, useState } from 'react';
import JokeSettings from './modules/joke-settings/JokeSettings';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JokeShow from './modules/joke-show/JokeShow';

export default function App() {
  
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={JokeSettings}/>
        <Stack.Screen name="Joke" component={JokeShow}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

