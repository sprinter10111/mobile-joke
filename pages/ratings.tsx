import { ScrollView ,Text, View, Button } from 'react-native';
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
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

        //dit doet niets???
        /*allegrappen[i]=allegrappen[i].replace(/[\n\r]/g,' ');        
        allegrappen[i]=allegrappen[i].replace("\ ", " ");
        console.log(allegrappen[i]);       */
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
  fetchAllItems();
    if(counter==0){
      onRefresh();
      setCounter(1);
    }
  
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