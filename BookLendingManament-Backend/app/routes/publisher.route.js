const express = require("express");
const publishers = require("../controllers/publisher.controller");

const router = express.Router();

router.route("/").get(publishers.findAll).post(publishers.create).delete(publishers.delete)
router.route("/:id").get(publishers.findbyId).put(publishers.update).delete(publishers.deleteById)

module.exports = router;