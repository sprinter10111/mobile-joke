import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Fragment, useEffect, useState } from 'react';
import JokeSettings from './pages/index';
import { NavigationContainer,useNavigation,useNavigationContainerRef  } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from 'react-native';
//pages
import JokeShow from './pages/joke';
import JokeRatings from './pages/ratings'
//components
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  
  const Stack = createNativeStackNavigator();
  //const navigation : any =useNavigation();
  const navigationRef = useNavigationContainerRef();
  LogBox.ignoreAllLogs();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName='JokeSettings' screenOptions={{
        headerStyle: {
          backgroundColor: 'red',
          
        },
        contentStyle: {
          backgroundColor:'#e8e8e8',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center'
      }}>
        <Stack.Screen name="Home" component={JokeSettings} 
        options={({navigation})=>({
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('ratings')}
              title="Saved jokes"
              color='orange'
            />
          ),
        })}/>
        <Stack.Screen name="Joke" component={JokeShow}
        options={({navigation})=>({
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('ratings')}
              title="Saved jokes"
              color='orange'
            />
          ),
        })}/>
        <Stack.Screen name="ratings" component={JokeRatings}
        options={({navigation})=>({
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('Home')}
              title="Home"
              color='orange'
            />
          ),
        })}/>
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
}