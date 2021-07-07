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



  function requireAdmin(req, res, next) {
    if (req.user.username === 'admin') {
      next();
    }else{
    res.status(401).send({
      error: 'This action requires Admin privileges'
    })
    }

    //why did it not work previously without the else?
  }

  //Should we include a check for params being sent? Like requiredParams?
  
  module.exports = {
    requireUser,
    requireAdmin
  }
  
