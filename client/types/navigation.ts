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

  // types.ts or navigation/types.ts
export type ProgressStackParamList = {
  ProgressScreen: undefined;
  NutritionManagementScreen: undefined;

  // Add other screens as needed
};

export type HealthStackParamList = {
  HealthProfileScreen: undefined; // No parameters needed
  AccountProfileScreen: undefined;
  HealthProfileViewScreen: undefined,
  HealthGoalsSelection: undefined; // No parameters needed
  NutritionistMatchScreen: undefined,

  Consultation:undefined;
};
export type ProfileStackParamList = {

  AccountProfileScreen: undefined;
  Consultation:undefined;
  
};