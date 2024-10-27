import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import HealthGoalsSelection from './HealthGoalsSelection';
import { HealthStackParamList } from '@/types/navigation';

const HealthProfile = () => {
  const navigation = useNavigation<NavigationProp<HealthStackParamList>>();
  const [healthGoals, setHealthGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to retrieve health goals from AsyncStorage
  const getHealthGoals = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('healthGoals');
      if (jsonValue !== null) {
        const goals = JSON.parse(jsonValue);
        setHealthGoals(goals);
      }
    } catch (error) {
      console.log('Error retrieving health goals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHealthGoals();
  }, []);

  const handleMatchWithNutritionist = () => {
    // Navigate to nutritionist matching page
    navigation.navigate('NutritionistMatchScreen'); // Replace with your actual route name
  };

  const handleUpdateProfile = () => {
    // Navigate to health profile selection page
    navigation.navigate('HealthGoalsSelection'); // Replace with your actual route name
  };

  const handleViewProfile = () => {
    // Navigate to view health profile page
    navigation.navigate('HealthProfileViewScreen'); // Replace with your actual route name
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Profile Options</Text>

      {healthGoals.length > 0 ? (
        <>
          <TouchableOpacity style={styles.button} onPress={handleViewProfile}>
            <Text style={styles.buttonText}>View Your Health Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
            <Text style={styles.buttonText}>Update Your Health Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleMatchWithNutritionist}>
            <Text style={styles.buttonText}>Match With A Nutritionist</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            You need to build your health profile first.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
            <Text style={styles.buttonText}>Build Health Profile</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#91C788',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HealthProfile;