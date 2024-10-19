import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getClientProfile, updateClientById } from '@/services/client';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { HealthStackParamList } from '@/types/navigation';

const HealthGoalsSelection = () => {

  const navigation = useNavigation<NavigationProp<HealthStackParamList>>();

  // State to store user data
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(true);

  const [currentWeight, setCurrentWeight] = useState('');
  const [currentHeight, setCurrentHeight] = useState('');
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [weightLossAmount, setWeightLossAmount] = useState('');
  const [allergyManagement, setAllergyManagement] = useState(false);
  const [allergies, setAllergies] = useState({
    peanuts: false,
    shellfish: false,
    dairy: false,
    gluten: false,
  });
  const [otherAllergy, setOtherAllergy] = useState('');
  const [customAllergies, setCustomAllergies] = useState([]);

  const sections = [
    {
      title: 'Weight Management',
      goals: ['Weight Loss', 'Weight Maintenance'],
    },
    {
      title: 'Fitness Goals',
      goals: ['Muscle Gain', 'Athletic Performance'],
    },
    {
      title: 'Health Improvement',
      goals: [
        'Improved Energy Levels',
        'Heart Health',
        'Diabetes Management',
        'Digestive Health',
        'Bone Health',
      ],
    },
    {
      title: 'Dietary Preferences',
      goals: [
        'Clean Eating',
        'Vegan Diet',
        'Vegetarian Diet',
        'Ketogenic Diet',
        'Detox or Cleansing',
        'Allergy Management',
      ],
    },
    {
      title: 'Mental Well-Being',
      goals: ['Mental Well-Being'],
    },
  ];
  
  const handleToggleError = () => {
    setIsErrorVisible(!isErrorVisible);
  };

  const toggleGoal = (goal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal)
        ? prev.filter((g) => g !== goal)
        : [...prev, goal]
    );
    if (goal === 'Weight Loss' && !selectedGoals.includes(goal)) {
      setWeightLossAmount('');
    }
    if (goal === 'Allergy Management') {
      setAllergyManagement((prev) => !prev);
    }
  };

  const handleAllergyChange = (allergy) => {
    setAllergies((prev) => ({
      ...prev,
      [allergy]: !prev[allergy],
    }));
  };

  const addCustomAllergy = () => {
    if (otherAllergy.trim() !== '') {
      setCustomAllergies((prev) => [...prev, otherAllergy]);
      setOtherAllergy(''); // Clear input after adding
    }
  };

  const removeCustomAllergy = (allergy) => {
    setCustomAllergies((prev) => prev.filter(item => item !== allergy));
  };

  // Function to retrieve user data from AsyncStorage
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue !== null) {
        const user = JSON.parse(jsonValue);  // Parse the JSON string into an object
        console.log('Health Profile - User data retrieved:', user);
        setUserData(user);  // Set user data in state
      } else {
        console.log('No user data found');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  // useEffect to load user data when the component mounts
  useEffect(() => {
    getUserData();
  }, []);

  const checkClientProfile = async () => {
    setLoading(true);
    setError(null);

    console.log("USER DATA", userData)

    try {
      console.log("FETCHING FOR", userData.id);
      // const clientProfile = await getClientProfile(userData.userId)
      const clientProfile = await getClientProfile(userData.id);
      console.log('User has existing health profile:', clientProfile);
      return clientProfile;
      // Navigate to another screen, e.g., the login screen
    } catch (err) {
      setError('User has no health profile');
      return null;
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async () => {
    if (selectedGoals.length === 0) {
      setError('Please select at least one health goal.');
      setIsErrorVisible(true);
      return;
    }

    if (selectedGoals.includes('Weight Loss') && weightLossAmount.trim() === '') {
      setError('Please enter how much weight you want to lose.');
      setIsErrorVisible(true);
      return;
    }
  
    if (selectedGoals.includes('Allergy Management')) {
      const allergiesList = Object.keys(allergies).filter(allergy => allergies[allergy]);
      if (allergiesList.length === 0 && customAllergies.length === 0) {
        setError('Please select at least one allergy or add a custom allergy.');
        setIsErrorVisible(true);
        return;
      }
    }
  
    // If all validations pass, proceed with the submission logic
    setError(null); // Clear any previous error
    setIsErrorVisible(true);

    const allergiesList = Object.keys(allergies).filter(allergy => allergies[allergy]);
    const combinedAllergiesList = [...allergiesList, ...customAllergies];

    const healthGoals = [];
    const dietaryPreferences = [];

    for (let i in selectedGoals) {
      if (selectedGoals[i] === 'Weight Loss' || selectedGoals[i] === 'Allergy Management') {
        if (selectedGoals[i] === 'Weight Loss') {
          healthGoals.push(selectedGoals[i] + ':' + weightLossAmount);
        } else {
          for (let j in combinedAllergiesList) {
            dietaryPreferences.push('Allergic to ' + combinedAllergiesList[j]);
          }
        } 
      } else {
        healthGoals.push(selectedGoals[i]);
      }
    }
    
    const updatedData = {
      weight: currentWeight,
      height: currentHeight,
      healthGoals: healthGoals,
      dietaryPreferences: dietaryPreferences,
      nutritionalNeeds: [],
      pantryId: 0,
    };

    console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");

    console.log("NEW DATA", updatedData);

    console.log("Checking if user has client profile");
    const clientProfile = await checkClientProfile();

    if (clientProfile) {
      console.log('Client ID:', clientProfile.id);
      updatedData.pantryId = clientProfile.pantryId;

      // Update client profile
      await updateClientById(userData.id, updatedData);

      // Update local storage
      await AsyncStorage.setItem('healthGoals', JSON.stringify(updatedData.healthGoals));
      await AsyncStorage.setItem('dietaryPreferences', JSON.stringify(updatedData.dietaryPreferences));
      await AsyncStorage.setItem('weight', JSON.stringify(updatedData.weight));
      await AsyncStorage.setItem('height', JSON.stringify(updatedData.height));

      // Fetch the updated client profile again
      const updatedClientProfile = await checkClientProfile();
      console.log('Updated Client Profile:', updatedClientProfile);

      navigation.navigate('HealthGoalsSelectionSuccess');
    } else {
      console.log('No existing client profile found.');
    }
  };

  const handleNext = () => {
    console.log("NEW CHANGE NEXT");
    if (currentWeight.trim() === '') {
      setError('Please enter your weight.');
      setIsErrorVisible(true);
      return;
    }
  
    if (currentHeight.trim() === '') {
      setError('Please enter your height.');
      return;
    }

    if (currentSlide < 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <View style={styles.container}>
      {isErrorVisible && error && (
        <View style={styles.errorPopup}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={handleToggleError}>
            <Text style={styles.closeButton}>Minimise</Text>
          </TouchableOpacity>
        </View>
      )}
      {currentSlide === 0 ? (
        <View style={styles.slide}>
          <Text style={styles.title}>Build Your Health Profile</Text>
          <Text style={styles.subtitle}>Start building your health profile by telling us your current weight and height.</Text>
          <View style={styles.firstSlide}>
            <View style={styles.simpleInput}>
              <Text style={styles.label}>Weight (kg)</Text>
              <TextInput
                style={styles.firstInput}
                placeholder="Weight (kg)"
                keyboardType="numeric"
                value={currentWeight}
                onChangeText={setCurrentWeight}
              />
            </View>
            <View style={styles.simpleInput}>
              <Text style={styles.label}>Height (cm)</Text>
              <TextInput
                style={styles.firstInput}
                placeholder="Height (cm)"
                keyboardType="numeric"
                value={currentHeight}
                onChangeText={setCurrentHeight}
              />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.slide}>
          <Text style={styles.title}>Select Your Health Goals</Text>
          <Text style={styles.subtitle}>By selecting your health goals, we can offer you personalised services!</Text>
          <SafeAreaView style={styles.secondContainer}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              {sections.map((section, sectionIndex) => (
                <View key={sectionIndex} style={styles.section}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  {section.goals.map((goal, index) => (
                    <View key={index}>
                      <CheckBox
                        title={goal}
                        checked={selectedGoals.includes(goal)}
                        onPress={() => toggleGoal(goal)}
                        containerStyle={styles.checkbox}
                      />
                      {goal === 'Weight Loss' && selectedGoals.includes(goal) && (
                        <TextInput
                          style={styles.input}
                          placeholder="Enter amount to lose (in kg)"
                          keyboardType="numeric"
                          value={weightLossAmount}
                          onChangeText={setWeightLossAmount}
                        />
                      )}
                      {goal === 'Allergy Management' && allergyManagement && (
                        <View style={styles.allergySection}>
                          <Text style={styles.subTitle}>Please select your allergies:</Text>
                          {Object.keys(allergies).map((allergy) => (
                            <CheckBox
                              key={allergy}
                              title={allergy.charAt(0).toUpperCase() + allergy.slice(1)}
                              checked={allergies[allergy]}
                              onPress={() => handleAllergyChange(allergy)}
                              containerStyle={styles.checkbox}
                            />
                          ))}
                          <View style={styles.customAllergyContainer}>
                            <TextInput
                              style={styles.allergenInput}
                              placeholder="Other allergies"
                              value={otherAllergy}
                              onChangeText={setOtherAllergy}
                            />
                            <TouchableOpacity onPress={addCustomAllergy}>
                              <Ionicons name="add-circle" size={30} color="#91C788" />
                            </TouchableOpacity>
                          </View>
                          {customAllergies.length > 0 && (
                            <View style={styles.customAllergyList}>
                              <Text style={styles.customAllergyTitle}>Custom Allergies:</Text>
                              {customAllergies.map((item, idx) => (
                                <View key={idx} style={styles.customAllergyItemContainer}>
                                  <Text style={styles.customAllergyItem}>{item}</Text>
                                  <TouchableOpacity onPress={() => removeCustomAllergy(item)}>
                                    <Ionicons name="trash" size={20} color="red" />
                                  </TouchableOpacity>
                                </View>
                              ))}
                            </View>
                          )}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
          </SafeAreaView>
        </View>
      )}
      {currentSlide === 0 ? (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 30,
    paddingBottom: 120,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
  },
  secondContainer: {
    flex: 1,
  },
  scrollContent: {},
  section: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 5,
    borderColor: '#91C788',
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#91C788',
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    marginTop: 60,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    marginBottom: 30,
    letterSpacing: 1,
    lineHeight: 20,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  allergySection: {
    marginTop: 10,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 5,
    marginTop: 5,
    flex: 1,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 5, // Space between label and input
    alignSelf: 'center', // Center the label
    fontFamily: 'Poppins-Regular',
  },
  firstSlide: {
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
  },
  simpleInput: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
  },
  firstInput: {
    minHeight: 40, // Reduce the height
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 5, // Decrease padding
    borderRadius: 5,
    marginTop: 5,
    flex: 1,
    marginHorizontal: 20,
    maxWidth: 200, // Set a max width for the input
    alignSelf: 'center', // Center the input horizontally
  },
  allergenInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 5,
    marginTop: 5,
    flex: 1,
    marginRight: 5,
  },
  customAllergyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  customAllergyList: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  customAllergyTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1,
    marginBottom: 5,
  },
  customAllergyItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
  },
  customAllergyItem: {
    marginVertical: 4,
  },
  nextButton: {
    backgroundColor: '#91C788',
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 10,
    padding: 20,
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    gap: 5,
    marginTop: 16,
  },
  previousButton: {
    backgroundColor: '#D3D3D3',
    padding: 20,
    borderRadius: 16,
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#91C788',
    padding: 20,
    borderRadius: 16,
    flex: 1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorPopup: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    backgroundColor: '#FF6F61',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    zIndex: 1000,
  },
  errorText: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  closeButton: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default HealthGoalsSelection;