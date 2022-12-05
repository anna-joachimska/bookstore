const mongoose = require("mongoose");
const PublishingHouse = require("../models/publishingHouse");
const Book = require("../models/book");
const {findByName} = require("../functions/findFunctions");

const getAllPublishingHouses = async (req, res) => {
    try {
        const data = await PublishingHouse.find().populate('books');
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createNewPublishingHouse = async (req, res) => {
    const publishingHouse = await new PublishingHouse({
        name: req.body.name
    });
    try {
        const data = await publishingHouse.save();
        res.status(200).json(data)
    }
    catch(error) {
        res.status(400).json({message: error.message})
    };
}

const getPublishingHouse = async (req, res) => {
    try {
        const data = await PublishingHouse.findById(req.params.publishingHouseId);
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updatePublishingHouse = async (req, res) => {
    try {
        const id = req.params.publishingHouseId;
        const updatedData = req.body;
        const options = {new: true}; //obiekt zostanie zwrocony po updacie
        const result = await PublishingHouse.findByIdAndUpdate(id, {updatedData}, options);
        console.log(result)
        res.send(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const deletePublishingHouse = async (req, res) => {
    try {
        const id = req.params.publishingHouseId;
        const data = await PublishingHouse.findByIdAndDelete(id);
        res.send(`Object ${data.name} has been deleted`);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

const addBookToPublishingHouse = async (req, res) => {
    try {
        const publishingHouse = await PublishingHouse.findById(req.params.publishingHouseId);
        const bookName = req.body.books
        const newBook = await findByName(Book, bookName)
        //TODO: do kosza, ten IF jest zbędny + niepoprawny, books nigdy nie jest nullem, zawsze na starcie będzie pustą tablicą
        if (publishingHouse.books == null || publishingHouse.books.length<1) {
            publishingHouse.books = []
        };
        if (!publishingHouse.books.includes(newBook._id)) {
            await publishingHouse.books.push(newBook._id);
            publishingHouse.save();
            return res.send(publishingHouse);
        };
        console.log('book is already added in publishing house')
    } catch (error) {
        res.status(400).json({message:error.message});
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
        //TODO, popracuj nad odpowiednimi kodami w odpowiedzi i obsługą błędów
        res.status(400).json({message:error.message});
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