import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import Modal from 'react-native-modal';
import topics from '../constants/quiz.js';

const MainMenu = ({ navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);

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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <TouchableOpacity style={styles.btn} onPress={handlePress}>
                    <Text style={styles.btnText}>{selectedDifficulty === 'Hard' ? 'Start Quiz' : (selectedTopic ? selectedTopic.name : 'Application Topics')}</Text>
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
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Results</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Options</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
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
        width: "100%"    },
    // imagePlaceholder: {
    //     width: "100%",
    //     height: 180,
    //     borderWidth: 1,
    //     borderColor: "#ccc",
    //     borderRadius: 20,
    //     marginBottom: 30
    // },
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
    }
};

export default MainMenu;
