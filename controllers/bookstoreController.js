const mongoose = require("mongoose");
const Bookstore = require("../models/bookstore");
const Book = require('../models/book');
const PublishingHouse = require('../models/publishingHouse');
const {validateNewObject} = require("../validation/createNewObjectValidation");
const {validateObjectUpdate} = require("../validation/updateObjectValidation");
const {validateAddObjectToBookstore} = require("../validation/addObjectToObject");
const {validateObjectDelete} = require("../validation/deleteObjectValidation");

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
    try {
        const validateNewBookstore = await validateNewObject(Bookstore,req.body);
        const bookstore = await new Bookstore({
            name: req.body.name,
        });
        const data = await bookstore.save();
        res.status(200).json(data)
    }
    catch(error) {
        res.status(500).json({message: error.message})
    };
}
const getBookstore = async (req, res) => {
    try {
        if (!req.params.bookstoreId) return res.status(400).json('id not provided');
        const data = await Bookstore.findById(req.params.bookstoreId);
        if (!data) return res.status(404).json('Bookstore not Found')
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const updateBookstore = async (req, res) => {
    try {
        if (!req.params.bookstoreId) return res.status(400).json('id not provided');
        const id = req.params.bookstoreId;
        const dataToUpdate = req.body;
        const updateBookstoreValidation = await validateObjectUpdate(Bookstore, id, dataToUpdate)
        const options = {new: true};
        const result = await Bookstore.findByIdAndUpdate(id, dataToUpdate, options)
        res.status(200).send(result);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteBookstore = async (req, res) => {
    try {
        if (!req.params.bookstoreId) return res.status(400).json('id not provided');
        const bookstore = await Bookstore.findById(req.params.bookstoreId);
        if (!bookstore) {
            return res.status(404).json({message: 'Bookstore not found'});
        }
        const validateBookstoreDelete = await validateObjectDelete(Bookstore, req.params.bookstoreId)
        if(validateBookstoreDelete) {
            await Bookstore.deleteOne(bookstore._id);
            res.send(`Object ${bookstore.name} has been deleted`);
        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const addBookToBookstore = async (req, res) => {
    try {
        const validateAddBookToBookstore = await validateAddObjectToBookstore(Bookstore, Book, req.params.bookstoreId, req.body)
        if (validateAddBookToBookstore) {
            const bookstore = await Bookstore.findById(req.params.bookstoreId);
            const book = await Book.findOne({name: req.body.books});
            await bookstore.books.push(book._id);
            bookstore.save();
            return res.send(bookstore);
        };

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteBookFromBookstore = async (req, res) => {
    try {
        if (!req.params.bookstoreId) return res.status(400).json('id not provided');
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
        const validateAddPublishingHouseToBookstore = await validateAddObjectToBookstore(Bookstore, PublishingHouse, req.params.bookstoreId, req.body)
        if (validateAddPublishingHouseToBookstore) {
            const bookstore = await Bookstore.findById(req.params.bookstoreId);
            const publishingHouse = await PublishingHouse.findOne({name: req.body.publishingHouses});
                await bookstore.publishingHouses.push(publishingHouse._id);
                bookstore.save();
                return res.send(bookstore);
        };

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deletePublishingHouseFromBookstore = async (req, res) => {
    try {
        if (!req.params.bookstoreId) return res.status(400).json('id not provided');
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