module.exports = (func) => {
	return async (req, res, next) => {
		try {
			await func(req, res, next)
		} catch (err) {
			console.log('Error', err.message)
			next(err)
		}
	}
}
