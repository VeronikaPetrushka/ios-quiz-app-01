import { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = () => {
    const [name, setName] = useState("");
    // const [selectedAvatar, setSelectedAvatar] = useState(null);

    // const handleAvatarSelect = (avatar) => {
    //     setSelectedAvatar(avatar);
    // }

    const handleNameChange = (text) => {
        setName(text);
      };

    const handleReset = () => {
        setName("");
        // setSelectedAvatar(null);
    }

    const handleSubmit = async () => {
        try {
          await AsyncStorage.setItem('userProfile', name);
          console.log('User profile saved successfully!');
        } catch (error) {
          console.error('Error saving user profile:', error);
        }
      }

    return(
        <SafeAreaView style={styles.container}>
          <View style={styles.upperContainer}>
            <Text style={styles.title}>Set up your account</Text>
            <View style={styles.avatarPlaceholder}></View>
            <TextInput 
              value={name}
              placeholder="Enter your name"
              placeholderTextColor="#ccc"
              onChangeText={handleNameChange}
              style={styles.input}
            />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btnCreate} onPress={handleReset}>
              <Text>Create account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnReset} onPress={handleReset}>
              <Text>Reset</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
    )
};

const styles = {
    container: {
        padding: 15,
        flexDirection: "column", 
        justifyContent: "start",
        alignItems: "center",
        height: "100%"
    },

    upperContainer: {
      marginTop: 50,
      width: "100%",
      padding: 40,
      alignItems: "center"
    }, 

    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 30
    },

    avatarPlaceholder: {
      width: 130,
      height: 130,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 100,
    },

    input: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 30,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 10,
      width: "100%",
    },

    btnContainer: {
      width: "100%",
      padding: 40,
      alignItems: "center"
    },

    btnCreate: {
      width: "100%",
      alignItems: "center",
      padding: 12,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 20,
      marginBottom: 10
    },

    btnReset: {
      width: "100%",
      alignItems: "center",
      padding: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 20,
    }
};

export default UserProfile;