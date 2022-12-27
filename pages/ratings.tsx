import { StatusBar } from 'expo-status-bar';
import { ScrollView ,StyleSheet, Text, View, TextInput, Button,RefreshControl } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Fragment, useEffect, useState } from 'react';
import { NavigationContainer, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from 'expo-speech';
import React from 'react';

let allegrappen : string[]=[];
let stringGrap:string[]=[];

const fetchAllItems = async () => {  
      const keys = await AsyncStorage.getAllKeys();      
      const items = await AsyncStorage.multiGet(keys);
      for(let i=0; i<keys.length;i++){
        allegrappen[i]=items[i][1]||"";
      }      
}

const speak = (grap:string) => {
    
  Speech.speak(grap);
};

const wait = (timeout: number | undefined) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


export default function  JokeShow() {
  const [counter,setCounter]=React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  
  const route: RouteProp<any> = useRoute();
  const navigation : any =useNavigation();    
  fetchAllItems().then(function(){
    stringGrap=allegrappen;
    let re=/\n/g;
    stringGrap.map((grap)=>{
      grap.replace(new RegExp('\n', 'g'), "<br />");
    })
    console.log(stringGrap);
  });

  if(allegrappen!=null){
    
    //console.log(allegrappen);
  }

  if(counter==0){
    onRefresh();
    setCounter(1);
  }
  
  
  return (

    <View >
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        {stringGrap.map((grap) => {
          return (
            <View>
              <Text>{grap}</Text>
              <Button title="Press to hear the joke" onPress={()=>speak(grap)} />
            </View>
          );
        })}
      </ScrollView>
    </View>

  );
}