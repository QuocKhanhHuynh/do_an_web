const express = require("express");
const emloyees = require("../controllers/emloyee.controller");
const jwt = require('jsonwebtoken');

const router = express.Router();

router.route("/").post(emloyees.create).get(emloyees.findAll);
router.route("/:id/updatepass").put(emloyees.updatePassword);
router.route("/forgetpass").put(emloyees.forgetPassword);
router.route("/cookies").get(emloyees.findbyCookie);
router.route('/:id').get(emloyees.findbyId).put(emloyees.update);
router.route("/login").post(emloyees.login);
router.route("/logout").post(emloyees.logout);
module.exports = router;