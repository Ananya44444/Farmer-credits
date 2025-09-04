const express = require('express');
const cors = require('cors');
require('dotenv').config();

const farmRoutes = require('./routes/farms');
const creditRoutes = require('./routes/credits');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (public, in-memory)
app.use('/api/farms', farmRoutes);
app.use('/api/credits', creditRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (in-memory mode)`);
});