import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Fragment, useEffect, useState } from 'react';
import JokeSettings from './pages/index';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JokeShow from './pages/joke';
import JokeRatings from './pages/ratings'

import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Header />
      <Stack.Navigator>
        <Stack.Screen name="Home" component={JokeSettings}/>
        <Stack.Screen name="Joke" component={JokeShow}/>
        <Stack.Screen name="ratings" component={JokeRatings}/>
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
}