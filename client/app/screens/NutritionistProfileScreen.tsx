import React from 'react';
import Home from './Home';

import { View, Button } from 'react-native';
import { Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';

export default function NutritionistProfileScreen() {
    

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();;

    const goToHome = () => {
        navigation.navigate("Home");
    };

    return (
        <View>
            <Text>Nutritionist Profile</Text>

            <Button title="Go to Home" onPress={goToHome} />
        </View>
    )
}