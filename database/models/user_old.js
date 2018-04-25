// set up user structure

var mongoose = require('mongoose');
// Plug-in to allow requiring unique fields
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    password: {
        type: String,
        required: true
    }
});
userSchema.plugin(uniqueValidator);

var User = module.exports = mongoose.model('User', userSchema);