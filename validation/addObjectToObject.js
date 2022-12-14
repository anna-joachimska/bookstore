const Book = require('../models/book');
const Bookstore = require("../models/bookstore");
const PublishingHouse = require("../models/publishingHouse");

const validateAddObjectToBook = async (Book, model2, id, body) => {
    const book = await Book.findById(id);
    if (!book) {
        throw new Error("book doesn't exist in database");
    }
    if (model2 === Bookstore) {
        const bookstore = await Bookstore.findOne({name: body.bookstores});
        if (!bookstore) {
            throw new Error("bookstore doesn't exist in database");
        }
        if (object.bookstores.includes(bookstore._id)) {
            throw new Error(`${bookstore.name} was already added to this Book`);
        }
    }
    if(model2 === PublishingHouse) {
        const publishingHouse = await PublishingHouse.findOne({name: body.publishingHouse});
        if(!publishingHouse) {
            throw new Error("publishingHouse doesn't exist in database");
        }
        if (book.publishingHouse.includes(publishingHouse._id)) {
            throw new Error(`${publishingHouse.name} was already added to this Book`)
        }
    }
    return true
}

const validateAddObjectToBookstore = async (Bookstore, model2, id, body) => {
    const bookstore = await Bookstore.findById(id);
    if (!bookstore) {
        throw new Error("bookstore doesn't exist in database");
    }
    if (model2 === Book) {
        const book = await Book.findOne({name: body.books});
        if (!book) {
            throw new Error("book doesn't exist in database");
        }
        if (bookstore.books.includes(book._id)) {
            throw new Error(`${book.name} was already added to this Bookstore`);
        }
    }
    if(model2 === PublishingHouse) {
        const publishingHouse = await PublishingHouse.findOne({name: body.publishingHouses});
        if(!publishingHouse) {
            throw new Error("Publishing House doesn't exist in database");
        }
        if (bookstore.publishingHouses.includes(publishingHouse._id)) {
            throw new Error(`${publishingHouse.name} was already added to this Bookstore`)
        }
    }
    return true
}

const validateAddObjectToPublishingHouse = async (PublishingHouse, Book, id, body) => {
    const publishingHouse = await PublishingHouse.findById(id);
    if (!publishingHouse) {
        throw new Error("Publishing House doesn't exist in database");
    }
    const book = await Book.findOne({name: body.books});
    if (!book) {
        throw new Error("book doesn't exist in database");
    }
    if (publishingHouse.books.includes(book._id)) {
        throw new Error(`${book.name} was already added to this Publishing House`);
    }
    return true
}

module.exports={validateAddObjectToBook, validateAddObjectToBookstore,validateAddObjectToPublishingHouse}
