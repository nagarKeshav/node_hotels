const express = require('express');
const body_parser = require('body-parser');
const passport = require('./auth');
const db = require('./db');

const app = express();

// Middleware
app.use(body_parser.json());

// Logging middleware
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
app.use(logRequest);

// Initialize Passport
app.use(passport.initialize());


// Route middleware
const localAuthMiddleware = passport.authenticate('local', { session: false });

// Routes
app.get('/', localAuthMiddleware, (_req, res) => {
  res.send('Hello World');
});


const personRoute = require('./routes/personRoute');
const menuItemRoute = require('./routes/menuItemRoute');

app.use('/person', personRoute);
app.use('/menu',  menuItemRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





