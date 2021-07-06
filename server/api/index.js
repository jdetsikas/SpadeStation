const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { JWT_SECRET = 'neverTell' } = process.env
const { getUserById } = require('../db')

/* Middlware to see if user is logged in already*/

// set `req.user` if possible
router.use(async (req, res, next) => {
  const prefix = 'Bearer '
  const auth = req.header('Authorization')
  // console.log('auth------', auth)
  if (!auth) {
    // nothing to see here
    next()
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length)
    // console.log('token----', token)
    try {
      // console.log('------before pt-------')
      // console.log('secret:', JWT_SECRET)
      // console.log( 'verify----',jwt.verify(token, JWT_SECRET))
      // let parsedToken 
      //  jwt.verify(token, JWT_SECRET, function(err, decoded) {
      //   if(err){
      //       console.log(err)
      //   }else{
      //       console.log(decoded)
      //       parsedToken = decoded
      //   }
      //  })

       const parsedToken = jwt.verify(token, JWT_SECRET)

      // console.log('bar-------', parsedToken)

      const id = parsedToken && parsedToken.id
      if (id) {
        req.user = await getUserById(id)
        next()
      }
    } catch (error) {
      next(error)
    }
  } else {
    console.log('we dont see prefix')
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    })
  }
})



router.use((req, res, next) => {
  if (req.user) {
    console.log('User is set:', req.user)
  }
  next()
})

// ROUTER: /api/users
const usersRouter = require('./users')
router.use('/users', usersRouter)

// ROUTER: /api/games
const gamesRouter = require('./games')
router.use('/games', gamesRouter)

// ROUTER: /api/orders
const ordersRouter = require('./orders')
router.use('/orders', ordersRouter)

// ROUTER: /api/orderGames

const orderGamesRouter = require('./order_games')
router.use('/order_games', orderGamesRouter)


// ------ ADD MORE ROUTES BELOW ------

module.exports = router
