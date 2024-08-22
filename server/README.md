/server
│
├── /config             # Configuration files like database connection
│   └── db.js
│
├── /models             # Sequelize models representing your database schemas
│   ├── User.js
│   ├── Ingredient.js
│   ├── Meal.js
│   ├── HealthGoal.js
│   └── DailyNutrition.js
│
├── /controllers        # Controllers handling your business logic
│   ├── userController.js
│   ├── ingredientController.js
│   ├── mealController.js
│   ├── healthGoalController.js
│   └── dailyNutritionController.js
│
├── /routes             # Route definitions mapping endpoints to controllers
│   ├── userRoutes.js
│   ├── ingredientRoutes.js
│   ├── mealRoutes.js
│   ├── healthGoalRoutes.js
│   └── dailyNutritionRoutes.js
│
├── /middlewares        # Custom middlewares (e.g., authentication)
│   └── auth.js
│
├── /utils              # Utility functions (e.g., helper functions)
│   └── calculateCalories.js
│
├── /validators         # Request validation logic (optional)
│   ├── userValidator.js
│   └── mealValidator.js
│
├── /views              # View templates if using server-side rendering
│   └── (optional)
│
├── /public             # Static files (e.g., images, CSS)
│   └── (optional)
│
├── .env                # Environment variables
├── .gitignore          # Files and directories to ignore in git
├── package.json        # Project metadata and dependencies
└── server.js           # Entry point of the application

```
npx sequelize-auto -o "./models" -d nutripal -h localhost -u yourusername -p 5432 -x yourpassword -e postgres -s nutripal


npx sequelize-auto -o "./models" -d nutripal -h localhost -u postgres -p 5432 -x "" -e postgres -s nutripal
```