const mongoose = require('mongoose');

const publishingHouseSchema = mongoose.Schema({
    _id: new mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, unique: true},
    books: [{type: mongoose.Types.ObjectId, ref: 'Book'}]
});

module.exports = mongoose.model('PublishingHouse', publishingHouseSchema);