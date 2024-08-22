import React, { useState, useRef, NativeSyntheticEvent, NativeScrollEvent }  from 'react';
import {  ScrollView,View, Dimensions,Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import typography from '@/constants/typography';
import OnboardingCard from '@/components/OnboardingCard';
import { useNavigation, NavigationProp } from '@react-navigation/native'; 
import { RootStackParamList } from '@/types/navigation';

const { width } = Dimensions.get('window');

const OnboardScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handlePress = () => {
    navigation.navigate('SignUpScreen');  // Ensure the route name is correct
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setActiveIndex(index);
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.logoText, typography.title]}>NutriPal</Text>
      <ScrollView 
      horizontal={true} 
      pagingEnabled
      onScroll={handleScroll}

      showsHorizontalScrollIndicator={false} 
      style={styles.scrollView}
    >
      <OnboardingCard 
        image={require('../../assets/images/home1.png')} 
        title="Eat Healthy" 
        subtitle="Maintaining good health should be the primary focus of everyone." 
      />
      <OnboardingCard 
        image={require('../../assets/images/home2.png')} 
        title="Healthy Recipes" 
        subtitle="Browse thousands of healthy recipes from all over the world." 
      />
      <OnboardingCard 
        image={require('../../assets/images/home3.png')} 
        title="Track Your Health" 
        subtitle="With amazing inbuilt tools you can track your progress." 
      />
      </ScrollView>
      <View style={styles.pagination}>
        {[...Array(3)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.paginationDot,
              activeIndex === i ? styles.activePaginationDot : null,
            ]}
          />
        ))}
      </View>
    
      <TouchableOpacity style={styles.loginButton} onPress={handlePress}>
        <Text style={styles.loginButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.signUpText}>
        Already Have An Account? <TouchableOpacity onPress={()=>{navigation.navigate('LoginScreen')}}>
      <Text style={styles.signUpLink}> Log In</Text>
    </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoText: {
   
  },
  


  
  
  pagination: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 5,
  },
  activePaginationDot: {
    backgroundColor: '#83C687',
  },
  loginButton: {
    backgroundColor: '#83C687',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  scrollView: {
    maxHeight:width+10
 
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily:"Poppins-Bold",
    fontWeight: 'bold',
  },
  signUpText: {
    fontSize: 14,
    fontFamily:"Poppins-Regular",
    color: '#777777',
  },
  signUpLink: {
    fontSize: 14,
    color: '#83C687',
    fontFamily:"Poppins-SemiBold",
   
  },
});

export default OnboardScreen;