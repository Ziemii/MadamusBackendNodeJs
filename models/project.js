const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now 
    },
    img: {
        type: String
    }
});

module.exports = mongoose.model('Projects', projectSchema);