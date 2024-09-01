import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import topics from '../constants/quiz.js';
import TopicModal from './TopicModal';
import ResultsModal from './ResultsModal';
import OptionsModal from './OptionsModal';
import AboutModal from './AboutModal';

const MainMenu = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [easyModeResults, setEasyModeResults] = useState(null);
  const [hardModeResults, setHardModeResults] = useState(null);
  const [isResultsModalVisible, setIsResultsModalVisible] = useState(false);
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
  const [isAboutModalVisible, setIsAboutModalVisible] = useState(false);

  const loadResults = async () => {
    try {
      const easyModeData = await AsyncStorage.getItem('EasyMode');
      const hardModeData = await AsyncStorage.getItem('HardMode');
      if (easyModeData) {
        const newEasyModeResults = JSON.parse(easyModeData);
        setEasyModeResults(newEasyModeResults);
      } else {
        setEasyModeResults(null);
      }
      if (hardModeData) {
        const newHardModeResults = JSON.parse(hardModeData);
        setHardModeResults(newHardModeResults);
      } else {
        setHardModeResults(null);
      }
    } catch (error) {
      console.error('Error loading results:', error);
    }
  };

  useEffect(() => {
    loadResults();
  }, []);

  const handlePress = () => {
    if (selectedDifficulty === 'Hard') {
      startQuiz();
    } else {
      setIsModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    handleModalClose();
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const startQuiz = () => {
    if (selectedDifficulty === 'Hard') {
      navigation.navigate('QuizScreen', {
        topic: null,
        difficulty: selectedDifficulty,
      });
    } else if (selectedTopic && selectedDifficulty) {
      navigation.navigate('QuizScreen', {
        topic: selectedTopic,
        difficulty: selectedDifficulty,
      });
    } else {
      Alert.alert('Selection Required', 'Please select a topic and difficulty level');
    }
  };

  const handleResultsPress = () => {
    setIsResultsModalVisible(true);
  };

  const handleAboutPress = () => {
    setIsAboutModalVisible(true);
  };

  const handleOptionsPress = () => {
    setIsOptionsModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.btn} onPress={handlePress}>
          <Text style={styles.btnText}>
            {selectedDifficulty === 'Hard' ? 'Start Quiz' : (selectedTopic ? selectedTopic.name : 'Application Topics')}
          </Text>
        </TouchableOpacity>
        <View style={styles.quizModeContainer}>
          <Text style={styles.quizModeText}>Quiz mode:</Text>
          <View style={styles.quizModeBtnContainer}>
            <TouchableOpacity
              style={[styles.btnEasy, selectedDifficulty === 'Easy' ? styles.selected : null]}
              onPress={() => handleDifficultySelect('Easy')}
            >
              <Text style={styles.btnText}>Easy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnHard, selectedDifficulty === 'Hard' ? styles.selected : null]}
              onPress={() => handleDifficultySelect('Hard')}
            >
              <Text style={styles.btnText}>Hard</Text>
            </TouchableOpacity>
          </View>
        </View>
        {selectedDifficulty !== 'Hard' && (
          <TouchableOpacity style={styles.btn} onPress={startQuiz}>
            <Text style={styles.btnText}>Start Quiz</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.btn} onPress={handleResultsPress}>
          <Text style={styles.btnText}>Results</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleOptionsPress}>
          <Text style={styles.btnText}>Options</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleAboutPress}>
          <Text style={styles.btnText}>About</Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={isModalVisible} onBackdropPress={handleModalClose} style={styles.modal}>
        <TopicModal
          topics={topics}
          onSelect={(topic) => handleTopicSelect(topic)}
          onClose={handleModalClose}
        />
      </Modal>
      <Modal isVisible={isResultsModalVisible} onBackdropPress={() => setIsResultsModalVisible(false)}>
        <ResultsModal
          easyModeResults={easyModeResults}
          hardModeResults={hardModeResults}
          onClose={() => setIsResultsModalVisible(false)}
        />
      </Modal>
      <Modal isVisible={isOptionsModalVisible} onBackdropPress={() => setIsOptionsModalVisible(false)}>
        <OptionsModal
          isVisible={isOptionsModalVisible}
          onBackdropPress={() => setIsOptionsModalVisible(false)}
          onResetPress={() => loadResults()}
        />
      </Modal>
      <Modal isVisible={isAboutModalVisible} onBackdropPress={() => setIsAboutModalVisible(false)}>
        <AboutModal
          isVisible={isAboutModalVisible}
          onBackdropPress={() => setIsAboutModalVisible(false)}
        />
      </Modal>
    </SafeAreaView>
  );
};


const styles = {
  container: {
    padding: 15,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  innerContainer: {
    padding: 30,
    width: "100%"
  },
  btn: {
    width: "100%",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    marginBottom: 10
  },
  quizModeContainer: {
    width: "100%",
    alignItems: "center",
  },
  quizModeText: {
    fontSize: 20,
    marginVertical: 20
  },
  quizModeBtnContainer: {
    width: "100%",
    flexDirection: "row"
  },
  btnEasy: {
    width: "49%",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    marginBottom: 10,
    marginRight: "2%"
  },
  btnHard: {
    width: "49%",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    marginBottom: 10
  },
  selected: {
    backgroundColor: "#B0E0E6",
  },
  btnText: {
    fontSize: 18,
  }
};

export default MainMenu;
