const express = require("express");
const contactController = require("../controllers/contactsController");
const { createMember } = require("../controllers/memberController");
const Member = require("../models/Member");
const router = express.Router();


router.route("/all").get(async (req, res) => {
  const allUsers = await Member.find().populate("contacts");

  res.status(200).json({
    status: "Success",
    message: "user route established",
    data: allUsers,
  });
});

router.route("/create").post(createMember);

module.exports = router;
