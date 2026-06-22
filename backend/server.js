
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const resultRoutes = require('./routes/results');

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = [
  process.env.FRONTEND_ORIGIN,
  process.env.EXTENSION_ORIGIN
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/results', resultRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, data: null, message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));