const roleMiddleware = (allowedRoles) => (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).send('Access denied');
    }
    next();
  };
  
  module.exports = roleMiddleware;
  