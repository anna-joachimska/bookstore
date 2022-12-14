const express = require('express');
const router = express.Router();
const publishingHousesController = require('../controllers/publisherHousesController')

router.get('/', publishingHousesController.getAllPublishingHouses);

router.post('/', publishingHousesController.createNewPublishingHouse);

router.get('/publishingHouse/:publishingHouseId', publishingHousesController.getPublishingHouse);

router.patch('/publishingHouse/:publishingHouseId', publishingHousesController.updatePublishingHouse);

router.delete('/publishingHouse/:publishingHouseId', publishingHousesController.deletePublishingHouse);

router.patch('/deleteBookFromPublishingHouse/:publishingHouseId', publishingHousesController.deleteBookFromPublisherHouse);

router.patch('/addBookToPublishingHouse/:publishingHouseId', publishingHousesController.addBookToPublishingHouse);

module.exports = router;