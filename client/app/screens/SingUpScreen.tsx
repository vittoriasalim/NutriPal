import React, { useState }  from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native'; 
import { registerUser } from '../../services/user'; 
import { RootStackParamList } from '@/types/navigation';
import { FontAwesome } from '@expo/vector-icons'; //

// Define user types
type UserType = 'client' | 'nutritionist';
type UserSex = 'male' | 'female';

const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // State management for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');

  const [user_type, setUserType] = useState<UserType>('client');
  const [sex, setSex] = useState<UserSex>('male');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);

    try {
    
      const newUser = await registerUser({ 
        firstName:first_name,
        lastName:last_name,
        email:email,
        password:password,
        sex:sex,
        userType:user_type});


  
      navigation.navigate("LoginScreen");
      // Navigate to another screen, e.g., the login screen
    } catch (err) {
      setError('Failed to register user. Please try again.');
  
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
                placeholder="First Name"
                onChangeText={setFirstName}
                placeholderTextColor="#B0B0B0"
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              onChangeText={setLastName}
              placeholderTextColor="#B0B0B0"
            />
            <View style={styles.container_selector}>
            <TouchableOpacity
              style={[styles.button_selector, user_type === 'client' && styles.selectedButton]}
              onPress={() => setUserType('client')}
            >
              <FontAwesome
                name="user"
                size={20}
                style={[styles.icon, user_type === 'client' && styles.selectedIcon]}
              />
              <Text style={[styles.text, user_type === 'client' && styles.selectedText]}>Client</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button_selector, user_type === 'nutritionist' && styles.selectedButton]}
              onPress={() => setUserType('nutritionist')}
            >
              <FontAwesome
                name="stethoscope"
                size={20}
                style={[styles.icon, user_type === 'nutritionist' && styles.selectedIcon]}
              />
              <Text style={[styles.text, user_type === 'nutritionist' && styles.selectedText]}>Nutritionist</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container_selector}>
            <TouchableOpacity
              style={[styles.button_selector, sex === 'male' && styles.selectedButton]}
              onPress={() => setSex('male')}
            >
              <FontAwesome
                name="male"
                size={20}
                style={[styles.icon, sex === 'male' && styles.selectedIcon]}
              />
              <Text style={[styles.text, sex === 'male' && styles.selectedText]}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button_selector, sex === 'female' && styles.selectedButton]}
              onPress={() => setSex('female')}
            >
              <FontAwesome
                name="female"
                size={20}
                style={[styles.icon, sex === 'female' && styles.selectedIcon]}
              />
              <Text style={[styles.text, sex === 'female' && styles.selectedText]}>Female</Text>
            </TouchableOpacity>
          </View>
          
          
           
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
            

      
        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View> 
  );
};

const styles = StyleSheet.create({
  selectedText: {
    color: '#FFFFFF', // Selected text color
  },
  container_selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#83C687',
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom:10
  },

  selectedButton: {
    backgroundColor: '#83C687', // Selected button background color
  },
  text: {
   
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: "#777777",
    marginLeft: 5,
  },
  icon: {
    fontSize: 20,
    color: '#83C687',
  },
  selectedIcon: {
    color: '#FFFFFF', // Selected icon color
  },
  button_selector: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#83C687',
  },
  imageContainer: {
  
    alignItems: 'center',
    justifyContent: 'center',
    //marginVertical: 40,
    paddingTop:20,

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
 
    paddingTop: 25, // To overlap the form container on the image background
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    color: '#333333',
    marginTop:5,
    marginBottom: 5
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#777777',
    marginBottom: 15,
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
    marginTop: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: "Poppins-Bold"
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
  }

});

export default SignUpScreen;