const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
  name: String,
  contact_number: Number,
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
