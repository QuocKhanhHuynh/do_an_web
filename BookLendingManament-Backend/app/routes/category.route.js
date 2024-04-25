const express = require("express");
const categories = require("../controllers/category.controller");

const router = express.Router();

router.route("/").get(categories.findAll).post(categories.create).delete(categories.delete)
router.route("/:id").get(categories.findbyId).put(categories.update).delete(categories.deleteById)

module.exports = router;