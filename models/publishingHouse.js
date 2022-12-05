const mongoose = require('mongoose');

const publishingHouseSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    books: [{type: mongoose.Types.ObjectId, ref: 'Book'}]
});

module.exports = mongoose.model('PublishingHouse', publishingHouseSchema);