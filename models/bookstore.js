const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const bookstoreSchema = mongoose.Schema({
    _id: {type: String, default: uuidv4()},
    name: {type: String, required: true, unique: true},
    publishingHouse: {type: String, ref: 'PublishingHouse'},
    book: {type: String, ref: 'Book'}
}, {id: false});

module.exports = mongoose.model('Bookstore', bookstoreSchema);