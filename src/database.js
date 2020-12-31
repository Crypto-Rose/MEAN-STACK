const mongoose = require('mongoose')
const uri = 'mongodb://localhost/mern-task'
mongoose.connect(uri)
    .then(db => console.log('CONNECT'))
    .catch(err => console.error())

module.exports = mongoose 