import { ProfileStackParamList } from '@/types/navigation';
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';

const ChatScreen = () => {
  const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi', time: '9:12 PM', type: 'sent' },
    { id: '2', text: 'How are you', time: '9:15 PM', type: 'received' },
    { id: '3', text: "Fine! What's your email?", time: '9:16 PM', type: 'sent' },
    { id: '4', text: 'christinapearson@gmail.com', time: '9:21 PM', type: 'received' },
    { id: '5', text: 'Good Night', time: '11:18 PM', type: 'sent' },
  ]);

  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: (messages.length + 1).toString(),
        text: inputText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'sent',
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const renderMessageItem = ({ item }) => {
    return (
      <View style={[styles.messageContainer, item.type === 'sent' ? styles.sentMessage : styles.receivedMessage]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
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
          <Text style={styles.userName}>Debra Nguyen</Text>
          <Text style={styles.userStatus}>online</Text>
        </View>
      </View>

      {/* Messages List */}
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        inverted // Inverts the list to show the latest messages at the bottom
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