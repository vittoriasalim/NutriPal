import React, { useState }  from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native'; 
import { registerUser } from '../../services/user'; 
import { RootStackParamList } from '@/types/navigation';

// Define user types
type UserType = 'CLIENT' | 'NUTRITIONIST';

const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // State management for form inputs
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [date_of_birth, setDob] = useState('');
  const [user_type, setUserType] = useState<UserType>('CLIENT');
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    // Move to the next step after clicking "Continue"
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2 ) {
      // Final registration step
      handleSignUp();
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);

    try {
      const parsedDob = parseDOB(date_of_birth);
      if (!parsedDob) {
        throw new Error("Invalid date of birth format. Please use DD-MM-YYYY.");
      }
      const newUser = await registerUser({ 
        email,
        mobile,
        password,
        first_name,
        last_name,
        date_of_birth: parsedDob,
        user_type});
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

  // Function to parse DD-MM-YYYY to Date object
  const parseDOB = (dobString) => {
    const parts = dobString.split('-');
    if (parts.length !== 3) return null;
  
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
    const year = parseInt(parts[2], 10);
  
    // Create a Date object explicitly set to midnight UTC
    const date = new Date(Date.UTC(year, month, day));
  
    // Check if the created date matches the input
    if (date.getUTCDate() !== day || date.getUTCMonth() !== month || date.getUTCFullYear() !== year) {
      return null; // Return null if date is invalid
    }
  
    return date; // Return valid Date object
  };

  // const formatDateToDDMMYYYY = (date) => {
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const year = date.getFullYear();

  //   return `${day}-${month}-${year}`; // Return in DD-MM-YYYY format
  // };

  
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
        {currentStep === 1 && (
          <>
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
          </>
        )}

        {currentStep === 2 && (
          <>
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
            <TextInput
              style={styles.input}
              placeholder="Date of Birth (DD-MM-YYYY)"
              onChangeText={setDob}
              placeholderTextColor="#B0B0B0"
            />
            <Text style={styles.label}>User Type:</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity onPress={() => setUserType('CLIENT')} style={styles.radioButton}>
                <Text style={user_type === 'CLIENT' ? styles.selectedText : styles.unselectedText}>CLIENT</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setUserType('NUTRITIONIST')} style={styles.radioButton}>
                <Text style={user_type === 'NUTRITIONIST' ? styles.selectedText : styles.unselectedText}>NUTRITIONIST</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>{currentStep === 1 ? 'Continue' : 'Complete Sign Up'}</Text>
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
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  radioButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  selectedText: {
    color: 'blue',
  },
  unselectedText: {
    color: 'black',
  },
});

export default SignUpScreen;