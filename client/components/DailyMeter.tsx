import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Function to describe the arc
const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  const d = [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ');

  return d;
};

// Function to convert polar coordinates to Cartesian
const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = (angleInDegrees) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
};

const DailyMeter = () => {
  const totalKcal = 2213;
  const consumedKcal = 1721;
  const percentage = (consumedKcal / totalKcal) * 100;
  
  // Adjust the angle calculation for smooth transition from left to right.
  const endAngle = 180 - ((percentage / 100) * 180); // Left to right, starting at 180 degrees

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <Svg width={200} height={120}>
          {/* Background Arc */}
          <Path
            d={describeArc(100, 100, 90, 180, 360)} // Full background arc from left to right
            fill="none"
            stroke="#E6E6E6"
            strokeWidth="15"
            strokeLinecap="round"  // Smooth arc ends
          />
          {/* Progress Arc */}
          <Path
            d={describeArc(100, 100, 90, 180, 320)} // Progress arc based on calories
            fill="none"
            stroke="#72BF44" // Progress color
            strokeWidth="15"
            strokeLinecap="round" // Smooth arc ends
          />
        </Svg>
        <Text style={styles.kcalText}>{`${consumedKcal} Kcal`}</Text>
        <Text style={styles.totalKcalText}>{`of ${totalKcal} kcal`}</Text>
      </View>

      {/* Macronutrient Section */}
      <View style={styles.macronutrients}>
        <View style={styles.nutrient}>
          <Text style={styles.nutrientLabel}>Protein</Text>
          <View style={styles.nutrientBarContainer}>
            <View style={[styles.nutrientBar, { width: `${(78 / 90) * 100}%`, backgroundColor: '#72BF44' }]} />
          </View>
          <Text style={styles.nutrientText}>78/90g</Text>
        </View>

        <View style={styles.nutrient}>
          <Text style={styles.nutrientLabel}>Fats</Text>
          <View style={styles.nutrientBarContainer}>
            <View style={[styles.nutrientBar, { width: `${(45 / 70) * 100}%`, backgroundColor: '#E96A6A' }]} />
          </View>
          <Text style={styles.nutrientText}>45/70g</Text>
        </View>

        <View style={styles.nutrient}>
          <Text style={styles.nutrientLabel}>Carbs</Text>
          <View style={styles.nutrientBarContainer}>
            <View style={[styles.nutrientBar, { width: `${(95 / 110) * 100}%`, backgroundColor: '#FFD700' }]} />
          </View>
          <Text style={styles.nutrientText}>95/110g</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  progressBar: {
    alignItems: 'center',
  },
  kcalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginTop: -50, // Position text in the middle of the arc
  },
  totalKcalText: {
    fontSize: 14,
    color: '#C4C4C4',
  },
  macronutrients: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  nutrient: {
    alignItems: 'center',
  },
  nutrientLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  nutrientBarContainer: {
    width: 60,
    height: 6,
    backgroundColor: '#E6E6E6',
    borderRadius: 3,
    marginVertical: 4,
  },
  nutrientBar: {
    height: 6,
    borderRadius: 3,
  },
  nutrientText: {
    fontSize: 12,
    color: '#4A4A4A',
  },
});

export default DailyMeter;