const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const bookSchema = mongoose.Schema({
    _id: {type: String, default: uuidv4()},
    name: {type: String, required: true, unique: true},
    type: {type: String, required: true},
    publishingHouse: {type: String, ref: 'PublishingHouse'},
    bookstore: {type: String, ref: 'Bookstore'}
    }, {id: false});

module.exports = mongoose.model('Book', bookSchema);