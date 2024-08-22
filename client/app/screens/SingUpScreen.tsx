import React, { useState }  from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native'; 
import { registerUser } from '../../services/user'; 
import { RootStackParamList } from '@/types/navigation';

const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // State management for form inputs
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const handleSignUp = async () => {
    setLoading(true);
    setError(null);

    try {
      const newUser = await registerUser({ email, mobile, password });
      console.log('User registered successfully:', newUser);
      navigation.navigate("LoginScreen");
      // Navigate to another screen, e.g., the login screen
    } catch (err) {
      setError('Failed to register user. Please try again.');
      console.error('Failed to register user:', err);
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../assets/images/signup.png')} // Adjust the path as needed
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Let’s sign up to your account and start your calorie management</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          onChangeText={setEmail}
          placeholderTextColor="#B0B0B0"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Mobile No."
          onChangeText={setMobile}
          placeholderTextColor="#B0B0B0"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          placeholderTextColor="#B0B0B0"
          secureTextEntry
        />
        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
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
    paddingTop:90,

  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontFamily:'Poppins-Regular'
  },
  image: {
    width: '77%',

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

export default SignUpScreen;