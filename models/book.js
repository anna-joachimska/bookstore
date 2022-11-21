const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const bookSchema = mongoose.Schema({
    _id: {type: String, default: uuidv4()},
    name: String,
    type: String,
    }, {id: false});

// bookSchema.set('toObject', {getters: true});
// bookSchema.set('toJSON', {getters: true});

// const Book = mongoose.model('Book', bookSchema);

module.exports = mongoose.model('Book', bookSchema);