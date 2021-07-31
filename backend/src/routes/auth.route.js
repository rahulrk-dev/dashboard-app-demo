const express = require('express')
const router = express.Router()
const passport = require('passport')
const catchAsync = require('../utils/catchAsync.util')
const {
	register,
	login,
	logout,
	getCurrentUser,
} = require('../controllers/auth.controller')

router.post(
	'/login',
	passport.authenticate('local', { session: false }),
	catchAsync(login)
)
router.post('/register', catchAsync(register))
router.get('/logout', catchAsync(logout))
router.get('/user/:id', catchAsync(getCurrentUser))

module.exports = router
