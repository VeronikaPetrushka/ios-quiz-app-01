// import React from 'react';
// import {
//   SafeAreaView,
// } from 'react-native';

// import UserProfile from './components/UserProfile';
// import MainMenu from './components/MainMenu';
// import Quiz from './components/Quiz';
// import topics from './constants/quiz.js';

// const App = () => {

//   return (
//     <SafeAreaView>
//       {/* <UserProfile /> */}
//       <MainMenu/>
//     </SafeAreaView>
//   );
// };

// export default App;


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
        <Stack.Screen name="MainMenu" component={MainMenu} />
        <Stack.Screen name="QuizScreen" component={QuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;