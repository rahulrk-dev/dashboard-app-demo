const Company = require('../models/company.model')
const User = require('../models/users.model')
const { createCompany } = require('./users.controller')

module.exports.register = async (req, res, next) => {
	const { email, name, companyName, dob, gender, password } = req.body

	let company = await Company.findOne({ name: companyName })

	if (!company) company = createCompany(companyName)

	const user = new User({
		email,
		name,
		company: company._id,
		dob,
		gender,
		role: 'ADMIN',
	})

	const registeredUser = await User.register(user, password)
	req.login(registeredUser, (err) => {
		if (err) return next(err)

		res.status(201).send({ message: 'Registered' })
	})
}

module.exports.login = async (req, res) => {
	const user = await User.findOne({ email: req.body.email })

	req.login(user, function (err) {
		if (err) {
			return next(err)
		}
		res.status(200).send({ message: 'Authorized', data: user })
	})
}

module.exports.getCurrentUser = async (req, res) => {
	const { id } = req.params
	const user = await User.findById({ id })

	res.status(200).send({ data: user })
}

module.exports.logout = (req, res) => {
	req.logout()
	res.status(200).send({ message: 'Logged Out' })
}
