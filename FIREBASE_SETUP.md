# Firebase Authentication Setup

## Prerequisites

1. A Firebase project (create one at [Firebase Console](https://console.firebase.google.com/))
2. Firebase Authentication enabled in your project

## Setup Instructions

### 1. Create Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 2. Get Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on the gear icon (⚙️) next to "Project Overview"
4. Select "Project settings"
5. Scroll down to "Your apps" section
6. Click on the web app icon (</>)
7. Register your app if you haven't already
8. Copy the configuration values to your `.env.local` file

### 3. Enable Authentication

1. In Firebase Console, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Click "Save"

### 4. Test the Application

1. Run `npm run dev`
2. Visit `http://localhost:3000`
3. Try registering a new account
4. Try logging in with the created account

## Features Implemented

✅ **User Registration**: Create new accounts with email/password
✅ **User Login**: Sign in with existing credentials
✅ **User Logout**: Sign out functionality
✅ **Error Handling**: Specific error messages for different scenarios
✅ **User Profile**: Display name from registration
✅ **Protected Routes**: Context-based authentication state
✅ **Form Validation**: Client-side validation with Firebase requirements

## Error Codes Handled

-   `auth/user-not-found`: No account with email
-   `auth/wrong-password`: Incorrect password
-   `auth/invalid-email`: Invalid email format
-   `auth/email-already-in-use`: Email already registered
-   `auth/weak-password`: Password too weak
-   `auth/too-many-requests`: Too many failed attempts

## Security Notes

-   All Firebase configuration uses environment variables
-   Passwords are handled securely by Firebase
-   User sessions are managed by Firebase Auth
-   No sensitive data is stored in localStorage
