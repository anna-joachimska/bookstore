const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling GET method on bookstore'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling POST method on bookstore'
    });
});

router.patch('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling PATCH method - updated bookstore'
    });
});
//czy jest jedna ksiegarnia? a jezeli jest jedna ksiegarnia to do usuwania potrzebne mi id?
router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling DELETE method - deleted bookstore'
    });
});

module.exports = router;