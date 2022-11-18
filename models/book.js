// const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
// const uuid = require('mongoose-uuid');
// require('mongoose-uuid2')(mongoose);
const { v4: uuidv4 } = require('uuid');
// const uuid = require('uuid-mongodb');

const bookSchema = mongoose.Schema({
    _id: {type: String, default: uuidv4()},
    name: String,
    // type:
    }, {id: false});

// bookSchema.set('toObject', {getters: true});
// bookSchema.set('toJSON', {getters: true});

// const Book = mongoose.model('Book', bookSchema);

module.exports = mongoose.model('Book', bookSchema);