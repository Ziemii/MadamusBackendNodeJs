const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    }
},
);
module.exports = mongoose.model('Admin', adminSchema);