import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Fragment, useEffect, useState } from 'react';
import JokeSettings from './pages/index';
import { NavigationContainer,useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//pages
import JokeShow from './pages/joke';
import JokeRatings from './pages/ratings'
//components
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {

  
  
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: 'red',
          
        },
        contentStyle: {
          backgroundColor:'#e8e8e8',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center'
      }}>
        <Stack.Screen name="Home" component={JokeSettings}/>
        <Stack.Screen name="Joke" component={JokeShow}/>
        <Stack.Screen name="ratings" component={JokeRatings} options={({navigation, route})=>({
          headerLeft:()=>(
            <Button title='Go home' onPress={navigation.navigate("")}/>
          )
        })}/>
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
}