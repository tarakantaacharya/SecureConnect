const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const otpRoutes = require('./routes/otp');


// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// Add a basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('Server will continue to run without database connection');
  }
};

// Initialize routes
app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);

// Set port
const PORT = process.env.PORT || 8000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Try to connect to MongoDB
  connectDB();
});
