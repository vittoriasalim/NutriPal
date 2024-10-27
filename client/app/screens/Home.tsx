import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import PantryStackNavigator from './PantryStackNavigator';
import { NavigationProp } from '@react-navigation/native';
import { HealthStackParamList, MealStackParamList, PantryStackParamList } from '@/types/navigation';

export default function Home() {
  // State to store user data
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
  console.log(navigation);
  const goToMealPlan = () => {


    // Use getParent if HomeStackNavigator is part of a tab or another nested structure
    navigation.navigate('Plans');
  };

  // Function to retrieve user data from AsyncStorage
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue !== null) {
        const user = JSON.parse(jsonValue);  // Parse the JSON string into an object

        setUserData(user);  // Set user data in state
      } else {
        console.log('No user data found');
      }
    } catch (error) {
      console.log('Error retrieving user data:', error);
    }
  };

  // useEffect to load user data when the component mounts
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Conditionally display the greeting if userData exists */}
      <Text style={styles.greeting}>
        Hello {userData ? userData.firstName : 'Guest'},
      </Text>
      <Text style={styles.subtitle}>Find, track and eat healthy food.</Text>

      <View style={styles.articleCard}>
        <View style={styles.articleContent}>
          <Text style={styles.articleLabel}>ARTICLE</Text>
          <Text style={styles.articleTitle}>The pros and cons of fast food.</Text>
          <TouchableOpacity style={styles.readButton}>
            <Text style={styles.readButtonText}>Read Now</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/images/fast-food.png')} // Adjust the path as necessary
        />
        <View style={styles.paginationDots}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.curveShape} />
        <View style={styles.leftSection}>
          <Text style={styles.buttonText}>View Your Personal Meal Plan</Text>
        </View>
        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.viewNowButton} onPress={goToMealPlan}>
            <Text style={styles.viewNowText}>View Now {'>'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.curveShape} />
        <View style={styles.leftSection}>
          <Text style={styles.buttonText}>Track Your Weekly Progress</Text>
        </View>
        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.viewNowButton} onPress={() => navigation.navigate("Progress")}>
            <Text style={styles.viewNowText}>View Now {'>'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.curveShape} />
        <View style={styles.leftSection}>
          <Text style={styles.buttonText}>Get Recipe Recommendations</Text>
        </View>
        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.viewNowButton} onPress={goToMealPlan}>
            <Text style={styles.viewNowText}>View Now {'>'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 110,
    alignContent: 'center',
    backgroundColor: '#F8F8F8',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8F8F8F',
    marginBottom: 24,
    textAlign: 'center',
  },
  articleCard: {
    backgroundColor: '#FCDCBE',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  articleContent: {
    padding: 10,
    paddingLeft: 20,
    paddingBottom: 20,
    width: '65%',
  },
  articleLabel: {
    fontSize: 12,
    color: '#FF6F61',
    fontFamily: 'Poppins-Bold',
  },
  articleTitle: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'Poppins-Bold',
    marginVertical: 8,
  },
  readButton: {
    backgroundColor: '#FF6F61',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  readButtonText: {
    color: '#FFF',
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
  },
  paginationDots: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 13,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FF6F61',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#91C788',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    paddingHorizontal: 30,
    paddingVertical: 16,
    position: 'relative',
    minHeight: 110,
  },
  leftSection: {
    width: '48%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  rightSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  viewNowButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  viewNowText: {
    color: '#A5D6A7',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
  },
  curveShape: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '55%',
    backgroundColor: '#BFEDB7',
    borderTopLeftRadius: 500,
    borderBottomLeftRadius: 500,
  },
});