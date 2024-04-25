const express = require("express");
const client = require("../controllers/client.controller");
const jwt = require('jsonwebtoken');

const router = express.Router();

router.route("/").post(client.create).get(client.findAll);
router.route("/:id/updatepass").put(client.updatePassword);
router.route("/forgetpass").put(client.forgetPassword);
router.route("/cookies").get(client.findbyCookie);
router.route("/logout").get(client.logout);
router.route('/:id').get(client.findbyId).put(client.update);
router.route("/login").post(client.login);

module.exports = router;