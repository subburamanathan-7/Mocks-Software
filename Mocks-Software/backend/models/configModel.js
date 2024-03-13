const mongoose = require('mongoose')

const configSchema = mongoose.Schema({
    interviewCount:{
        type:String
    },
    id:{
        type:String,
        default:'1'
    }
})


module.exports = mongoose.model('config',configSchema)
