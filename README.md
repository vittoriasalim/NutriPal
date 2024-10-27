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

- **Node.js** ![Node.js](https://img.icons8.com/color/20/000000/nodejs.png)  
  Recommended version: v14.x or higher. Node.js is required to run the backend server and manage dependencies.

- **npm** ![npm](https://img.icons8.com/color/20/000000/npm.png)  
  Node Package Manager, which usually comes with Node.js. Use npm to manage project dependencies.

- **React Native CLI** or **Expo CLI** ![React Native](https://img.icons8.com/color/20/000000/react-native.png)  
  React Native CLI for native builds or Expo CLI for a simplified setup. Choose based on your preference for building mobile applications.

- **Xcode** (macOS only) ![Xcode](https://img.icons8.com/color/20/000000/xcode.png)  
  Required to run the iOS simulator for testing iOS builds. Available on the [Mac App Store](https://apps.apple.com/us/app/xcode/id497799835).

- **Database Software** (PostgreSQL) ![Database](https://img.icons8.com/color/20/000000/database.png)  
  Choose a relational database for production, such as PostgreSQL or MySQL, and set it up to handle NutriPal’s data.
1. **Install Dependencies**:

   NutriPal has separate frontend (client) and backend (server) components, each requiring its own set of dependencies. Follow these steps to ensure all required packages are installed for both parts of the application:

   - **Client Dependencies**:
     - Navigate to the client directory:
       ```bash
       cd client
       ```
     - Install the necessary packages for the frontend:
       ```bash
       npm install
       ```
     - This command will download and install all dependencies listed in the `client/package.json` file, including libraries needed for React Native, UI components, and mobile-specific tools.

   - **Server Dependencies**:
     - Open a new terminal window or tab, then navigate to the server directory:
       ```bash
       cd server
       ```
     - Install the necessary packages for the backend:
       ```bash
       npm install
       ```
     - This command will install all dependencies specified in the `server/package.json` file, including packages for handling API requests, database connections, authentication, and any utility libraries used on the server side.

   - **Verify Installation**:
     - Once both installations are complete, check for any warnings or errors. Dependencies should be installed without issues in both directories for the application to work correctly.
   
   **Note**: If using a monorepo setup, you can install dependencies across both directories simultaneously by running:
   ```bash
   npm install --workspaces

2.	**Environment Variables**: Set up environment variables for sensitive data like API keys and database credentials.
-  **Create a `.env` File** in the root directory of both the `client` and `server` (if necessary), create a file named `.env`. This file will hold all sensitive configuration details that should not be hardcoded into the codebase.
- **Add Your Environment Variables** in the `.env` file, define the following variables. Update the placeholder values with actual credentials and settings:


	```bash
	# Database Configuration
   DB_USER=         # Database username (e.g., postgres or root)
   DB_PASSWORD=     # Database password for the user
   DB_NAME=nutripal # Name of the database created for NutriPal
   DB_SCHEMA=nutripal # Default schema to use within the database
   DB_HOST=         # Database server address (e.g., localhost or an IP address)
   
   # API Key for External Services
   GEMINI_API_KEY=  # API key for the Gemini service used in NutriPal's RAG framework

   # Server Configuration
   PORT=            # Port on which the backend server should run (e.g., 3000)
	```

3.	**Database**: Configure PostgreSQL as the primary database. Ensure the database is up and running before proceeding to run server.
- **Install Database Software**: If you haven’t already, install PostgreSQL or MySQL:
     - **PostgreSQL**: [Download PostgreSQL](https://www.postgresql.org/download/)

- **Create the Database**: Open your database client (e.g., pgAdmin) or use the command line to create a new database for NutriPal. Replace placeholders with your preferred values.

   #### PostgreSQL
   ```bash
   # Log into PostgreSQL
   psql -U postgres

   # Create a new database
   CREATE DATABASE nutripal;

   # Create a new user and grant privileges
   CREATE USER nutripal_user WITH ENCRYPTED PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE nutripal TO nutripal_user;

   # Optional: Connect to the newly created database
   \c nutripal;
   ````
- Initialize Sequelize: Set up Sequelize configuration in the config directory to match your .env settings.
```bash 
npx sequelize-cli init
```
- Run Migrations: Migrations are essential for setting up the tables and schema for NutriPal. Run the following command to apply migrations:
```bash
npx sequelize-cli db:migrate
```
3. **Running the Simulators:** To test NutriPal’s mobile app, set up the iOS and Android simulators with these steps. [iOS and Android Simulators](#ios-and-android-simulators)



4. **Run the App**: Instructions for running both frontend and backend servers.

   - **Frontend (Client)**:
     - Navigate to the client folder:
       ```bash
       cd client
       ```
     - Run the frontend application. If using React Native, you can specify the platform (e.g., iOS or Android):
       ```bash
       npm run ios    # For iOS simulator (macOS only)
       npm run android # For Android emulator or connected Android device
       ```
     - This will start the mobile app on your specified emulator or connected device, allowing you to test the NutriPal client interface.

   - **Backend (Server)**:
     - Open a new terminal window, then navigate to the server folder:
       ```bash
       cd server
       ```
     - Start the backend server by running:
       ```bash
       node index.js
       ```
     - This command will initialize the server, which will handle API requests and communicate with the database. Make sure any necessary environment variables are set up before running the server.
   
   - **Testing the Connection**:
     - After both servers are running, verify the frontend and backend are connected. Open the app in the simulator and perform a simple action that requires data from the backend, such as logging in or retrieving a sample meal plan.
   
   **Note**: Ensure that your `.env` files are correctly configured in both the client and server folders, and that the backend server URL is correctly set in the frontend configuration.


## 🚀 Deployment Instructions

To deploy NutriPal, ensure the following steps are completed for a smooth setup in both development and production environments.

### 1. 🗄️ Database Setup
   - **Run Migrations**: Migrate the database schema to set up tables and relationships in your production database (e.g., PostgreSQL or MySQL). This step is crucial for structuring NutriPal’s data correctly in production.
   - Run the following command in your server directory:
     ```bash
     npx sequelize-cli db:migrate
     ```
   - **Verify Database Connection**: Ensure your production database is running and that environment variables (`DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_HOST`) are correctly configured in the `.env` file.

### 2. 📦 Build and Start the Server
   - **Development Mode**:
     - To start the server in development mode, which includes hot-reloading for easier debugging, run:
       ```bash
       npm run dev
       ```
   - **Production Mode**:
     - Build the project for production by bundling and optimizing the code:
       ```bash
       npm run build
       ```
     - Start the production server:
       ```bash
       npm start
       ```
     - Use a process manager like **PM2** to keep the server running and handle automatic restarts if it crashes:
       ```bash
       pm2 start dist/index.js --name nutripal-server
       ```
   - **Environment Configuration**:
     - Ensure all sensitive environment variables (API keys, database credentials) are set up on your server (e.g., using environment management on AWS, Heroku Config Vars, or `.env` files).

### 3. 📲 Run the App on Mobile Simulators
   - **iOS Simulator**:
     - In the `client` directory, run the iOS app in the simulator:
       ```bash
       npx react-native run-ios
       ```
     - Ensure Xcode is installed and configured, as outlined in [Running the Simulators](#running-the-simulators).

   - **Android Emulator**:
     - Also in the `client` directory, use the following command to run the app in an Android emulator:
       ```bash
       npx react-native run-android
       ```
     - Ensure Android Studio is installed and set up.

### 4. 🔐 Secure the Deployment
   - **SSL Certificates**: Use HTTPS to secure backend API calls, especially in production. Services like Let’s Encrypt or AWS Certificate Manager provide free SSL certificates.
   - **Security Best Practices**:
     - Enable security headers (e.g., CORS, Content Security Policy) and configure access control in your production environment to prevent unauthorized access.

### 5. ⚙️ Testing the Deployment
   - **Verify API Endpoints**: Test key API endpoints (e.g., login, meal recommendations) to ensure the backend is functioning correctly in production.
   - **Mobile App Testing**: Run the mobile app on both simulators and physical devices to ensure seamless interaction with the production backend.

### 6. 🔄 Continuous Integration/Continuous Deployment (CI/CD) Setup (Optional)
   - **Automated Deployments**: Set up a CI/CD pipeline (e.g., GitHub Actions, CircleCI) to automate testing and deployment.
   - **Testing**: Integrate automated testing for both frontend and backend, ensuring code quality before pushing to production.


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


