import { getAllClients } from '@/services/client';
import { getNutritionistsByUserID } from '@/services/nutritionist';
import { getClientsByNutritionistId } from '@/services/nutritionist_clients';
import { ConsultationStackParamList, HealthStackParamList, ProfileStackParamList } from '@/types/navigation';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // You can use Feather icons for the bell


const ChatList = () => {
  const navigation = useNavigation<NavigationProp<ConsultationStackParamList>>();
  const [searchText, setSearchText] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);

//   const navigation = useNavigation<NavigationProp<HealthStackParamList>>();
//   const navigation2 = useNavigation<NavigationProp<RootStackParamList>>();

  const [userData, setUserData] = useState<any>(null);
  const [nutritionistData, setnutritionistData] = useState(null);
  const [clientData, setClientData] = useState([]);




  // Function to retrieve user data from AsyncStorage and fetch related data
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue) {
        const user = JSON.parse(jsonValue);
  
        setUserData(user); // Set user data

        await fetchNutritionistData(user.id); // Fetch client data
      } 
    } catch (error) {
      console.log('Error retrieving user data:', error);
      throw error;

    }
  };

  // Fetch client data by userId
  const fetchNutritionistData = async (userId: number) => {
    try {
      const nutritionist = await getNutritionistsByUserID(userId)


      setnutritionistData(nutritionist); // Set client data
      await fetchAllClients(nutritionist.id);
    
    } catch (error) {
      console.log('Error fetching client data:', error);
 
      throw error;
    }
  };

    // Fetch client data by userId
    const fetchAllClients = async (nutritionistId: number) => {
    try {
      
        const client = await getClientsByNutritionistId(nutritionistId);
        console.log(client);

        setClientData(client); // Set client data
        setFilteredMessages(client);
    
    } catch (error) {
        console.log('Error fetching client data:', error);
        setClientData([]);
    
        throw error;
    }
    };



  // useEffect to load user data when the component mounts
  useFocusEffect(
    useCallback(() => {
      // Call getUserData every time the screen comes into focus
      getUserData();

      return () => {
        // Clean-up logic if needed
      };
    }, []) // Add dependencies like 'update' to trigger re-render when it changes
  );

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const filtered = clientData.filter((item) =>
        item.firstName.toLowerCase().includes(text.toLowerCase()) ||
        item.lastName.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredMessages(filtered);
    } else {
      setFilteredMessages(clientData);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.messageContainer}  onPress={() => navigation.navigate('Consultation', { userId: item.userId,clientId: item.clientId, nutritionistId: nutritionistData.id})}>
      <FontAwesome name="user-circle" size={50} color="#888" style={styles.avatar} />
      <View style={styles.messageDetails}>
        <View style={styles.nameAndTime}>
          <Text style={styles.name}>{item.firstName} {item.lastName}</Text>

          {/* <Text style={styles.time}>{item.time}</Text> */}
        </View>
        <View style={styles.messageInfo}>
          <Text style={styles.messageText}>{item.email}</Text>
         
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <Text style={styles.greeting}>
        Hello {userData ? userData.firstName : 'Guest'} 👋
        </Text>
       
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search Clients"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      
      {/* Chat List */}
      <FlatList
        data={filteredMessages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50, // Padding to align the header down
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  bellIcon: {
    paddingRight: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F2',
    borderRadius: 15,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    
    marginBottom: 10,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: '#888',
  },
  list: {
    flex: 1,
  },
  messageContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  messageDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  nameAndTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  pinned: {
    marginLeft: 5,
  },
  time: {
    color: '#888',
    fontSize: 12,
  },
  messageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageText: {
    color: '#888',
    fontSize: 14,
  },
  unreadBadge: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default ChatList;