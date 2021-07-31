if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const userRoutes = require('./routes/users.route')
const authRoutes = require('./routes/auth.route')
const ExpressError = require('./utils/ExpressError.util')
const User = require('./models/users.model')
const db = require('./db/dbConnection')
const sessionConfig = require('./config/session')

const app = express()

app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
	console.log('Database connected...')
})

app.use(session(sessionConfig))

app.use(passport.initialize())
app.use(passport.session())
passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/auth', authRoutes)

app.all('*', (req, res, next) => {
	const err = new ExpressError('Page Not Found', 404)
	next(err)
})

app.use((err, req, res, next) => {
	const { statusCode = 500, message } = err
	if (!err.message) err.message = 'Something Went Wrong!'
	res.status(statusCode).send({ type: 'error', statusCode, message })
})

const port = Number(process.env.PORT || 3000)
app.listen(port, () => {
	console.log(`🚀 Server is running on port ${port}`)
})
