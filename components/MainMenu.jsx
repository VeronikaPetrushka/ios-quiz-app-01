import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import topics from '../constants/quiz.js';

const MainMenu = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [easyModeResults, setEasyModeResults] = useState(null);
  const [hardModeResults, setHardModeResults] = useState(null);
  const [isResultsModalVisible, setIsResultsModalVisible] = useState(false);
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
  const [isFactsModalVisible, setIsFactsModalVisible] = useState(false);
  const [isAboutModalVisible, setIsAboutModalVisible] = useState(false);

  useEffect(() => {
    async function loadResults() {
      try {
        const easyModeData = await AsyncStorage.getItem('EasyMode');
        const hardModeData = await AsyncStorage.getItem('HardMode');
        if (easyModeData) {
          setEasyModeResults(JSON.parse(easyModeData));
        }
        if (hardModeData) {
          setHardModeResults(JSON.parse(hardModeData));
        }
      } catch (error) {
        console.error('Error loading results:', error);
      }
    }
    loadResults();
  }, []);

  const saveResult = async (difficulty, newScore, newTimeTaken) => {
    try {
      const key = difficulty === 'Easy' ? 'EasyMode' : 'HardMode';
      const storedResult = await AsyncStorage.getItem(key);
      const parsedResult = storedResult ? JSON.parse(storedResult) : null;

      if (!parsedResult || newScore > parsedResult.score) {
        const newBestResult = { score: newScore, timeTaken: newTimeTaken };
        await AsyncStorage.setItem(key, JSON.stringify(newBestResult));

        if (difficulty === 'Easy') {
          setEasyModeResults(newBestResult);
        } else {
          setHardModeResults(newBestResult);
        }
      }
    } catch (error) {
      console.error('Error saving result:', error);
    }
  };

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
      navigation.navigate('QuizScreen', { topic: null, difficulty: selectedDifficulty });
    } else if (selectedTopic && selectedDifficulty) {
      navigation.navigate('QuizScreen', { topic: selectedTopic, difficulty: selectedDifficulty });
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

  const handleFactsPress = () => {
    setIsFactsModalVisible(true);
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

      {selectedDifficulty !== 'Hard' && (
        <Modal isVisible={isModalVisible} onBackdropPress={handleModalClose} style={styles.modal}>
          <View style={styles.modalContent}>
            <ScrollView>
              {topics.map((topic, index) => (
                <TouchableOpacity key={index} style={styles.btn} onPress={() => handleTopicSelect(topic)}>
                  <Text style={styles.btnText}>{topic.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>
      )}
      <Modal isVisible={isResultsModalVisible} onBackdropPress={() => setIsResultsModalVisible(false)} style={styles.modal}>
        <View style={styles.modalContent}>
          <ScrollView>
            <View style={styles.resultsContainer}>
              <View style={styles.column}>
                <Text style={styles.columnHeader}>Easy Mode</Text>
                {easyModeResults ? (
                  <View>
                    <Text>Best Score: {easyModeResults.score} points</Text>
                    <Text>Time Taken: {easyModeResults.timeTaken} seconds</Text>
                  </View>
                ) : (
                  <Text>No results yet.</Text>
                )}
              </View>
              <View style={styles.column}>
                <Text style={styles.columnHeader}>Hard Mode</Text>
                {hardModeResults ? (
                  <View>
                    <Text>Best Score: {hardModeResults.score} points</Text>
                    <Text>Time Taken: {hardModeResults.timeTaken} seconds</Text>
                  </View>
                ) : (
                  <Text>No results yet.</Text>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      <Modal isVisible={isOptionsModalVisible} onBackdropPress={() => setIsOptionsModalVisible(false)} style={styles.modal}>
        <View style={styles.modalContent}>
            <View style={styles.regulatorContainer}>
                <Text style={styles.regulatorText}>Music</Text>
                <View style={styles.regulator}>
                <TouchableOpacity>
                    <Text style={styles.regulatorSigns}>-</Text>
                </TouchableOpacity>
                    <View style={styles.regulatorDisplay}></View>
                <TouchableOpacity>
                    <Text style={styles.regulatorSigns}>+</Text>
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.regulatorContainer}>
                <Text style={styles.regulatorText}>Vibration</Text>
                <View style={styles.regulator}>
                <TouchableOpacity>
                    <Text style={styles.regulatorSigns}>-</Text>
                </TouchableOpacity>
                    <View style={styles.regulatorDisplay}></View>
                <TouchableOpacity>
                    <Text style={styles.regulatorSigns}>+</Text>
                </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.btnOptions} onPress={handleFactsPress}>
                <Text style={styles.btnText}>Historical facts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOptions}>
                <Text style={styles.btnText}>Reset progress</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOptions}>
                <Text style={styles.btnText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOptions} onPress={() => setIsOptionsModalVisible(false)}>
                <Text style={styles.btnText}>Home</Text>
            </TouchableOpacity>
        </View>
      </Modal>

      <Modal isVisible={isAboutModalVisible} onBackdropPress={() => setIsAboutModalVisible(false)} style={styles.modal}>
        <View style={styles.modalContent}>
            <Text style={styles.aboutModalTitle}>About</Text>
            <Text style={styles.aboutText}>Test your knowledge about Lugano with simple true/false statements. 
                This quiz covers a range of interesting facts about the city and is divided
                 into ten themes: Geography and Nature, History, Culture and Art, Economy and 
                 Business, Education and Science, Tourism and Recreation, Transport and 
                 Infrastructure, Cuisine and Gastronomy, Sports and Outdoor Activities, and 
                 Life in Lugano. Answer each statement to see how well you know this beautiful Swiss city!
            </Text>
            <TouchableOpacity style={styles.btnClose} onPress={() => setIsAboutModalVisible(false)}>
                <Text style={styles.btnText}>Close</Text>
            </TouchableOpacity>
        </View>
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
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: 345,
    height: 550,
    justifyContent: "space-around",
    alignItems: "center"
  },
  resultsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  column: {
    width: '45%',
  },
  columnHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  aboutModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  aboutText: {
    fontSize: 20,
  },
  btnClose: {
    width: 200,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15
  },
  btnText: {
    fontSize: 20,
  },
  regulatorContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  regulatorText: {
    fontSize: 18,
    marginBottom: 10
  },
  regulator: {
    width: 300,
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10
  },
  regulatorSigns: {
    fontSize: 20,
    padding: 10
  },
  regulatorDisplay: {
    width: 100,
    height: 40,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10
  },
  btnOptions: {
    width: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10
  }
};

export default MainMenu;
