const mongoose = require("mongoose");
const Bookstore = require("../models/bookstore");
const Book = require('../models/book');
const PublishingHouse = require('../models/publishingHouse');

const getAllBookstores = async (req, res) => {
    try {
        const data = await Bookstore.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getAllBookstoresWithBooks = async (req, res) => {
    try {
        const data = await Bookstore.find().populate('books');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getAllBookstoresWithPublishingHouses = async (req, res) => {
    try {
        const data = await Bookstore.find().populate('publishingHouses');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createNewBookstore = async (req, res) => {
    const bookstore = await new Bookstore({
        name: req.body.name,
    });
    try {
        const data = await bookstore.save();
        res.status(200).json(data)
    }
    catch(error) {
        res.status(500).json({message: error.message})
    };
}
const getBookstore = async (req, res) => {
    try {
        const data = await Bookstore.findById(req.params.bookstoreId);
        if (!data) return res.status(404).json('Bookstore not Found')
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const updateBookstore = async (req, res) => {
    try {
        const id = req.params.bookstoreId;
        const updatedData = req.body;
        const options = {new: true}; //obiekt zostanie zwrocony po updacie
        const result = await Bookstore.findByIdAndUpdate(id, updatedData, options)
        res.status(200).send(result);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteBookstore = async (req, res) => {
    try {
        const bookstore = await Bookstore.findById(req.params.bookstoreId);
        if (!bookstore) {
            return res.status(404).json({message: 'Bookstore not found'});
        }
        if (bookstore.books.length !== 0) {
            throw new Error("Can not delete Bookstore with books in it");
        }
        // tutaj zmienic delete aby 2 razy nie znajdowac
        const data = await Bookstore.findByIdAndDelete(bookstore._id);
        res.send(`Object ${data.name} has been deleted`);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const addBookToBookstore = async (req, res) => {
    try {
        const bookstore = await Bookstore.findById(req.params.bookstoreId);
        const book = await Book.findOne({name: req.body.books});
        if(!book) return res.status(404).json({message: 'Book not found'});
        if (!bookstore.books.includes(book._id)) {
            await bookstore.books.push(book._id);
            bookstore.save();
            return res.send(bookstore);
        };

        throw new Error(`${book.name} was already added to this Bookstore`);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteBookFromBookstore = async (req, res) => {
    try {
        const book = await Book.findOne({name: req.body.books});
        if(!book) return res.status(404).json({message: 'Book not found'});

        const bookstore = await Bookstore.findByIdAndUpdate(
            {_id: req.params.bookstoreId},
            { $pull: { books: book._id }},
            { new: true }).populate('books');

        return res.send(bookstore);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const addPublishingHouseToBookstore = async (req, res) => {
    try {
        const bookstore = await Bookstore.findById(req.params.bookstoreId);
        const publishingHouse = await PublishingHouse.findOne({name: req.body.publishingHouses});
        if(!publishingHouse) return res.status(404).json({message: 'Publishing House not found'});
        if (!bookstore.publishingHouses.includes(publishingHouse._id)) {
            await bookstore.publishingHouses.push(publishingHouse._id);
            bookstore.save();
            return res.send(bookstore);
        };

        throw new Error(`${publishingHouse.name} was already added to this Bookstore`);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deletePublishingHouseFromBookstore = async (req, res) => {
    try {
        const publishingHouse = await PublishingHouse.findOne({name: req.body.publishingHouses});
        if(!publishingHouse) return res.status(404).json({message: 'Publishing House not found'});

        const bookstore = await Bookstore.findByIdAndUpdate(
            {_id: req.params.bookstoreId},
            { $pull: { publishingHouses: publishingHouse._id }},
            { new: true }).populate('publishingHouses');

        return res.send(bookstore);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports = {
    getAllBookstores,
    getAllBookstoresWithBooks,
    getAllBookstoresWithPublishingHouses,
    createNewBookstore,
    getBookstore,
    updateBookstore,
    deleteBookstore,
    addBookToBookstore,
    deleteBookFromBookstore,
    addPublishingHouseToBookstore,
    deletePublishingHouseFromBookstore,
}