const mongoose = require("mongoose");
const PublishingHouse = require("../models/publishingHouse");
const Book = require("../models/book");
const {validateNewObject} = require("../validation/createNewObjectValidation");


const getAllPublishingHouses = async (req, res) => {
    try {
        const data = await PublishingHouse.find().populate('books');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createNewPublishingHouse = async (req, res) => {
    try {
        const validateNewPublishingHouse = await validateNewObject(PublishingHouse,req.body);
        const publishingHouse = await new PublishingHouse({
            name: req.body.name
        });
        const data = await publishingHouse.save();
        res.status(201).json(data)
    }
    catch(error) {
        res.status(500).json({message: error.message})
    };
}

const getPublishingHouse = async (req, res) => {
    try {
        const data = await PublishingHouse.findById(req.params.publishingHouseId).populate('books');
        if (!data) return res.status(404).json('Publishing House not Found')
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updatePublishingHouse = async (req, res) => {
    try {
        const id = req.params.publishingHouseId;
        const updatedData = req.body;
        const options = {new: true};
        const result = await PublishingHouse.findByIdAndUpdate(id, {updatedData}, options).populate('books');
        res.status(200).send(result);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deletePublishingHouse = async (req, res) => {
    try {
        const publishingHouse = await PublishingHouse.findById(req.params.publishingHouseId);
        if (!publishingHouse) {
            return res.status(404).json({message: 'Publishing House not found'});
        }
        if (publishingHouse.books.length !== 0) {
            throw new Error("Can not delete Publishing House with books in it");
        }
        const data = await PublishingHouse.findByIdAndDelete(publishingHouse._id);
        res.send(`Object ${data.name} has been deleted`);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const addBookToPublishingHouse = async (req, res) => {
    try {
        const publishingHouse = await PublishingHouse.findById(req.params.publishingHouseId);
        const book = await Book.findOne({name: req.body.books});
        if(!book) return res.status(404).json({message: 'Book not found'});
        if (!publishingHouse.books.includes(book._id)) {
            await publishingHouse.books.push(book._id);
            publishingHouse.save();
            return res.send(publishingHouse);
        };

        throw new Error(`${book.name} was already added to this Publishing House`);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteBookFromPublisherHouse = async (req, res) => {
    try {
        const book = await Book.findOne({name: req.body.books});
        if(!book) return res.status(404).json({message: 'Book not found'});

        const publishingHouse = await PublishingHouse.findByIdAndUpdate(
            {_id: req.params.publishingHouseId},
            { $pull: { books: book._id }},
            { new: true }).populate('books');

        return res.send(publishingHouse);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports = {
    getAllPublishingHouses,
    createNewPublishingHouse,
    getPublishingHouse,
    updatePublishingHouse,
    deletePublishingHouse,
    addBookToPublishingHouse,
    deleteBookFromPublisherHouse
}