const mongoose = require('mongoose');

const bookstoreSchema = mongoose.Schema({
    _id: new mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, unique: true},
    publishingHouses: [{type: mongoose.Types.ObjectId, ref: 'PublishingHouse'}],
    books: [{type: mongoose.Types.ObjectId, ref: 'Book'}]
});

module.exports = mongoose.model('Bookstore', bookstoreSchema);