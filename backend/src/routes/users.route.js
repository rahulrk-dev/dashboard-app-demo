const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync.util')
const {
	addUser,
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
	getAllCounts,
} = require('../controllers/users.controller')
const { isLoggedIn } = require('../middlewares/auth.middleware')

router.get('/', catchAsync(getAllUsers))
router.get('/count', catchAsync(getAllCounts))
router.post('/', catchAsync(addUser))
router.get('/:id', catchAsync(getUser))
router.put('/:id', catchAsync(updateUser))
router.delete('/:id', catchAsync(deleteUser))

module.exports = router
