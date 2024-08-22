import React from 'react';

import { View, Text, StyleSheet,TouchableWithoutFeedback, StatusBar} from 'react-native';
import typography from '@/constants/typography';
import { NavigationProp, useNavigation } from '@react-navigation/native'; 
import { RootStackParamList } from '@/types/navigation';
const SplashScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('OnboardScreen');
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>

    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      

        <Text style={typography.largeTitle}>NutriPal</Text>
        <Text style={typography.smallFrontText}>Click anywhere to start!</Text>
     
    </View>
    </TouchableWithoutFeedback>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#83C687',
    justifyContent: 'center',
    alignItems: 'center',
    

    
  
  }
  
});

export default SplashScreen;