/*
///////////////////
// Requirements //
/////////////////
*/

const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const { JWT_SECRET = 'neverTell' } = process.env

const SALT_COUNT = 10

const { createUser, getUser, getUserByUsername, getUserById, deactivateUser, activateUser, getAllUsers } = require('../db')
const { requireUser, requireAdmin } = require('./utils')

/*
////////////////
// Listeners //
//////////////
*/

// CREATE //
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
			const user = await createUser({username, password})

			if (!user) {
				next({
					name: 'UserCreationError',
					message: 'There was a problem registering you. Please try again.',
				})
			} else {
				const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1w' })
				res.send({ user, message: "you're signed up!", token })
			}
		}
	} catch (error) {
	  	next(error)
	}
})

router.post('/login', async (req, res, next) => {
	const { username, password } = req.body

	if (!username || !password) {
		next({
			name: 'MissingCredentialsError',
			message: 'Please supply both a username and password',
		})
	}
  
	try {
		const user = await getUser({ username, password })
		
		if (!user) {
			next({
				name: 'IncorrectCredentialsError',
				message: 'Username or password is incorrect',
			})
		} else {
			const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1w' })
			res.send({ user, message: "you're logged in!", token })
		}
	} catch (error) {
		console.log(error)
		next(error)
	}
})


// READ //
router.get('/me', (req, res, next) => {
	try {
	  res.send(req.user)
	} catch (error) {
	  next(error)
	}
})

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


// UPDATE //
router.patch('/:userId/deactivate', requireUser, async (req,res,next) => {
	try {
		const { userId } = req.params
		const deactivatedUser = await deactivateUser(userId)
		res.send(deactivatedUser)
	} catch(error) {
		next(error) 
	}
})

router.patch('/:userId/activate', requireUser, async (req,res,next) => {
	try {
	 	const { userId } = req.params
		const activatedUser = await activateUser(userId)
		res.send(activatedUser)
	} catch(error) {
		next(error) 
	}
})

module.exports = router