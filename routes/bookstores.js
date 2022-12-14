const express = require('express');
const router = express.Router();
const bookstoreController = require('../controllers/bookstoreController')

router.get('/', bookstoreController.getAllBookstores);

router.get('/WithBooks', bookstoreController.getAllBookstoresWithBooks);

router.get('/WithPublishingHouses', bookstoreController.getAllBookstoresWithPublishingHouses);

router.post('/', bookstoreController.createNewBookstore);

router.get('/bookstore/:bookstoreId', bookstoreController.getBookstore);

router.patch('/bookstore/:bookstoreId', bookstoreController.updateBookstore);

router.delete('/bookstore/:bookstoreId', bookstoreController.deleteBookstore);

router.patch('/deleteBookFromBookstore/:bookstoreId', bookstoreController.deleteBookFromBookstore);

router.patch('/addBookToBookstore/:bookstoreId', bookstoreController.addBookToBookstore);

router.patch('/deletePublishingHouseFromBookstore/:bookstoreId', bookstoreController.deletePublishingHouseFromBookstore);

router.patch('/addPublishingHouseToBookstore/:bookstoreId', bookstoreController.addPublishingHouseToBookstore);

module.exports = router;