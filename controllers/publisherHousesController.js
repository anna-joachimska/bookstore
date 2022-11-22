const PublishingHouse = require("../models/publishingHouse");
const {v4: uuidv4} = require("uuid");

const getAllPublishingHouses = async (req, res) => {
    try {
        const data = await PublishingHouse.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createNewPublishingHouse = async (req, res) => {
    const publishingHouse = new PublishingHouse({
        _id: uuidv4(),
        name: req.body.name,
    });
    try {
        const data = await publishingHouse.save();
        res.status(200).json(data)
    }
    catch(error) {
        res.status(400).json({message: error.message})
    };
}
const getPublishingHouse = async (req, res, next) => {
    try {
        const data = await PublishingHouse.findById(req.params.publishingHouseId);
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const updatePublishingHouse = async (req, res, next) => {
    try {
        const id = req.params.publishingHouseId;
        const updatedData = req.body;
        const options = {new: true}; //obiekt zostanie zwrocony po updacie
        const result = await PublishingHouse.findByIdAndUpdate(id, updatedData, options)
        res.send(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const deletePublishingHouse = async (req, res, next) => {
    try {
        const id = req.params.publishingHouseId;
        const data = await PublishingHouse.findByIdAndDelete(id);
        res.send(`Object ${data.name} has been deleted`);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

module.exports = {
    getAllPublishingHouses,
    createNewPublishingHouse,
    getPublishingHouse,
    updatePublishingHouse,
    deletePublishingHouse
}