const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController')

router.get('/', booksController.getAllBooks);

router.get('/WithPublishingHouses', booksController.getAllBooksWithPublishingHouses);

router.get('/WithBookstores', booksController.getAllBooksWithBookstores);

router.post('/', booksController.createNewBook);

router.get('/book/:bookId', booksController.getBook);

router.patch('/book/:bookId', booksController.updateBook);

router.delete('/book/:bookId', booksController.deleteBook);

router.patch('/deleteBookstoreFromBook/:bookId', booksController.deleteBookstoreFromBook);

router.patch('/addBookstoreToBook/:bookId', booksController.addBookstoreToBook);

router.patch('/deletePublishingHouseFromBook/:bookId', booksController.deletePublishingHouseFromBook);

router.patch('/addPublishingHouseToBook/:bookId', booksController.addPublishingHouseToBook);

module.exports = router;