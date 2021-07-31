const User = require('../models/users.model')
const Company = require('../models/company.model')
const ExpressError = require('../utils/ExpressError.util')

module.exports.addUser = async (req, res) => {
	const { email, name, companyName, dob, gender } = req.body
	let company = await Company.findOne({ name: companyName })

	if (!company) company = await createCompany(companyName)

	const user = new User({
		email,
		name,
		company: company._id,
		dob,
		gender,
	})

	await user.save()

	res.status(201).send({ data: user })
}

module.exports.getAllUsers = async (req, res) => {
	const users = await User.find({ role: 'USER' })
		.populate('company')
		.sort({ createdAt: -1 })

	res.status(200).send({ data: users })
}

module.exports.getUser = async (req, res) => {
	const user = await User.findById(req.params.id).populate('company')

	if (!user) throw new ExpressError('User not found', 404)

	res.status(200).send({ data: user })
}

module.exports.updateUser = async (req, res) => {
	const { id } = req.params
	const companyName = req.body.companyName

	let company = await Company.findOne({ name: companyName })

	if (!company) company = await createCompany(companyName)

	const user = await User.findByIdAndUpdate(id, {
		...req.body,
		company: company._id,
	})

	res.status(200).send({ data: user })
}

module.exports.deleteUser = async (req, res) => {
	const { id } = req.params
	const user = await User.findByIdAndDelete(id)

	res.status(200).send({ data: user })
}

module.exports.getAllCounts = async (req, res) => {
	const allUsers = await User.find({}).count()
	const admin = await User.find({ role: 'ADMIN' }).count()
	const users = await User.find({ role: 'USER' }).count()
	const male = await User.find({ gender: 'male' }).count()
	const female = await User.find({ gender: 'female' }).count()
	const companies = await Company.find({}).count()

	res
		.status(200)
		.send({ data: { allUsers, admin, users, male, female, companies } })
}

const createCompany = async (name) => {
	const company = new Company({ name })

	await company.save()

	return company
}

module.exports.createCompany = createCompany
