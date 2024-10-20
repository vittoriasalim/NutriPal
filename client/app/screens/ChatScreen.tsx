import { getConversation, sendMessage } from '@/services/message';
import { getNutritionistByClientId } from '@/services/nutritionist_clients';
import { ProfileStackParamList } from '@/types/navigation';
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';

const ChatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();
  const { clientId } = route.params;  // Access the parameters passed
  const [messages, setMessages] = useState([]);

  const [nutri, setNutri] = useState();

  const [inputText, setInputText] = useState('');

  
  const handleSend = async () => {
    if (inputText.trim()) {
      const newMessage = {
        clientId, // Assuming clientId is passed as a prop or available in state
        nutritionistId:nutri?.nutritionistId, // Assuming nutritionistId is passed as a prop or available in state
        message: inputText,
        isNutriSender:false,  // Set this depending on whether the sender is the nutritionist
      };
      try {
        // Send the message to the backend and save it to the database
        const savedMessage = await sendMessage(newMessage);
        console.log(savedMessage);
      
      
        // After the message is saved, update the messages state to display it
        setMessages([...messages, savedMessage]);
        
        // Clear the input field
        setInputText('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
        const fetchMessages = async (nutriID, clientID) => {
        try {
            const response = await getConversation(nutriID, clientID);
            console.log(response);
            console.log(response);
            setMessages(response);
        } catch (err) {
            throw err;
        }
        };
      const getNutri = async (clientID: number) => {
        try {
          // Make the API call to fetch nutritionists by clientId
          const response = await getNutritionistByClientId(clientID);  // Uncomment when API is available
          console.log(response);
          if (response && response.length > 0) {
            setNutri(response[0]);
            console.log(response[0].nutritionistId);
            await fetchMessages(response[0].nutritionistId, clientId);
          }
          // You can set the nutritionist state here if needed
          // setNutritionists(response.data);
        } catch (err) {
          console.error('Error fetching nutritionist:', err);
        }
      };
   
  
      // Ensure clientId is correctly logged and available
      console.log('Client ID:', clientId);
  
      // Call the async function to fetch nutritionists
      getNutri(clientId);
  
      return () => {
        // Clean-up logic if needed
      };
  
    }, [clientId])
  );
  const renderMessageItem = ({ item }) => {
    return (
      <View style={[styles.messageContainer, !item.isNutriSender ? styles.sentMessage : styles.receivedMessage]}>
        <Text style={styles.messageText}>{item.message}</Text>
        <Text style={styles.timeText}>{item.createdAt}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
     
        <View style={styles.headerTextContainer}>
        {nutri && (
        <Text style={styles.userName}>{nutri.firstName} {nutri.lastName}</Text>
        )}
          <Text style={styles.userStatus}>{nutri.email}</Text>
        </View>
      </View>

      {/* Messages List */}
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}

      />

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message"
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    paddingBottom:70
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop:70,
    backgroundColor: '#91C788',
  },
  backButton: {
    marginRight: 20,
    fontSize:30
  },
  backButtonText: {
    color: '#fff',
    fontSize: 25,
    marginLeft:15
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerTextContainer: {
    flexDirection: 'column',
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userStatus: {
    color: '#fff',
    fontSize: 14,
  },
  messagesList: {
    paddingHorizontal: 10,
    paddingVertical: 20,


   
  },
  messageContainer: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#E5F7D6',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
  },
  messageText: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',

  },
  textInput: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 15,

    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#91C788',
    borderRadius: 20,
    padding: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ChatScreen;


