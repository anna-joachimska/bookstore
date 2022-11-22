const express = require('express');
const router = express.Router();
const bookstoreController = require('../controllers/bookstoreController')
const publishingHousesController = require("../controllers/publisherHousesController");

router.get('/', bookstoreController.getAllBookstores);

router.post('/', bookstoreController.createNewBookstore);

router.get('/:bookstoreId', bookstoreController.getBookstore);

router.patch('/:bookstoreId', bookstoreController.updateBookstore);

router.delete('/:bookstoreId', bookstoreController.deleteBookstore);

module.exports = router;