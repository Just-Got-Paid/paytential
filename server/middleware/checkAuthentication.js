// Is the user logged in?
// Not specific user, just ANY user
const checkAuthentication = (req, res, next) => {
  console.log(req.session); // Log the session
  const { userId } = req.session;
  if (!userId) return res.sendStatus(401);
  return next();
};

module.exports = checkAuthentication;
