function requireUser(req, res, next) {
    if (!req.user) {
      next({
        name: "MissingUserError",
        message: "You must be logged in to perform this action"
      });
    }
  
    next();
  }

  //Should we include a check for params being sent? Like requiredParams?
  
  module.exports = {
    requireUser
  }