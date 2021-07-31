const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanySchema = new Schema({
	name: { type: String, required: true },
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model('Company', CompanySchema)
