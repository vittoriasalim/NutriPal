import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getConversation, sendMessage } from '@/services/message';

const ChatsScreen = ({ clientId, nutritionistId }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');


  const handleSend = async () => {
    if (inputText.trim()) {
      const newMessage = {
        clientId, // Assuming clientId is passed as a prop or available in state
        nutritionistId, // Assuming nutritionistId is passed as a prop or available in state
        message: inputText,
        isNutriSender: true,  // Set this depending on whether the sender is the nutritionist
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

  const renderMessageItem = ({ item }) => {
    return (
      <View style={[styles.messageContainer, item.isNutriSender ? styles.sentMessage : styles.receivedMessage]}>
        <Text style={styles.messageText}>{item.message}</Text>
        <Text style={styles.timeText}>{item.createdAt}</Text>
      </View>
    );
  };

  useFocusEffect(
    useCallback(() => {
      const fetchMessages = async (nutriID, clientID) => {
        try {
          const response = await getConversation(nutriID, clientID);
          console.log(response);
          setMessages(response);
        } catch (err) {
          throw err;
        }
      };
      console.log("extract messages");
      console.log(clientId);
      console.log(nutritionistId);

      fetchMessages(nutritionistId, clientId);

      return () => {
        // Clean-up logic if needed
      };
    }, [clientId, nutritionistId])
  );

  return (
    <View style={styles.container}>
      {/* Messages List */}
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        // Remove 'inverted' to show messages from top to bottom
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
    paddingBottom: 70,
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

export default ChatsScreen;