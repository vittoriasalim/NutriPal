import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome for icons

const ProfileInfo = ({user, client}) => {
  const [showGoals, setShowGoals] = useState(false); // State to toggle health goals

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Account Details</Text>

      {/* Details Rows */}
      <View style={styles.detailRow}>
        <Text style={styles.label}>First Name</Text>
        <Text style={styles.value}>{user.firstName}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Last Name</Text>
        <Text style={styles.value}>{user.lastName}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Gender</Text>
        <Text style={styles.value}>{user.sex}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Weight</Text>
        <Text style={styles.value}>{client.weight} kg</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Height</Text>
        <Text style={styles.value}>{client.maxHeight} cm</Text>
      </View>

      {/* Health Goals Section with Icon */}
      <View style={styles.healthGoalsToggle}>
        <Text style={styles.label}>Health Goals</Text>
        <TouchableOpacity onPress={() => setShowGoals(!showGoals)}>
          <FontAwesome
            name={showGoals ? 'chevron-up' : 'chevron-down'} // Toggle icon between up and down
            size={20}
            color="#91C788"
          />
        </TouchableOpacity>
      </View>

      {/* Health Goals section - Only visible when the icon is clicked */}
      {showGoals && (
        <View style={styles.healthGoalsSection}>
        <View style={styles.goalsContainer}>
        {client?.healthGoals?.map((goal, index) => {
        // Check if the goal contains a colon (:) to split the text and number
        const [goalText, goalValue] = goal.includes(':') ? goal.split(':') : [goal, null];
        
        return (
            <View key={index} style={goalValue ? styles.detailRow2 : undefined}>
            <Text style={styles.goalItem}>{goalText}</Text>
            {goalValue && <Text style={styles.goalItem}>{goalValue} kg</Text>}
            </View>
        );
        })}
        </View>
      </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2C3E50',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  detailRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: '#7D7D7D',
    fontFamily: 'Poppins-Regular',
  },
  value: {
    fontSize: 16,
    color: '#34495E', // Darker color for values
    fontFamily: 'Poppins-Medium',
  },
  healthGoalsToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  healthGoalsSection: {

    paddingVertical: 5,


  },
  goalsContainer: {
    marginTop: 10,
    marginLeft: 15,
  },
  goalItem: {
    fontSize: 16,
    color: '#34495E', // Consistent with other values
    fontFamily: 'Poppins-Regular',
    marginBottom: 5,
  },
});

export default ProfileInfo;