const Book = require("../models/book");
const {v4: uuidv4} = require("uuid");

const getAllBooks = async (req, res) => {
    try {
        const data = await Book.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createNewBook = async (req, res) => {
    const book = new Book({
        _id: uuidv4(),
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
const getBook = async (req, res, next) => {
    try {
        const data = await Book.findById(req.params.bookId);
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const updateBook = async (req, res, next) => {
    try {
        const id = req.params.bookId;
        const updatedData = req.body;
        const options = {new: true}; //obiekt zostanie zwrocony po updacie
        const result = await Book.findByIdAndUpdate(id, updatedData, options)
        res.send(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const deleteBook = async (req, res, next) => {
    try {
        const id = req.params.bookId;
        const data = await Book.findByIdAndDelete(id);
        res.send(`Object ${data.name} has been deleted`);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

module.exports = {getAllBooks, createNewBook, getBook, updateBook, deleteBook}