// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const db = mongoose.connection

// Environment Variables (getting ready for Heroku)
const app = express();
const mongoURI = process.env.MONGO_URI
const PORT = process.env.PORT || 3001

//Middleware
app.use(express.urlencoded({ extended: false }))// extended: false - does not allow nested objects in query strings
app.use(express.json()); //use .json(), not .urlencoded()
app.use(express.static('public')) // we need to tell express to use the public directory for static files... this way our app will find index.html as the route of the application! 
app.use(cors())

//Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true}, () => console.log('mango connection'))

//erros
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

//Routes
const todoController = require('./controllers/todos.js')
app.use('/todos', todoController)



app.listen(PORT, () => {
  console.log('yippe deee', PORT)
})