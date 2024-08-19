# Steps to Run the Widget App Locally

## Prerequisites

### Before you begin, ensure you have met the following requirements:

- Node.js: Make sure Node.js is installed on your system. You can download it from here.
- npm: Node Package Manager (npm) is installed with Node.js.
- Firebase Project: Set up a Firebase project and obtain the configuration details (API Key, Auth Domain, etc.).

##  Clone the Repository:

First, clone the repository to your local machine:
* git clone https://github.com/your-username/your-repo-name.git

Navigate to the project directory:
* cd your-repo-name

## Install Dependencies:
Install all necessary dependencies using npm:
* npm install

## Set Up Firebase:
You need to create a .env file in the root of your project and add your Firebase configuration. Here’s an example:
* REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id

- Please make sure you replace the placeholder values with your actual Firebase project credentials.

## Start the Application:
After setting up Firebase and installing the dependencies, start the application:
* npm start

* This command will start the development server, and the app should automatically open in your default web browser at http://localhost:3000.

## Access the App:
If it doesn't open automatically, you can manually navigate to http://localhost:3000 in your browser.

## Build for Production (Optional):
If you want to build the app for production, use the following command:
* npm run build

- This will create an optimized production build of the app in the build directory.

## Additional Notes
- Ensure that your Firebase Firestore database rules are properly configured to allow read/write access for authenticated users.
- The app uses a global context for state management, so any modifications to the data structure should be reflected in the global context.

