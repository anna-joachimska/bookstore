const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    type: {type: String, required: true},
    publishingHouse: {type: mongoose.Types.ObjectId, ref: 'PublishingHouse'},
    bookstores: [{type: mongoose.Types.ObjectId, ref: 'Bookstore'}]
    });

module.exports = mongoose.model('Book', bookSchema);