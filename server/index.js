///////////////////////////////
// Imports
///////////////////////////////

require('dotenv').config();
const path = require('path');
const express = require('express');

// Middleware imports
const handleCookieSessions = require('./middleware/handleCookieSessions');
const logRoutes = require('./middleware/logRoutes');
const { checkAuthentication, authorizeRole } = require('./middleware/checkAuthentication');

// Controller imports
const authControllers = require('./controllers/authControllers');
const userControllers = require('./controllers/userControllers');
const budgetControllers = require('./controllers/budgetControllers');
const { getUsersByOrganization } = require('./controllers/userControllers');

const app = express();

///////////////////////////////
// Middleware
///////////////////////////////

// Session handling, request logging, and JSON parsing middleware
app.use(handleCookieSessions); // Adds session property to request
app.use(logRoutes);            // Logs all incoming requests
app.use(express.json());        // Parses incoming request bodies as JSON

// Serve static assets (frontend)
app.use(express.static(path.join(__dirname, '../frontend/dist')));


///////////////////////////////
// Auth Routes
///////////////////////////////

// Auth routes (login, logout, check current session)
app.get('/api/me', authControllers.showMe);
app.post('/api/login', authControllers.loginUser);
app.delete('/api/logout', authControllers.logoutUser);


///////////////////////////////
// User Routes
///////////////////////////////

// Public signup route
app.post('/api/users', userControllers.createUser);

// Protected user routes (requires authentication)
app.get('/api/users', checkAuthentication, authorizeRole('admin'), userControllers.listUsers);
app.get('/api/users/:id', checkAuthentication, authorizeRole('student'), userControllers.listUsers);
app.patch('/api/users/:id', checkAuthentication, userControllers.updateUser);


///////////////////////////////
// Budget Routes
///////////////////////////////

// Budget creation, fetching, updating, and deleting (all require authentication)
app.post('/api/budgets', checkAuthentication, budgetControllers.createBudget);
app.get('/api/budgets/:simulation_id', checkAuthentication, budgetControllers.getBudgetsBySimulation);
app.patch('/api/budgets/:id', checkAuthentication, budgetControllers.updateBudget);
app.delete('/api/budgets/:id', checkAuthentication, budgetControllers.deleteBudget);


///////////////////////////////
// Organization Routes
///////////////////////////////

// Get all users in a specific organization (requires authentication)
app.get('/api/organizations/:organizationId/users', checkAuthentication, authorizeRole('admin'), getUsersByOrganization);


///////////////////////////////
// Fallback Route
///////////////////////////////

// Handle any other requests that don’t match the above routes
app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next(); // Let API requests pass through
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html')); // Serve frontend
});


///////////////////////////////
// Start the Server
///////////////////////////////

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
