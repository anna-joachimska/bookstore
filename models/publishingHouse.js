const mongoose = require('mongoose');

const publishingHouseSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true, minLength: 3, maxLength: 50},
    books: [{type: mongoose.Types.ObjectId, ref: 'Book'}]
});

module.exports = mongoose.model('PublishingHouse', publishingHouseSchema);