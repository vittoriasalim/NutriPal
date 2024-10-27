import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { updatePantryIngredient } from '@/services/pantry'; // Import necessary services
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage for user data

interface EditEachIngredientModalProps {
  visible: boolean;
  onClose: () => void;
  pantryItem: any; // Ingredient data passed as a prop
  onSuccess: () => void; // Callback to refresh the pantry data on successful update
}

const EditEachIngredientModal: React.FC<EditEachIngredientModalProps> = ({
  visible,
  onClose,
  pantryItem,
  onSuccess,
}) => {
  const [currentQuantity, setCurrentQuantity] = useState<string>(''); // To store the current quantity
  const [newQuantity, setNewQuantity] = useState<string>(''); // Input for new quantity
  const [currentExpiryDate, setCurrentExpiryDate] = useState<Date | null>(null); // Store current expiry date
  const [newExpiryDate, setNewExpiryDate] = useState<Date>(new Date()); // Input for new expiry date
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // State for date picker visibility
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Fetch the current ingredient data when the modal opens
  const fetchIngredientData = async () => {
    try {
      console.log(pantryItem);
      setCurrentQuantity(pantryItem.quantity.toString()); // Set current quantity
      setCurrentExpiryDate(new Date(pantryItem.expiryDate)); // Set current expiry date
      setNewQuantity(''); // Initialize new quantity
      setNewExpiryDate(new Date()); // Initialize new expiry date
    } catch (error) {
      console.log('Error fetching ingredient data:', error);
      Alert.alert('Error', 'Failed to load ingredient data.');
    }
  };

  // Handle saving the updated ingredient data
  const handleSave = async () => {
    if (!newQuantity) {
      Alert.alert('Error', 'Please enter a valid quantity.');
      return;
    }

    try {
      setIsLoading(true); // Set loading state to true


      // Call the API to update the ingredient in the pantry
      await updatePantryIngredient(pantryItem.pantryId, pantryItem.id, {
        quantity: newQuantity,
        expiryDate: newExpiryDate,
      });

      Alert.alert('Success', 'Ingredient updated successfully!');
      onClose(); // Close the modal
      onSuccess(); // Trigger the onSuccess callback to refresh the data
    } catch (error) {
      console.log('Error updating ingredient:', error);
      Alert.alert('Error', 'Failed to update the ingredient. Please try again.');
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  // Show date picker modal
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Hide date picker modal
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Handle the selected date from the date picker
  const handleConfirmDate = (date: Date) => {
    setNewExpiryDate(date); // Update the new expiry date
    hideDatePicker(); // Close the date picker modal
  };

  // Load the ingredient data when the modal becomes visible
  useEffect(() => {
    if (visible) {
      fetchIngredientData();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Edit Ingredient</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Current Quantity and New Quantity */}
          <Text style={styles.fieldLabel}>Quantity</Text>
          <View style={styles.quantityRow}>
            <TextInput
              style={styles.input}
              placeholder="Current Quantity"
              placeholderTextColor="#999"
              value={currentQuantity}
              editable={false} // Current quantity is not editable
            />
            <Ionicons name="arrow-forward" size={24} color="#666" style={styles.arrowIcon} />
            <TextInput
              style={styles.input}
              placeholder="New Quantity"
              placeholderTextColor="#999"
              value={newQuantity}
              onChangeText={setNewQuantity}
              keyboardType="numeric"
            />
          </View>

          {/* Current Expiry Date and New Expiry Date */}
          <Text style={styles.fieldLabel}>Expiry Date</Text>
          <View style={styles.quantityRow}>
            <TouchableOpacity style={styles.datePickerButton} onPress={showDatePicker}>
              <Text style={styles.datePickerText}>{currentExpiryDate?.toDateString()}</Text>
            </TouchableOpacity>
            <Ionicons name="arrow-forward" size={24} color="#666" style={styles.arrowIcon} />
            <TouchableOpacity style={styles.datePickerButton} onPress={showDatePicker}>
              <Text style={styles.datePickerText}>{newExpiryDate.toDateString()}</Text>
            </TouchableOpacity>
          </View>

          {/* Modal Date Picker */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
            minimumDate={new Date()} // Ensures no past dates can be picked
          />

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={isLoading}>
              <Text style={styles.saveButtonText}>{isLoading ? 'Saving...' : 'Save'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Styles
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },
  fieldLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    flex: 1,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  arrowIcon: {
    marginHorizontal: 10,
  },
  datePickerButton: {
    flex: 1,
    height: 45,
    justifyContent: 'center',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F5F5F5',
  },
  datePickerText: {
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#E5E5E5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#83C687',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
});

export default EditEachIngredientModal;
