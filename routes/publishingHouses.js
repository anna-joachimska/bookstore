const express = require('express');
const router = express.Router();
const publishingHousesController = require('../controllers/publisherHousesController')

router.get('/', publishingHousesController.getAllPublishingHouses);

router.post('/', publishingHousesController.createNewPublishingHouse);

router.get('/:publishingHouseId', publishingHousesController.getPublishingHouse);

router.patch('/:publishingHouseId', publishingHousesController.updatePublishingHouse);

router.delete('/:publishingHouseId', publishingHousesController.deletePublishingHouse);

module.exports = router;