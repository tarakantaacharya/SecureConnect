# Backend

This is the backend part of the MERN (MongoDB, Express, React, Node.js) project. It provides a RESTful API for user authentication, profile management, and OTP-based password reset functionality.

## Project Structure

The backend is organized as follows:

- `server.js`: Entry point of the application
- `controllers/`: Contains the business logic
  - `authController.js`: Handles user authentication
  - `otpController.js`: Handles OTP generation and verification
- `models/`: Contains MongoDB schema definitions
  - `User.js`: User model with profile information
  - `Otp.js`: OTP model for password reset
- `routes/`: Contains API route definitions
  - `auth.js`: Authentication routes
  - `otp.js`: OTP and password reset routes
- `utils/`: Utility functions and helpers
  - `Otp.js`: OTP generation and handling utilities

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user

### OTP and Password Reset

- `POST /api/otp/send-otp`: Send OTP for password reset
- `POST /api/otp/verify-otp`: Verify OTP
- `POST /api/otp/reset-password`: Reset password with verified OTP

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing
- nodemailer for sending emails
- dotenv for environment variables

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- MongoDB (local or Atlas)
- npm or yarn

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_for_sending_otps
EMAIL_PASS=your_email_password_or_app_password
```

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd "MERN Practice/backend"
   ```
3. Install dependencies:
   ```
   npm install
   ```

### Running the Application

For development (with nodemon for auto-restart):

```
npm run dev
```

For production:

```
npm start
```

The server will run on the port specified in your environment variables (default: 8000).

## API Usage Examples

### Register a User

```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "gender": "male",
  "age": 30,
  "location": "New York"
}
```

### Login

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Send OTP for Password Reset

```
POST /api/otp/send-otp
Content-Type: application/json

{
  "email": "john@example.com"
}
```

## Error Handling

The API returns appropriate HTTP status codes:

- 200: Success
- 400: Bad Request (invalid input)
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- OTP-based password reset
- Environment variables for sensitive information

## Development

For development, you can use the following npm scripts:

- `npm run dev`: Start the server with nodemon for auto-restart on file changes
- `npm start`: Start the server in production mode
