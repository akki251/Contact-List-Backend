const express = require("express");
const contactController = require("../controllers/contactsController");
const auth = require("../Middlewares/auth");
const router = express.Router();

router.use(auth);

router.route("/all").get(contactController.getAllContacts);
router.route("/create").post(contactController.createContact);
router.route("/delete/:id").delete(contactController.deleteContact);
router.route("/update/:id").patch(contactController.updateContact);

module.exports = router;
