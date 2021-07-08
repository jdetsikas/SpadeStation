const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { createUser, getUser, getUserByUsername, getUserById, deactivateUser, activateUser, getAllUsers } = require('../db')
const {requireAdmin} = require('./utils')
const SALT_COUNT = 10
const { JWT_SECRET = 'neverTell' } = process.env

//-------------------Require Admin is used for these routes--------------//


// GET /api/users
router.get('/all', requireAdmin, async (req, res, next) => {
  
      try {
        const gettingAllUsers = await getAllUsers();
        if (gettingAllUsers) {
            res.send(gettingAllUsers);
        }

    } catch (error) {
        throw error
    };
    
}); 

// POST /api/users/login
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  // request must have both
  if (!username || !password) {
    next({
      name: 'MissingCredentialsError',
      message: 'Please supply both a username and password',
    })
  }

  try {
    const user = await getUser({ username, password })
    console.log(user)
    if (!user) {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect',
      })
    } else {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '1w' }
      )
      res.send({ user, message: "you're logged in!", token })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// POST /api/users/register
router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const queriedUser = await getUserByUsername(username)
    if (queriedUser) {
      res.status(401)
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists',
      })
    } else {
      const user = await createUser({
        username,
        password,
      })
      if (!user) {
        next({
          name: 'UserCreationError',
          message: 'There was a problem registering you. Please try again.',
        })
      } else {
        const token = jwt.sign(
          { id: user.id, username: user.username },
          JWT_SECRET,
          { expiresIn: '1w' }
        )
        res.send({ user, message: "you're signed up!", token })
      }
    }
  } catch (error) {
    next(error)
  }
})

// GET /api/users/me
router.get('/me', (req, res, next) => {
  try {
    res.send(req.user)
  } catch (error) {
    next(error)
  }
})

//usersRouter.patch(‘/:userId’)
// router.post('/', (req,res,next) =>{
  
//   try{
//     res.send("Hello ")

//   }catch(error){
//     next(error) 

//   }
// })


//usersRouter.patch(‘:userId/deactivate’)
router.patch('/:userId/deactivate', requireAdmin, async (req,res,next) => {
  // console.log('LOGING REQUIRE USER  ',req.user)

  console.log('PARAMS', req.params)
  
const { userId } = req.params
  try{

    const deactivatingdUser = await deactivateUser(userId)
    // console.log(deactivatedUser)
    res.send(deactivatingdUser)
  }catch(error){
    next(error) 
  }
})

//usersRouter.patch(‘:userId/activate’)
router.patch('/:userId/activate', requireAdmin, async (req,res,next) => {
  // console.log('LOGING REQUIRE USER  ',req.user)

  console.log('PARAMS', req.params)
  
const { userId } = req.params
  try{

    const activatingUser = await activateUser(userId)
    // console.log(activatingUser)
    res.send(activatingUser)
  }catch(error){
    next(error) 
  }
})


// --------- ADD ADDITONAL USER ROUTES AS NEEDED ---------
module.exports = router
