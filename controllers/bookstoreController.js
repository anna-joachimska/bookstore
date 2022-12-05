const mongoose = require("mongoose");
const Bookstore = require("../models/bookstore");
const Book = require('../models/book');
const PublishingHouse = require('../models/publishingHouse');
const findFunctions = require('../functions/findFunctions');

const getAllBookstores = async (req, res) => {
    try {
        const data = await Bookstore.find().populate('books');
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createNewBookstore = async (req, res) => {
    const bookId = await findFunctions.findByName(Book, req.body.books);
    const publishingHouseId = await findFunctions.findByName(PublishingHouse, req.body.publishingHouses);
    console.log(bookId, publishingHouseId);
    const bookstore = new Bookstore({
        name: req.body.name,
        books: bookId,
        publishingHouses: publishingHouseId
    });
    try {
        const data = await bookstore.save();
        res.status(200).json(data)
    }
    catch(error) {
        console.log(error)
        res.status(400).json({message: error.message})
    };
}
const getBookstore = async (req, res) => {
    try {
        const data = await Bookstore.findById(req.params.bookstoreId);
        res.json(data);
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
        res.send(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const deleteBookstore = async (req, res) => {
    try {
        const id = req.params.bookstoreId;
        const data = await Bookstore.findByIdAndDelete(id);
        res.send(`Object ${data.name} has been deleted`);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

module.exports = {
    getAllBookstores,
    createNewBookstore,
    getBookstore,
    updateBookstore,
    deleteBookstore
}