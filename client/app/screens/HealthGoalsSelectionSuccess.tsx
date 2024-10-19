import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { HealthStackParamList } from '@/types/navigation';

const HealthGoalsSelectionSuccess = () => {
    const navigation = useNavigation<NavigationProp<HealthStackParamList>>();

    const handleViewProfile = () => {
        // Navigate to view health profile page
        navigation.navigate('HealthProfileViewScreen'); // Replace with your actual route name
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Your Health Profile was updated!</Text>
                <Text style={styles.subtitle}>
                    Thank you for building your health profile, 
                    now you can receive services tailored to your new goals.
                </Text>
                
                <TouchableOpacity style={styles.button} onPress={handleViewProfile}>
                    <Text style={styles.buttonText}>View Your Health Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default HealthGoalsSelectionSuccess;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        paddingHorizontal: 30,
    },
    content: {
        alignItems: 'center', // Center text and button horizontally
        padding: 20, // Add some padding
        borderRadius: 10,
        shadowColor: '#000', // Optional: shadow for better visibility
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3, // For Android shadow
        backgroundColor: '#fff', // Optional: background color
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        marginBottom: 30,
        letterSpacing: 1,
        lineHeight: 20,
    },
    button: {
        backgroundColor: '#91C788',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});