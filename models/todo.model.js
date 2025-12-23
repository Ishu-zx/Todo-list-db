const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    task:{
        type:String,
        require:true
    },
    priority:{
        type:Number,
        enum:[1,2,3]
    }
})
const Tasks = mongoose.model('task',todoSchema)

module.exports = Tasks
