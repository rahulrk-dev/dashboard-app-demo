const session = require('express-session')
const MongoDBStore = require('connect-mongo')
const { dbUrl } = require('../db/dbConnection')

const secret = 'thisisasecret'

// const store = MongoDBStore.create({
// 	mongoUrl: dbUrl,
// 	touchAfter: 24 * 60 * 60,
// })

// store.on('error', function (e) {
// 	console.log('SESSION STORE ERROR', e)
// })

const sessionConfig = {
	name: 'session',
	secret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		// secure: false,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7,
	},
}

module.exports = sessionConfig
