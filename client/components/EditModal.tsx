import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IngredientStackParamList } from '@/types/navigation'; 
import { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import AddMoreModal from '@/components/AddMoreModal'; // Import the AddMoreModal
import EditEachIngredientModal from '@/components/EditEachIngredientModal'; // Import the AddMoreModal
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updatePantryIngredient, removePantryIngredient, getPantryIngredient, deleteAllIngredients } from '@/services/pantry'; // Import necessary services

interface EditModalProps {
  visible: boolean;
  onClose: () => void;
  ingredientId: number; // Ingredient ID passed from the parent
  onSuccess: () => void; // Callback to trigger after successful operation
}

const EditModal: React.FC<EditModalProps> = ({ visible, onClose, ingredientId, onSuccess }) => {
  const navigation = useNavigation<NavigationProp<IngredientStackParamList>>();
  const [isAddMoreVisible, setAddMoreVisible] = useState(false); // State for AddMoreModal visibility
  const [isEditEachIngredientVisible, setEditEachIngredientVisible] = useState(false); // State for AddMoreModal visibility
  const [selectedItem, setSelectedItem] = useState(null); // State for tracking the selected item for editing
  const [ingredientData, setIngredientData] = useState([]); // State to store fetched ingredient data
  const [ingredientName, setIngredientName] = useState(''); // State to store ingredient name
  const [unit, setUnit] = useState(''); // State to store ingredient unit
  const [loading, setLoading] = useState(true); // State to manage loading
  const [userData, setUserData] = useState<any>(null); // To store user data from AsyncStorage

  // Fetch ingredient data when the modal is opened
  const fetchIngredientData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue) {
        const user = JSON.parse(jsonValue);
        setUserData(user);
        const data = await getPantryIngredient(user.id, ingredientId); // Fetch specific ingredient data
        if (data.length > 0) {
          setIngredientData(data);
          console.log(data)
          setIngredientName(data[0].ingredient.ingredientName);
          setUnit(data[0].ingredient.unit);
        } else {
          Alert.alert('Error', 'No ingredient data found.');
        }
      } else {
        Alert.alert('Error', 'No user data found.');
      }
    } catch (error) {
      console.error('Error fetching ingredient data:', error);
      Alert.alert('Error', 'Failed to load ingredient data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchIngredientData();
    }
  }, [visible]);

  const handleSuccessAddMore = () => {
    setAddMoreVisible(false); // Close the modal after saving
    if (ingredientData) {
      fetchIngredientData(); // Refresh the pantry data after adding an ingredient
    }
  };

  const handleSuccessEditEachIngredient = () => {
    setEditEachIngredientVisible(false); // Close the modal after saving
    if (ingredientData) {
      fetchIngredientData(); // Refresh the pantry data after adding an ingredient
    }
  };

  const handleEditCall = (item) => {
    setSelectedItem(item);
    setEditEachIngredientVisible(true);
  };

  // Handle deleting a single item
  const handleDeleteItem = async (id: any) => {
    try {
      await removePantryIngredient(userData.id, id); // API call to remove ingredient
      Alert.alert('Success', 'Ingredient deleted successfully!');
      if (ingredientData.length == 1) { 
        navigation.navigate('PantryScreen');
      }
      else {
        fetchIngredientData(); // Refresh data after deletion
      }
      
    } catch (error) {
      console.error('Error deleting item:', error);
      Alert.alert('Error', 'Failed to delete the ingredient.');
    }
  };

  // Handle deleting all pantry ingredients for the given ingredient
  const handleDeleteAllIngredients = async () => {
    try {
      const userId = userData.id;

      // Make API call to delete all ingredients related to this ingredientId
      await deleteAllIngredients(userData.id, ingredientId);
      navigation.navigate('PantryScreen');
      Alert.alert('Success', 'All ingredients removed successfully!');
      
    } catch (error) {
      console.error('Error deleting all ingredients:', error);
      Alert.alert('Error', 'Failed to delete all ingredients.');
    }
  };

  // Render right action for "Edit"
  const renderRightActions = (item: any) => (
    <TouchableOpacity style={styles.editAction} onPress={() => handleEditCall(item)}>
      <Text style={styles.actionText}>Edit</Text>
    </TouchableOpacity>
  );

  // Render left action for "Delete"
  const renderLeftActions = (item: any) => (
    <TouchableOpacity style={styles.deleteAction} onPress={() => handleDeleteItem(item.id)}>
      <Text style={styles.actionText}>Delete</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <Text>Loading...</Text>; // Show loading text while data is being fetched
  }

  return (
    <Modal transparent={true} animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>

          {/* Header with dynamic ingredient name */}
          <Text style={styles.modalTitle}>{`${ingredientName} Pantry`}</Text>

          {/* Scrollable list of expiry dates and quantities with swipe actions */}
          <ScrollView style={styles.scrollContainer}>
            {ingredientData.map((item) => (
              <Swipeable
                key={item.id}
                renderLeftActions={() => renderLeftActions(item)}
                renderRightActions={() => renderRightActions(item)}
                overshootLeft={false}
                overshootRight={false}
                friction={2}
              >
                <View style={styles.modalItem}>
                  <Text style={styles.modalItemText}>{`Expiry: ${new Date(item.expiryDate).toLocaleDateString()}`}</Text>
                  <Text style={styles.modalItemText}>{`Quantity: ${item.quantity} ${unit}`}</Text>
                </View>
              </Swipeable>
            ))}
          </ScrollView>

          {/* Two buttons at the bottom: Delete All and Add More */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={handleDeleteAllIngredients}>
              <Text style={styles.buttonText}>Delete All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.addButton]}
              onPress={() => setAddMoreVisible(true)} // Open AddMoreModal for adding a new ingredient
            >
              <Text style={styles.buttonText}>Add More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* AddIngredientModal for adding/editing */}
      <AddMoreModal
        visible={isAddMoreVisible}
        onClose={() => setAddMoreVisible(false)}
        ingredientName={ingredientName}
        onSuccess={handleSuccessAddMore}
        userId={userData.id}
      />


    {/* AddIngredientModal for adding/editing */}
    <EditEachIngredientModal
        visible={isEditEachIngredientVisible}
        onClose={() => setEditEachIngredientVisible(false)}
        pantryItem={selectedItem}
        onSuccess={handleSuccessEditEachIngredient}
      />
    </Modal>
  );
};

// Styles for the modal
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    maxHeight: 200,
    width: '100%',
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: '#f9f9f9',
    width: '100%',
  },
  modalItemText: {
    fontSize: 17,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
  },
  addButton: {
    backgroundColor: '#6EC462',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editAction: {
    backgroundColor: '#6EC462',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteAction: {
    backgroundColor: '#ff4d4d',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditModal;
