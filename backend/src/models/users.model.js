const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	role: {
		type: String,
		enum: ['ADMIN', 'USER'],
		default: 'USER',
	},
	name: String,
	company: {
		type: Schema.Types.ObjectId,
		ref: 'Company',
	},
	gender: {
		type: String,
		enum: ['male', 'female'],
	},
	dob: {
		type: Date,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

UserSchema.plugin(passportLocalMongoose, {
	usernameField: 'email',
	passwordField: 'password',
})

module.exports = mongoose.model('User', UserSchema)
