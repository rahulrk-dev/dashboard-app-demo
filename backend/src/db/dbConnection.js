const mongoose = require('mongoose')

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/dashboard-app'

mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
})

const db = mongoose.connection

module.exports = db
module.exports.dbUrl = dbUrl
