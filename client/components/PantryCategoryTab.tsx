import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PantryCategoryTabProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const PantryCategoryTab: React.FC<PantryCategoryTabProps> = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tabButton,
            selectedCategory === category && styles.selectedTabButton,
          ]}
          onPress={() => onCategorySelect(category)}
        >
          <Text style={[styles.tabText, selectedCategory === category && styles.selectedTabText]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'transparent', // No background for unselected
  },
  selectedTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#83C687', // Add a bottom border to show selected state
  },
  tabText: {
    fontSize: 16,
    color: '#8E8E8E', // Unselected color
    fontFamily: 'Poppins-Regular',
  },
  selectedTabText: {
    color: '#333', // Selected color
    fontWeight: 'bold',
  },
});

export default PantryCategoryTab;
