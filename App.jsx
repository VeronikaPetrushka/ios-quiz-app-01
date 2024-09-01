import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenu from './components/MainMenu';
import QuizScreen from './screens/QuizScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu">
        <Stack.Screen 
          name="MainMenu" 
          component={MainMenu} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="QuizScreen" 
          component={QuizScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;