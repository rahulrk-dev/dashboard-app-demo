const ExpressError = require('../utils/ExpressError.util')

module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.session.returnTo = req.originalUrl

		throw new ExpressError('You must be signed in first!', 401)
	}
	next()
}
