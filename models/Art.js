const mongoose = require('mongoose');

const artSchema = mongoose.Schema({
    
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
    price: {
        type: String
    },
    img:
    {
       type: String
    },
    
});

module.exports = mongoose.model('Arts', artSchema);