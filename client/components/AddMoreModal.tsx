import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Importing the modal date picker
import { addIngredientToPantry } from '@/services/pantry'; // Import the addIngredient service

interface AddMoreModalProps {
  visible: boolean;
  onClose: () => void;
  ingredientName: string; // Ingredient name (passed as a prop)
  onSuccess:() => void; // Callback for adding quantity and expiry date
  userId: number; // User
}

const AddMoreModal: React.FC<AddMoreModalProps> = ({ visible, onClose, ingredientName, onSuccess, userId }) => {
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [quantity, setQuantity] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Optional loading state

  // Validate the fields before adding
  const validateFields = () => {
    if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      Alert.alert('Error', 'Please enter a valid quantity.');
      return false;
    }
    return true;
  };

  const handleAdd = async () => {
    if (!validateFields()) {
      return; // Stop if validation fails
    }

    try {
      setIsLoading(true); // Set loading to true while making the request

      // Call the API to add the ingredient to the pantry
      await addIngredientToPantry(userId, { ingredientName, expiryDate, quantity });

      // Reset fields after saving
      setExpiryDate(new Date());
      setQuantity('');
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
            <Text style={styles.modalTitle}>{`Add ${ingredientName}`}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

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

          {/* Quantity Field */}
          <Text style={styles.fieldLabel}>Quantity</Text>
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            placeholderTextColor="#999"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleAdd} disabled={isLoading}>
              <Text style={styles.saveButtonText}>{isLoading ? 'Adding...' : 'Add'}</Text>
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

export default AddMoreModal;
