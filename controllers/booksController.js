const Book = require("../models/book");
const mongoose = require("mongoose");
const Bookstore = require("../models/bookstore");
const PublishingHouse = require("../models/publishingHouse");
const {validateNewObject} = require("../validation/createNewObjectValidation");

const getAllBooks = async (req, res) => {
    try {
        const data = await Book.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getAllBooksWithPublishingHouses = async (req, res) => {
    try {
        const data = await Book.find().populate("publishingHouse");
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getAllBooksWithBookstores = async (req, res) => {
    try {
        const data = await Book.find().populate("bookstores");
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createNewBook = async (req, res) => {
    try {
        const validateNewBook = await validateNewObject(Book,req.body);
        const book = await new Book({
            name: req.body.name,
            type: req.body.type,
        });
        const data = await book.save();
        res.status(200).json(data)
    }
    catch(error) {
        res.status(500).json({message: error.message})
    };
}
const getBook = async (req, res) => {
    try {
        const data = await Book.findById(req.params.bookId);
        if (!data) return res.status(404).json('Book not Found')
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const updateBook = async (req, res) => {
    try {
        const id = req.params.bookId;
        const dataToUpdate = req.body;
        const options = {new: true}; //obiekt zostanie zwrocony po updacie
        const result = await Book.findByIdAndUpdate(id, dataToUpdate, options)
        res.status(200).send(result);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteBook = async (req, res) => {
    try {
        const id = req.params.bookId;
        const data = await Book.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({message: 'Book not found'});
        }
        res.send(`Object ${data.name} has been deleted`);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
//?? czy powinny byc

const addBookstoreToBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        const bookstore = await Bookstore.findOne({name: req.body.bookstores});
        if(!bookstore) return res.status(404).json({message: 'Bookstore not found'});
        if (!book.bookstores.includes(bookstore._id)) {
            await book.bookstores.push(bookstore._id);
            book.save();
            return res.send(book);
        };

        throw new Error(`${bookstore.name} was already added to this Book`);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteBookstoreFromBook = async (req, res) => {
    try {
        const bookstore = await Bookstore.findOne({name: req.body.bookstores});
        if(!bookstore) return res.status(404).json({message: 'Bookstore not found'});

        const book = await Book.findByIdAndUpdate(
            {_id: req.params.bookId},
            { $pull: { bookstores: bookstore._id }},
            { new: true }).populate('bookstores');

        return res.send(book);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const addPublishingHouseToBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        console.log(book.publishingHouse) //nie ma pola publishing house; nie dziala w obie strony referencja
        const publishingHouse = await PublishingHouse.findOne({name: req.body.publishingHouse});
        if(!publishingHouse) return res.status(404).json({message: 'Publishing House not found'});
        if (!book.publishingHouse.includes(publishingHouse._id)) {
            await book.publishingHouse.push(publishingHouse._id);
            book.save();
            return res.send(book);
        };

        throw new Error(`${publishingHouse.name} was already added to this Book`);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deletePublishingHouseFromBook = async (req, res) => {
    try {
        const publishingHouse = await PublishingHouse.findOne({name: req.body.publishingHouses});
        if(!publishingHouse) return res.status(404).json({message: 'Publishing House not found'});

        const book = await Book.findByIdAndUpdate(
            {_id: req.params.bookId},
            { $pull: { publishingHouse: publishingHouse._id }},
            { new: true }).populate('publishingHouse');

        return res.send(book);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


module.exports = {
    getAllBooks,
    getAllBooksWithBookstores,
    getAllBooksWithPublishingHouses,
    createNewBook,
    getBook,
    updateBook,
    deleteBook,
    addPublishingHouseToBook,
    deletePublishingHouseFromBook,
    addBookstoreToBook,
    deleteBookstoreFromBook}