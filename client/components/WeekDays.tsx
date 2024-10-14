import { FontAwesome } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const WeekDays = () => {
  // Array of days and corresponding dates
  const days = [
    { day: 'Mon', date: 5 },
    { day: 'Tue', date: 6 },
    { day: 'Wed', date: 7 },
    { day: 'Thu', date: 8 }, // Selected day
    { day: 'Fri', date: 9 },
    { day: 'Sat', date: 10 },
    { day: 'Sun', date: 11 },
    { day: 'Mon', date: 12 },
    { day: 'Tue', date: 13 },
    { day: 'Wed', date: 14 },
    { day: 'Thu', date: 15 },
    { day: 'Fri', date: 16 },
    { day: 'Sat', date: 17 },
    { day: 'Sun', date: 18 },
  ];

  // State to manage the selected day
  const [selectedDay, setSelectedDay] = useState('Thu');
  const flatListRef = useRef(null); // Create a ref for FlatList
  const [scrollIndex, setScrollIndex] = useState(0); // Track the scroll index

  // Scroll to the next or previous set of days
  const handleScroll = (direction) => {
    let newIndex = scrollIndex;
    if (direction === 'left') {
      newIndex = Math.max(scrollIndex - 1, 0);
    } else if (direction === 'right') {
      newIndex = Math.min(scrollIndex + 1, days.length - 1);
    }
    setScrollIndex(newIndex);
    flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
  };

  // Function to render each day item
  const renderItem = ({ item }) => {
    const isSelected = item.day === selectedDay;

    return (
      <TouchableOpacity onPress={() => setSelectedDay(item.day)}>
        <View style={[styles.dayContainer, isSelected && styles.selectedDayContainer]}>
          <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{item.day}</Text>
          <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>{item.date}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleScroll('left')}>
        <FontAwesome name="arrow-left" size={20} style={[styles.arrow,styles.arrowLeft]} />
      </TouchableOpacity>
      <FlatList
        data={days}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        ref={flatListRef} // Attach the ref
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity onPress={() => handleScroll('right')}>
        <FontAwesome name="arrow-right" size={20} style={[styles.arrow, styles.arrowRight]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContainer: {
    justifyContent: 'space-between',
  },
  dayContainer: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 20,
  },
  selectedDayContainer: {
    backgroundColor: '#E96A6A', // Highlight background color for the selected day
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  dayText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
  selectedDayText: {
    color: 'white', // Text color when selected
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: '#4A4A4A',
  },
  selectedDateText: {
    color: 'white', // Date color when selected
    fontWeight: 'bold',
  },
  arrow: {

    color: '#4A4A4A',
  },
  arrowLeft:{
    paddingRight:17,
  },
  arrowRight:{
    paddingLeft:17,
  }
});

export default WeekDays;