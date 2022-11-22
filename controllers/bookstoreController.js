const Bookstore = require("../models/bookstore");
const {v4: uuidv4} = require("uuid");

const getAllBookstores = async (req, res) => {
    try {
        const data = await Bookstore.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createNewBookstore = async (req, res) => {
    const bookstore = new Bookstore({
        _id: uuidv4(),
        name: req.body.name,
    });
    try {
        const data = await bookstore.save();
        res.status(200).json(data)
    }
    catch(error) {
        res.status(400).json({message: error.message})
    };
}
const getBookstore = async (req, res, next) => {
    try {
        const data = await Bookstore.findById(req.params.bookstoreId);
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const updateBookstore = async (req, res, next) => {
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

const deleteBookstore = async (req, res, next) => {
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