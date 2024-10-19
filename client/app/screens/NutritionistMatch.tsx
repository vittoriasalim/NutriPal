import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getAllNutritionists } from '@/services/nutritionist';
import { getUserProfile } from '@/services/user';
import { getClientProfile } from '@/services/client';
import { Ionicons, MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { createNewPair } from '@/services/nutritionist_clients';
import { getPairingByClientId } from '@/services/nutritionist_clients';
import { getNutritionistById } from '@/services/nutritionist';

interface Nutritionist {
  id: number,
  userId: number,
  specialisation: string[],
  qualifications: string[],
  availability: number
}

interface NutritionistData {
  availability: number;
  createdAt: string;
  id: number;
  qualifications: string[];
  specialisation: string[];
  updatedAt: string;
  userId: number;
  firstName?: string;
  lastName?: string;
  sex?: string;
}

interface Client {
  id: number,
  userId: number,
  reportId: number,
  dailyNutritionId: number,
  weight: Double,
  height: Double,
  healthGoals: string[],
  dietaryPreferences: string[],
  nutritionalNeeds: string[],
  pantryId: number
}

const NutritionistMatch = () => {
  const [userData, setUserData] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [nutritionists, setNutritionists] = useState<NutritionistData[]>([]);
  const [recommendedNutritionists, setRecommendedNutritionists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPairData, setCurrentPairData] = useState(null);
  const [currentNutritionist, setCurrentNutritionist] = useState<NutritionistData | null>(null);
  const navigation = useNavigation();

  // Function to retrieve user data from AsyncStorage
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue !== null) {
        const user = JSON.parse(jsonValue);
        console.log('NUTRITIONIST MATCH - User data retrieved:', user);
        setUserData(user);
      } else {
        console.log('No user data found');
      }
      // const clientJson = JSON.stringify(clientProfile.user);
      // await AsyncStorage.setItem( "clientProfile", clientJson);

      const goalsValue = await AsyncStorage.getItem('healthGoals');
      if (goalsValue !== null) {
        const healthGoals = JSON.parse(goalsValue);
        console.log('NUTRITIONIST MATCH - health goals:', healthGoals);
        setUserData(prev => ({ ...prev, healthGoals })); // Set user health goals
      } else {
        console.log('No health goals data found');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  const fetchNutritionists = async () => {
    try {
      const clientProfile = await getClientProfile(userData.id);
      const currentPair = await getPairingByClientId(clientProfile.id);
      
      if (currentPair) {
        console.log("----------HAVE PAIR")
        const nutritionistId = currentPair.nutritionistId;
        console.log("Current nutritionist id", nutritionistId);
        const nutritionistData = await getNutritionistById(nutritionistId);
        const moreNutritionistData = await getUserProfile(nutritionistData.userId);
        console.log("Current nutritionist", nutritionistData);
        setCurrentNutritionist({
          availability:  nutritionistData.availability,
          createdAt: '',
          id: nutritionistData.id,
          qualifications: nutritionistData.qualifications,
          specialisation: nutritionistData.specialisation,
          updatedAt: '',
          userId: nutritionistData.userId,
          firstName: moreNutritionistData.firstName,
          lastName: moreNutritionistData.lastName,
          sex: moreNutritionistData.sex
        });

        console.log("currentNutritionist", currentNutritionist);
      } else {
        console.log("----------NO PAIR")
      }
      
      const nutritionistsData = await getAllNutritionists();
      setNutritionists(nutritionistsData as Nutritionist[]); // Cast if needed

      const recommended = recommendNutritionists(nutritionistsData, userData?.healthGoals || []);

      const updatedRecommended = await Promise.all(recommended.map(async (nutr) => {
        const nutritionist_id = nutr.userId;

        try {
          const nutritionist_user_data = await getUserProfile(nutritionist_id);
          return {
            ...nutr,
            firstName: nutritionist_user_data.firstName,
            lastName: nutritionist_user_data.lastName,
            sex: nutritionist_user_data.sex,
          } as NutritionistData; // Cast to Nutritionist type
        } catch (err) {
          console.error('Error retrieving nutritionist user data:', err);
          return nutr; // Return the original nutritionist
        }
      }));
      setRecommendedNutritionists(updatedRecommended); // Should now match the expected type
    } catch (err) {
      setError('No nutritionists retrieved');
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (userData && userData.healthGoals) {
      fetchNutritionists();
    }
  }, [userData]);

  const recommendNutritionists = (nutritionists, userGoals) => {
    console.log("USER GOAL:", userGoals);
    const simplifiedGoals = userGoals.map(goal => {
      const baseGoal = goal.includes(':') ? goal.split(':')[0].trim() : goal;
      return baseGoal;
    });

    const nutritionistScores = nutritionists.map(nutritionist => {
      const { specialisation, availability } = nutritionist;
      const matches = specialisation.filter(spec => simplifiedGoals.includes(spec)).length;
      return {
        nutritionist,
        score: matches,
        availability,
      };
    });

    const sortedNutritionists = nutritionistScores
      .filter(n => n.score > 0 && n.availability >= 1)
      .sort((a, b) => b.score - a.score);

    // Filter out the current nutritionist
    const filteredSortedNutritionists = sortedNutritionists.filter(
      n => n.nutritionist.id !== (currentNutritionist?.id)
    );

    return filteredSortedNutritionists.slice(0, 3).map(n => n.nutritionist);
  };

  const selectNutritionist = async (nutritionistId) => {
    const clientProfile = await getClientProfile(userData.id);
    console.log("THIS CLIENT PROFILE", clientProfile);
    console.log("Selecting nutritionist", nutritionistId);
    try {
      const response = await createNewPair({nutritionistId: nutritionistId, clientId: clientProfile.id});
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SafeAreaView>
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Your Current Nutritionist</Text>
      {currentNutritionist ? (
        <View style={styles.currentNutritionistContainer}>
        <View style={styles.nutritionistCard}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name={currentNutritionist.sex === 'female' ? 'face-woman' : 'face-man'}
              size={60}
              color='#6f9468'
            />
          </View>
          <View>
            <Text style={styles.nutritionistTitle}>
              {currentNutritionist.firstName} {currentNutritionist.lastName}
            </Text>
            <Text style={styles.specialisationText}>
              Specialisations: {currentNutritionist.specialisation.join(', ')}
            </Text>
            <Text style={styles.specialisationText}>
              Qualifications: {currentNutritionist.qualifications.join(', ')}
            </Text>
          </View>
          <FontAwesome6 name="handshake-simple" size={40} color="#6f9468" />
        </View>
        </View>
      ) : (
        <Text style={styles.subtitle}>No current nutritionist assigned.</Text>
      )}
      <Text style={styles.title}>Nutritionist Matching</Text>
      <Text style={styles.subtitle}>These are nutritionists who we recommend based on your health goals.
      </Text>
      {loading && <Text>Loading nutritionists...</Text>}
      {error && <Text>{error}</Text>}
       <View style={styles.nutritionistsContainer}>
          {recommendedNutritionists.length > 0 ? (
            recommendedNutritionists.map((nutr, index) => (
              <View key={index} style={styles.nutritionistCard}>
                {/* Conditional rendering for the icon */}
                <View style={styles.iconCircle}>
                  <MaterialCommunityIcons
                    name={nutr.sex === 'female' ? 'face-woman' : 'face-man'} // Example icon names
                    size={60}
                    color='#6f9468'
                  />
                </View>
                <View>
                  <Text style={styles.nutritionistTitle}>
                    {nutr.firstName} {nutr.lastName}
                  </Text>
                  <Text style={styles.specialisationText}>
                    Specialisation: {nutr.specialisation.join(', ')}
                  </Text>
                  <Text style={styles.specialisationText}>
                    Qualifications: {nutr.qualifications.join(', ')}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => selectNutritionist(nutr.id)}>
                  <Ionicons name="add-circle" size={40} color="#6f9468" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text>No matching nutritionists found.</Text>
          )}
      </View>
      {/* <Button title="Back to Health Profile" onPress={() => navigation.goBack()} /> */}
      <Button title="Back to Health Profile" onPress={() => navigation.navigate('HealthProfileScreen')} />
    </View>
    </ScrollView>
    </SafeAreaView>
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
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    marginBottom: 30,
    letterSpacing: 1,
    lineHeight: 20,
    paddingHorizontal: 25,
  },
  nutritionistsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 80,
  },
  nutritionistCard: {
    backgroundColor: '#A5D6A7',
    padding: 20,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 20,
  },
  nutritionistTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 4,
  },
  specialisationText: {
    flex: 1,
    flexWrap: 'wrap',
  },
  iconCircle: {
    // borderRadius: 50,
    // borderColor: 'white',
    // borderWidth: 5,
    // width: 90,
    // padding: 20,
    // textAlign: 'center',
  },
  currentNutritionistContainer: {
    paddingHorizontal: 40,
  }
});

export default NutritionistMatch;