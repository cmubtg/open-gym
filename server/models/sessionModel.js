const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    id: {type: Number, required: true},
    time: {type: Date, required: true},
}, {timestamps: true});

module.exports = mongoose.model('Session', sessionSchema);

