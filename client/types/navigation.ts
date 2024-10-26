// types.ts or navigation/types.ts
export type RootStackParamList = {
    SplashScreen: undefined;
    SignUpScreen: undefined;
    LoginScreen: undefined;
    OnboardScreen: undefined;  // Make sure this matches exactly
    HomeScreen: undefined; // Example with parameters
    ProfileScreen: { userId: string }; // Example with parameters
    NutritionistDashboard:undefined;
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
  NutritionistMatchScreen: undefined;
  HealthGoalsSelectionSuccess: undefined,
  NutritionistMatchSuccess: undefined,

  Consultation:undefined;
};
export type ProfileStackParamList = {

  AccountProfileScreen: undefined;
  Consultation:{clientId:number};
  
};
export type ConsultationStackParamList= {

  ClientsScreen: undefined;
  Consultation: { userId:number,clientId: number , nutritionistId:number};
};

// export type HomeStackParamList = {
//   Home: undefined;
//   MealPlanScreen: undefined;
// }

export type MealStackParamList = {
  MealPlanScreen: undefined;
  MealDetailsScreen: {
    day: string;
    meals: {
      breakfast: { name: string; calorie: number; carbohydrate: number; protein: number, fat: number; description: string; },
      lunch: { name: string; calorie: number; carbohydrate: number; protein: number, fat: number; description: string; },
      dinner: { name: string; calorie: number; carbohydrate: number; protein: number, fat: number; description: string; }
    };
  };
  SingleMealDetail: { meal: { mealName: string; calorie: number; carbohydrate: number; protein: number, fat: number; description: string; }; time: string };
}