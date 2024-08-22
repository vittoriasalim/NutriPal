// types.ts or navigation/types.ts
export type RootStackParamList = {
    SplashScreen: undefined;
    SignUpScreen: undefined;
    LoginScreen: undefined;
    OnboardScreen: undefined;  // Make sure this matches exactly
    HomeScreen: undefined; // Example with parameters
    ProfileScreen: { userId: string }; // Example with parameters
    // Add other screens as needed
  };