const mongoose = require('mongoose');

const myUser = new mongoose.Schema({
    username: { type: String, required: true }, 
    password: { type: String, required: true }, 
    email: { type: String, required: true }, 
    role: { type: Number, required: false },  
});

module.exports = mongoose.model('user',myUser,'user');