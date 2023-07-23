const mongoose = require('mongoose')
const mediaSchema = mongoose.Schema({
    owner:String,
    type:String,
    fileName:String,
    filePath:String
})

module.exports = mongoose.model('Media', mediaSchema);