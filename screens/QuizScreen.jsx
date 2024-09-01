import React from 'react';
import { SafeAreaView } from 'react-native';
import Quiz from '../components/Quiz';

const QuizScreen = ({ route, navigation }) => {
  const { topic, difficulty } = route.params;

  return (
    <SafeAreaView>
      <Quiz topic={topic} difficulty={difficulty} navigation={navigation}/>
    </SafeAreaView>
  );
};

export default QuizScreen;
