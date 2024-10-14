import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { ProgressStackParamList } from '@/types/navigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';



const CaloriesCard = () => {
    const navigation = useNavigation<NavigationProp<ProgressStackParamList>>();

    const handleIntakeCard = () => {
        // Define what happens when the card is pressed
        console.log('Card Pressed!');
        navigation.navigate("NutritionManagementScreen")
    };
    return (
        <View style={styles.container}>
            {/* First Card - Daily Calories Intake */}
            <TouchableOpacity style={{flex:1}}>
            <Card containerStyle={styles.card}>
                <View style={styles.cardHeader}>
                    <Icon name="restaurant" type="material" color="#98D89E" size={30} />
                    <Icon name="info-outline" type="material" color="#80D3EA" size={23} />
                </View>
                <Text style={styles.title}>Daily Calories Intake</Text>
                <Text style={styles.subtitle}>Eat upto 2070.99 calories</Text>
            </Card>
            </TouchableOpacity> 
            <TouchableOpacity style={{flex:1}} onPress={handleIntakeCard}>
                <Card containerStyle={styles.card}>
                    <View style={styles.cardHeader}>
                        <FontAwesome name="fire" size={30} color="#FF7CA3" />
                        <Icon name="add-circle-outline" type="material" color="#FFC8DD" size={23} />
                    </View>
                    {/* Make sure the text is wrapped in Text component */}
                    <Text style={styles.title}>Today's Calorie Intake</Text>
                    <Text style={styles.subtitle}>Today's eaten calories 1670.09</Text>
                </Card>
            </TouchableOpacity>


        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Ensure vertical alignment
        paddingHorizontal: 10, // Adjust for space between edges
        marginVertical: 0,
    },
    card: {
        borderRadius: 16,
        // flex: 1, // Use flex to allow the cards to take up equal space
        marginHorizontal: 8, // Space between cards
        padding: 20,
        elevation: 4, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#A1A1A1',
        textAlign: 'left',
    },
});

export default CaloriesCard;