const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController')

router.get('/', booksController.getAllBooks);

router.get('/WithPublishingHouses', booksController.getAllBooksWithPublishingHouses);

router.get('/WithBookstores', booksController.getAllBooksWithBookstores);

router.post('/', booksController.createNewBook);

router.get('/:bookId', booksController.getBook);

router.patch('/:bookId', booksController.updateBook);

router.delete('/:bookId', booksController.deleteBook);

router.patch('/deleteBookstoreFromBook/:bookId', booksController.deleteBookstoreFromBook);

router.patch('/addBookstoreToBook/:bookId', booksController.addBookstoreToBook);

router.patch('/deletePublishingHouseFromBook/:bookId', booksController.deletePublishingHouseFromBook);

router.patch('/addPublishingHouseToBook/:bookId', booksController.addPublishingHouseToBook);

module.exports = router;