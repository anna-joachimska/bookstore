const express = require('express');
const router = express.Router();
const Book = require('../models/book')
// const { v4: uuidv4 } = require('uuid');


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling GET method on books'
    });
});

router.post('/', (req, res, next) => {
    const book = new Book({
        _id: uuidv4(), // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        name: req.body.name,
        // type: req.body.type,
    });
    book.save().then(result => {
        console.log(result);
    }).catch(err => {
        console.error(err);
    });
    res.status(200).json({
        message: 'handling POST method on book',
        createdBook: book,
    });
});

router.get('/:bookId', (req, res, next) => {
    const id = req.params.bookId;
    res.status(200).json({
        message: 'get a specific book endpoint',
        id: id,
    });
});

router.patch('/:bookId', (req, res, next) => {
    const id = req.params.bookId;
    res.status(200).json({
        message: 'handling PATCH method - updated book',
        id: id,
    });
});

router.delete('/:bookId', (req, res, next) => {
    const id = req.params.bookId;
    res.status(200).json({
        message: 'handling DELETE method - deleted book',
        id: id,
    });
});

module.exports = router;