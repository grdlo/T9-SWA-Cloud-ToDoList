const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Task', taskSchema);