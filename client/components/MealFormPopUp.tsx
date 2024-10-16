import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

const MealFormPopup = ({ isVisible, onClose, onSubmit }) => {
  const [mealName, setMealName] = useState('');
  const [description, setDescription] = useState('');
  const [calorie, setCalorie] = useState('');
  const [protein, setProtein] = useState(0);
  const [fats, setFats] = useState(0);
  const [carbohydrate, setCarbohydrate] = useState(0);

  // Function to handle calorie input and ensure only numeric/decimal values
  const handleCalorieChange = (value) => {
    // Regular expression to allow only numbers and a single decimal point
    const validValue = value.replace(/[^0-9.]/g, '');

    // Ensure only one decimal point is allowed
    const parts = validValue.split('.');
    if (parts.length <= 2) {
      setCalorie(validValue);
    }
  };

  const handleSubmit = () => {
    const mealData = {
      mealName,
      description,
      calorie: parseFloat(calorie), // Convert calorie to float
      protein,
      fats,
      carbohydrate,
    };

    onSubmit(mealData);
    onClose(); // Close the modal after submission
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Add New Meal</Text>

          <TextInput
            style={styles.input}
            placeholder="Meal Name"
            value={mealName}
            onChangeText={setMealName}
          />

          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />

          <TextInput
            style={styles.input}
            placeholder="Calories"
            keyboardType="decimal-pad" // Allow decimal input only
            value={calorie}
            onChangeText={handleCalorieChange} // Validate input
          />

          {/* Protein Slider */}
          <Text style={[styles.label ,styles.marginlbl]}>Protein (grams): {protein.toFixed(0)}g</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={protein}
            onValueChange={setProtein}
          />

          {/* Fats Slider */}
          <Text style={styles.label}>Fats (grams): {fats.toFixed(0)}g</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={fats}
            onValueChange={setFats}
          />

          {/* Carbohydrate Slider */}
          <Text style={styles.label}>Carbohydrate (grams): {carbohydrate.toFixed(0)}g</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={carbohydrate}
            onValueChange={setCarbohydrate}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 25,
    marginBottom: 14,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  marginlbl:{
    marginTop:18,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#83C687',
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10, // Space between buttons
    alignItems: 'center', // Center text
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
  },
  cancelButton: {
    flex: 1,
    borderColor: '#83C687',
    borderWidth: 2,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center', // Center text
  },
  cancelButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
  },
});

export default MealFormPopup;