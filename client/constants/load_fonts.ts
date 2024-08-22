import * as Font from 'expo-font';

async function loadFonts() {
  await Font.loadAsync({
    'Nunito-Regular': require('../assets/fonts/Nunito/static/Nunito-ExtraBold.ttf'),
    'Poppins-Black': require('../assets/fonts/Poppins/Poppins-Black.ttf'),
    'Poppins-BlackItalic': require('../assets/fonts/Poppins/Poppins-BlackItalic.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    'Poppins-BoldItalic': require('../assets/fonts/Poppins/Poppins-BoldItalic.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraBoldItalic': require('../assets/fonts/Poppins/Poppins-ExtraBoldItalic.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins/Poppins-ExtraLight.ttf'),
    'Poppins-ExtraLightItalic': require('../assets/fonts/Poppins/Poppins-ExtraLightItalic.ttf'),
    'Poppins-LightItalic': require('../assets/fonts/Poppins/Poppins-LightItalic.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
    'Poppins-MediumItalic': require('../assets/fonts/Poppins/Poppins-MediumItalic.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Poppins-SemiBoldItalic': require('../assets/fonts/Poppins/Poppins-SemiBoldItalic.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins/Poppins-Thin.ttf'),
    'Poppins-ThinItalic': require('../assets/fonts/Poppins/Poppins-ThinItalic.ttf'),
  });
}

export default loadFonts;