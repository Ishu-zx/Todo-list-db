const mongoose = require('mongoose')

const connectDB =()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/todo')
    .then(()=>{
        console.log('mongodb connected!!')
    })
}

module.exports = connectDB