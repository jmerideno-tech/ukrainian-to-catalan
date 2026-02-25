const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth'));  // Authentication routes
app.use('/lessons', require('./routes/lessons'));  // Lessons routes
app.use('/exercises', require('./routes/exercises'));  // Exercises routes
app.use('/progress', require('./routes/progress'));  // User progress routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
