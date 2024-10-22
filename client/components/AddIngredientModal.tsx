import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Importing the modal date picker
import { addIngredientToPantry } from '@/services/pantry'; // Import the addIngredient service

interface AddIngredientModalProps {
  visible: boolean;
  onClose: () => void;
  userId: number; // Ensure to pass userId to the modal
  onSuccess: () => void; // Callback to refresh the pantry data on successful addition
}

const AddIngredientModal: React.FC<AddIngredientModalProps> = ({ visible, onClose, userId, onSuccess }) => {
  const [ingredientName, setIngredientName] = useState('');
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('g'); // Default unit is 'g' for grams
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Optional loading state

  // Validate the fields before saving
  const validateFields = () => {
    if (!ingredientName.trim()) {
      Alert.alert('Error', 'Please enter an ingredient name.');
      return false;
    }
    if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      Alert.alert('Error', 'Please enter a valid quantity.');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateFields()) {
      return; // Stop if validation fails
    }

    try {
      setIsLoading(true); // Set loading to true while making the request

      // Call the API to add the ingredient to the pantry
      await addIngredientToPantry(userId, { ingredientName, expiryDate, quantity });

      // Reset fields after saving
      setIngredientName('');
      setExpiryDate(new Date());
      setQuantity('');
      setUnit('g');

      // Close modal and trigger onSuccess callback to refresh data
      onClose();
      onSuccess();
    } catch (error) {
      console.error('Error adding ingredient:', error);
      Alert.alert('Error', 'Failed to add the ingredient. Please try again.');
    } finally {
      setIsLoading(false); // Set loading to false after completion
    }
  };

  const handleToggleUnit = () => {
    setUnit(prevUnit => (prevUnit === 'g' ? 'ml' : 'g'));
  };

  // Show date picker modal
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Hide date picker modal
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Handle the selected date from date picker
  const handleConfirmDate = (date: Date) => {
    setExpiryDate(date); // Update expiry date
    hideDatePicker(); // Close the date picker modal
  };

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
            <Text style={styles.modalTitle}>Add Ingredient</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Ingredient Name Field */}
          <Text style={styles.fieldLabel}>Ingredient Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingredient Name"
            placeholderTextColor="#999"
            value={ingredientName}
            onChangeText={setIngredientName}
          />

          {/* Expiry Date Selector */}
          <Text style={styles.fieldLabel}>Expiry Date</Text>
          <TouchableOpacity style={styles.datePickerButton} onPress={showDatePicker}>
            <Text style={styles.datePickerText}>{expiryDate.toDateString()}</Text>
          </TouchableOpacity>

          {/* Modal Date Picker */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
            minimumDate={new Date()} // Ensures no past dates can be picked
          />

          {/* Quantity and Unit Selector */}
          <Text style={styles.fieldLabel}>Quantity</Text>
          <View style={styles.quantityContainer}>
            <TextInput
              style={styles.quantityInput}
              placeholder="Quantity"
              placeholderTextColor="#999"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.unitToggle} onPress={handleToggleUnit}>
              <Text style={styles.unitToggleText}>{unit}</Text>
            </TouchableOpacity>
          </View>

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
  },
  datePickerButton: {
    height: 45,
    justifyContent: 'center',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#F5F5F5',
  },
  datePickerText: {
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quantityInput: {
    height: 45,
    width: '65%',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
  unitToggle: {
    height: 45,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },
  unitToggleText: {
    fontFamily: 'Poppins-Regular',
    color: '#333',
    fontSize: 16,
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

export default AddIngredientModal;
