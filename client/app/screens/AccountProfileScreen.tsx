import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import ProfileCard from '@/components/ProfileCard';
import ProfileInfo from '@/components/ProfileInfo';
import { HealthStackParamList, ProfileStackParamList, RootStackParamList } from '@/types/navigation';
import { getClientByUserId } from '@/services/clients';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountProfileScreen = () => {
  const navigation = useNavigation<NavigationProp<HealthStackParamList>>();
  const navigation2 = useNavigation<NavigationProp<RootStackParamList>>();
  const [isModalVisible, setModalVisible] = useState(false); // State to handle modal visibility
  const [modalContent, setModalContent] = useState(''); // State to track modal content
  const [userData, setUserData] = useState<any>(null);
  const [clientData, setClientData] = useState<Client | null>(null);
  const [nutritionData, setNutritionData] = useState<DailyNutrition[]>([]);
  const [todayNutrition, setTodayNutrition] = useState<DailyNutrition | null>(null);
  const [loading, setLoading] = useState<boolean>(true);



  // Function to retrieve user data from AsyncStorage and fetch related data
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue) {
        const user = JSON.parse(jsonValue);
        console.log(user);
        setUserData(user); // Set user data

        await fetchClientData(user.id); // Fetch client data
      } else {

        setLoading(false); // No data found, stop loading
      }
    } catch (error) {
      console.log('Error retrieving user data:', error);
      setLoading(false);
    }
  };

  // Fetch client data by userId
  const fetchClientData = async (userId: number) => {
    try {
      const client = await getClientByUserId(userId);
      console.log(client);

      setClientData(client); // Set client data
    
    } catch (error) {
      console.log('Error fetching client data:', error);
      setLoading(false);
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
 


  const handleSignOut = () => {
    navigation2.navigate("SplashScreen");
    
    
  };

  const toggleModal = (content = '') => {
    setModalContent(content);
    setModalVisible(!isModalVisible); // Toggle modal visibility
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <ScrollView contentContainerStyle={styles.container2}>
      {userData?.firstName && userData?.lastName && userData?.email ? (
        <ProfileCard 
            firstName={userData.firstName} 
            lastName={userData.lastName} 
            email={userData.email}
        />
        ) : (
        <Text>Missing user data</Text>
        )}
       {userData && clientData ? (
        <ProfileInfo user={userData} client={clientData} />
        ) : (
        <Text>Loading user and client data...</Text>
        )}

        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate("NutritionistMatchScreen")}>
            <Text style={styles.optionText}>Find Nutritionist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate("Consultation", { clientId: clientData.id})}>
            <Text style={styles.optionText}>View Consultation</Text>
          </TouchableOpacity>

          {/* Privacy Policy with Modal */}
          <TouchableOpacity style={styles.optionItem} onPress={() => toggleModal('privacy')}>
            <Text style={styles.optionText}>Privacy Policy</Text>
          </TouchableOpacity>

          {/* Terms & Conditions with Modal */}
          <TouchableOpacity style={styles.optionItem} onPress={() => toggleModal('terms')}>
            <Text style={styles.optionText}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal for Privacy Policy and Terms & Conditions */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => toggleModal()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              {/* Dynamically render content based on modalContent state */}
              {modalContent === 'privacy' && (
                <>
                  <Text style={styles.modalHeader}>Privacy Policy</Text>

                  <Text style={styles.modalSectionHeader}>Effective Date:</Text>
                  <Text style={styles.modalText}>18th October 2024</Text>

                  <Text style={styles.modalSectionHeader}>1. Information We Collect</Text>
                  <Text style={styles.modalText}>
                    We collect the following types of information to provide and improve our services:
                  </Text>

                  <Text style={styles.modalSubHeader}>1.1 Personal Information</Text>
                  <Text style={styles.modalText}>
                    When you sign up for NutriPal, we may collect personal information such as:
                  </Text>
                  <View style={styles.bulletContainer}>
                    <Text style={styles.modalBullet}>• Name</Text>
                    <Text style={styles.modalBullet}>• Email address</Text>
                    <Text style={styles.modalBullet}>• Date of birth</Text>
                    <Text style={styles.modalBullet}>• Gender</Text>
                    <Text style={styles.modalBullet}>• Height and weight</Text>
                    <Text style={styles.modalBullet}>• Dietary preferences (e.g., vegetarian, allergies)</Text>
                  </View>

                  <Text style={styles.modalSubHeader}>1.2 Health and Activity Data</Text>
                  <Text style={styles.modalText}>
                    To offer personalized nutrition plans, we collect health-related information such as:
                  </Text>
                  <View style={styles.bulletContainer}>
                    <Text style={styles.modalBullet}>• Dietary goals (e.g., weight loss, muscle gain)</Text>
                    <Text style={styles.modalBullet}>• Food preferences, meal history, and consumption patterns</Text>
                    <Text style={styles.modalBullet}>• Physical activity levels</Text>
                    <Text style={styles.modalBullet}>• Medical conditions (optional)</Text>
                  </View>

                  <Text style={styles.modalSectionHeader}>2. How We Use Your Information</Text>
                  <Text style={styles.modalText}>
                    We use the collected information for the following purposes:
                  </Text>
                  <View style={styles.bulletContainer}>
                    <Text style={styles.modalBullet}>• Personalized Nutrition Plans</Text>
                    <Text style={styles.modalBullet}>• App Improvement</Text>
                    <Text style={styles.modalBullet}>• Customer Support</Text>
                    <Text style={styles.modalBullet}>• Notifications and Alerts</Text>
                    <Text style={styles.modalBullet}>• Legal Compliance</Text>
                  </View>

                  <Text style={styles.modalSectionHeader}>3. Information Sharing</Text>
                  <Text style={styles.modalText}>
                    We do not sell, rent, or share your personal information with third parties, except in the following cases:
                  </Text>
                  <View style={styles.bulletContainer}>
                    <Text style={styles.modalBullet}>• With Service Providers</Text>
                    <Text style={styles.modalBullet}>• For Legal Obligations</Text>
                    <Text style={styles.modalBullet}>• Business Transfers</Text>
                  </View>

                  <Text style={styles.modalSectionHeader}>4. Data Retention</Text>
                  <Text style={styles.modalText}>
                    We will retain your personal information only for as long as necessary to fulfill the purposes for which it was collected.
                  </Text>

                  <Text style={styles.modalSectionHeader}>5. Data Security</Text>
                  <Text style={styles.modalText}>
                    We use technical, administrative, and physical safeguards to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                  </Text>

                  <Text style={styles.modalSectionHeader}>6. Your Rights</Text>
                  <Text style={styles.modalText}>
                    Depending on your location, you may have the following rights regarding your personal information:
                  </Text>
                  <View style={styles.bulletContainer}>
                    <Text style={styles.modalBullet}>• Access your data</Text>
                    <Text style={styles.modalBullet}>• Correct inaccurate data</Text>
                    <Text style={styles.modalBullet}>• Request data deletion</Text>
                    <Text style={styles.modalBullet}>• Object to data use for certain purposes</Text>
                    <Text style={styles.modalBullet}>• Data portability</Text>
                  </View>

                  <Text style={styles.modalSectionHeader}>7. Children's Privacy</Text>
                  <Text style={styles.modalText}>
                    We do not knowingly collect personal information from children under the age of 16. If you believe we have collected such data, please contact us.
                  </Text>

                  <Text style={styles.modalSectionHeader}>8. Changes to This Privacy Policy</Text>
                  <Text style={styles.modalText}>
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review this policy periodically.
                  </Text>

                  <Text style={styles.modalSectionHeader}>9. Contact Us</Text>
                  <Text style={styles.modalText}>
                    If you have any questions or concerns about this Privacy Policy, please contact us at:
                  </Text>
                  <Text style={styles.modalText}>Email: nutripal@gmail.com</Text>

                </>
              )}

              {modalContent === 'terms' && (
                <>
                  <Text style={styles.modalHeader}>Terms & Conditions</Text>

                  <Text style={styles.modalSectionHeader}>1. Acceptance of Terms</Text>
                  <Text style={styles.modalText}>
                    By accessing or using the NutriPal AI Nutritional App (the "App"), you agree to be bound by these terms and conditions.
                  </Text>

                  <Text style={styles.modalSectionHeader}>2. Use of the App</Text>
                  <Text style={styles.modalText}>
                    The App provides personalized nutrition plans and dietary guidance. It is not a substitute for professional medical advice, diagnosis, or treatment.
                  </Text>

                  <Text style={styles.modalSectionHeader}>3. User Responsibilities</Text>
                  <Text style={styles.modalText}>
                    You are responsible for providing accurate health and activity data. You must not share misleading information.
                  </Text>

                  <Text style={styles.modalSectionHeader}>4. Intellectual Property</Text>
                  <Text style={styles.modalText}>
                    All intellectual property rights in the App and its content are owned by NutriPal.
                  </Text>

                  <Text style={styles.modalSectionHeader}>5. Termination</Text>
                  <Text style={styles.modalText}>
                    We reserve the right to terminate or suspend your access to the App if you violate these terms.
                  </Text>
                </>
              )}

              <Button title="Close" onPress={() => toggleModal()} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 200,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    marginTop: 60,
  },
  container2: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  optionsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  optionItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  optionText: {
    fontSize: 16,
  },
  signOutButton: {
    marginTop: 40,
    padding: 15,
    backgroundColor: '#FF6F61',
    borderRadius: 10,
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
  },
  modalBullet: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
    color: '#444',
  },
  modalSubHeader: {
    fontSize: 18, // Slightly smaller than the main section header
    fontWeight: '600', // Semi-bold to make it stand out
    marginTop: 15, // Space before the subheader to separate it from the previous content
    marginBottom: 10, // Space after the subheader to separate it from the content that follows
    color: '#2C3E50', // Darker color to give it emphasis
  },
  bulletContainer: {
    marginLeft: 20, // Indents the whole bullet list for alignment
    marginBottom: 15, // Adds space after the bullet list
  },
});

export default AccountProfileScreen;