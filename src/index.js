const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()

const {mongoose} = require('./database')

//settings
app.set('port',process.env.PORT || 5000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/task',require('./router/task.router'))

//Statid files
app.use(express.static(path.join(__dirname, 'public')))

//starting the server
app.listen(app.get('port'), () => {
    console.log('Heelo')
    
})