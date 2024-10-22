import React, { useCallback, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import ChatsScreen from './ChatsScreen';
import { ConsultationStackParamList } from '@/types/navigation';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import AccountProfileScreen from '../AccountProfileScreen';
import ClientProfile from './ClientProfile';
import { AsyncStorage } from 'react-native';
import { getUserProfile } from '@/services/user';
import { useRoute } from '@react-navigation/native';



export default function MyTabs() {
  const route = useRoute();
  const [selectedTab, setSelectedTab] = useState('Chat');
  const navigation = useNavigation<NavigationProp<ConsultationStackParamList>>();
  const [userData, setUserData] = useState<any>(null);
  const { userId,clientId,nutritionistId } = route.params;  // Prevent error if params is undefined
 
  // Function to retrieve user data from AsyncStorage and fetch related data
  const getUserData = async () => {
    try {
      if (!userId) {
        console.log('clientId is missing!');
        return;
      }
      const jsonValue = await getUserProfile(userId);
      console.log(jsonValue);
      
    
      setUserData(jsonValue); // Set user data

     

    } catch (error) {

      throw error;

    }
  };
  // useEffect to load user data when the component mounts
  useFocusEffect(
    useCallback(() => {

      
      console.log(nutritionistId);
      // Call getUserData every time the screen comes into focus
      getUserData();

      return () => {
        // Clean-up logic if needed
      };
    }, [clientId,userId,nutritionistId]) // Add dependencies like 'update' to trigger re-render when it changes
  );

  return (
    <View style={{ flex: 1 , backgroundColor:'#fff', marginBottom:20}}>
      {/* Tab Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
     
        <View style={styles.headerTextContainer}>
        {userData ? (
            <>
              <Text style={styles.userName}>{userData.firstName} {userData.lastName}</Text>
              <Text style={styles.userStatus}>{userData.email}</Text>
            </>
          ) : (
            <Text style={styles.userName}>User data not available</Text> // Fallback when no user data
          )}
        </View>
      </View>
      <View style={styles.tabBar}>
        <TouchableOpacity
          onPress={() => setSelectedTab('Chat')}
          style={styles.tab}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Chat' ? styles.activeTabText : styles.inactiveTabText,
            ]}
          >
            Chat
          </Text>
          {selectedTab === 'Chat' && <View style={styles.underline} />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedTab('Client Profile')}
          style={styles.tab}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Client Profile' ? styles.activeTabText : styles.inactiveTabText,
            ]}
          >
            Client Profile
          </Text>
          {selectedTab === 'Client Profile' && <View style={styles.underline} />}
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {selectedTab === 'Chat' ? <ChatsScreen clientId={clientId} nutritionistId={nutritionistId}></ChatsScreen> : <ClientProfile userData={userData}></ClientProfile>}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  
    paddingVertical: 10,
 

  },
  tab: {
    flex: 1,
    alignItems: 'center',

   
  },
  tabText: {
    fontSize: 17,
    fontFamily:'Poppins-Regular',
    paddingBottom:9
    
  },
  activeTabText: {
    color:'#91C788',// Active tab color (purple)
  },
  inactiveTabText: {
    color:'gray'
   
  },
  underline: {
    height: 2,
    backgroundColor:'#91C788', // Underline color
    width: '100%',
    marginTop: 2,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop:90,
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
});