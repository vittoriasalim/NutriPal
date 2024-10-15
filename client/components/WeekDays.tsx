import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import DailyMeter from './DailyMeter';
import AddMealCard from './AddMealCard';
import MealTabs from './MealTabs';
import MealFormPopup from './MealFormPopUp';

const WeekDays = ({ nutritionData, recommendationCal }) => {
  // Array of days and corresponding dates
  const [days, setDays] = useState<{ day: string; date: string }[]>([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [update,setUpdate] = useState(0);


  // Use effect to decompose the nutritionData and set it into the days state
  useEffect(() => {
    const decomposedDays = nutritionData.map((record, index) => ({
      day: record.day,
      date: new Date(record.date).getDate(),
      index: index
    }));
    setDays(decomposedDays);
    // Safely set the selectedDay to the last element's date if decomposedDays is not empty
    if (decomposedDays.length > 0) {
      setSelectedDay(decomposedDays[decomposedDays.length - 1]);
    }
  }, [nutritionData]);  // Run effect when nutritionData changes
  // State to manage the selected day

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
  const handleUpdate = ()=>{
    setUpdate(prevUpdate => prevUpdate + 1);  // This ensures the update is correct
    console.log("update triggered " +update);
  }
  

  // Function to render each day item
  const renderItem = ({ item }) => {
    // Declare isSelected outside the if block and initialize it to false
    let isSelected = false;

    // If selectedDay is not null, check if the item is selected
    if (selectedDay !== null) {
      isSelected = item.date === selectedDay.date;
    }

    return (
      <TouchableOpacity onPress={() => setSelectedDay(item)}>
        <View style={[styles.dayContainer, isSelected && styles.selectedDayContainer]}>
          <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{item.day}</Text>
          <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>{item.date}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {selectedDay && recommendationCal && nutritionData[selectedDay.index] && (
        <DailyMeter nutriDay={nutritionData[selectedDay.index].id} recommendationCal={recommendationCal} update={update} />
      )}
      <View style={{ marginBottom: 20 }}></View>
      <View style={styles.container}>

        <TouchableOpacity onPress={() => handleScroll('left')}>
          <FontAwesome name="arrow-left" size={20} style={[styles.arrow, styles.arrowLeft]} />
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

      <SafeAreaView style={{}}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom:750  }}>
          {nutritionData && selectedDay && nutritionData[selectedDay.index] ? (
            <AddMealCard images={require('../assets/images/bfast.png')}  onSubmit={handleUpdate} categories="Breakfast" dailyID={nutritionData[selectedDay.index].id} />
          ) : (

            <></>)}

          {nutritionData && selectedDay && nutritionData[selectedDay.index] ? (
            <AddMealCard 
              images={require('../assets/images/meal.png')} 
              categories="Lunch" 
              dailyID={nutritionData[selectedDay.index].id} 
              onSubmit={handleUpdate}  // Remove the extra curly brace
            />
          ) : (
            <></>
          )}
          {nutritionData && selectedDay && nutritionData[selectedDay.index] ? (
            <AddMealCard images={require('../assets/images/meal.png')} onSubmit={handleUpdate} categories="Dinner" dailyID={nutritionData[selectedDay.index].id } />
          ) : (

            <></>)}



          {nutritionData && selectedDay && nutritionData[selectedDay.index] ? (
            <MealTabs dailyNutritionId={nutritionData[selectedDay.index].id} />
          ) : (
            <Text>No nutrition data available for today.</Text>
          )}
        </ScrollView>
      </SafeAreaView>
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
  arrowLeft: {
    paddingRight: 17,
  },
  arrowRight: {
    paddingLeft: 17,
  }
});

export default WeekDays;