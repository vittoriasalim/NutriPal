import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

const data = [
  { day: 'Mon', value: 30 },
  { day: 'Tue', value: 50 },
  { day: 'Wed', value: 40 },
  { day: 'Thu', value: 80 },
  { day: 'Fri', value: 60 },
  { day: 'Sat', value: 70 },
  { day: 'Sun', value: 40 },
];

const BarChartWithGradient = () => {
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <View style={{ padding: 20}}>
      <Text style={{
        fontSize: 20,
        textAlign: 'left',
        fontFamily: 'Poppins-Regular',
        marginBottom: 22,
      }}>
        Your daily calorie Burn chart
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {data.map((item, index) => (
          <View key={index} style={{ alignItems: 'center' }}>
            <Svg height="180" width="20">
              <Defs>
                <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <Stop offset="0%" stopColor="#98D89E" stopOpacity="1" />
                  <Stop offset="100%" stopColor="#FFC8DD" stopOpacity="1" />
                </LinearGradient>
              </Defs>
              <Rect
                x="0"
                y={180 - (item.value / maxValue) * 180}
                width="20"
                height={(item.value / maxValue) * 180}
                fill="url(#grad)"
                rx="10" // Increased to make rounding more noticeable
                ry="10" // Increased to make rounding more noticeable
              />
            
            </Svg>
            <View style={{marginTop: 7}}></View>
            <Svg height="30" width="20">
              <Defs>
                <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <Stop offset="0%" stopColor="#000000" stopOpacity="1" />
                  <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                </LinearGradient>
              </Defs>
              <Rect 
                x="0"
                y={0}
                width="20"
                height="30"
                fill="url(#grad)"
                rx="10" // Increased to make rounding more noticeable
                ry="10" // Increased to make rounding more noticeable
              />
            
            </Svg>

          
            <Text style={{ marginTop: 10 }}>{item.day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default BarChartWithGradient;