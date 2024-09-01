import React, { useState } from 'react';
import { Modal, View, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import topics from '../constants/quiz.js';

const OptionsModal = ({ isVisible, onBackdropPress, onResetPress }) => {
  const [isFactsModalVisible, setIsFactsModalVisible] = useState(false);
  const [selectedFactTopic, setSelectedFactTopic] = useState(null);

  const handleResetPress = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset your progress? This will delete all your results.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('EasyMode');
              await AsyncStorage.removeItem('HardMode');
              onResetPress();
              Alert.alert('Progress Reset', 'Your progress has been reset.');
            } catch (error) {
              console.error('Error resetting progress:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleFactsPress = () => {
    setIsFactsModalVisible(true);
  };

  const handleClose = () => {
    setIsFactsModalVisible(false);
  };

  return (
    <Modal 
      isVisible={isVisible}
      onBackdropPress={onBackdropPress} 
      style={styles.modal}       
      transparent={true}
    >
      <View style={styles.modalContent}>
        {isFactsModalVisible ? (
          <View style={styles.modalInnerContent}>
            <ScrollView>
              {selectedFactTopic ? (
                <View style={styles.factContainer}>
                  <ScrollView style={styles.factScrollView} contentContainerStyle={{alignItems: "center"}}>
                  <Text style={styles.factName}>{selectedFactTopic.name}</Text>
                  <Text style={styles.factText}>{selectedFactTopic.fact}</Text>
                  </ScrollView>
                  <TouchableOpacity style={styles.btnClose} onPress={() => setSelectedFactTopic(null)}>
                    <Text style={styles.btnText}>Back to topics</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.factContainer}>
                  {topics.map((topic, index) => (
                    <TouchableOpacity key={index} style={styles.btn} onPress={() => setSelectedFactTopic(topic)}>
                      <Text style={styles.btnText}>{topic.name}</Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity style={styles.btnClose} onPress={handleClose}>
                    <Text style={styles.btnText}>Back to options</Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>
        ) : (
          <View style={styles.modalInnerContent}>
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
            <TouchableOpacity style={styles.btnOptions} onPress={handleResetPress}>
              <Text style={styles.btnText}>Reset progress</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOptions}>
              <Text style={styles.btnText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOptions} onPress={() => onBackdropPress()}>
              <Text style={styles.btnText}>Home</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = {
  btn: {
    width: "100%",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    marginBottom: 10
  },
    modal: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 15,
      width: "90%",
      height: "80%",
      marginTop: "18%",
      marginLeft: "5%"
    },
    modalInnerContent: {
      width: "100%",
      height: "100%",
      justifyContent: "space-around",
      alignItems: "center"
    },
    btnClose: {
      width: 200,
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 15,
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
    },
    factContainer: {
      width: "100%",
      height: "100%",
      justifyContent: "space-between",
      alignItems: "center",
    },
    factScrollView: {
      flex: 1,
      height: 440
    },
    factName: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 10
    },
    factText: {
      fontSize: 20,
      textAlign: 'center',
    }
  };

export default OptionsModal;