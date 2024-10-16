import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import HealthGoalsSelection from './HealthGoalsSelection';

const HealthProfileView = () => {

  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Health Profile</Text>
      <Button title="Back to Health Profile" onPress={() => navigation.goBack()} />
      {/* <Button 
        title="Back to Health Profile" 
        onPress={() => navigation.navigate('HealthProfileScreen')} 
      /> */}
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

export default HealthProfileView;