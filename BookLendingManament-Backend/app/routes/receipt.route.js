const express = require("express");
const receipts = require("../controllers/receipt.controller");

const router = express.Router();

router.route("/").get(receipts.findAll).post(receipts.create).delete(receipts.delete)
router.route("/:id").get(receipts.findbyId).put(receipts.update).delete(receipts.deleteById)
router.route("/:id/client").get(receipts.findbyClientId);

module.exports = router;