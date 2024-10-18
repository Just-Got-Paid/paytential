const User = require('../models/User');


// Is the user logged in?
// Not specific user, just ANY user
const checkAuthentication = (req, res, next) => {
  console.log(req.session); // Log the session
  const { userId } = req.session;
  if (!userId) return res.sendStatus(401);
  return next();
};
// Middleware to check if the user has a specific role (e.g., 'admin')
const authorizeRole = (role) => {
  return async (req, res, next) => {
    const { userId } = req.session;
    if (!userId) return res.sendStatus(401);  // User is not authenticated

    try {
      const user = await User.find(userId);  // Fetch the user by userId from the session
      if (user && user.role === role) {
        return next();  // User has the required role, proceed to the next middleware/route
      }
      return res.status(403).json({ error: 'Forbidden: You do not have permission to access this resource' });  // Role mismatch, deny access
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });  // Handle errors, like DB issues
    }
  };
};

module.exports = {
  checkAuthentication,
  authorizeRole
};
