import { HealthStackParamList } from '@/types/navigation';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'; // Import Image

const { width } = Dimensions.get('window'); // Get the screen width

const ProfileCard = ({ firstName, lastName, email }: { firstName: string; lastName: string; email: string }) => {
  const navigation = useNavigation<NavigationProp<HealthStackParamList>>();
  return (
    <View style={styles.container}>
      {/* Profile Picture and User Info in a Row */}
      <View style={styles.row}>
        {/* Profile Icon Section */}
        <View style={styles.profileSection}>
          {/* Avatar Image */}
          <Image 
            source={require("../assets/images/female-avatar.gif")} 
            style={styles.avatar} // Apply styling to make the image look better
          />

        </View>

        {/* User Information */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{firstName} {lastName}</Text>
          <Text style={styles.userEmail}>{email}</Text>

          {/* Edit Profile Button */}
          <TouchableOpacity style={styles.editProfileButton} onPress={()=> navigation.navigate("HealthGoalsSelection")}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   
    padding: 5,
    borderRadius: 20,
    alignItems: 'center',
    width: width * 0.9, // Set the container to 90% of the screen width
    alignSelf: 'center', // Center the container
  },
  row: {
    flexDirection: 'row', // Row layout for profile image and user info
    alignItems: 'center',
  
  },
  profileSection: {
    position: 'relative',
    marginRight: 20, // Space between icon and text
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 50, // Make the image circular
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
  },
  userInfo: {
    justifyContent: 'center',
    marginLeft: 18,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  editProfileButton: {
    backgroundColor: '#83C687',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 15,
  },
  editProfileText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileCard;