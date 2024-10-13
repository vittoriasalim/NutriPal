import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Svg, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

const CaloriesSummary = () => {
  const barData = [50, 80, 65, 90, 100, 85, 80,60,70,30]; // Heights of the bars in percentage

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Daily calories</Text>
          <Text style={styles.value}>2070.99</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Calories to eat</Text>
          <Text style={styles.value}>400.90</Text>
        </View>
      </View>

      <Svg height="100" width={Dimensions.get('window').width - 40} style={styles.chart}>
        {/* Gradient Definition */}
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#98D89E" stopOpacity="1" />
            <Stop offset="100%" stopColor="#FFC8DD" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        
        {barData.map((value, index) => (
          <Rect
            key={index}
            x={index * 35 + 20} // X position for each bar
            y={100 - value} // Adjust bar height
            width="10"
            height={value}
            fill="url(#grad)" // Apply the defined gradient
            rx="5" // Rounded corners
            ry="5"
          />
        ))}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#EAF9E7',
    borderRadius: 20,
    width: Dimensions.get('window').width - 40,
    alignSelf: 'center',
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  labelContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#A1A1A1',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#98D89E',
  },
  chart: {
    marginTop: 10,
  },
});

export default CaloriesSummary;