import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import AboutScreen from './components/AboutScreen';
import RestaurantDetail from './components/RestaurantDetail';
import EditRestaurant from './components/EditRestaurant'; 
import AddRestaurant from './components/AddRestaurant'; 
import MapScreen from './components/MapScreen'; 


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
        <Stack.Screen name="EditRestaurant" component={EditRestaurant} />
        <Stack.Screen name="AddRestaurant" component={AddRestaurant} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
