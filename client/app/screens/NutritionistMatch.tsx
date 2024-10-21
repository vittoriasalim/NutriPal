import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getAllNutritionists } from '@/services/nutritionist';
import { getUserProfile } from '@/services/user';
import { getClientProfile } from '@/services/client';
import { Ionicons, MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { createNewPair } from '@/services/nutritionist_clients';
import { getPairingByClientId, deletePairingByClientId } from '@/services/nutritionist_clients';
import { getNutritionistById, incrementNutritionistAvailability, decrementNutritionistAvailability } from '@/services/nutritionist';
import { HealthStackParamList } from '@/types/navigation';

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
  const navigation = useNavigation<NavigationProp<HealthStackParamList>>();

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

      const filteredNutritionists = nutritionistsData.filter(nutr => nutr.id !== currentPair?.nutritionistId);

      const recommended = recommendNutritionists(filteredNutritionists, userData?.healthGoals || []);

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

  useEffect(() => {
    if (nutritionists.length > 0 && currentNutritionist) {
      const recommended = recommendNutritionists(nutritionists, userData.healthGoals);
      setRecommendedNutritionists(recommended);
    }
  }, [nutritionists, currentNutritionist, userData?.healthGoals]);

  const recommendNutritionists = (nutritionists, userGoals) => {
    if (!Array.isArray(nutritionists) || !Array.isArray(userGoals)) {
      console.error('Invalid data for recommendations:', { nutritionists, userGoals });
      return [];
    }

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

    return nutritionistScores
    .filter(n => n.score > 0 && n.availability >= 1 && n.nutritionist.id !== (currentNutritionist?.id))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(n => n.nutritionist);
  };

  const selectNutritionist = async (nutritionistId) => {
    const clientProfile = await getClientProfile(userData.id);
    console.log("THIS CLIENT PROFILE", clientProfile);
    console.log("Selecting nutritionist", nutritionistId);
    try {
      // delete current match
      const delResponse = await deletePairingByClientId(clientProfile.id);
      console.log("DELETE RESPONSE", delResponse);
      // add one to the ex nutritionist's availability
      const addResponse = await incrementNutritionistAvailability(delResponse);

      // create the new match pair
      const response = await createNewPair({nutritionistId: nutritionistId, clientId: clientProfile.id});
      // minus one to the new nutritionist's availability
      const minusResponse = await decrementNutritionistAvailability(nutritionistId);
      console.log(response);

      navigation.navigate('NutritionistMatchSuccess');
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
        <View style={styles.nutritionistsContainer}>
        <View style={styles.currentNutritionistCard}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={currentNutritionist.sex === 'female' ? 'face-woman' : 'face-man'}
              size={60}
              color='#6d766b'
            />
          </View>
          <View style={styles.textContainer}>
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
          <FontAwesome6 name="handshake-simple" size={40} color="#6d766b" />
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
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    name={nutr.sex === 'female' ? 'face-woman' : 'face-man'} // Example icon names
                    size={60}
                    color='#6f9468'
                  />
                </View>
                <View style={styles.textContainer}>
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
    marginTop: 30,
    marginBottom: 20,
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
    paddingHorizontal: 40,
  },
  nutritionistCard: {
    backgroundColor: '#A5D6A7',
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    width: '100%',
  },
  currentNutritionistCard: {
    backgroundColor: '#c2d8be',
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    width: '100%',
  },
  textContainer: {
    flexGrow: 1,
    fontFamily: 'Poppins-Regular'
  },
  nutritionistTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 15,
  },
  specialisationText: {
    flexWrap: 'wrap',
    maxWidth: '80%',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
    textAlign: 'justify',
  },
  iconButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 20,
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
    marginHorizontal: 80,
  }
});

export default NutritionistMatch;