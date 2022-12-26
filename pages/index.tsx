import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import CheckBox from 'expo-checkbox';
import { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//interfaces
import { Joke } from '../interfaces/interfaces'
import { Flags } from '../interfaces/interfaces'


let url:string='https://v2.jokeapi.dev/joke/Any?type=single';

export default function JokeSettings() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Joke>();

  const [nsfw,setBlacklistNsfw] = useState(false);
  const [religious,setBlacklistReligious]=useState(false);
  const [political,setBlacklistPolitical]=useState(false);
  const [racist,setBlacklistRacist]=useState(false);
  const [sexist,setBlacklistSexist]=useState(false);
  const [explicit,setBlacklistExplicit]=useState(false);

  const [contains,setContains]=useState("");
  const [idMin,setIdMin]=useState("");
  const [idMax,setIdMax]=useState("");

  const [stringIsBuild,setStringIsBuild]=useState(false);

  const navigation : any =useNavigation();
  
  let grap:any;

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
  if(data){
    grap=data?.joke;
    navigation.navigate("Joke",{grap});
  }
  

 


  
  return (
    <View>
      <Text>Choose what joke types to blacklist:</Text>
      <Text>Nsfw<CheckBox disabled={false} value={nsfw} onValueChange={(x)=>setBlacklistNsfw(x)}/></Text>
      
      <Text>Religious<CheckBox disabled={false} value={religious} onValueChange={(x)=>setBlacklistReligious(x)}/></Text>
      
      <Text>Political<CheckBox disabled={false} value={political} onValueChange={(x)=>setBlacklistPolitical(x)}/></Text>
      
      <Text>Racist<CheckBox disabled={false} value={racist} onValueChange={(x)=>setBlacklistRacist(x)}/></Text>
      
      <Text>Sexist<CheckBox disabled={false} value={sexist} onValueChange={(x)=>setBlacklistSexist(x)}/></Text>
      
      <Text>Explicit<CheckBox disabled={false} value={explicit} onValueChange={(x)=>setBlacklistExplicit(x)}/></Text>
      


      <TextInput onChangeText={text => setContains(text)} placeholder="contains"/>
      <TextInput onChangeText={text => setIdMin(text)} placeholder="idMin"/>
      <TextInput onChangeText={text => setIdMax(text)} placeholder="idMax"/>
      <Button title="get joke" disabled={false} onPress={BuildString} />

       
      <StatusBar style="auto" />
    </View>
  );
}