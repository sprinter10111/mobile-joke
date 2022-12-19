import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
//import CheckBox from '@react-native-community/checkbox';
import { useEffect, useState } from 'react';


//interface
import { Joke } from '../interfaces/interfaces'
import {Flags} from '../interfaces/interfaces'
//style
import {styles} from '../styles/index'

let url:string='https://v2.jokeapi.dev/joke/Any?type=single';

export default function index() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Joke>();

  const [nsfw,setNsfw] = useState(false);
  const [religious,setReligious]=useState(false);
  const [political,setPolitical]=useState(false);
  const [racist,setRacist]=useState(false);
  const [sexist,setSexist]=useState(false);
  const [explicit,setExplicit]=useState(false);

  const [contains,setContains]=useState("");
  const [idMin,setIdMin]=useState("");
  const [idMax,setIdMax]=useState("");

  const [stringIsBuild,setStringIsBuild]=useState(false);

  
  let grap;

  const BuildString=()=>{
    if(nsfw||religious||political||racist||sexist||explicit){
      url="https://v2.jokeapi.dev/joke/Any?blacklistFlags=";
      if(nsfw){
        url+="nsfw,";
      }
      if(religious){
        url+="religious,";
      }
      if(political){
        url+="political,";
      }
      if(racist){
        url+="racist,";
      }
      if(sexist){
        url+="sexist,";
      }
      if(explicit){
        url="explicit,";
      }
      url=url.slice(0,-1);
      url+="&type=single";
    }


    if(contains!=""&&idMin!=""){
      url+="&contains="+contains+"&"+"idRange="+idMin+"-"+idMax;
    }else{
      if(contains!=""){
        url+="&contains="+contains;
      }
      if(idMin!=""){
        url+="&idRange="+idMin+"-"+idMax;
      }
    }
    setStringIsBuild(true);
    console.log(url);
  }

  if(stringIsBuild){
      fetch(url)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    
    setStringIsBuild(false);
    url="https://v2.jokeapi.dev/joke/Any?type=single"
  }
  grap=data?.joke;
  
  return (
    <View style={styles.container}>
      <Text>nsfw</Text>    

      <TextInput onChangeText={text => setContains(text)} placeholder="contains"/>
      <TextInput onChangeText={text => setIdMin(text)} placeholder="idMin"/>
      <TextInput onChangeText={text => setIdMax(text)} placeholder="idMax"/>
      <Button title="get joke" disabled={false} onPress={BuildString}/>

       {isLoading ? <Text>Loading...</Text> : <View><Text>{grap}</Text></View>}
      <StatusBar style="auto" />
    </View>
  );
}