import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import Home from './Home';
import ProgressDetail from './ProgressDetail';
import PantryStackNavigator from './PantryStackNavigator';
import HealthProfileLanding from './HealthProfileLanding'
import HealthProfileScreen from './HealthProfile';
import HealthGoalsSelection from './HealthGoalsSelection';
import MealPlanScreen from './MealPlanScreen';
import MealStackNavigator from './MealStackNavigator';

const Tab = createBottomTabNavigator();

function CustomTabBar({ state , descriptors, navigation }) {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconName = route.name === 'Home'
          ? 'home'
          : route.name === 'Plans'
            ? 'utensils'
            : route.name === 'Progress'
              ? 'chart-bar'
              : route.name === "Add"
                ? 'shopping-bag'
              : route.name === "Pantry"
                ? 'shopping-bag'
              : "user";



        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            <FontAwesome5 name={iconName} size={24} color={isFocused ? '#83C687' : 'gray'} />
            <Text style={{ color: isFocused ? '#83C687' : 'gray', fontSize: 12 }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Plans" component={MealStackNavigator} />
      <Tab.Screen name="Pantry" component={PantryStackNavigator} />
      <Tab.Screen name="Progress" component={ProgressDetail} />
      <Tab.Screen name="Profile" component={HealthProfileLanding} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customAddButton: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#83C687',
    width: 55,
    height: 55,
    borderRadius: 40,
    elevation: 5,
  },
});
