const Book = require("../models/book");
const mongoose = require("mongoose");
const Bookstore = require('../models/bookstore');
const findFunctions = require("../functions/findFunctions");
const PublishingHouse = require("../models/publishingHouse");

const getAllBooks = async (req, res) => {
    try {
        const data = await Book.find()
            // .populate('books');
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createNewBook = async (req, res) => {
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        type: req.body.type,
    });
    try {
        const data = await book.save();
        res.status(200).json(data)
    }
    catch(error) {
        res.status(400).json({message: error.message})
    };
}
const getBook = async (req, res) => {
    try {
        const data = await Book.findById(req.params.bookId);
        res.json(data);
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
        res.send(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const deleteBook = async (req, res) => {
    try {
        const id = req.params.bookId;
        const data = await Book.findByIdAndDelete(id);
        res.send(`Object ${data.name} has been deleted`);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

module.exports = {getAllBooks, createNewBook, getBook, updateBook, deleteBook}