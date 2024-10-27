# 🌱 NutriPal - AI-Powered Nutritional Planning

NutriPal is an AI-powered mobile application designed to help users achieve a balanced and healthy diet. With personalized meal planning, nutritional tracking, smart shopping lists, and customized recipe suggestions, NutriPal aims to guide users on their health journey, whether they want to lose weight, gain muscle, or manage specific dietary needs.

---

## 📋 Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Configuration](#configuration)
- [Deployment Instructions](#deployment-instructions)
- [Advanced Tools and Setup](#advanced-tools-and-setup)
  - [Object-Relational Model](#object-relational-model)
  - [Migration Tool](#migration-tool)
  - [MVC Design Pattern](#mvc-design-pattern)
  - [Feature Branching Workflow](#feature-branching-workflow)
  - [Frontend and Backend Frameworks](#frontend-and-backend-frameworks)
  - [iOS and Android Simulators](#ios-and-android-simulators)
  - [Code Quality and Linting](#code-quality-and-linting)
  - [Environment Variable Management](#environment-variable-management)

---

## 🌐 Overview

NutriPal leverages a **Retrieval-Augmented Generation (RAG)** framework, integrated with the **Gemini Language Model** to provide intelligent nutritional recommendations. By learning from user inputs, NutriPal generates personalized meal plans, tracks nutritional goals, and suggests shopping lists to meet dietary needs.

---

## 🛠️ Tech Stack

| Tool               | Description                                          | Icon |
|--------------------|------------------------------------------------------|------|
| **React Native**   | Frontend framework for mobile app development        | ![React](https://img.icons8.com/color/48/000000/react-native.png) |
| **Node.js**        | Backend server and REST API                          | ![Node.js](https://img.icons8.com/color/48/000000/nodejs.png) |
| **Sequelize ORM**  | ORM for SQL database interaction and migrations      | ![Database](https://img.icons8.com/color/48/000000/database.png) |
| **PostgreSQL**     | Relational database                                  | ![PostgreSQL](https://img.icons8.com/color/48/000000/postgreesql.png) |
| **ESLint & Prettier** | Code quality and styling tools                   | ![Code Quality](https://img.icons8.com/color/48/000000/code.png) |
| **GitHub**         | Version control, collaboration, and CI/CD            | ![GitHub](https://img.icons8.com/ios-glyphs/30/000000/github.png) |
| **Expo**           | Tool for running mobile applications on devices      | ![Expo](https://img.icons8.com/color/48/000000/expo.png) |
| **Xcode**          | iOS Simulator                                        | ![Xcode](https://img.icons8.com/color/48/000000/xcode.png) |


## ⚙️ Configuration

1. **Install Dependencies**: Install necessary dependencies by running:
   ```bash
   npm install
   ```

2.	**Environment Variables**: Set up environment variables for sensitive data like API keys and database credentials.
	•	Create a .env file in the root directory and add your variables:
	```bash
	DATABASE_URL=your_database_url
	API_KEY=your_api_key
	```

3.	**Database**: Configure PostgreSQL or MySQL as the primary database. Ensure the database is up and running before proceeding with deployment.

### Key Fixes:
1. Each code block now has matching opening and closing backticks.
2. Bullet points and indentation are consistently applied.
3. `plaintext` is used for environment variable examples to avoid incorrect syntax highlighting.

## 🚀 Deployment Instructions

1.	Database Setup: Run Sequelize migrations to set up the database schema.

	```bash 
	npx sequelize-cli db:migrate
	```

2.	Build and Start Server: Start the server in development mode:
	```bash
	npm run ios
	```

	For production, build and start:
	``` bash
	npm run build
	npm start
	```


3.	Run the App: For React Native apps, run the iOS or Android simulators as described in the sections below.

## 🔧 Advanced Tools and Setup

### 📦 Object-Relational Model

- Sequelize ORM: Sequelize provides a simplified way to interact with SQL databases.
- Define models for entities such as User, MealPlan, Recipe, and more.
- Run migrations and synchronize models with the database:
```bash
npx sequelize-cli init
```
```bash
Database: Choose between PostgreSQL for a robust relational database setup.
```

🛠️ Migration Tool
- Sequelize CLI: Use Sequelize CLI for migration management.
- Initialize Sequelize in your project:
```bash
	npx sequelize-cli init
```



### 📂 MVC Design Pattern

	•	Directory Structure:
	•	The following structure is used for clarity and scalability:

├── controllers
├── models
├── views
├── routes
├── config
├── services
└── app.js


### 🌿 Feature Branching Workflow

- Pull Request (PR) Management:
- For effective collaboration, implement automated testing and linting on PRs.
- Use GitHub Actions for CI/CD workflows.
- Version Control:
- GitHub will be the primary version control system to host code, manage branches, and handle code reviews.
- Code Review Tools:
- Tools like GitHub’s built-in review features help track changes, gather feedback, and ensure high code quality.

### 📱 Frontend and Backend Frameworks

- Frontend: Use React Native (CLI or Expo) for mobile app development:
```bash 
npm install
npm run ios
```
- Backend: Node.js and Express to build the RESTful API:
```bash 
node index.js
```

### 📲 iOS and Android Simulators

- iOS Simulator: Install Xcode (macOS only) and use the iOS simulator.
- Run the app:
```bash 
npx react-native run-ios
```
- Expo Go App: Install Expo Go on mobile devices for easy cross-platform testing without needing Xcode or Android Studio.

### 🧹 Code Quality and Linting

- ESLint and Prettier: Configure ESLint and Prettier for code quality and style consistency.
- Install and add configuration in package.json:
```bash
npm install eslint prettier --save-dev
```


### 🔐 Environment Variable Management

	•	Secure Environment Variables:
	•	Use .env files for development and production environments.
	•	Integrate a package like dotenv to load environment variables:
```bash
npm install dotenv
```


