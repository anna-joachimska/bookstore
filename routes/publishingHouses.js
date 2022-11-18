const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling GET method on publishing houses'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling POST method on publishing house'
    });
});

router.get('/:publishingHouseId', (req, res, next) => {
    const id = req.params.bookId;
    res.status(200).json({
        message: 'get a specific publishingHouse endpoint',
        id: id,
    });
});

router.patch('/:publishingHouseId', (req, res, next) => {
    const id = req.params.publishingHouseId;
    res.status(200).json({
        message: 'handling PATCH method - updated publishingHouse',
        id: id,
    });
});

router.delete('/:publishingHouseId', (req, res, next) => {
    const id = req.params.publishingHouseId;
    res.status(200).json({
        message: 'handling DELETE method - deleted publishingHouse',
        id: id,
    });
});

module.exports = router;