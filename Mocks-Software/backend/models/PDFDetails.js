const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    pdf:String
})


module.exports = mongoose.model('file',fileSchema)