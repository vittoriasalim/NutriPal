import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ProfileCard from '@/components/nutritionist/ProfileCard';
import ProfileInfo from '@/components/ProfileInfo';
import { getClientByUserId } from '@/services/clients';
import { getDailyNutritionFortnightly } from '@/services/daily_nutrition';

const ClientProfile = ({ userData }) => {
  const [isModalVisible, setModalVisible] = useState(false); // State to handle modal visibility
  const [clientData, setClientData] = useState(null);
  const [report, setReport] = useState(null); // State to hold the health report

  // Function to retrieve user data from AsyncStorage and fetch related data
  const getClientData = async (userId) => {
    try {
      const clientInfo = await getClientByUserId(userId);
      setClientData(clientInfo); // Set user data
      await getClientReport(clientInfo.id);
    } catch (error) {
      throw error;
    }
  };

  const getClientReport = async (clientId) => {
    try {
      const reportData = await getDailyNutritionFortnightly(clientId);
      setReport(reportData); // Set report data
    } catch (error) {
      throw error;
    }
  };

  // useEffect to load user data when the component mounts
  useFocusEffect(
    useCallback(() => {
      // Fetch user data and report every time the screen comes into focus
      getClientData(userData.id);
      return () => {
        // Clean-up logic if needed
      };
    }, [userData])
  );

  // Toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderHealthReport = () => {
    if (!report) {
      return <Text style={styles2.loadingText}>Loading health report...</Text>;
    }
  
    return report.map((entry, index) => (
      <View key={index} style={styles2.reportEntry}>
        <Text style={styles2.reportDay}>
          {entry.day} ({entry.date})
        </Text>
        <View style={styles2.reportMetrics}>
          <View style={styles2.metricRow}>
            <Text style={styles2.label}>🔥 Calories</Text>
            <Text style={[styles2.metricValue, entry.totalCalorie === 0 && styles2.emptyValue]}>
              {entry.totalCalorie} (kcal)
            </Text>
          </View>
          <View style={styles2.metricRow}>
            <Text style={styles2.label}>🥩 Protein</Text>
            <Text style={[styles2.metricValue, entry.totalProtein === 0 && styles2.emptyValue]}>
              {entry.totalProtein} (g)
            </Text>
          </View>
          <View style={styles2.metricRow}>
            <Text style={styles2.label}>🍞 Carbs</Text>
            <Text style={[styles2.metricValue, entry.totalCarbohydrate === 0 && styles2.emptyValue]}>
              {entry.totalCarbohydrate} (g)
            </Text>
          </View>
          <View style={styles2.metricRow}>
            <Text style={styles2.label}>🧈 Fats</Text>
            <Text style={[styles2.metricValue, entry.totalFats === 0 && styles2.emptyValue]}>
              {entry.totalFats} (g)
            </Text>
          </View>
        </View>
      </View>
    ));
  };
  const styles2 = StyleSheet.create({
    loadingText: {
      fontSize: 18,
      
      color: '#888',
      textAlign: 'center',
      marginTop: 20,
      fontFamily:"Poppins-Regular"
    },
    reportEntry: {

      padding: 15,
      marginBottom: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    reportDay: {
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily:'Poppins-SemiBold',
      marginBottom: 10,
      color: '#2c3e50',
    },
    reportMetrics: {
      flexDirection: 'column',
      marginTop: 5,
    },
    metricRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 4,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily:'Poppins-Regular',
      color: '#34495e',
    },
    metricValue: {
      fontSize: 16,
      fontWeight: '600',
     
      color: '#2c3e50',
      textAlign: 'right',
    },
    emptyValue: {
      color: '#ccc',
    },
  });


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container2}>
        {userData?.firstName && userData?.lastName && userData?.email ? (
          <ProfileCard firstName={userData.firstName} lastName={userData.lastName} email={userData.email} />
        ) : (
          <Text>Missing user data</Text>
        )}
        {userData && clientData ? (
          <ProfileInfo user={userData} client={clientData} />
        ) : (
          <Text>Loading user and client data...</Text>
        )}

        <View style={styles.optionsContainer}>
          {/* View Health Report Button */}
          <TouchableOpacity style={styles.optionItem} onPress={toggleModal}>
            <Text style={styles.optionText}>View Health Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal for showing health report */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Health Report</Text>
            <ScrollView>
              {renderHealthReport()}
            </ScrollView>
            <Button title="Close" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 200,
  },
  container2: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  optionsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  optionItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  optionText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    fontSize: 22,
    fontFamily:'Poppins-Regular',
    marginVertical: 30,
    textAlign: 'center',
  },
  reportEntry: {
    marginBottom: 10,
  },
  reportText: {
    fontSize: 16,
    color: '#444',
  },
});

export default ClientProfile;