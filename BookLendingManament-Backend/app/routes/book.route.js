const express = require("express");
const books = require("../controllers/book.controller");

const router = express.Router();

router.route("/").get(books.findAll).post(books.create).delete(books.delete)
router.route("/:id").get(books.findbyId).put(books.update).delete(books.deleteById)

module.exports = router;