import { Button } from 'react-native';
import JokeSettings from './pages/index';
import { NavigationContainer,useNavigationContainerRef  } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from 'react-native';
//pages
import JokeShow from './pages/joke';
import JokeRatings from './pages/jokes'
//components
import Footer from './components/Footer';

export default function App() {
  
  const Stack = createNativeStackNavigator();
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