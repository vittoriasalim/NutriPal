import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have @expo/vector-icons installed

const HealthGoalsSelection = () => {
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

  const handleSubmit = () => {
    console.log('Selected Goals:', selectedGoals);
    if (selectedGoals.includes('Weight Loss')) {
      console.log('Target Weight Loss:', weightLossAmount);
    }
    if (allergyManagement) {
      console.log('Selected Allergies:', Object.keys(allergies).filter(allergy => allergies[allergy]));
      console.log('Custom Allergies:', customAllergies);
    }
  };

  return (
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
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
  buttonContainer: {
    backgroundColor: '#91C788',
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 10,
    padding: 20,
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HealthGoalsSelection;