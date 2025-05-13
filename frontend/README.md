# MERN Practice - Frontend

This is the frontend part of the MERN (MongoDB, Express, React, Node.js) Practice project. It's built with React and provides a user interface for authentication, user profiles, and more.

## Project Structure

The frontend is organized as follows:

- `src/components/`: Contains all React components
  - `Landing.js`: Home page component
  - `Login.js`: User login component
  - `Register.js`: User registration component
  - `Profile.js`: User profile component
  - `EmailVerification.js`: Email verification component
  - `ResetLogin.js`: Password reset component
- `src/App.js`: Main application component with route definitions
- `public/`: Static assets and HTML template

## Features

- User authentication (register, login, logout)
- User profile management
- Email verification
- Password reset functionality
- Responsive design with CSS modules

## Technologies Used

- React 18
- React Router v6 for navigation
- Axios for API requests
- CSS Modules for component styling

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```
   cd "MERN Practice/frontend"
   ```
3. Install dependencies:
   ```
   npm install
   ```

### Running the Application

Start the development server:

```
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Building for Production

To create a production build:

```
npm run build
```

This builds the app for production to the `build` folder, optimizing the build for the best performance.

## API Connection

The frontend connects to the backend API running on `http://localhost:8000`. Make sure the backend server is running when using the application.

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App configuration

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

For more information about React, check out the [React documentation](https://reactjs.org/).
