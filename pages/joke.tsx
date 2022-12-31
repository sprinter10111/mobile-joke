import { Text, View, Button } from 'react-native';
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {styles} from '../styles/joke'
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function JokeShow() {
  const route: RouteProp<any> = useRoute();
  
  const SaveJoke=async()  =>{
       await AsyncStorage.setItem(JSON.stringify(route.params?.grapId.Id), JSON.stringify(route.params?.grapId.grap));
    }
  
  return (
    <View style={styles.container}>
        <Text>{route.params?.grapId.grap}</Text>
        <Button title='Save Joke' onPress={SaveJoke} color='orange'/>
    </View>
  );
}