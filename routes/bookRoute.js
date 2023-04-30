const express = require('express');
const { getAllBooks, getMatchedBooks, createBook, deleteBook } = require('../controllers/bookController');

const router = express.Router();

router.route("/books/all").get(getAllBooks);
router.route("/books/search").get(getMatchedBooks);
router.route("/book/delete").delete(deleteBook)
router.route("/book/new").post(createBook)

module.exports = router;