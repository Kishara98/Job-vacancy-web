const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from the React frontend
  optionsSuccessStatus: 200,
}));
app.use(express.json());

// MongoDB connection
const mongoURI = 'mongodb+srv://kishara:job159@cluster0.q4x2u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample route
app.get('/', (req, res) => {
  res.send('Job Vacancy Backend Running');
});

const jobRoutes = require('./routes/jobs'); // Import job routes
app.use('/api/jobs', jobRoutes); // Use job routes under /api/jobs

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
