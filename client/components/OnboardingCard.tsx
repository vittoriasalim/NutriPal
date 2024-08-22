import React from 'react';
import { View, Text, Image,Dimensions, StyleSheet,ImageSourcePropType  } from 'react-native';
const { width } = Dimensions.get('window');

// Define the props interface
interface OnboardingCardProps {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
}

const OnboardingCard: React.FC<OnboardingCardProps> = ({ image, title, subtitle }) => {
  return (
    <View style={styles.card}>
      <Image source={image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {/* You can add other elements like buttons and pagination dots here */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width-40,
    margin:0,
    padding:0

    
  },

  title: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular', // Poppins regular

    color: '#777777',
    textAlign: 'center',
  
  },
});
export default OnboardingCard;