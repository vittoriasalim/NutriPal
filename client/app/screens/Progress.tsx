
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Bar } from 'react-native-progress';
import CalorieBurnChart from '@/components/CalorieBurnChart'
import CaloriesCard from '@/components/CaloriesCard';
import CaloriesSummary from '@/components/CaloriesSummary';

const Progress = () => {
 
  return (
    <View style={styles.container}>

      {/* Header */}
      <Text style={styles.header}>Daily Nutrition</Text>
      <CaloriesSummary></CaloriesSummary>
      {/* Calorie Overview */}
      <CaloriesCard></CaloriesCard>
     

      {/* Calorie Burn Chart */}
      <CalorieBurnChart></CalorieBurnChart>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily:'Poppins-Regular',
    marginTop:60,
  }
    


 
});

export default Progress;