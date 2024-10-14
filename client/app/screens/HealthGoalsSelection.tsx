import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import {CheckBox} from 'react-native-elements';

const HealthGoalsSelection = () => {
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [weightLossAmount, setWeightLossAmount] = useState('');

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
        'Vegan/Vegetarian Diet',
        'Ketogenic Diet',
        'Detox or Cleansing',
        'Allergy Management', // Moved here
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
    // Reset weight loss input if "Weight Loss" is unchecked
    if (goal === 'Weight Loss' && !selectedGoals.includes(goal)) {
        setWeightLossAmount('');
    }
  };

  const handleSubmit = () => {
    // Handle the submission of selected goals
    console.log('Selected Goals:', selectedGoals);
    if (selectedGoals.includes('Weight Loss')) {
        console.log('Target Weight Loss:', weightLossAmount);
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
                                placeholder="Enter amount to lose (in lbs or kg)"
                                keyboardType="numeric"
                                value={weightLossAmount}
                                onChangeText={setWeightLossAmount}
                                />
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
    flex: 1, // Ensure it takes the full height of the screen
  },
  scrollContent: {
    // padding: 10, // Optional: add padding to the scroll content
  },
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
    // paddingHorizontal: 40,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    marginBottom: 30,
    letterSpacing: 1,
    lineHeight: 20
  },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 5,
//   },
//   checkboxLabel: {
//     marginLeft: 8,
//     fontSize: 16,
//   },
checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  weightLossContainer: {
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 5,
    marginTop: 5,
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
    textAlign: 'center'
  }
});

export default HealthGoalsSelection;