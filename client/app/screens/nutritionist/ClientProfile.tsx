import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ProfileCard from '@/components/nutritionist/ProfileCard';
import ProfileInfo from '@/components/ProfileInfo';
import { getClientByUserId } from '@/services/clients';
import { getDailyNutritionFortnightly } from '@/services/daily_nutrition';
import { postToGeminiApiRAG } from '@/services/gemini';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library

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
     
     
      await generateClientReport(reportData);
    } catch (error) {
      throw error;
    }
  };
  const generateClientReport = async (reportData) => {
    const prompt = `Generate response in JSON format a health report in for a client based on the following weekly dietary data and user information. 
    Include total calorie intake, total carbohydrates, total fats, and total proteins for each day. 
    Also, calculate average intake values across the week, highlight days with zero intake, and provide recommendations 
    for balanced nutrient distribution.
    Data: ${JSON.stringify(reportData)}
    Output in this format: {
    "weeklyAverageIntake": {
      "totalCalorie": ...
        "totalProtein": ..
        "totalFats": ..
        "totalCarbohydrate": ...
      },
      "recommendations": {
        "calorieIntake": string,
        "macronutrientDistribution": string
      },
      "notes": [

      ]
    }`;
    

      

    try {
      console.log("client report");
      const clientReport = await postToGeminiApiRAG(prompt,userData.id);
      const cleanedJsonString = clientReport.result
      .replace(/```json/g, '') // Removes ```json at the start
      .replace(/```/g, '')      // Removes ``` at the end
      .replace(/\\"/g, '"');     // Replaces escaped quotes with regular quotes
      console.log(cleanedJsonString);
      const jsonObject = JSON.parse(cleanedJsonString);

      console.log(JSON.stringify(jsonObject, null, 2));
      
      setReport(jsonObject); // Set report data
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
  
    return (
      <View style={styles2.container}>
        {/* Weekly Average Intake Section */}
        <View style={styles2.card}>
          <Text style={styles2.sectionTitle}>
            <Icon name="calendar" size={20} color="#555" /> Weekly Average Intake
          </Text>
          <View style={styles2.row}>
            <Icon name="fire" size={18} color="#E25822" style={styles2.icon} />
            <Text style={styles2.detailText}>Total Calorie: {report.weeklyAverageIntake.totalCalorie}</Text>
          </View>
          <View style={styles2.row}>
            <Icon name="cutlery" size={18} color="#2C98F0" style={styles2.icon} />
            <Text style={styles2.detailText}>Total Protein: {report.weeklyAverageIntake.totalProtein}</Text>
          </View>
          <View style={styles2.row}>
            <Icon name="tint" size={18} color="#A64CA6" style={styles2.icon} />
            <Text style={styles2.detailText}>Total Fats: {report.weeklyAverageIntake.totalFats}</Text>
          </View>
          <View style={styles2.row}>
            <Icon name="leaf" size={18} color="#28A745" style={styles2.icon} />
            <Text style={styles2.detailText}>Total Carbohydrate: {report.weeklyAverageIntake.totalCarbohydrate}</Text>
          </View>
        </View>
  
        {/* Recommendations Section */}
        <View style={styles2.card}>
          <Text style={styles2.sectionTitle}>
            <Icon name="thumbs-up" size={20} color="#555" /> Recommendations
          </Text>
          
          {/* Calorie Intake */}
          <View style={styles2.subCard}>
            <Text style={styles2.subTitle}><Icon name="balance-scale" size={16} color="#E25822" /> Calorie Intake</Text>
            <Text style={styles2.subDetailText}>{report.recommendations.calorieIntake}</Text>
          </View>
  
          {/* Macronutrient Distribution */}
          <View style={styles2.subCard}>
            <Text style={styles2.subTitle}><Icon name="pie-chart" size={16} color="#2C98F0" /> Macronutrient Distribution</Text>
            <Text style={styles2.subDetailText}>{report.recommendations.macronutrientDistribution}</Text>
          </View>
        </View>
  
        {/* Notes Section */}
        <View style={styles2.card}>
          <Text style={styles2.sectionTitle}><Icon name="sticky-note" size={20} color="#555" /> Notes</Text>
          {report.notes.length > 0 ? (
            report.notes.map((note, index) => (
              <Text key={index} style={styles2.noteText}><Icon name="circle" size={8} color="#555" />  {note}</Text>
            ))
          ) : (
            <Text style={styles2.detailText}>No additional notes.</Text>
          )}
        </View>
      </View>
    );
  };
  
  const styles2 = StyleSheet.create({
    loadingText: {
      fontSize: 18,
      color: '#888',
      textAlign: 'center',
      marginTop: 20,
      fontFamily: "Poppins-Regular"
    },
    container: {
     
     
      flex: 1,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 15,
      marginVertical: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
      fontFamily: "Poppins-Bold",
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
    },
    icon: {
      marginRight: 8,
    },
    detailText: {
      fontSize: 16,
      color: '#555',
      fontFamily: "Poppins-Regular",
    },
    subCard: {
    
      borderRadius: 6,
      paddingVertical:20,

      marginVertical: 6,
    },
    subTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#444',
      fontFamily: "Poppins-Regular",
      marginBottom: 4,
    },
    subDetailText: {
      fontSize: 15,
      color: '#666',
      fontFamily: "Poppins-Regular",
    },
    noteText: {
      fontSize: 15,
      color: '#666',
      fontFamily: "Poppins-Regular",
     
      marginVertical: 10,
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