import { StatusBar } from 'expo-status-bar';
import { ScrollView ,StyleSheet, Text, View, TextInput, Button } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Fragment, useEffect, useState } from 'react';
import { NavigationContainer, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from 'expo-speech';
import Async from "react-async";

let allegrappen : string[]=[];

const fetchAllItems = async () => {  
      const keys = await AsyncStorage.getAllKeys();      
      const items = await AsyncStorage.multiGet(keys);
      for(let i=0; i<keys.length;i++){
        allegrappen[i]=items[i][1]||"";

        //dit doet niets???
        /*allegrappen[i]=allegrappen[i].replace(/[\n\r]/g,' ');        
        allegrappen[i]=allegrappen[i].replace("\ ", " ");
        console.log(allegrappen[i]);       */
      }      
}

const speak = (grap:string) => {
    
  Speech.speak(grap);
};


export default function  JokeShow() {
  const route: RouteProp<any> = useRoute();
  const navigation : any =useNavigation();    
  fetchAllItems();
  /*<Async promiseFn={fetchAllItems}>
    {({ data, error, isLoading }) => {
      if (isLoading) return "Loading...";
      if (error) return `Something went wrong: ${error.message}`;
      if (data)
        return (
          <View>
      <ScrollView>
      {allegrappen.map((grap) => {
         return (
          <View>
            <Text>{grap}</Text>
            <Button title="Press to hear the joke" onPress={()=>speak(grap)}/>
          </View>
        );
      })}
      </ScrollView>
    </View>
          
        );
      return null;
    }}
  </Async>*/



  
  return (

<View>
<ScrollView>
      {allegrappen.map((grap) => {
         return (
          <View>
            <Text>{grap}</Text>
            <Button title="Press to hear the joke" onPress={()=>speak(grap)}/>
          </View>
        );
      })}
      </ScrollView>
    </View>

  );
}