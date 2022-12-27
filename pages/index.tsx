import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Fragment, useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {styles} from '../styles/index'

//interfaces
import { Joke } from '../interfaces/interfaces'
import { Flags } from '../interfaces/interfaces'
import { GrapId } from '../interfaces/interfaces'


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
  
  let grapId:GrapId;

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
    grapId={grap:data?.joke,Id:data?.id};
    navigation.navigate("Joke",{grapId});
  }
  

 


  
  return (
    <View style={styles.container}>
      <Text style={styles.texttitle}>Choose what joke types to blacklist:</Text>

      <View>
        <Text style={styles.text}><CheckBox disabled={false} value={nsfw} onValueChange={(x)=>setBlacklistNsfw(x)}/> Nsfw</Text>
      
        <Text style={styles.text}><CheckBox disabled={false} value={religious} onValueChange={(x)=>setBlacklistReligious(x)}/> Religious</Text>
      
        <Text style={styles.text}><CheckBox disabled={false} value={political} onValueChange={(x)=>setBlacklistPolitical(x)}/> Explicit</Text>
      
        <Text style={styles.text}><CheckBox disabled={false} value={racist} onValueChange={(x)=>setBlacklistRacist(x)}/> Racist</Text>
      
        <Text style={styles.text}><CheckBox disabled={false} value={sexist} onValueChange={(x)=>setBlacklistSexist(x)}/> Sexist</Text>
      
        <Text style={styles.text}><CheckBox disabled={false} value={explicit} onValueChange={(x)=>setBlacklistExplicit(x)}/> Explicit</Text>
      </View>

      <TextInput style={styles.textinput} onChangeText={text => setContains(text)} placeholder="contains"/>
      <TextInput style={styles.textinput} onChangeText={text => setIdMin(text)} placeholder="idMin"/>
      <TextInput style={styles.textinput} onChangeText={text => setIdMax(text)} placeholder="idMax"/>
      <Button title="get joke" disabled={false} onPress={BuildString} />

       
      <StatusBar style="auto" />
    </View>
  );
}

