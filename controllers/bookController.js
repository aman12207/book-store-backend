const Book = require("../models/bookModel");
const ErrorHandler = require("../utils/error");

exports.createBook = async (req, res, next) => {
  try {
    let { bookTitle, author } = req.body;
    bookTitle = bookTitle.trim();
    author = author.trim();
    let book = await Book.findOne({ bookTitle, author });
    if (book) {
      return next(new ErrorHandler("Book already exists!!!", 409));
    }
    book = await Book.create({ bookTitle, author });
    res.status(201).json({
      success: true,
      message: "Book Added SuccessFully!!!",
      book,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllBooks = async (req, res, next) => {
  try {
    let books = await Book.find({});
    res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMatchedBooks = async (req, res, next) => {
  try {
    const term = req.query.term;
    let books = await Book.find({ bookTitle: { $regex: term, $options: "i" } }); // i for insensitive
    if (!books) {
      return next(new ErrorHandler("Book not found!!!", 404));
    }
    res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const id = req.query.id;
    let book = await Book.findOneAndDelete({ _id: id }); // i for insensitive
    if (!book) {
      return next(new ErrorHandler("Book not found!!!", 404));
    }
    res.status(200).json({
      success: true,
      message: "Book Deleted SuccessFully!!!",
      book,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
