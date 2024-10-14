import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { login } from '../../services/auth';
import { RootStackParamList } from '@/types/navigation';


const LoginScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {

      const response = await login(email, password);
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      });
      console.log(response)

      // If successful, navigate to the next screen
    } catch (error) {
      
      setErrorMessage('Invalid email or password');
   
    } finally {
      setIsLoading(false);
    }
    
  };


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/Cooking.gif')} // Adjust the path as needed
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.formContainer}>

        <Text style={styles.title}>Log In</Text>
        <Text style={styles.subtitle}>Let’s sign in to your account and start your calorie management</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          onChangeText={setEmail}
          placeholderTextColor="#B0B0B0"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          placeholderTextColor="#B0B0B0"
          secureTextEntry
        />
        {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        )}


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#83C687',
  },
  imageContainer: {

    alignItems: 'center',
    justifyContent: 'center',
    //marginVertical: 40,
    paddingTop: 0,

  },
  image: {
    width: '80%',

  },
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,

    paddingTop: 50, // To overlap the form container on the image background
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    color: '#333333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#777777',
    marginBottom: 25,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    marginBottom: 15,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#83C687',
    paddingVertical: 15,

    alignItems: 'center',
    borderRadius: 30,
    marginTop: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: "Poppins-Bold"
  },
});

export default LoginScreen;