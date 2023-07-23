const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const UserSchema=mongoose.Schema({
    displayName:String,
    email:String,
})
UserSchema.plugin(findOrCreate)
module.exports = mongoose.model('User', UserSchema);