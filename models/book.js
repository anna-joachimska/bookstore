const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true, minLength: 3, maxLength: 50},
    type: {type: String, required: true,
        enum: ['Kryminał', "Dramat", "Pamiętnik", "Romans",
            "Dla dzieci", "Fantasy", "Horror", "Sci-Fi", "Powieść historyczna",
            "Bibliografia", "Reportaż", "Powieść młodzieżowa", "Poradnik", "Kucharska"]},
    publishingHouse: {type: mongoose.Types.ObjectId, ref: 'PublishingHouse'},
    bookstores: [{type: mongoose.Types.ObjectId, ref: 'Bookstore'}]
    });

module.exports = mongoose.model('Book', bookSchema);