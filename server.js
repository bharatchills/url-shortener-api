const express = require('express');
const urlRoutes = require('./routes/urlRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/urls', urlRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
