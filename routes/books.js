const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController')

router.get('/', booksController.getAllBooks);

router.post('/', booksController.createNewBook);

router.get('/:bookId', booksController.getBook);

router.patch('/:bookId', booksController.updateBook);

router.delete('/:bookId', booksController.deleteBook);

module.exports = router;