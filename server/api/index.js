/*
///////////////////
// Requirements //
/////////////////
*/

const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const { JWT_SECRET = 'neverTell' } = process.env

const { getUserById } = require('../db')

/*
/////////////////
// Middleware //
///////////////
*/

// set `req.user` if possible
router.use(async (req, res, next) => {
	const prefix = 'Bearer '
	const auth = req.header('Authorization')

	if (!auth) {
		next()
	} else if (auth.startsWith(prefix)) {
		const token = auth.slice(prefix.length)

		try {
			const parsedToken = jwt.verify(token, JWT_SECRET)
			const id = parsedToken && parsedToken.id

			if (id) {
				req.user = await getUserById(id)
				next()
			}
		} catch (error) {
			next(error)
		}
	} else {
		next({
			name: 'AuthorizationHeaderError',
			message: `Authorization token must start with ${prefix}`,
		})
	}
});

// logs the user in a request if one exists
router.use((req, res, next) => {
	if (req.user) {
		console.log('User is set:', req.user)
	}
	next()
})

/*
//////////////////
// API Routers //
////////////////
*/

const usersRouter = require('./users')
router.use('/users', usersRouter)

const gamesRouter = require('./games')
router.use('/games', gamesRouter)

const ordersRouter = require('./orders')
router.use('/orders', ordersRouter)

const orderGamesRouter = require('./order_games')
router.use('/order_games', orderGamesRouter)

const orderCheckoutRouter = require('./checkout')
router.use('/checkout', orderCheckoutRouter)

module.exports = router