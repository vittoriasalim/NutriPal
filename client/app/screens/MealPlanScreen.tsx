import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { defaultMealPlan } from '../../assets/defaultMealPlan';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { MealStackParamList } from '@/types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '@/services/api';
import { getMealPlan, getLatestWeeklyMealPlan } from '@/services/meal_plans';
import { getClientByUserId } from '@/services/clients';
import { useCallback } from 'react';

interface MealPlan {
  [day: string]: {
    breakfast: {
      name: string;
      description: string;
      calorie: number;
      fat: number;
      carbohydrate: number;
      protein: number;
      image: string;
    };
    lunch: {
      name: string;
      description: string;
      calorie: number;
      fat: number;
      carbohydrate: number;
      protein: number;
      image: string;
    };
    dinner: {
      name: string;
      description: string;
      calorie: number;
      fat: number;
      carbohydrate: number;
      protein: number;
      image: string;
    };
  };
}


const MealPlanScreen = () => {
  const [userData, setUserData] = useState(null);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    setLoading(true); // Start loading before fetching
  
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue !== null) {
        const user = JSON.parse(jsonValue);
        console.log('MEAL PLAN SCREEN - User data retrieved:', user);
        setUserData(user);
  
        try {
          const clientProfile = await getClientByUserId(user.id);
          console.log("going to get meal plan");
  
          // If user did not set up health profile, give suggested meal
          if (!clientProfile.healthGoals || clientProfile.healthGoals.length === 0) {
            setMealPlan(defaultMealPlan);
          } else {
            const res = await getLatestWeeklyMealPlan(clientProfile.id);
            if (res) {
              setMealPlan(res); // Set the meal plan if it exists
            } else {
              setMealPlan(defaultMealPlan);
            }
          }
        } catch (err) {
          console.log('Error fetching client profile:', err);
        }
      } else {
        console.log('No user data found');
      }
    } catch (error) {
      console.log('Error retrieving user data:', error);
    } finally {
      setLoading(false); // End loading when data fetching is done
    }
  };
  

   // useEffect to load user data when the component mounts
   useFocusEffect(
    useCallback(() => {
      // Call getUserData every time the screen comes into focus
      getUserData();

      return () => {
        console.log('Cleanup logic');
        // Clean-up logic if needed
      };
    }, [mealPlan]) // Add dependencies like 'update' to trigger re-render when it changes
  );

  const navigation = useNavigation<NavigationProp<MealStackParamList>>();

  const handleViewMore = (day, meals) => {
    navigation.navigate('MealDetailsScreen', { day, meals});
  };

  // Check if mealPlan is null and render accordingly
  if (mealPlan === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading meal plan...</Text>
      </View>
    );
  }

  const getMealIcon = (mealType) => {
    switch (mealType) {
      case 'breakfast':
        return <MaterialIcons style={styles.iconContainer} name="emoji-food-beverage" size={60} color='#A5D6A7' />;
      case 'lunch':
        return <Ionicons style={styles.iconContainer} name="fast-food" size={60} color='#A5D6A7' />;
      case 'dinner':
        return <MaterialCommunityIcons style={styles.iconContainer} name="food-turkey" size={70} color='#A5D6A7' />;
      default:
        return <MaterialCommunityIcons style={styles.iconContainer} name="food-turkey" size={70} color='#A5D6A7' />;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Meal Plan</Text>
      <Text style={styles.subtitle}>This week's meal plan is curated to help you meet your health goals!</Text>
      {Object.keys(mealPlan).map((day) => (
        <View key={day} style={styles.dayContainer}>
          <View style={styles.dayHeader}>
            <Text style={styles.dayTitle}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
            <TouchableOpacity style={styles.viewMoreButton} onPress={() => handleViewMore(day, mealPlan[day])}>
              <Text style={styles.viewMoreText}>View More</Text>
              <Ionicons name="chevron-forward-outline" size={12} color="#888" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Object.keys(mealPlan[day]).map((meal) => { 
              const mealData = mealPlan[day][meal]; 
              return (
                <View key={meal} style={styles.mealCard}>
                  {/* <Image
                    source={{ uri: mealData.image || "https://images.unsplash.com/photo-1497888329096-51c27beff665?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
                    style={styles.image}
                  /> */}
                  {getMealIcon(meal)}
                  <Text style={styles.mealType}>{meal.charAt(0).toUpperCase() + meal.slice(1)}</Text>
                  <Text style={styles.mealName}>{mealData.mealName}</Text>
                  <Text style={styles.calories}>{`${mealData.calorie} kcal`}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingTop: 80,
  },
  contentContainer: {
    paddingBottom: 200, // Add padding to the bottom to prevent content from being obscured
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    paddingRight: 20,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    marginBottom: 30,
    letterSpacing: 1,
    lineHeight: 20,
    paddingHorizontal: 40,
  },
  dayContainer: {
    marginBottom: 30,
    height: 360,
    //overflow: 'visible',
    //backgroundColor: 'red',
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    letterSpacing: 1,
  },
  mealCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    paddingVertical: 30,
    marginRight: 20,
    width: 230,
    height: 280,
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 5,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 50,
    marginBottom: 15,
  },
  mealType: {
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1,
    fontSize: 16,
    marginBottom: 10, // Space between meal type and meal name
  },
  mealName: {
    fontFamily: 'Poppins-Regular',
    letterSpacing: 1,
    fontSize: 14,
    marginBottom: 10, // Space between meal name and calories
    textAlign: 'center',
  },
  calories: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'Poppins-Regular',
    letterSpacing: 1,
  },
  dayHeader: {
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  viewMoreButton: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewMoreText: {
    fontFamily: 'Poppins-Regular',
    color: '#888',
    fontSize: 12,
    letterSpacing: 1,
    marginRight: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  }
});

export default MealPlanScreen;
